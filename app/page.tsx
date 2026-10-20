'use client';
import { useState } from 'react';
import { BadgeCheck, Bell, BriefcaseBusiness, CalendarDays, Check, Compass, GraduationCap, Heart, Home, Instagram, MapPin, MessageCircle, ShieldCheck, Sparkles, UserRound, Users, X, Award, BookOpen, Plane } from 'lucide-react';

type Tab = 'overview' | 'experience' | 'posts';
type Position = { title: string; org?: string; desc?: string };
type Period = { date: string; current?: boolean; flights: Position[]; duties: Position[] };

const timeline: Period[] = [
  {
    date: 'Jan – Present',
    current: true,
    flights: [
      { title: 'Alpha Flight', org: 'Skyhawk Composite Squadron', desc: 'Flight-line assignment supporting daily training, accountability, and cadet development.' },
    ],
    duties: [
      { title: 'Lead IT NCO', org: 'Squadron staff', desc: 'Coordinates unit technology, accounts, and communications support.' },
      { title: 'Cyber Education NCO', org: 'Squadron staff', desc: 'Leads cyber education activities and helps cadets prepare for STEM events.' },
    ],
  },
  {
    date: 'Aug 2025 – Dec 2025',
    flights: [
      { title: 'Bravo Flight', org: 'Skyhawk Composite Squadron', desc: 'Supported flight operations and mentored newer cadets on the line.' },
    ],
    duties: [
      { title: 'Flight Sergeant', org: 'Bravo Flight', desc: 'Helped maintain standards, formations, and a positive flight environment.' },
    ],
  },
  {
    date: 'Summer 2025',
    flights: [
      { title: 'Encampment Flight', org: 'Minnesota Wing', desc: 'Completed encampment as part of a structured training flight.' },
    ],
    duties: [
      { title: 'Element Leader', org: 'Minnesota Wing Encampment', desc: 'Guided an element through daily training, accountability, and team activities.' },
    ],
  },
  {
    date: '2024 – 2025',
    flights: [
      { title: 'Charlie Flight', org: 'Skyhawk Composite Squadron', desc: 'Learned flight-line procedures and supported aerospace activities.' },
    ],
    duties: [
      { title: 'Aerospace Education Assistant', org: 'Squadron activities', desc: 'Helped run aerospace learning sessions and hands-on STEM demonstrations.' },
      { title: 'Color Guard Member', org: 'Squadron honor team', desc: 'Represented the squadron at ceremonies and community events.' },
    ],
  },
];

const awards = [
  { title: 'Cadet Captain', detail: 'Skyhawk Composite Squadron', status: 'verified' as const, icon: 'badge' },
  { title: 'Wright Brothers Award', detail: 'Completed first milestone award', status: 'verified' as const, icon: 'award' },
  { title: 'General Billy Mitchell Award', detail: 'Completed second milestone award', status: 'verified' as const, icon: 'award' },
  { title: 'Ground Team Member 3', detail: 'Emergency services qualification', status: 'verified' as const, icon: 'shield' },
  { title: 'Encampment Graduate', detail: 'Minnesota Wing', status: 'verified' as const, icon: 'book' },
  { title: 'CyberPatriot Team Member', detail: 'Season participation', status: 'self' as const, icon: 'spark' },
  { title: 'Model Rocketry Badge', detail: 'Aerospace education activity', status: 'self' as const, icon: 'plane' },
  { title: 'First Aid / CPR', detail: 'Current certification', status: 'self' as const, icon: 'heart' },
];

