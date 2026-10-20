'use client';
import { useState } from 'react';
import {
  Bookmark,
  Check,
  Heart,
  Image as ImageIcon,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
  Smile,
  Sparkles,
  UserPlus,
} from 'lucide-react';

export interface PostData {
  id: number;
  author: string;
  avatar: string;
  location: string;
  timeAgo: string;
  initialLikes: number;
  caption: string;
  tags: string[];
  commentsCount: number;
  mediaAspect: 'square' | 'portrait';
}

const initialPosts: PostData[] = [
  {
    id: 1,
    author: 'skyhawk_composite_sq',
    avatar: '/logo.png',
    location: 'Minneapolis-St. Paul Airport • Hangar 4',
    timeAgo: '2 HOURS AGO',
    initialLikes: 142,
    caption: 'Great weekend of orientation flights and flight-line operations with Alpha Flight! Outstanding drill execution and radio discipline all around.',
    tags: ['#CivilAirPatrol', '#Aviation', '#CadetWings', '#AlphaFlight'],
    commentsCount: 18,
    mediaAspect: 'square',
  },
  {
    id: 2,
    author: 'alex.flies',
    avatar: '/profile.png',
    location: 'Minnesota Wing Headquarters',
    timeAgo: '4 HOURS AGO',
    initialLikes: 219,
    caption: 'Official promotion to Cadet Captain! Honored to continue serving our squadron and mentoring the next generation of aerospace leaders.',
    tags: ['#CadetLeader', '#MitchellAward', '#CAPLeadership', '#Promotion'],
    commentsCount: 34,
    mediaAspect: 'portrait',
  },
  {
    id: 3,
    author: 'mn_wing_encampment',
    avatar: '/logo.png',
    location: 'Camp Ripley Training Center • Little Falls, MN',
    timeAgo: '7 HOURS AGO',
    initialLikes: 384,
    caption: 'Encampment 2026 preparation underway! Element leaders and cadre staff completed their flight logistics coordination drills today.',
    tags: ['#Encampment2026', '#CadetTraining', '#DrillAndCeremonies'],
    commentsCount: 42,
    mediaAspect: 'square',
  },
  {
    id: 4,
    author: 'skyhawk_cyber_team',
    avatar: '/logo.png',
    location: 'Squadron STEM Computer Lab',
    timeAgo: '11 HOURS AGO',
    initialLikes: 98,
    caption: 'CyberPatriot Round 3 finished! Both Skyhawk teams hardened their Windows and Debian images with zero downtime. On to the semifinals!',
    tags: ['#CyberPatriot', '#STEM', '#CyberDefense', '#CadetLife'],
    commentsCount: 14,
    mediaAspect: 'square',
  },
  {
    id: 5,
    author: 'northstar_aviation_cap',
    avatar: '/logo.png',
    location: 'Crystal Airport (KMIC)',
    timeAgo: '1 DAY AGO',
    initialLikes: 176,
    caption: 'Pre-flight inspections on the Cessna 182 Skylane with our orientation pilots. Blue skies and calm winds for our newest cadet element.',
    tags: ['#Cessna182', '#OrientationFlights', '#AeroSTEM', '#FlyCAP'],
    commentsCount: 21,
    mediaAspect: 'portrait',
  },
  {
    id: 6,
    author: 'stcroix_cadet_squadron',
    avatar: '/logo.png',
    location: 'Lake Elmo Aviation Park',
    timeAgo: '1 DAY AGO',
    initialLikes: 125,
    caption: 'Emergency Services ground team training exercise: Grid search patterns, ELT direction finding, and wilderness survival shelter setups.',
    tags: ['#GroundTeam', '#SAR', '#EmergencyServices', '#GTM3'],
    commentsCount: 16,
    mediaAspect: 'square',
  },
  {
    id: 7,
    author: 'duluth_composite_sq',
    avatar: '/logo.png',
    location: 'Duluth International Airport',
    timeAgo: '2 DAYS AGO',
    initialLikes: 163,
    caption: 'Aerospace rocketry launch day! Over 25 Estes rockets successfully launched and safely recovered along the shores of Lake Superior.',
    tags: ['#Rocketry', '#ModelRocketry', '#STEMInAction', '#LakeSuperior'],
    commentsCount: 19,
    mediaAspect: 'square',
  },
  {
    id: 8,
    author: 'mn_wing_color_guard',
    avatar: '/logo.png',
    location: 'State Capitol Rotunda • St. Paul, MN',
    timeAgo: '3 DAYS AGO',
    initialLikes: 298,
    caption: 'Minnesota Wing Color Guard presenting the colors for the opening ceremony of the State Veteran Appreciation Assembly.',
    tags: ['#ColorGuard', '#HonorGuard', '#CustomsAndCourtesies', '#Service'],
    commentsCount: 27,
    mediaAspect: 'portrait',
  },
  {
    id: 9,
    author: 'great_lakes_region_cap',
    avatar: '/logo.png',
    location: 'Great Lakes Region HQ',
    timeAgo: '4 DAYS AGO',
    initialLikes: 412,
    caption: 'Registration is officially open for the Regional Cadet Leadership School (RCLS). Sharpen staff officer communication and ethics.',
    tags: ['#RCLS', '#OfficerTraining', '#LeadershipExcellence'],
    commentsCount: 38,
    mediaAspect: 'square',
  },
  {
    id: 10,
    author: 'skyhawk_recruiting',
    avatar: '/logo.png',
    location: 'Skyhawk Squadron Headquarters',
    timeAgo: '5 DAYS AGO',
    initialLikes: 154,
    caption: 'Squadron Open House tonight at 1830! Welcoming prospective cadet families to learn about aerospace education and leadership opportunities.',
    tags: ['#CadetOpenHouse', '#JoinCAP', '#YouthLeadership', '#AviationFun'],
    commentsCount: 23,
    mediaAspect: 'square',
  },
];

