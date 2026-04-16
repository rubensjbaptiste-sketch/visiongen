<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#050508">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="VisionGen">
<meta name="mobile-web-app-capable" content="yes">
<title>VisionGen</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{
  --bg:#050508;--s1:#0d0d16;--s2:#13131f;--s3:#1a1a28;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.13);
  --a:#7c6ef7;--a2:#f76ebc;--a3:#6ef7c4;
  --text:#f0eeff;--muted:#5a576e;--muted2:#8a87a0;
  --st:env(safe-area-inset-top,0px);--sb:env(safe-area-inset-bottom,0px);
}
html{height:100%}
body{background:var(--bg);color:var(--text);font-family:'Syne',sans-serif;min-height:100%;overflow-x:hidden;-webkit-font-smoothing:antialiased}
.orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(80px);animation:of 18s ease-in-out infinite alternate}
.o1{width:500px;height:500px;top:-200px;left:-150px;background:radial-gradient(circle,rgba(124,110,247,.14),transparent 70%)}
.o2{width:400px;height:400px;bottom:-150px;right:-100px;background:radial-gradient(circle,rgba(247,110,188,.09),transparent 70%);animation-duration:22s;animation-direction:alternate-reverse}
.o3{width:280px;height:280px;top:40%;left:50%;background:radial-gradient(circle,rgba(110,247,196,.06),transparent 70%);animation-duration:26s}
@keyframes of{to{transform:translate(30px,20px) scale(1.05)}}
nav{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:calc(var(--st) + 14px) 20px 14px;background:rgba(5,5,8,.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
.logo{font-size:1.15rem;font-weight:800;letter-spacing:-.5px;background:linear-gradient(120deg,var(--a),var(--a2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.logo em{font-style:normal;font-family:'JetBrains Mono',monospace;font-weight:300;font-size:.88rem;opacity:.65}
.nav-r{display:flex;align-items:center;gap:8px}
.pill{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.5px;padding:5px 10px;border-radius:99px;border:1px solid var(--border);background:var(--s2);color:var(--muted2)}
.pill.live{border-color:rgba(110,247,196,.35);color:var(--a3)}
.scroll{position:relative;z-index:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-bottom:calc(var(--sb) + 90px)}
.page{display:none}.page.on{display:block}
.bnav{position:fixed;bottom:0;left:0;right:0;z-index:50;display:flex;background:rgba(5,5,8,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid var(--border);padding-bottom:var(--sb)}
.bt{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 0 10px;cursor:pointer;-webkit-user-select:none;user-select:none}
.bi{font-size:1.25rem;margin-bottom:3px;transition:transform .2s}
.bl{font-size:.58rem;font-family:'JetBrains Mono',monospace;letter-spacing:.5px;color:var(--muted);text-transform:uppercase;transition:color .2s}
.bt.on .bl{color:var(--a)}.bt.on .bi{transform:scale(1.12)}.bt:active .bi{transform:scale(.9)}
.gp{padding:24px 20px 0}
.hero{text-align:center;margin-bottom:26px;animation:fu .5s ease both}
.hero h1{font-size:clamp(1.7rem,5vw,2.5rem);font-weight:800;letter-spacing:-1.5px;line-height:1.1;margin-bottom:8px}
.hero h1 span{background:linear-gradient(120deg,var(--a),var(--a2),var(--a3));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero p{font-family:'JetBrains Mono',monospace;font-size:.66rem;color:var(--muted);letter-spacing:.5px}
@keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}

/* SERVER STATUS BAR */
.sbar{display:flex;align-items:center;gap:10px;background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:11px 14px;margin-bottom:20px;animation:fu .5s .05s ease both}
.sdot{width:7px;height:7px;border-radius:50%;background:var(--muted);flex-shrink:0;transition:all .3s}
.sdot.on{background:var(--a3);box-shadow:0 0 8px var(--a3)}
.sdot.err{background:#f76e6e;box-shadow:0 0 8px #f76e6e}
.sbt{flex:1;font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--muted2)}
.sbt strong{color:var(--text)}
.sl{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.mscroll{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;margin-bottom:20px;scrollbar-width:none;animation:fu .5s .1s ease both;-webkit-overflow-scrolling:touch}
.mscroll::-webkit-scrollbar{display:none}
.mc{flex-shrink:0;background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:12px 14px;cursor:pointer;transition:all .2s;min-width:128px}
.mc:active{transform:scale(.96)}
.mc.on{border-color:var(--a);background:rgba(124,110,247,.1);box-shadow:0 0 16px rgba(124,110,247,.15)}
.mn{font-size:.82rem;font-weight:700;margin-bottom:3px}
.ms{font-size:.6rem;font-family:'JetBrains Mono',monospace;color:var(--muted);margin-bottom:6px}
.mb{display:inline-block;font-size:.52rem;font-family:'JetBrains Mono',monospace;letter-spacing:.5px;padding:2px 7px;border-radius:99px}
.bf{background:rgba(110,247,196,.12);color:var(--a3);border:1px solid rgba(110,247,196,.25)}
.bk{background:rgba(247,220,110,.12);color:#f7e06e;border:1px solid rgba(247,220,110,.25)}
.bp{background:rgba(124,110,247,.12);color:var(--a);border:1px solid rgba(124,110,247,.25)}
.bn2{background:rgba(247,110,188,.12);color:var(--a2);border:1px solid rgba(247,110,188,.25)}
.pw{background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:16px;margin-bottom:16px;transition:border-color .2s;animation:fu .5s .15s ease both}
.pw:focus-within{border-color:rgba(124,110,247,.4);box-shadow:0 0 24px rgba(124,110,247,.06)}
textarea{width:100%;background:transparent;border:none;outline:none;color:var(--text);font-family:'Syne',sans-serif;font-size:.95rem;resize:none;min-height:80px;line-height:1.6}
textarea::placeholder{color:var(--muted)}
.ptags{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)}
.ptag{font-size:.64rem;font-family:'JetBrains Mono',monospace;color:var(--muted2);background:var(--s2);border:1px solid var(--border);padding:5px 10px;border-radius:99px;cursor:pointer;transition:all .15s;white-space:nowrap}
.ptag:active{transform:scale(.95);background:rgba(124,110,247,.1);border-color:rgba(124,110,247,.4);color:var(--a)}
.sr{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;animation:fu .5s .2s ease both}
.sg label{display:block;font-size:.57rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-family:'JetBrains Mono',monospace;margin-bottom:5px}
select{width:100%;background:var(--s1);border:1px solid var(--border);color:var(--text);font-family:'Syne',sans-serif;font-size:.75rem;padding:9px 8px;border-radius:10px;outline:none;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235a576e' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;transition:border-color .2s}
select:focus{border-color:rgba(124,110,247,.4)}
.gbtn{width:100%;padding:17px;background:linear-gradient(135deg,var(--a),#9b8eff,var(--a2));background-size:200%;border:none;border-radius:14px;color:#fff;font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;transition:all .3s ease;margin-bottom:20px;animation:fu .5s .25s ease both;position:relative;overflow:hidden}
.gbtn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0);transition:background .15s}
.gbtn:active::after{background:rgba(255,255,255,.08)}
.gbtn:not(:disabled):hover{background-position:right;box-shadow:0 8px 28px rgba(124,110,247,.35);transform:translateY(-1px)}
.gbtn:disabled{opacity:.42;cursor:not-allowed;transform:none!important}
.bi2{display:flex;align-items:center;justify-content:center;gap:10px}
.spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:sp .6s linear infinite;display:none}
.loading .spin{display:block}.loading .btxt{opacity:.75}
@keyframes sp{to{transform:rotate(360deg)}}
.prog{display:none;margin-bottom:20px;animation:fi .3s ease}
.prog.on{display:block}
.pt{display:flex;justify-content:space-between;margin-bottom:7px}
.pl{font-size:.67rem;font-family:'JetBrains Mono',monospace;color:var(--muted2)}
.pp{font-size:.67rem;font-family:'JetBrains Mono',monospace;color:var(--a)}
.ptrack{height:2px;background:var(--s3);border-radius:99px;overflow:hidden}
.pfill{height:100%;background:linear-gradient(90deg,var(--a),var(--a2));border-radius:99px;transition:width .5s cubic-bezier(.4,0,.2,1);width:0;box-shadow:0 0 8px var(--a)}
.ow{display:none;margin-bottom:20px;animation:fu .4s ease both}
.ow.on{display:block}
.oh{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.oacts{display:flex;gap:8px}
.abtn{font-size:.68rem;font-family:'JetBrains Mono',monospace;padding:8px 14px;border-radius:9px;border:1px solid var(--border);background:var(--s1);color:var(--text);cursor:pointer;transition:all .15s}
.abtn:active{transform:scale(.95)}
.abtn.pri{background:var(--a);border-color:var(--a);color:#fff}
.abtn.pri:active{background:#6a5de0}
.vf{background:var(--s1);border:1px solid var(--border);border-radius:16px;overflow:hidden;aspect-ratio:16/9;position:relative}
.vf video{width:100%;height:100%;object-fit:cover;display:block}
.ve{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.ve svg{opacity:.2}.ve p{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted)}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.chip{font-size:.62rem;font-family:'JetBrains Mono',monospace;color:var(--muted2);background:var(--s1);border:1px solid var(--border);padding:5px 10px;border-radius:99px}
.chip strong{color:var(--text)}
.chip.ok{border-color:rgba(110,247,196,.3);color:var(--a3)}
.hs{margin-top:28px}
.hscroll{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.hscroll::-webkit-scrollbar{display:none}
.hc{flex-shrink:0;width:140px;background:var(--s1);border:1px solid var(--border);border-radius:12px;overflow:hidden;cursor:pointer;transition:all .2s}
.hc:active{transform:scale(.96)}
.ht{height:78px;background:var(--s2);display:flex;align-items:center;justify-content:center;font-size:1.4rem}
.hi{padding:8px 10px}
.hp{font-size:.6rem;font-family:'JetBrains Mono',monospace;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hm{font-size:.56rem;font-family:'JetBrains Mono',monospace;color:var(--a);margin-top:2px}
.mp{padding:24px 20px 0}
.mlist{display:flex;flex-direction:column;gap:12px;margin-top:12px}
.mi{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:16px;cursor:pointer;transition:all .2s}
.mi:active{transform:scale(.98)}
.mi.on{border-color:var(--a);background:rgba(124,110,247,.08)}
.mir{display:flex;align-items:center;justify-content:space-between}
.min{font-size:.9rem;font-weight:700}
.mid{font-size:.7rem;font-family:'JetBrains Mono',monospace;color:var(--muted);margin-top:5px;line-height:1.5}
.sp2{padding:24px 20px 0}
.sg2{margin-bottom:28px}
.sg2 .sl{margin-bottom:14px}
.srow{display:flex;align-items:center;justify-content:space-between;background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin-bottom:8px;cursor:pointer;transition:all .15s}
.srow:active{background:var(--s2)}
.si2{flex:1}
.stit{font-size:.85rem;font-weight:600;margin-bottom:2px}
.ssub{font-size:.67rem;font-family:'JetBrains Mono',monospace;color:var(--muted)}
.sval{font-size:.7rem;font-family:'JetBrains Mono',monospace;color:var(--a);margin-left:12px}

/* DEPLOY GUIDE */
.dguide{background:linear-gradient(135deg,rgba(124,110,247,.12),rgba(247,110,188,.08));border:1px solid rgba(124,110,247,.25);border-radius:16px;padding:20px;margin-bottom:24px}
.dguide h3{font-size:1rem;font-weight:700;margin-bottom:6px}
.dguide p{font-size:.7rem;font-family:'JetBrains Mono',monospace;color:var(--muted2);line-height:1.6;margin-bottom:12px}
.dsteps{list-style:none}
.dsteps li{font-size:.7rem;font-family:'JetBrains Mono',monospace;color:var(--muted2);padding:8px 0;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:10px;line-height:1.5}
.dsteps li:last-child{border:none}
.dnum{width:20px;height:20px;min-width:20px;border-radius:50%;background:var(--a);color:#fff;font-size:.6rem;display:flex;align-items:center;justify-content:center;font-weight:700;margin-top:1px}
.dsteps strong{color:var(--text)}
.dsteps code{background:var(--s3);padding:1px 5px;border-radius:4px;font-size:.65rem;color:var(--a3)}

.vinfo{text-align:center;margin-top:32px;padding-bottom:16px}
.vinfo p{font-size:.63rem;font-family:'JetBrains Mono',monospace;color:var(--muted)}
.vinfo strong{color:var(--a)}

/* INSTALL BANNER */
.ibanner{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:20px}
.ibanner h4{font-size:.85rem;font-weight:700;margin-bottom:6px}
.ibanner p{font-size:.68rem;font-family:'JetBrains Mono',monospace;color:var(--muted2);line-height:1.5;margin-bottom:12px}
.ibtn{width:100%;padding:12px;background:linear-gradient(135deg,var(--a),var(--a2));border:none;border-radius:10px;color:#fff;font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;cursor:pointer}
.ibtn:active{opacity:.85}

.toast{position:fixed;bottom:calc(var(--sb) + 82px);left:50%;transform:translateX(-50%) translateY(20px);background:var(--s2);border:1px solid var(--border2);border-radius:12px;padding:11px 18px;font-size:.73rem;font-family:'JetBrains Mono',monospace;color:var(--text);z-index:200;white-space:nowrap;box-shadow:0 4px 24px rgba(0,0,0,.5);opacity:0;transition:all .3s cubic-bezier(.34,1.3,.64,1);pointer-events:none}
.toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
.toast.ok{border-color:rgba(110,247,196,.4);color:var(--a3)}
.toast.err{border-color:rgba(247,110,110,.4);color:#f76e6e}
</style>
</head>
<body>

<div class="orb o1"></div><div class="orb o2"></div><div class="orb o3"></div>

<nav>
  <div class="logo">Vision<em>Gen</em></div>
  <div class="nav-r">
    <div class="pill">v1.0</div>
    <div class="pill live" id="sPill">● Live</div>
  </div>
</nav>

<div class="scroll">

  <!-- GENERATE -->
  <div class="page on" id="pg-generate">
    <div class="gp">
      <div class="hero">
        <h1>Generate<br><span>AI Videos</span></h1>
        <p>// no account needed · just describe & generate</p>
      </div>

      <!-- Server status -->
      <div class="sbar">
        <div class="sdot on" id="sdot"></div>
        <div class="sbt" id="sbt">Server connected — ready to generate</div>
      </div>

      <div class="sl">Model</div>
      <div class="mscroll">
        <div class="mc on" data-model="wavespeed-ai/kling-v3-0-pro/text-to-video" onclick="selModel(this)">
          <div class="mn">Kling 3.0 Pro</div><div class="ms">Best quality</div><span class="mb bp">PRO</span>
        </div>
        <div class="mc" data-model="wavespeed-ai/kling-v3-0-std/text-to-video" onclick="selModel(this)">
          <div class="mn">Kling 3.0 Std</div><div class="ms">Fast & cheap</div><span class="mb bk">FAST</span>
        </div>
        <div class="mc" data-model="wavespeed-ai/wan-2-1-t2v-480p" onclick="selModel(this)">
          <div class="mn">WAN 2.1</div><div class="ms">Open source</div><span class="mb bf">FREE</span>
        </div>
        <div class="mc" data-model="wavespeed-ai/hailuo-t2v-01-director" onclick="selModel(this)">
          <div class="mn">HaiLuo</div><div class="ms">Camera control</div><span class="mb bn2">NEW</span>
        </div>
        <div class="mc" data-model="wavespeed-ai/seedance-1-5-lite-t2v-480p" onclick="selModel(this)">
          <div class="mn">Seedance 1.5</div><div class="ms">Hollywood motion</div><span class="mb bp">PRO</span>
        </div>
      </div>

      <div class="sl">Prompt</div>
      <div class="pw">
        <textarea id="pInput" placeholder="Describe your video…&#10;e.g. Cinematic drone shot over NYC at night, neon reflections, slow motion" rows="4"></textarea>
        <div class="ptags">
          <div class="ptag" onclick="qp('🌅 Sunrise')">🌅 Sunrise</div>
          <div class="ptag" onclick="qp('🏙️ City night')">🏙️ City night</div>
          <div class="ptag" onclick="qp('🌊 Ocean')">🌊 Ocean</div>
          <div class="ptag" onclick="qp('🔥 Product')">🔥 Product</div>
          <div class="ptag" onclick="qp('✨ Abstract')">✨ Abstract</div>
          <div class="ptag" onclick="qp('🌴 Tropical')">🌴 Tropical</div>
        </div>
      </div>

      <div class="sr">
        <div class="sg"><label>Duration</label>
          <select id="dur"><option value="4">4s</option><option value="5" selected>5s</option><option value="8">8s</option><option value="10">10s</option></select>
        </div>
        <div class="sg"><label>Ratio</label>
          <select id="rat"><option value="16:9" selected>16:9</option><option value="9:16">9:16</option><option value="1:1">1:1</option></select>
        </div>
        <div class="sg"><label>Quality</label>
          <select id="qual"><option value="720p" selected>720p</option><option value="1080p">1080p</option></select>
        </div>
      </div>

      <button class="gbtn" id="gBtn" onclick="generate()">
        <div class="bi2"><div class="spin"></div><span class="btxt" id="btxt">▶&nbsp; Generate Video</span></div>
      </button>

      <div class="prog" id="prog">
        <div class="pt"><span class="pl" id="plbl">Initializing…</span><span class="pp" id="ppct">0%</span></div>
        <div class="ptrack"><div class="pfill" id="pfill"></div></div>
      </div>

      <div class="ow" id="ow">
        <div class="oh">
          <div class="sl" style="margin:0">Result</div>
          <div class="oacts">
            <button class="abtn" onclick="shareVideo()">Share</button>
            <button class="abtn pri" onclick="dlVideo()">↓ Save</button>
          </div>
        </div>
        <div class="vf" id="vf">
          <div class="ve"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg><p>video appears here</p></div>
        </div>
        <div class="chips" id="chips"></div>
      </div>

      <div class="hs" id="hs" style="display:none">
        <div class="sl">Recent</div>
        <div class="hscroll" id="hscr"></div>
      </div>
    </div>
  </div>

  <!-- MODELS -->
  <div class="page" id="pg-models">
    <div class="mp">
      <div class="sl" style="margin-bottom:4px">All Models</div>
      <p style="font-size:.7rem;font-family:'JetBrains Mono',monospace;color:var(--muted);margin-bottom:16px">Tap to select for generation</p>
      <div class="mlist" id="mlist"></div>
    </div>
  </div>

  <!-- SETTINGS -->
  <div class="page" id="pg-settings">
    <div class="sp2">

      <div class="ibanner" id="ibanner" style="display:none">
        <h4>📲 Add to Home Screen</h4>
        <p>Install VisionGen like a native app. Tap Share in Safari → "Add to Home Screen"</p>
        <button class="ibtn" onclick="doInstall()">Install App</button>
      </div>

      <div class="dguide">
        <h3>🚀 Deploy Your Own Server</h3>
        <p>Host this app so anyone can use it — your WaveSpeed key stays secret on the server. Free hosting on Render.com.</p>
        <ul class="dsteps">
          <li><span class="dnum">1</span><span>Get your free API key at <strong>wavespeed.ai</strong> → Dashboard → API Keys</span></li>
          <li><span class="dnum">2</span><span>Download the server files (tap <strong>Get Server Files</strong> below)</span></li>
          <li><span class="dnum">3</span><span>Go to <strong>render.com</strong> → New → Web Service → upload the folder</span></li>
          <li><span class="dnum">4</span><span>Add environment variable: <code>WAVESPEED_API_KEY</code> = your key</span></li>
          <li><span class="dnum">5</span><span>Deploy — Render gives you a free URL. Share it with anyone!</span></li>
        </ul>
      </div>

      <div class="sg2">
        <div class="sl">App</div>
        <div class="srow" onclick="clrHistory()">
          <div class="si2"><div class="stit">Clear History</div><div class="ssub" id="hCnt">0 videos saved locally</div></div>
          <div class="sval">›</div>
        </div>
        <div class="srow" onclick="window.open('https://wavespeed.ai','_blank')">
          <div class="si2"><div class="stit">Get WaveSpeed Key</div><div class="ssub">Free credits on signup</div></div>
          <div class="sval">↗</div>
        </div>
        <div class="srow" onclick="window.open('https://render.com','_blank')">
          <div class="si2"><div class="stit">Deploy on Render</div><div class="ssub">Free hosting for your server</div></div>
          <div class="sval">↗</div>
        </div>
      </div>

      <div class="vinfo">
        <p>VisionGen <strong>v1.0</strong> · Built by <strong>Clarix</strong></p>
        <p style="margin-top:5px">10 free videos per hour per user</p>
      </div>
    </div>
  </div>

</div>

<div class="bnav">
  <div class="bt on" id="bt-generate" onclick="switchTab('generate')"><div class="bi">▶</div><div class="bl">Generate</div></div>
  <div class="bt" id="bt-models" onclick="switchTab('models')"><div class="bi">⚡</div><div class="bl">Models</div></div>
  <div class="bt" id="bt-settings" onclick="switchTab('settings')"><div class="bi">⚙</div><div class="bl">Deploy</div></div>
</div>

<div class="toast" id="toastEl"></div>

<script>
let selM='wavespeed-ai/kling-v3-0-pro/text-to-video';
let curUrl=null;
let hist=JSON.parse(localStorage.getItem('vg_h')||'[]');
let dp=null;
let busy=false;

// Point to your server — when deployed, this becomes your Render URL
// For local testing it uses relative paths (same server)
const API = window.location.hostname==='localhost' || window.location.hostname===''
  ? 'http://localhost:3000'
  : ''; // empty = same origin (your Render deployment)

const QP={
  '🌅 Sunrise':'A breathtaking sunrise over misty mountains, golden rays piercing clouds, cinematic slow pan, 4K HDR, dramatic atmosphere',
  '🏙️ City night':'Cinematic drone shot over New York City at night, neon lights reflecting on wet streets, slow motion, cyberpunk aesthetic',
  '🌊 Ocean':'Massive ocean waves crashing against volcanic cliffs, slow motion spray catching sunlight, immersive low angle shot, 4K',
  '🔥 Product':'Luxury product floating on dark reflective surface, dramatic spotlight, smoke wisps, cinematic 360 rotation, premium commercial',
  '✨ Abstract':'Mesmerizing abstract fluid simulation, iridescent aurora colors, silky smooth motion, ultra HD, black background',
  '🌴 Tropical':'Aerial view of turquoise Caribbean water, white sand beach, palm trees swaying, golden hour, paradise vibes, 4K cinematic'
};

const MDATA=[
  {id:'wavespeed-ai/kling-v3-0-pro/text-to-video',name:'Kling 3.0 Pro',badge:'PRO',bc:'bp',desc:'ByteDance flagship. Best overall quality, native audio, multi-shot AI director. Best for cinematic & commercial work.'},
  {id:'wavespeed-ai/kling-v3-0-std/text-to-video',name:'Kling 3.0 Standard',badge:'FAST',bc:'bk',desc:'Cost-efficient Kling 3.0. Smooth motion, strong prompt adherence. Best for high-volume workflows.'},
  {id:'wavespeed-ai/wan-2-1-t2v-480p',name:'WAN 2.1',badge:'FREE',bc:'bf',desc:'Open source powerhouse. Great physics simulation, fluid motion. Most affordable model.'},
  {id:'wavespeed-ai/hailuo-t2v-01-director',name:'HaiLuo Director',badge:'NEW',bc:'bn2',desc:'MiniMax model with built-in camera direction controls. Fastest generation. Great for social content.'},
  {id:'wavespeed-ai/seedance-1-5-lite-t2v-480p',name:'Seedance 1.5 Lite',badge:'PRO',bc:'bp',desc:'Hollywood-grade motion quality. Best for dramatic scenes and character animation.'},
];

window.addEventListener('load',()=>{
  checkServer();renderHist();buildMList();updSettings();
  document.getElementById('ibanner').style.display='block';
});

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});

async function checkServer(){
  try{
    const r=await fetch(API+'/api/health');
    const d=await r.json();
    if(d.status==='ok'){
      document.getElementById('sdot').className='sdot on';
      document.getElementById('sbt').innerHTML='Server connected — <strong>ready to generate</strong>';
    }
  }catch{
    document.getElementById('sdot').className='sdot err';
    document.getElementById('sbt').textContent='Server offline — deploy your server first';
  }
}

function switchTab(t){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.bt').forEach(b=>b.classList.remove('on'));
  document.getElementById('pg-'+t).classList.add('on');
  document.getElementById('bt-'+t).classList.add('on');
  if(t==='settings')updSettings();
}

function selModel(el){
  document.querySelectorAll('.mc').forEach(c=>c.classList.remove('on'));
  el.classList.add('on');selM=el.dataset.model;
  document.querySelectorAll('.mi').forEach(i=>i.classList.toggle('on',i.dataset.model===selM));
}

function buildMList(){
  document.getElementById('mlist').innerHTML=MDATA.map(m=>`
    <div class="mi${m.id===selM?' on':''}" data-model="${m.id}" onclick="selModelFull(this)">
      <div class="mir"><div class="min">${m.name}</div><span class="mb ${m.bc}">${m.badge}</span></div>
      <div class="mid">${m.desc}</div>
    </div>`).join('');
}

function selModelFull(el){
  document.querySelectorAll('.mi').forEach(i=>i.classList.remove('on'));
  el.classList.add('on');selM=el.dataset.model;
  document.querySelectorAll('.mc').forEach(c=>c.classList.toggle('on',c.dataset.model===selM));
  toast('Model selected','ok');switchTab('generate');
}

function qp(k){document.getElementById('pInput').value=QP[k]||k;document.getElementById('pInput').focus()}

async function generate(){
  if(busy)return;
  const p=document.getElementById('pInput').value.trim();
  if(!p){toast('Write a prompt first!','err');return}
  busy=true;
  const btn=document.getElementById('gBtn');
  btn.disabled=true;btn.classList.add('loading');
  document.getElementById('btxt').textContent='Generating…';
  document.getElementById('prog').classList.add('on');
  document.getElementById('ow').classList.remove('on');
  setP(5,'Starting…');
  try{
    // Step 1: Submit job to our server
    setP(15,'Sending to server…');
    const res=await fetch(API+'/api/generate',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        prompt:p,
        model:selM,
        duration:parseInt(document.getElementById('dur').value),
        ratio:document.getElementById('rat').value
      })
    });
    const data=await res.json();
    if(!res.ok)throw new Error(data.error||'Server error');
    const{requestId}=data;
    setP(30,'Job queued on GPU…');

    // Step 2: Poll our server
    let url=null;
    for(let i=0;i<60&&!url;i++){
      await sl(3000);
      const pct=Math.min(30+(i/60)*60,92);
      const lbls=['Processing frames…','Rendering motion…','Applying physics…','Composing scene…','Almost there…'];
      setP(Math.round(pct),lbls[i%lbls.length]);
      const poll=await fetch(API+`/api/status/${requestId}`);
      const pd=await poll.json();
      if(pd.status==='completed'&&pd.url)url=pd.url;
      else if(pd.status==='failed')throw new Error('Generation failed on server');
    }
    if(!url)throw new Error('Timed out — try again');
    setP(100,'Done!');await sl(200);
    showRes(url,p);
  }catch(e){
    toast('Error: '+(e.message||'Failed'),'err');
  }finally{
    busy=false;btn.disabled=false;btn.classList.remove('loading');
    document.getElementById('btxt').textContent='▶\u00a0 Generate Video';
    document.getElementById('prog').classList.remove('on');
  }
}

function showRes(url,p){
  curUrl=url;
  document.getElementById('vf').innerHTML=`<video src="${url}" controls autoplay loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>`;
  document.getElementById('ow').classList.add('on');
  const m=MDATA.find(x=>x.id===selM);
  const dur=document.getElementById('dur').value;
  const rat=document.getElementById('rat').value;
  document.getElementById('chips').innerHTML=`
    <div class="chip"><strong>${m?m.name:selM}</strong></div>
    <div class="chip">${dur}s · ${rat}</div>
    <div class="chip ok">✓ Real AI video</div>`;
  addHist(p,selM,url);
  toast('Video generated! 🎬','ok');
  document.getElementById('ow').scrollIntoView({behavior:'smooth',block:'nearest'});
}

function addHist(p,m,u){
  hist.unshift({p,m,u,t:Date.now()});
  if(hist.length>20)hist=hist.slice(0,20);
  localStorage.setItem('vg_h',JSON.stringify(hist));renderHist();
}
function renderHist(){
  if(!hist.length)return;
  document.getElementById('hs').style.display='block';
  const mn=id=>{const m=MDATA.find(x=>x.id===id);return m?m.name:id};
  document.getElementById('hscr').innerHTML=hist.map((h,i)=>`
    <div class="hc" onclick="loadHist(${i})">
      <div class="ht">🎬</div>
      <div class="hi"><div class="hp">${h.p}</div><div class="hm">${mn(h.m)}</div></div>
    </div>`).join('');
}
function loadHist(i){
  const h=hist[i];
  document.getElementById('pInput').value=h.p;
  showRes(h.u,h.p);
  window.scrollTo({top:0,behavior:'smooth'});
}
function clrHistory(){
  if(!confirm('Clear all history?'))return;
  hist=[];localStorage.removeItem('vg_h');
  document.getElementById('hs').style.display='none';
  document.getElementById('hscr').innerHTML='';
  updSettings();toast('History cleared');
}
function updSettings(){
  document.getElementById('hCnt').textContent=hist.length+' video'+(hist.length!==1?'s':'')+' saved locally';
}
function dlVideo(){
  if(!curUrl){toast('No video yet','err');return}
  const a=document.createElement('a');a.href=curUrl;a.download='visiongen-'+Date.now()+'.mp4';a.click();
  toast('Downloading…','ok');
}
function shareVideo(){
  if(!curUrl){toast('No video yet','err');return}
  if(navigator.share)navigator.share({title:'VisionGen AI Video',url:curUrl}).catch(()=>{});
  else{navigator.clipboard.writeText(curUrl);toast('Link copied!','ok')}
}
async function doInstall(){
  if(dp){dp.prompt();const{outcome}=await dp.userChoice;if(outcome==='accepted')toast('Installed! 🎉','ok');dp=null;}
  else toast('Safari: Share → Add to Home Screen','ok');
}
function setP(v,l){
  document.getElementById('pfill').style.width=v+'%';
  document.getElementById('ppct').textContent=v+'%';
  document.getElementById('plbl').textContent=l;
}
let tt;
function toast(msg,type=''){
  const e=document.getElementById('toastEl');
  e.textContent=msg;e.className='toast on'+(type?' '+type:'');
  clearTimeout(tt);tt=setTimeout(()=>{e.className='toast'},2800);
}
function sl(ms){return new Promise(r=>setTimeout(r,ms))}
</script>
</body>
</html>
