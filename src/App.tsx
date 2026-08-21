import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { NoticeBanner } from './components/layout/NoticeBanner';
import { HeroSection } from './components/home/HeroSection';
import { CategoriesSection } from './components/home/CategoriesSection';
import { BestSellersSection } from './components/home/BestSellersSection';
import { ContinueReadingSection } from './components/home/ContinueReadingSection';
import { FeaturesStrip } from './components/home/FeaturesStrip';
import { BrowsePage } from './pages/BrowsePage';
import { MyLibraryPage } from './pages/MyLibraryPage';
import { BookDetailsPage } from './pages/BookDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ReadingPage } from './pages/ReadingPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { BookDetailModal } from './components/modals/BookDetailModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { HowItWorksModal } from './components/modals/HowItWorksModal';
import { MOCK_BOOKS } from './data/mockBooks';
import { Book, CartItem, PageType } from './types';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [books] = useState<Book[]>(MOCK_BOOKS);
  const [cart, setCart] = useState<CartItem[]>([
    { book: MOCK_BOOKS[0], quantity: 1 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active selected book for full detail page or modal
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeReadingBook, setActiveReadingBook] = useState<Book | null>(null);

  // Modals state
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = (book: Book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    showToast(`"${book.title}" added to cart!`);
  };

  const handleRemoveFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
    showToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBuyNow = (book: Book) => {
    setIsModalDetailOpen(false);
    handleAddToCart(book);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookDetail = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReader = (book: Book) => {
    setActiveReadingBook(book);
    setCurrentPage('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Distraction-Free Reader Page layout mode
  if (currentPage === 'reader' && activeReadingBook) {
    return (
      <ReadingPage
        book={activeReadingBook}
        onBackToLibrary={() => {
          setCurrentPage('library');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FC] text-slate-800 font-sans selection:bg-[#8B6FD8]/20 selection:text-[#6B4EC4]">
      
      {/* Top Announcement Notice Banner */}
      <NoticeBanner
        onDiscoverClick={() => {
          setCurrentPage('browse');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in slide-in-from-bottom-4 duration-300 border border-slate-700">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header Navigation with Motion */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage('browse');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearch={(query) => {
          setSearchQuery(query);
          if (query.trim()) {
            setCurrentPage('browse');
          }
        }}
        searchQuery={searchQuery}
        allBooks={books}
        onSelectBook={handleOpenBookDetail}
      />

      {/* Main Dynamic View Page Router */}
      <main className="flex-1">
        
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <>
            <HeroSection
              onBrowseClick={() => {
                setCurrentPage('browse');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onHowItWorksClick={() => setIsHowItWorksOpen(true)}
            />

            <CategoriesSection
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage('browse');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <BestSellersSection
              books={books}
              onSelectBook={handleOpenBookDetail}
              onAddToCart={handleAddToCart}
              selectedCategory={selectedCategory}
            />

            <ContinueReadingSection
              books={books}
              onContinueReading={handleOpenReader}
              onDiscoverMore={() => {
                setCurrentPage('browse');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <FeaturesStrip />
          </>
        )}

        {/* PAGE 2: BROWSE / DISCOVER */}
        {currentPage === 'browse' && (
          <BrowsePage
            books={books}
            onSelectBook={handleOpenBookDetail}
            onAddToCart={handleAddToCart}
            initialCategory={selectedCategory}
          />
        )}

        {/* PAGE 3: MY LIBRARY */}
        {currentPage === 'library' && (
          <MyLibraryPage
            books={books}
            onOpenReader={handleOpenReader}
            onBrowseMore={() => {
              setCurrentPage('browse');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* PAGE 4: BOOK DETAILS */}
        {currentPage === 'details' && selectedBook && (
          <BookDetailsPage
            book={selectedBook}
            allBooks={books}
            onBack={() => setCurrentPage('browse')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectBook={handleOpenBookDetail}
            onReadNow={handleOpenReader}
          />
        )}

        {/* PAGE 5: CHECKOUT */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            cartItems={cart}
            onCompleteOrder={() => {
              handleClearCart();
              showToast('Order completed! Books added to library.');
            }}
            onGoToLibrary={() => {
              setCurrentPage('library');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* PAGE 6: PROFILE */}
        {currentPage === 'profile' && (
          <ProfilePage
            books={books}
            onOpenReader={handleOpenReader}
          />
        )}

        {/* PAGE 7: LOGIN / REGISTER */}
        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={() => {
              showToast('Successfully signed in to Booklet!');
              setCurrentPage('library');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Global Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onStartReading={() => {
          setCurrentPage('library');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onBrowseBooks={() => {
          setCurrentPage('browse');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}

export default App;
