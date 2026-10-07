import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { StoryView } from './views/StoryView';
import { PhilosophyView } from './views/PhilosophyView';
import { EcosystemView } from './views/EcosystemView';
import { VenturesView } from './views/VenturesView';
import { CommunityView } from './views/CommunityView';
import { MediaView } from './views/MediaView';
import { VisionView } from './views/VisionView';
import { FounderView } from './views/FounderView';
import { JoinView } from './views/JoinView';
import { ContactView } from './views/ContactView';
import { NotFoundView } from './views/NotFoundView';
import { StaysView } from './views/StaysView';
import { HostOnboardingView } from './views/HostOnboardingView';
import { GuestTripsView } from './views/GuestTripsView';
import { AdminDashboardView } from './views/AdminDashboardView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Sync with window.location.hash for shareable links & browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'stays',
        'host-portal',
        'my-trips',
        'admin-portal',
        'story',
        'philosophy',
        'ecosystem',
        'ventures',
        'community',
        'media',
        'vision',
        'founder',
        'join',
        'contact',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title dynamically based on active page
  useEffect(() => {
    const pageTitles: Record<PageId, string> = {
      home: 'Uttarkunth – Himalayan Entrepreneurial Ecosystem',
      stays: 'Uttarkunth Stays – Himalayan Homestays & Eco Lodges',
      'host-portal': 'Host Portal – List Your Property (0% Year 1) | Uttarkunth Stays',
      'my-trips': 'My Trips & Bookings | Uttarkunth Stays',
      'admin-portal': 'Platform Administration & Verification | Uttarkunth',
      story: 'Our Story – The Genesis & Founding Question | Uttarkunth',
      philosophy: 'Our Philosophy – Learn by Doing. Grow by Serving | Uttarkunth',
      ecosystem: 'Our Ecosystem – Parent Brand Architecture | Uttarkunth',
      ventures: 'Our Ventures – Yash Home Stay, Uttarkunth Café & Media | Uttarkunth',
      community: 'Community Development – The Enterprise-Supported Model | Uttarkunth',
      media: 'Stories & Media – Aaj Ka Devta & Mountain Documentaries | Uttarkunth',
      vision: 'Future Vision – Village to Region to India | Uttarkunth',
      founder: 'Gaurav Negi – Founder of Uttarkunth | Profile & Statement',
      join: 'Join the Journey – Collaboration & Fellowship | Uttarkunth',
      contact: 'Contact & Inquiries | Uttarkunth Ecosystem',
    };

    if (pageTitles[currentPage]) {
      document.title = pageTitles[currentPage];
    }
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView onNavigate={navigateTo} />;
      case 'stays':
        return (
          <StaysView
            onNavigateToHost={() => navigateTo('host-portal')}
            onNavigateToTrips={() => navigateTo('my-trips')}
          />
        );
      case 'host-portal':
        return <HostOnboardingView onNavigateToStays={() => navigateTo('stays')} />;
      case 'my-trips':
        return <GuestTripsView onNavigateToExplore={() => navigateTo('stays')} />;
      case 'admin-portal':
        return <AdminDashboardView />;
      case 'story':
        return <StoryView onNavigate={navigateTo} />;
      case 'philosophy':
        return <PhilosophyView onNavigate={navigateTo} />;
      case 'ecosystem':
        return <EcosystemView onNavigate={navigateTo} />;
      case 'ventures':
        return <VenturesView onNavigate={navigateTo} />;
      case 'community':
        return <CommunityView onNavigate={navigateTo} />;
      case 'media':
        return <MediaView onNavigate={navigateTo} />;
      case 'vision':
        return <VisionView onNavigate={navigateTo} />;
      case 'founder':
        return <FounderView onNavigate={navigateTo} />;
      case 'join':
        return <JoinView onNavigate={navigateTo} />;
      case 'contact':
        return <ContactView onNavigate={navigateTo} />;
      default:
        return <NotFoundView onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] selection:bg-[#163E2E] selection:text-white">
      {/* Top Navigation */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