export default function HomePage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [following, setFollowing] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState('');
  const [activeNav, setActiveNav] = useState('Profile');
  function notify(text: string) { setToast(text); window.setTimeout(() => setToast(''), 2600); }
  function sendMessage() {
    if (!message.trim()) { notify('Write a message first.'); return; }
    setMessageOpen(false);
    setMessage('');
    notify('This is a sample profile, so the message was not delivered.');
  }
  const nav = [{name:'Home',icon:Home},{name:'Explore',icon:Compass},{name:'Opportunities',icon:BriefcaseBusiness},{name:'Notifications',icon:Bell},{name:'Profile',icon:UserRound}];
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand-lockup">
        <img src="/logo.svg" alt="Cadet Connect" className="brand-logo"/>
      </div>
      <nav className="side-nav" aria-label="Primary navigation">{nav.map(n=>{const Icon=n.icon;return <button key={n.name} title={n.name} onClick={()=>{setActiveNav(n.name);if(n.name!=='Profile')notify(`${n.name} is not available in this sample.`);}} className={`nav-item ${activeNav===n.name?'active':''}`}><Icon size={22}/><span className="nav-label">{n.name}</span>{n.name==='Notifications'&&<span className="nav-count">2</span>}</button>})}</nav>
    </aside>
    <header className="mobile-top">
      <img src="/logo.svg" alt="Cadet Connect" className="brand-logo small"/>
      <button className="mobile-notice" aria-label="Notifications" onClick={()=>notify('You’re all caught up in this sample.')}><Bell size={20}/></button>
    </header>
    <main className="main-area"><div className="content">
      <section className="profile-card">
        <div className="profile-top">
          <div className="profile-grid">
            <div className="avatar" aria-label="Alex Rivera profile placeholder">AR</div>
            <div className="profile-identity">
              <div className="name-row">
                <h1 className="profile-name">Alex Rivera</h1>
                <BadgeCheck size={18} className="verified-icon" aria-label="Verified profile"/>
                <a className="ig-link" href="https://instagram.com/" target="_blank" rel="noreferrer">
                  <Instagram size={16}/>
                  <span>@alex.flies</span>
                </a>
              </div>
              <div className="rank-line">Cadet Captain</div>
              <div className="position-line">Alpha Flight Sgt</div>
              <div className="charter">Skyhawk Composite Squadron <span>·</span> NCR-MN-040</div>
              <div className="profile-stats">
                <span><strong>12</strong> experiences</span>
                <span><strong>{following?'129':'128'}</strong> followers</span>
                <span><strong>86</strong> following</span>
              </div>
              <div className="profile-actions">
                <button className={`btn ${following?'btn-following':'btn-primary'}`} onClick={()=>{setFollowing(!following);notify(following?'Unfollowed Alex in this sample.':'Following is a sample action and was not saved.');}}>{following?<Check size={18}/>:<Users size={18}/>} {following?'Following':'Follow'}</button>
                <button className="btn message-btn" onClick={()=>setMessageOpen(true)}><MessageCircle size={18}/> Message</button>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-tabs" role="tablist" aria-label="Profile sections">
          <button role="tab" aria-selected={tab==='overview'} onClick={()=>setTab('overview')} className={`tab ${tab==='overview'?'active':''}`}><UserRound size={17}/> Overview</button>
          <button role="tab" aria-selected={tab==='experience'} onClick={()=>setTab('experience')} className={`tab ${tab==='experience'?'active':''}`}><BriefcaseBusiness size={17}/> Experience</button>
          <button role="tab" aria-selected={tab==='posts'} onClick={()=>setTab('posts')} className={`tab ${tab==='posts'?'active':''}`}><span className="grid-icon">▦</span> Posts</button>
        </div>
        <div className="panel">{tab==='overview'&&<>
          <div className="overview-grid">
            <div className="info-card">
              <div className="card-heading"><span className="heading-icon"><UserRound size={17}/></span><h2>Profile overview</h2></div>
              <p className="about-copy">I enjoy the mix of teamwork, personal growth, and real-world skills that come with cadet activities. I’m especially interested in aviation, leadership, and helping newer cadets find their place.</p>
              <div className="interest-list"><span className="interest">Aerospace</span><span className="interest">Leadership</span><span className="interest">Emergency services</span><span className="interest">STEM</span><span className="interest">Mentoring</span></div>
            </div>
            <div className="info-card">
              <div className="card-heading"><span className="heading-icon"><Users size={17}/></span><h2>Current assignment</h2></div>
              <div className="detail-row"><span className="detail-icon"><Users size={16}/></span><div><strong>Alpha Flight</strong><small>Flight assignment</small></div></div>
              <div className="detail-row"><span className="detail-icon"><MapPin size={16}/></span><div><strong>Skyhawk Composite Squadron</strong><small>NCR-MN-040</small></div></div>
              <div className="detail-row"><span className="detail-icon"><CalendarDays size={16}/></span><div><strong>Joined in 2022</strong><small>Member since</small></div></div>
              <div className="detail-row"><span className="detail-icon"><GraduationCap size={16}/></span><div><strong>Cadet Captain</strong><small>Current rank</small></div></div>
            </div>
          </div>
          <section className="awards-section">
            <div className="awards-heading">
              <div>
                <h2>Awards, qualifications, and training</h2>
                <p>Verified items were reviewed by an authorized verifier. Self-reported items were added by the cadet.</p>
              </div>
              <Award size={22}/>
            </div>
            <div className="award-list">{awards.map(item => {
              const Icon = item.icon==='badge'?BadgeCheck:item.icon==='award'?Award:item.icon==='shield'?ShieldCheck:item.icon==='book'?BookOpen:item.icon==='plane'?Plane:item.icon==='heart'?Heart:Sparkles;
              return <article className="award-item" key={item.title}>
                <span className={`award-icon ${item.status}`}><Icon size={19}/></span>
                <div className="award-body">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  {item.status==='verified'
                    ? <div className="award-status verified"><Check size={13}/> Verified</div>
                    : <div className="award-status self">Self-Reported</div>}
                </div>
              </article>;
            })}</div>
          </section>
        </>}
        {tab==='experience'&&<>
          <div className="panel-title-row">
            <div>
              <h2 className="section-heading">Experience</h2>
              <p className="section-sub">Flight-line positions on the left. Duty positions on the right. Roles in the same timeframe stack together.</p>
            </div>
          </div>
          <div className="timeline-legend"><span>Flight line</span><span>Duty position</span></div>
          <div className="timeline">{timeline.map(period => (
            <article className="timeline-row" key={period.date}>
              <div className="timeline-stack timeline-left">{period.flights.map(p => (
                <div className="timeline-card" key={p.title}>
                  <div className="timeline-title">{p.title}</div>
                  {p.org && <div className="timeline-meta">{p.org}</div>}
                  {p.desc && <p className="timeline-desc">{p.desc}</p>}
                </div>
              ))}</div>
              <div className="timeline-axis">
                <span className={`timeline-dot ${period.current?'current':''}`}/>
                <span className="timeline-date">{period.date}</span>
              </div>
              <div className="timeline-stack timeline-right">{period.duties.map(p => (
                <div className="timeline-card" key={p.title}>
                  <div className="timeline-title">{p.title}</div>
                  {p.org && <div className="timeline-meta">{p.org}</div>}
                  {p.desc && <p className="timeline-desc">{p.desc}</p>}
                </div>
              ))}</div>
            </article>
          ))}</div>
        </>}
        {tab==='posts'&&<div className="ig-skeleton-grid" aria-busy="true" aria-label="Posts loading">
          {Array.from({length: 9}, (_, i) => <div className="ig-skeleton-tile" key={i}/>)}
        </div>}
        </div>
      </section>
    </div></main>
    <nav className="mobile-bottom" aria-label="Mobile navigation">{nav.map(n=>{const Icon=n.icon;return <button key={n.name} className={activeNav===n.name?'active':''} onClick={()=>{setActiveNav(n.name);if(n.name!=='Profile')notify(`${n.name} is not available in this sample.`);}}><Icon size={22}/><span>{n.name}</span></button>})}</nav>
    {messageOpen&&<div className="modal-backdrop" onClick={()=>setMessageOpen(false)}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="message-title" onClick={e=>e.stopPropagation()}>
        <div className="modal-heading">
          <div><h2 id="message-title">Message Alex</h2></div>
          <button className="close-modal" aria-label="Close dialog" onClick={()=>setMessageOpen(false)}><X size={19}/></button>
        </div>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message…" maxLength={500}/>
        <div className="form-actions">
          <button className="btn" onClick={()=>setMessageOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={sendMessage}><MessageCircle size={16}/> Send</button>
        </div>
      </section>
    </div>}
    {toast&&<div className="toast" role="status">{toast}</div>}
  </div>;
}
