# Generates the original background melody (public/music/song.mp3). Replace that file with any mp3 you like.
import numpy as np, wave, subprocess
sr=44100; bpm=66; beat=60/bpm; bars=16; L=int(sr*beat*4*bars)
out=np.zeros((2,L))
def f(m): return 440*2**((m-69)/12)
def note(m,start,dur,vel=0.5,pan=0.0):
    n=int(sr*min(dur+2.5,6)); t=np.arange(n)/sr; fr=f(m); s=np.zeros(n)
    for h,a in enumerate([1,.5,.28,.14,.08,.04],1):
        s+=a*np.sin(2*np.pi*fr*h*(1+0.0004*h*h)*t)*np.exp(-t*(1.1+0.55*h))
    s*=np.minimum(t/0.006,1)*vel
    rel=np.maximum(0,(t-dur));  s*=np.exp(-rel*2.2)
    i=int(start*sr); idx=(i+np.arange(n))%L
    np.add.at(out[0],idx,s*(1-pan)/2*1.4); np.add.at(out[1],idx,s*(1+pan)/2*1.4)
def pad(ms,start,dur,vel=0.05):
    n=int(sr*dur); t=np.arange(n)/sr; env=np.sin(np.pi*t/dur)**1.2; s=np.zeros(n)
    for m in ms:
        for d in (-0.15,0.15): s+=np.sin(2*np.pi*f(m)*(1+d/100)*t+np.random.rand()*6)
    s*=env*vel; i=int(start*sr); idx=(i+np.arange(n))%L
    np.add.at(out[0],idx,s); np.add.at(out[1],idx,s)
# D  A/C#  Bm  G  D/F#  G  Em  A
chords=[(38,[62,66,69]),(37,[61,64,69]),(35,[59,62,66]),(31,[59,62,67]),(42,[62,66,69]),(43,[62,67,71]),(40,[59,64,67]),(45,[61,64,69])]
mel=[[(74,0,2),(78,2,1),(76,3,1)],[(76,0,3),(73,3,1)],[(74,0,2),(71,2,2)],[(71,0,1),(74,1,1),(79,2,2)],
     [(78,0,2),(81,2,1),(78,3,1)],[(79,0,2),(83,2,2)],[(79,0,1),(76,1,1),(79,2,2)],[(76,0,3),(73,3,1)],
     [(81,0,2),(78,2,1),(74,3,1)],[(76,0,2),(81,2,2)],[(78,0,1.5),(74,1.5,.5),(71,2,2)],[(74,0,2),(79,2,1),(74,3,1)],
     [(78,0,3),(74,3,1)],[(79,0,2),(78,2,1),(74,3,1)],[(76,0,2),(71,2,2)],[(73,0,2),(76,2,2)]]
np.random.seed(7)
for b in range(bars):
    root,tri=chords[b%8]; t0=b*4*beat
    note(root,t0,3.5,.5); note(root+12,t0,3.5,.25)
    arp=[tri[0],tri[1],tri[2],tri[1]+12 if b%2 else tri[0]+12,tri[2],tri[1],tri[2],tri[1]]
    for k,m in enumerate(arp): note(m,t0+k*beat/2+np.random.randn()*.004,.5,.2+.04*(k%4==0),pan=-.3+.08*k)
    pad([root+24]+tri,t0,4*beat)
    for m,s,d in mel[b]: note(m,t0+s*beat+np.random.randn()*.006,d*beat,.42,pan=.2)
# simple wrapped reverb
wet=np.zeros_like(out)
for d,g in [(0.031,.35),(0.047,.3),(0.071,.26),(0.113,.2),(0.171,.15),(0.263,.1)]:
    k=int(d*sr); wet[0]+=np.roll(out[1],k)*g; wet[1]+=np.roll(out[0],k)*g
for d,g in [(0.09,.4),(0.21,.25)]:
    k=int(d*sr); wet+=np.roll(wet,k,axis=1)*g
mix=out+wet*.55; mix/=np.abs(mix).max()*1.15
pcm=(mix.T*32767).astype('<i2')
w=wave.open('/tmp/song.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes()); w.close()
subprocess.run(['ffmpeg','-y','-loglevel','error','-i','/tmp/song.wav','-b:a','112k','public/music/song.mp3'],check=True)
