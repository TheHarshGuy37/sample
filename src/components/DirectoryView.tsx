import React, { useState, useMemo } from 'react';
import { Vendor, VendorCategory, VendorPackage } from '../types';
import { POPULAR_CITIES } from '../data/mockData';
import { Search, ShieldCheck, Star, MapPin, Calendar, Filter, RotateCcw, ChevronRight, Users, Check } from 'lucide-react';

interface DirectoryViewProps {
  vendors: Vendor[];
  activeMuhuratDate: string;
  onSelectVendor: (vendor: Vendor) => void;
  onRequestBooking: (vendor: Vendor, selectedPackage?: VendorPackage) => void;
  onNavigateToMuhurat: () => void;
}

const CATEGORIES: ('All Services' | VendorCategory)[] = [
  'All Services',
  'Wedding Venues & Banquet Halls',
  'Catering & Food Services',
  'Photographers & Videographers',
  'Wedding Decor & Stage',
  'Bridal Wear & Groom Outfits',
  'DJ, Band & Entertainment',
  'Mehendi & Makeup Artists',
];

const TIERS = ['All Budgets', 'Budget-Friendly', 'Mid-Range', 'Premium', 'Luxury'];

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  vendors,
  activeMuhuratDate,
  onSelectVendor,
  onRequestBooking,
  onNavigateToMuhurat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All Services' | VendorCategory>('All Services');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedTier, setSelectedTier] = useState('All Budgets');
  const [filterByMuhurat, setFilterByMuhurat] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price-asc' | 'price-desc'>('recommended');

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          vendor.name.toLowerCase().includes(q) ||
          vendor.description.toLowerCase().includes(q) ||
          vendor.city.toLowerCase().includes(q) ||
          vendor.category.toLowerCase().includes(q) ||
          (vendor.cityTagline && vendor.cityTagline.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'All Services' && vendor.category !== selectedCategory) {
        return false;
      }

      // City
      if (selectedCity !== 'All Cities' && vendor.city !== selectedCity) {
        return false;
      }

      // Tier
      if (selectedTier !== 'All Budgets' && vendor.budgetTier !== selectedTier) {
        return false;
      }

      // Muhurat date availability
      if (filterByMuhurat && !vendor.availableDates.includes(activeMuhuratDate)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      return 0;
    });
  }, [vendors, searchQuery, selectedCategory, selectedCity, selectedTier, filterByMuhurat, activeMuhuratDate, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Services');
    setSelectedCity('All Cities');
    setSelectedTier('All Budgets');
    setFilterByMuhurat(false);
    setSortBy('recommended');
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Clean Top Banner with Simple Title & Active Wedding Date */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Find Wedding Venues &amp; Services
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Real halls, caterers, photographers, and decorators with direct pricing and reviews across India.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#FAF9F6] border border-[#E2E8F0] p-3 rounded-xl">
          <Calendar className="w-5 h-5 text-[#b90538] shrink-0" />
          <div className="text-xs">
            <span className="text-slate-500 block">Selected Wedding Date:</span>
            <button
              onClick={onNavigateToMuhurat}
              className="font-bold text-[#0F172A] hover:text-[#b90538] hover:underline transition-colors"
            >
              {activeMuhuratDate} (Change Date)
            </button>
          </div>
        </div>
      </div>

      {/* Quick City Selector Bar with Real-Life Accurate Taglines */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Popular Wedding Cities
          </span>
          {selectedCity !== 'All Cities' && (
            <button
              onClick={() => setSelectedCity('All Cities')}
              className="text-xs text-[#b90538] hover:underline font-semibold"
            >
              Show All Cities
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCity('All Cities')}
            className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              selectedCity === 'All Cities'
                ? 'bg-[#0F172A] text-white shadow-xs font-semibold'
                : 'bg-[#FAF9F6] text-slate-700 hover:bg-slate-100 border border-[#E2E8F0]'
            }`}
          >
            All Cities
          </button>

          {POPULAR_CITIES.map((city) => {
            const isSelected = selectedCity === city.name;
            return (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city.name)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#b90538] text-white shadow-xs font-semibold'
                    : 'bg-[#FAF9F6] text-slate-700 hover:bg-[#FFF1F2] hover:text-[#b90538] border border-[#E2E8F0]'
                }`}
              >
                <span className="font-bold">{city.name}</span>
                <span className={`text-[11px] ${isSelected ? 'text-[#ffdcc3]' : 'text-slate-400'}`}>
                  · {city.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Filter Column (4 cols) */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-6 sticky top-28">
          
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#b90538]" />
              <h2 className="font-playfair text-lg font-bold text-[#0F172A]">Filter Options</h2>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#904d00] hover:text-[#b90538] flex items-center gap-1 transition-colors font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search box */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Search by Name or Keyword
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="E.g., Sai Priya, Biryani, Photography, Lawn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#b90538] focus:ring-2 focus:ring-[#FFE4E6]"
              />
            </div>
          </div>

          {/* Muhurat Filter Checkbox */}
          <div className="p-3.5 bg-[#FFF1F2] border border-[#FFE4E6] rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="dateFilterCheck" className="text-xs font-bold text-[#b90538] cursor-pointer">
                Available on My Date Only
              </label>
              <input
                type="checkbox"
                id="dateFilterCheck"
                checked={filterByMuhurat}
                onChange={(e) => setFilterByMuhurat(e.target.checked)}
                className="w-4 h-4 accent-[#b90538] rounded cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-[#5b4041] leading-relaxed">
              Show only services available on <strong className="text-[#0F172A]">{activeMuhuratDate}</strong>.
            </p>
          </div>

          {/* Service Category List */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">
              Service Category
            </label>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#b90538] text-white shadow-xs font-semibold'
                        : 'text-[#475569] hover:bg-[#FAF9F6] hover:text-[#0F172A]'
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Budget Range
            </label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#b90538]"
            >
              {TIERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Trust Guarantee Box in simple terms */}
          <div className="pt-4 border-t border-[#F1F5F9] text-xs text-slate-500 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#10B981] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe Advance Booking</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Advances paid are held safely until service completion. All service providers are physically verified with real ratings.
            </p>
          </div>

        </aside>

        {/* Right Listings Column (8 cols) */}
        <main className="lg:col-span-8 space-y-5">
          
          {/* Top Sort & Count Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                Showing <span className="tabular-nums font-bold text-[#b90538]">{filteredVendors.length}</span> Verified Wedding Services
              </p>
              {selectedCity !== 'All Cities' && (
                <p className="text-xs text-slate-500">
                  Filtered by <strong>{selectedCity}</strong>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#b90538]"
              >
                <option value="recommended">Best Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredVendors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF1F2] text-[#b90538] flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-[#0F172A]">No Services Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No matching results with current filters. Try selecting "All Cities" or clearing the date filter.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#b90538] text-white text-xs font-semibold rounded-xl hover:bg-[#92002a] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredVendors.map((vendor) => (
                <article
                  key={vendor.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#b90538]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Unique Image Showcase */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340"><rect width="600" height="340" fill="%23FFF1F2"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23b90538" text-anchor="middle" dominant-baseline="middle">Utsava Wedding Service</text></svg>';
                      }}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />

                    {/* Verified Badge */}
                    {vendor.verified && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[10px] font-bold text-emerald-800 tracking-wide uppercase">
                          Verified
                        </span>
                      </div>
                    )}

                    {/* Budget Tier Pill */}
                    <div className="absolute top-3 right-3 bg-[#0F172A]/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-semibold text-white">
                      {vendor.budgetTier}
                    </div>

                    {/* City Tagline overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/75 to-transparent flex items-end p-3">
                      <div className="flex items-center gap-1.5 text-xs text-white drop-shadow-sm font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#ffb2b7]" />
                        <span>{vendor.city}</span>
                        {vendor.cityTagline && (
                          <span className="text-slate-300 text-[11px]">
                            · {vendor.cityTagline}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h3
                        onClick={() => onSelectVendor(vendor)}
                        className="font-playfair text-lg font-bold text-[#0F172A] hover:text-[#b90538] transition-colors cursor-pointer leading-snug line-clamp-1"
                      >
                        {vendor.name}
                      </h3>

                      {/* Ceremonies tags */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        {vendor.ceremonies.map((c) => (
                          <span
                            key={c}
                            className="bg-[#FFF1F2] text-[#b90538] border border-[#FFE4E6] px-2 py-0.5 rounded-full text-[11px] font-medium"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* Ratings and Capacity */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
                          <strong className="text-[#0F172A] font-bold tabular-nums">{vendor.rating.toFixed(2)}</strong>
                          <span>({vendor.reviewsCount} reviews)</span>
                        </div>
                        {vendor.capacity && (
                          <div className="flex items-center gap-1 text-slate-600">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span>{vendor.capacity}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {vendor.description}
                      </p>
                    </div>

                    {/* Bottom Price and Actions */}
                    <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                          Price Starts At
                        </span>
                        <div className="font-sans text-base font-bold text-[#0F172A] tabular-nums">
                          {formatINR(vendor.basePrice)}
                        </div>
                        <span className="text-[10px] text-slate-500 block">
                          {vendor.priceUnit}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectVendor(vendor)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#0F172A] bg-[#FAF9F6] hover:bg-[#F5F3EF] border border-[#E2E8F0] rounded-xl transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onRequestBooking(vendor)}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#b90538] hover:bg-[#92002a] rounded-xl transition-colors shadow-xs"
                        >
                          Book / Advance
                        </button>
                      </div>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