const stories = [
  { name: 'Your story', handle: 'alex.flies', avatar: '/profile.png', isUser: true, hasActive: false },
  { name: 'Skyhawk', handle: 'skyhawk_sq', avatar: '/logo.png', hasActive: true },
  { name: 'MN Wing', handle: 'mn_wing_cap', avatar: '/logo.png', hasActive: true },
  { name: 'Cyber Team', handle: 'skyhawk_cyber', avatar: '/logo.png', hasActive: true },
  { name: 'Alpha Flight', handle: 'alpha_flight', avatar: '/logo.png', hasActive: true },
  { name: 'Aerospace', handle: 'cap_aerospace', avatar: '/logo.png', hasActive: true },
  { name: 'Encampment', handle: 'encampment_mn', avatar: '/logo.png', hasActive: true },
  { name: 'Honor Guard', handle: 'mn_honorguard', avatar: '/logo.png', hasActive: true },
];

const suggestedUsers = [
  { handle: 'anoka_composite_sq', role: 'Anoka Composite Squadron', sub: 'Suggested for you', followed: false },
  { handle: 'camp_ripley_cadets', role: 'Camp Ripley Cadre', sub: 'Followed by skyhawk_sq', followed: false },
  { handle: 'crow_wing_squadron', role: 'Crow Wing Squadron 013', sub: 'New to Cadet Connect', followed: false },
  { handle: 'cadet_aviation_stem', role: 'National Aerospace HQ', sub: 'Popular in Aviation', followed: false },
];

interface HomePageFeedProps {
  onNavigateToProfile: () => void;
  notify: (text: string) => void;
}

