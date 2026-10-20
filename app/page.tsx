'use client';
import { useState } from 'react';
import {
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Compass,
  ExternalLink,
  GraduationCap,
  Heart,
  Home,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  X,
  Award,
  BookOpen,
  Plane,
  Grid,
} from 'lucide-react';
import AchievementsTimeline from './components/AchievementsTimeline';
import ExperienceTab from './components/ExperienceTab';
import HomePageFeed from './components/HomePageFeed';

type Tab = 'overview' | 'experience' | 'posts';
type NavItemName = 'Home' | 'Explore' | 'Opportunities' | 'Notifications' | 'Profile';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItemName>('Home');
  const [tab, setTab] = useState<Tab>('overview');
  const [following, setFollowing] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState('');

  function notify(text: string) {
    setToast(text);
    window.setTimeout(() => setToast(''), 3000);
  }

  function sendMessage() {
    if (!message.trim()) {
      notify('Please write a message first.');
      return;
    }
    setMessageOpen(false);
    setMessage('');
    notify('Message sent to Alex in this demo simulation.');
  }

  const navItems: { name: NavItemName; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { name: 'Home', icon: Home },
    { name: 'Explore', icon: Compass },
    { name: 'Opportunities', icon: BriefcaseBusiness },
    { name: 'Notifications', icon: Bell },
    { name: 'Profile', icon: UserRound },
  ];

  return (
    <div className="app-shell">
      {/* SIDEBAR NAVIGATION: Icons always visible when closed */}
      <aside className="sidebar" aria-label="Main sidebar">
        <div className="brand-lockup">
          <button
            className="brand-logo-btn"
            onClick={() => setActiveNav('Home')}
            title="Cadet Connect Home"
          >
            <img src="/logo.png" alt="Cadet Connect Logo" className="brand-logo" />
          </button>
        </div>

        <nav className="side-nav" aria-label="Primary navigation">
          {navItems.map((n) => {
            const Icon = n.icon;
            const isActive = activeNav === n.name;
            return (
              <button
                key={n.name}
                title={n.name}
                onClick={() => {
                  if (n.name === 'Home' || n.name === 'Profile') {
                    setActiveNav(n.name);
                  } else {
                    notify(`${n.name} feed is simulated in this sample.`);
                  }
                }}
                className={`nav-item ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Fixed-size wrapper guaranteeing icon is always visible when closed */}
                <div className="nav-icon-wrapper">
                  <Icon size={22} className="nav-svg-icon" />
                </div>
                <span className="nav-label">{n.name}</span>
                {n.name === 'Notifications' && <span className="nav-count">2</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Mini User Switcher at bottom */}
        <div className="sidebar-bottom-user">
          <button
            className="sidebar-user-pill"
            onClick={() => setActiveNav('Profile')}
            title="View Alex Rivera's Profile"
          >
            <img src="/profile.png" alt="Alex Rivera" className="sidebar-user-avatar" />
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">Alex Rivera</span>
              <span className="sidebar-user-role">Cadet Captain</span>
            </div>
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <header className="mobile-top">
        <button className="mobile-brand-btn" onClick={() => setActiveNav('Home')}>
          <img src="/logo.png" alt="Cadet Connect" className="brand-logo small" />
          <span className="mobile-brand-text">Cadet Connect</span>
        </button>
        <div className="mobile-top-actions">
          <button
            className="mobile-notice"
            aria-label="Toggle profile view"
            onClick={() => setActiveNav(activeNav === 'Profile' ? 'Home' : 'Profile')}
          >
            {activeNav === 'Profile' ? <Home size={20} /> : <UserRound size={20} />}
          </button>
          <button
            className="mobile-notice"
            aria-label="Notifications"
            onClick={() => notify('You’re all caught up in this sample.')}
          >
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="main-area">
        {/* VIEW 1: HOME PAGE (Instagram Matching Feed with 10 Skeleton Loaders) */}
        {activeNav === 'Home' && (
          <HomePageFeed
            onNavigateToProfile={() => setActiveNav('Profile')}
            notify={notify}
          />
        )}

        {/* VIEW 2: PROFILE PAGE */}
        {activeNav === 'Profile' && (
          <div className="content">
            <section className="profile-card">
              {/* PROFILE HEADER SECTION */}
              <div className="profile-top">
                <div className="profile-grid">
                  {/* REQUIREMENT 3: profile.png AS PROFILE IMAGE */}
                  <div className="avatar" aria-label="Alex Rivera profile picture">
                    <img src="/profile.png" alt="Alex Rivera" className="avatar-img" />
                  </div>

                  {/* PROFILE IDENTITY & DETAILS */}
                  <div className="profile-identity">
                    {/* NAME ROW (Social link moved away from here per Requirement 5) */}
                    <div className="name-row">
                      <h1 className="profile-name">Alex Rivera</h1>
                      <BadgeCheck size={20} className="verified-icon" aria-label="Verified cadet profile" />
                    </div>

                    <div className="rank-line">Cadet Captain</div>
                    <div className="position-line">Alpha Flight Commander & Staff NCO</div>
                    <div className="charter">
                      Skyhawk Composite Squadron <span>·</span> NCR-MN-040 <span>·</span> Minnesota Wing
                    </div>

                    {/* REQUIREMENT 5: MOVED EXTERNAL SOCIAL LINK TO BIO AREA */}
                    <div className="profile-social-row">
                      <a
                        className="ig-social-pill"
                        href="https://instagram.com/alex.flies"
                        target="_blank"
                        rel="noreferrer"
                        title="Open Alex's Instagram profile"
                      >
                        <Instagram size={15} className="ig-icon" />
                        <span className="ig-handle">@alex.flies</span>
                        <ExternalLink size={12} className="link-ext-arrow" />
                      </a>
                    </div>

                    {/* STATS ROW */}
                    <div className="profile-stats">
                      <span><strong>12</strong> experiences</span>
                      <span><strong>{following ? '129' : '128'}</strong> followers</span>
                      <span><strong>86</strong> following</span>
                    </div>
                  </div>
                </div>

                {/* REQUIREMENT 2: FOLLOW & MESSAGE BUTTONS TAKE UP FULL WIDTH EVEN UNDER PROFILE IMG */}
                <div className="profile-actions-full">
                  <button
                    className={`btn ${following ? 'btn-following' : 'btn-primary'}`}
                    onClick={() => {
                      setFollowing(!following);
                      notify(following ? 'Unfollowed Alex in this sample.' : 'You are now following Alex Rivera!');
                    }}
                  >
                    {following ? <Check size={18} /> : <Users size={18} />}
                    <span>{following ? 'Following' : 'Follow'}</span>
                  </button>
                  <button className="btn message-btn" onClick={() => setMessageOpen(true)}>
                    <MessageCircle size={18} />
                    <span>Message</span>
                  </button>
                </div>
              </div>

              {/* PROFILE TABS */}
              <div className="profile-tabs" role="tablist" aria-label="Profile sections">
                <button
                  role="tab"
                  aria-selected={tab === 'overview'}
                  onClick={() => setTab('overview')}
                  className={`tab ${tab === 'overview' ? 'active' : ''}`}
                >
                  <UserRound size={17} /> Overview
                </button>
                <button
                  role="tab"
                  aria-selected={tab === 'experience'}
                  onClick={() => setTab('experience')}
                  className={`tab ${tab === 'experience' ? 'active' : ''}`}
                >
                  <BriefcaseBusiness size={17} /> Experience
                </button>
                <button
                  role="tab"
                  aria-selected={tab === 'posts'}
                  onClick={() => setTab('posts')}
                  className={`tab ${tab === 'posts' ? 'active' : ''}`}
                >
                  <Grid size={17} /> Posts
                </button>
              </div>

              {/* TAB PANELS */}
              <div className="panel">
                {/* TAB 1: OVERVIEW */}
                {tab === 'overview' && (
                  <>
                    <div className="overview-grid">
                      {/* Left overview card */}
                      <div className="info-card">
                        <div className="card-heading">
                          <span className="heading-icon">
                            <UserRound size={17} />
                          </span>
                          <h2>Profile Overview & Leadership Bio</h2>
                        </div>
                        <p className="about-copy">
                          I enjoy the mix of teamwork, personal growth, and real-world aviation and emergency services skills that come with cadet activities. Passionate about aerospace education, cyber defense, and mentoring newer cadets to help them excel through the ranks.
                        </p>
                        <div className="interest-list">
                          <span className="interest">Aerospace STEM</span>
                          <span className="interest">Flight Line Ops</span>
                          <span className="interest">Search & Rescue</span>
                          <span className="interest">CyberPatriot</span>
                          <span className="interest">Staff Leadership</span>
                          <span className="interest">Drill & Ceremonies</span>
                        </div>
                      </div>

                      {/* Right assignment card */}
                      <div className="info-card">
                        <div className="card-heading">
                          <span className="heading-icon">
                            <Users size={17} />
                          </span>
                          <h2>Current Squadron Billets</h2>
                        </div>
                        <div className="detail-row">
                          <span className="detail-icon">
                            <Users size={16} />
                          </span>
                          <div>
                            <strong>Alpha Flight Commander</strong>
                            <small>Primary line flight assignment</small>
                          </div>
                        </div>
                        <div className="detail-row">
                          <span className="detail-icon">
                            <MapPin size={16} />
                          </span>
                          <div>
                            <strong>Skyhawk Composite Squadron</strong>
                            <small>Charter: NCR-MN-040 • Minnesota Wing</small>
                          </div>
                        </div>
                        <div className="detail-row">
                          <span className="detail-icon">
                            <CalendarDays size={16} />
                          </span>
                          <div>
                            <strong>Joined Civil Air Patrol in 2022</strong>
                            <small>3+ years continuous active duty</small>
                          </div>
                        </div>
                        <div className="detail-row">
                          <span className="detail-icon">
                            <GraduationCap size={16} />
                          </span>
                          <div>
                            <strong>Cadet Captain (C/Capt)</strong>
                            <small>Billy Mitchell Milestone Awardee</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* REQUIREMENT 4: ACHIEVEMENTS & BADGES SCROLLING TIMELINE IN ITS OWN BOX */}
                    <AchievementsTimeline />
                  </>
                )}

                {/* TAB 2: EXPERIENCE (REQUIREMENT 6: DUTY POSITION OVER BOXES + COOL EFFECTS) */}
                {tab === 'experience' && <ExperienceTab />}

                {/* TAB 3: POSTS (INSTAGRAM SKELETON GRID) */}
                {tab === 'posts' && (
                  <div className="posts-tab-container">
                    <div className="posts-tab-header">
                      <h3>Alex's Shared Media & Cadet Highlights</h3>
                      <p>Visual log of squadron activities, orientation flights, and awards.</p>
                    </div>
                    <div className="ig-skeleton-grid" aria-busy="true" aria-label="Posts loading">
                      {Array.from({ length: 9 }, (_, i) => (
                        <div className="ig-skeleton-tile" key={i}>
                          <div className="tile-hover-overlay">
                            <span><Heart size={16} fill="white" /> 140</span>
                            <span><MessageCircle size={16} fill="white" /> 18</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="mobile-bottom" aria-label="Mobile navigation">
        {navItems.map((n) => {
          const Icon = n.icon;
          const isActive = activeNav === n.name;
          return (
            <button
              key={n.name}
              className={isActive ? 'active' : ''}
              onClick={() => {
                if (n.name === 'Home' || n.name === 'Profile') {
                  setActiveNav(n.name);
                } else {
                  notify(`${n.name} feed is simulated in this sample.`);
                }
              }}
            >
              <Icon size={22} />
              <span>{n.name}</span>
            </button>
          );
        })}
      </nav>

      {/* MESSAGE MODAL */}
      {messageOpen && (
        <div className="modal-backdrop" onClick={() => setMessageOpen(false)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2 id="message-title">Message Alex Rivera</h2>
                <p className="modal-sub">Send a direct cadet communication to C/Capt Rivera.</p>
              </div>
              <button
                className="close-modal"
                aria-label="Close dialog"
                onClick={() => setMessageOpen(false)}
              >
                <X size={19} />
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              maxLength={500}
              autoFocus
            />
            <div className="form-actions">
              <button className="btn" onClick={() => setMessageOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={sendMessage}>
                <MessageCircle size={16} /> Send Message
              </button>
            </div>
          </section>
        </div>
      )}

      {/* TOAST ALERT NOTIFICATION */}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