export default function HomePageFeed({ onNavigateToProfile, notify }: HomePageFeedProps) {
  // Post states: liked set, saved set, like counts, comments
  const [likesMap, setLikesMap] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(() =>
    initialPosts.reduce((acc, p) => ({ ...acc, [p.id]: p.initialLikes }), {})
  );
  const [savedMap, setSavedMap] = useState<Record<number, boolean>>({});
  const [popHeartId, setPopHeartId] = useState<number | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [userComments, setUserComments] = useState<Record<number, string[]>>({});
  const [expandedCaptions, setExpandedCaptions] = useState<Record<number, boolean>>({});
  const [suggestedFollows, setSuggestedFollows] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: number) => {
    const isCurrentlyLiked = !!likesMap[postId];
    const newLiked = !isCurrentlyLiked;
    setLikesMap((prev) => ({ ...prev, [postId]: newLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (newLiked ? 1 : -1),
    }));
  };

  const handleDoubleTap = (postId: number) => {
    if (!likesMap[postId]) {
      toggleLike(postId);
    }
    setPopHeartId(postId);
    setTimeout(() => setPopHeartId(null), 850);
  };

  const toggleSave = (postId: number) => {
    const newSaved = !savedMap[postId];
    setSavedMap((prev) => ({ ...prev, [postId]: newSaved }));
    notify(newSaved ? 'Post saved to your collection.' : 'Post removed from saved.');
  };

  const handleShare = (author: string) => {
    notify(`Link to @${author}'s post copied to clipboard!`);
  };

  const handleAddComment = (postId: number) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    setUserComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), text],
    }));
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    notify('Comment added in sample feed.');
  };

  const toggleFollowSuggest = (handle: string) => {
    const nextState = !suggestedFollows[handle];
    setSuggestedFollows((prev) => ({ ...prev, [handle]: nextState }));
    notify(nextState ? `Following @${handle}` : `Unfollowed @${handle}`);
  };

  return (
    <div className="ig-home-layout">
      {/* Main Feed Column */}
      <div className="ig-feed-column">
        {/* Instagram Stories Bar */}
        <section className="ig-stories-container" aria-label="Stories">
          <div className="ig-stories-scroll">
            {stories.map((s, idx) => (
              <button
                key={s.handle}
                className="ig-story-item"
                onClick={() => {
                  if (s.isUser) {
                    onNavigateToProfile();
                  } else {
                    notify(`Opening story from @${s.handle}`);
                  }
                }}
              >
                <div className={`ig-story-ring ${s.hasActive ? 'active-ring' : ''} ${s.isUser ? 'user-story' : ''}`}>
                  <div className="ig-story-avatar-inner">
                    <img src={s.avatar} alt={s.name} className="ig-story-img" />
                    {s.isUser && <span className="ig-story-add-badge">+</span>}
                  </div>
                </div>
                <span className="ig-story-name">{s.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Feed of 10 SKELETON POSTS matching Instagram */}
        <div className="ig-posts-feed">
          {initialPosts.map((post) => {
            const isLiked = !!likesMap[post.id];
            const currentLikes = likeCounts[post.id] ?? post.initialLikes;
            const isSaved = !!savedMap[post.id];
            const isHeartPopping = popHeartId === post.id;
            const comments = userComments[post.id] || [];
            const isCaptionExpanded = !!expandedCaptions[post.id];

            return (
              <article className="ig-post-card" key={post.id}>
                {/* 1. POST HEADER */}
                <header className="ig-post-header">
                  <div className="ig-post-user-info">
                    {/* Skeleton circular avatar with shimmer */}
                    <div className="ig-avatar-skeleton-wrapper">
                      <div className="skeleton ig-avatar-skeleton" />
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="ig-avatar-real-overlay"
                        onError={(e) => {
                          // Hide if image doesn't render
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="ig-user-details">
                      <div className="ig-author-row">
                        <button
                          className="ig-author-name"
                          onClick={() => {
                            if (post.author === 'alex.flies') onNavigateToProfile();
                            else notify(`Visiting @${post.author} profile`);
                          }}
                        >
                          {post.author}
                        </button>
                        <span className="ig-bullet">•</span>
                        <span className="ig-post-time">{post.timeAgo}</span>
                      </div>
                      <span className="ig-post-location">{post.location}</span>
                    </div>
                  </div>
                  <button
                    className="ig-icon-btn ig-more-btn"
                    aria-label="More options"
                    onClick={() => notify(`Post options for @${post.author}`)}
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </header>

                {/* 2. POST MEDIA: SKELETON LOADER WITH SHIMMER */}
                <div
                  className={`ig-media-box ${post.mediaAspect === 'portrait' ? 'aspect-portrait' : 'aspect-square'}`}
                  onDoubleClick={() => handleDoubleTap(post.id)}
                  role="button"
                  tabIndex={0}
                  aria-label="Double tap to like post"
                >
                  {/* Full shimmer skeleton loader block */}
                  <div className="skeleton ig-post-skeleton-media">
                    <div className="ig-skeleton-media-content">
                      <div className="ig-skeleton-media-badge">
                        <ImageIcon size={30} className="ig-media-icon" />
                        <span className="ig-media-label">Cadet Photo Stream #{post.id}</span>
                        <div className="ig-skeleton-bars-group">
                          <span className="skeleton ig-media-bar-short" />
                          <span className="skeleton ig-media-bar-long" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Double tap heart splash effect */}
                  {isHeartPopping && (
                    <div className="double-tap-heart-pop">
                      <Heart size={88} className="heart-pop-icon" fill="#ffffff" color="#ffffff" />
                    </div>
                  )}
                </div>

                {/* 3. ACTION BUTTONS: HEART, COMMENT, SHARE, SAVE */}
                <div className="ig-action-bar">
                  <div className="ig-action-left">
                    {/* Heart button */}
                    <button
                      className={`ig-action-btn heart-btn ${isLiked ? 'liked' : ''}`}
                      onClick={() => toggleLike(post.id)}
                      aria-label={isLiked ? 'Unlike post' : 'Like post'}
                    >
                      <Heart
                        size={25}
                        fill={isLiked ? '#ff3040' : 'none'}
                        color={isLiked ? '#ff3040' : 'currentColor'}
                        className={`action-svg ${isLiked ? 'heart-bounce' : ''}`}
                      />
                    </button>

                    {/* Comment button */}
                    <button
                      className="ig-action-btn"
                      onClick={() => {
                        const input = document.getElementById(`comment-input-${post.id}`);
                        if (input) input.focus();
                      }}
                      aria-label="Comment on post"
                    >
                      <MessageCircle size={25} className="action-svg" />
                    </button>

                    {/* Share button */}
                    <button
                      className="ig-action-btn"
                      onClick={() => handleShare(post.author)}
                      aria-label="Share post"
                    >
                      <Send size={24} className="action-svg send-icon" />
                    </button>
                  </div>

                  {/* Save button on the right */}
                  <div className="ig-action-right">
                    <button
                      className={`ig-action-btn save-btn ${isSaved ? 'saved' : ''}`}
                      onClick={() => toggleSave(post.id)}
                      aria-label={isSaved ? 'Remove from saved' : 'Save post'}
                    >
                      <Bookmark
                        size={25}
                        fill={isSaved ? 'currentColor' : 'none'}
                        color="currentColor"
                        className="action-svg"
                      />
                    </button>
                  </div>
                </div>

                {/* 4. DESCRIPTION & DETAILS UNDER THE BUTTONS */}
                <div className="ig-post-details">
                  {/* Likes Count Line */}
                  <div className="ig-likes-line">
                    <span>
                      Liked by <strong>cadet.alex</strong> and{' '}
                      <strong>{currentLikes.toLocaleString()} others</strong>
                    </span>
                  </div>

                  {/* Post Caption / Description */}
                  <div className="ig-caption-block">
                    <button
                      className="ig-caption-author"
                      onClick={() => {
                        if (post.author === 'alex.flies') onNavigateToProfile();
                        else notify(`Viewing @${post.author}`);
                      }}
                    >
                      {post.author}
                    </button>
                    <span className="ig-caption-text">
                      {isCaptionExpanded ? post.caption : post.caption.slice(0, 115)}
                      {!isCaptionExpanded && post.caption.length > 115 && '...'}
                    </span>
                    {post.caption.length > 115 && (
                      <button
                        className="ig-more-toggle"
                        onClick={() =>
                          setExpandedCaptions((prev) => ({
                            ...prev,
                            [post.id]: !prev[post.id],
                          }))
                        }
                      >
                        {isCaptionExpanded ? ' less' : ' more'}
                      </button>
                    )}

                    {/* Tags */}
                    <div className="ig-tags-row">
                      {post.tags.map((t) => (
                        <span key={t} className="ig-tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* SKELETON CAPTION LINES (Shimmer placeholders under description) */}
                    <div className="ig-caption-skeleton-lines" aria-hidden="true">
                      <div className="skeleton ig-skel-line" style={{ width: '88%' }} />
                      <div className="skeleton ig-skel-line" style={{ width: '64%' }} />
                    </div>
                  </div>

                  {/* Comments Count Link */}
                  <button
                    className="ig-view-comments-btn"
                    onClick={() => notify(`Viewing all ${post.commentsCount + comments.length} comments`)}
                  >
                    View all {post.commentsCount + comments.length} comments
                  </button>

                  {/* Render newly added comments */}
                  {comments.length > 0 && (
                    <div className="ig-user-comments-list">
                      {comments.map((c, i) => (
                        <div key={i} className="ig-single-comment">
                          <strong className="comment-user">alex.flies</strong>
                          <span className="comment-text">{c}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="ig-timestamp">{post.timeAgo}</div>

                  {/* Interactive "Add a comment..." row */}
                  <form
                    className="ig-comment-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddComment(post.id);
                    }}
                  >
                    <button
                      type="button"
                      className="ig-emoji-btn"
                      onClick={() => notify('Emoji picker is a sample action.')}
                      aria-label="Add emoji"
                    >
                      <Smile size={19} />
                    </button>
                    <input
                      id={`comment-input-${post.id}`}
                      type="text"
                      className="ig-comment-input"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      type="submit"
                      className="ig-comment-submit-btn"
                      disabled={!(commentInputs[post.id] || '').trim()}
                    >
                      Post
                    </button>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Right Desktop Sidebar (Instagram Web Style) */}
      <aside className="ig-right-sidebar">
        {/* User Profile Mini Lockup */}
        <div className="ig-sidebar-user">
          <button className="ig-user-card-link" onClick={onNavigateToProfile}>
            <div className="ig-user-avatar-wrap">
              <img src="/profile.png" alt="Alex Rivera" className="ig-sidebar-avatar-img" />
            </div>
            <div className="ig-user-text">
              <span className="ig-user-handle">alex.flies</span>
              <span className="ig-user-realname">Alex Rivera • Cadet Captain</span>
            </div>
          </button>
          <button className="ig-switch-btn" onClick={onNavigateToProfile}>
            Switch
          </button>
        </div>

        {/* Suggested For You Header */}
        <div className="ig-suggest-header">
          <span className="ig-suggest-title">Suggested for you</span>
          <button className="ig-see-all-btn" onClick={() => notify('All squadron suggestions')}>
            See All
          </button>
        </div>

        {/* Suggested Accounts List */}
        <div className="ig-suggested-list">
          {suggestedUsers.map((u) => {
            const isFollowing = !!suggestedFollows[u.handle];
            return (
              <div className="ig-suggest-row" key={u.handle}>
                <div className="ig-suggest-identity">
                  <div className="ig-suggest-avatar skeleton">
                    <img src="/logo.png" alt={u.handle} className="suggest-avatar-img" />
                  </div>
                  <div className="ig-suggest-meta">
                    <span className="suggest-handle">{u.handle}</span>
                    <span className="suggest-relation">{u.sub}</span>
                  </div>
                </div>
                <button
                  className={`ig-suggest-follow-btn ${isFollowing ? 'following' : ''}`}
                  onClick={() => toggleFollowSuggest(u.handle)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Instagram Web Footer Links */}
        <footer className="ig-sidebar-footer">
          <nav className="ig-footer-links">
            <a href="#about" onClick={(e) => { e.preventDefault(); notify('Civil Air Patrol Cadet Connect Demo'); }}>About</a>
            <span>•</span>
            <a href="#help" onClick={(e) => { e.preventDefault(); notify('Help & Support'); }}>Help</a>
            <span>•</span>
            <a href="#press" onClick={(e) => { e.preventDefault(); notify('CAP Press Info'); }}>Press</a>
            <span>•</span>
            <a href="#api" onClick={(e) => { e.preventDefault(); notify('API Documentation'); }}>API</a>
            <span>•</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); notify('Privacy Policy'); }}>Privacy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); notify('Terms of Service'); }}>Terms</a>
          </nav>
          <div className="ig-copyright">
            © 2026 CADET CONNECT • CIVIL AIR PATROL DEMO
          </div>
        </footer>
      </aside>
    </div>
  );
}
