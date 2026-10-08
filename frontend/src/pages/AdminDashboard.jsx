import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  fetchCauses,
  fetchPackages,
  fetchAdminDashboardStats,
  createCauseApi,
  updateCauseApi,
  deleteCauseApi,
  createPackageApi,
  updatePackageApi,
  deletePackageApi,
} from '../services/api';

const ALL_CATEGORIES = [
  'food',
  'animals',
  'birthday',
  'environment',
  'education',
  'orphanage',
  'healthcare',
  'livelihood',
  'others',
];

export default function AdminDashboard() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState('causes'); // 'causes' | 'packages' | 'stats'

  // Data States
  const [causes, setCauses] = useState([]);
  const [packages, setPackages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Filter States for Causes
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCause, setEditingCause] = useState(null);
  const [causeForm, setCauseForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    description: '',
    categories: ['all'],
    unitPrice: 50,
    unitLabel: 'Person',
    currency: '₹',
    image: '',
    isFeatured: false,
    isActive: true,
  });

  // Package Modal States
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [pkgForm, setPkgForm] = useState({
    title: '',
    packageId: 1,
    image: '',
    price: 1000,
    link: '',
    isActive: true,
  });

  // Show temporary toast message
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const [causesData, pkgsData, statsData] = await Promise.all([
        fetchCauses('', '', true),
        fetchPackages(),
        fetchAdminDashboardStats().catch(() => null),
      ]);
      if (causesData) setCauses(causesData);
      if (pkgsData) setPackages(pkgsData);
      if (statsData) setStats(statsData);
    } catch (err) {
      showToast('Error loading dashboard data: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Causes
  const filteredCauses = useMemo(() => {
    return causes.filter((c) => {
      const matchesSearch =
        c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tagline?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' ||
        (c.categories && c.categories.includes(selectedCategory.toLowerCase()));

      return matchesSearch && matchesCat;
    });
  }, [causes, searchQuery, selectedCategory]);

  // Open modal for new cause
  const handleOpenAddModal = () => {
    setEditingCause(null);
    setCauseForm({
      title: '',
      slug: '',
      tagline: '',
      description: '',
      categories: ['all', 'food'],
      unitPrice: 50,
      unitLabel: 'Person',
      currency: '₹',
      image: 'https://media.thaagam.org/media/deps/causes/card/homeless5.webp',
      isFeatured: false,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  // Open modal for editing cause
  const handleOpenEditModal = (cause) => {
    setEditingCause(cause);
    setCauseForm({
      title: cause.title || '',
      slug: cause.slug || '',
      tagline: cause.tagline || '',
      description: cause.description || '',
      categories: cause.categories && cause.categories.length > 0 ? cause.categories : ['all'],
      unitPrice: cause.unitPrice || 0,
      unitLabel: cause.unitLabel || 'Person',
      currency: cause.currency || '₹',
      image: cause.image || '',
      isFeatured: !!cause.isFeatured,
      isActive: cause.isActive !== undefined ? cause.isActive : true,
    });
    setIsModalOpen(true);
  };

  // Auto-slug generator
  const handleTitleChange = (val) => {
    const updated = { ...causeForm, title: val };
    if (!editingCause) {
      updated.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/(^_|_$)/g, '');
    }
    setCauseForm(updated);
  };

  // Save Cause
  const handleSaveCause = async (e) => {
    e.preventDefault();
    try {
      if (editingCause) {
        const updated = await updateCauseApi(editingCause._id, causeForm);
        setCauses((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
        showToast(`Cause "${updated.title}" updated successfully!`);
      } else {
        const created = await createCauseApi(causeForm);
        setCauses((prev) => [created, ...prev]);
        showToast(`New cause "${created.title}" added successfully!`);
      }
      setIsModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Toggle Cause Active status
  const handleToggleActive = async (cause) => {
    try {
      const nextStatus = !cause.isActive;
      const updated = await updateCauseApi(cause._id, { isActive: nextStatus });
      setCauses((prev) => prev.map((c) => (c._id === cause._id ? { ...c, isActive: nextStatus } : c)));
      showToast(`Cause "${cause.title}" is now ${nextStatus ? 'ACTIVE (Live)' : 'INACTIVE (Hidden)'}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Delete Cause
  const handleDeleteCause = async (cause) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${cause.title}"?`)) return;
    try {
      await deleteCauseApi(cause._id);
      setCauses((prev) => prev.filter((c) => c._id !== cause._id));
      showToast(`Cause "${cause.title}" deleted.`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Package Management Handlers
  const handleOpenAddPkg = () => {
    setEditingPkg(null);
    setPkgForm({
      title: '',
      packageId: packages.length + 1,
      image: '',
      price: 1000,
      link: `/packages_form?id=${packages.length + 1}`,
      isActive: true,
    });
    setIsPkgModalOpen(true);
  };

  const handleOpenEditPkg = (pkg) => {
    setEditingPkg(pkg);
    setPkgForm({
      title: pkg.title || '',
      packageId: pkg.packageId || 1,
      image: pkg.image || '',
      price: pkg.price || 0,
      link: pkg.link || '',
      isActive: pkg.isActive !== undefined ? pkg.isActive : true,
    });
    setIsPkgModalOpen(true);
  };

  const handleSavePkg = async (e) => {
    e.preventDefault();
    try {
      if (editingPkg) {
        const updated = await updatePackageApi(editingPkg._id, pkgForm);
        setPackages((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
        showToast(`Package "${updated.title}" updated successfully!`);
      } else {
        const created = await createPackageApi(pkgForm);
        setPackages((prev) => [...prev, created]);
        showToast(`Package "${created.title}" added successfully!`);
      }
      setIsPkgModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeletePkg = async (pkg) => {
    if (!window.confirm(`Delete package "${pkg.title}"?`)) return;
    try {
      await deletePackageApi(pkg._id);
      setPackages((prev) => prev.filter((p) => p._id !== pkg._id));
      showToast(`Package "${pkg.title}" deleted.`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div style={ui.container}>
      {/* Toast Notification */}
      {toast && (
        <div style={{ ...ui.toast, backgroundColor: toast.type === 'error' ? '#ef4444' : '#10b981' }}>
          <i className={toast.type === 'error' ? 'ri-error-warning-line' : 'ri-checkbox-circle-line'}></i>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header style={ui.nav}>
        <div style={ui.navLeft}>
          <a href="/" target="_blank" rel="noreferrer" style={ui.logoLink}>
            <img src="/static/website/assets/images/logo/logo.webp" alt="Vrishasena" style={ui.navLogo} />
          </a>
          <div style={ui.badge}>Admin CMS Portal</div>
        </div>

        <div style={ui.navRight}>
          <a href="/" target="_blank" rel="noreferrer" style={ui.viewSiteBtn}>
            <i className="ri-external-link-line"></i> View Live Site
          </a>
          <div style={ui.adminInfo}>
            <i className="ri-shield-user-fill" style={{ color: '#009dff' }}></i>
            <span style={ui.adminEmail}>{admin?.email || 'admin@vrishasenafoundation.org'}</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            style={ui.logoutBtn}
            title="Log out of Admin session"
          >
            <i className="ri-logout-box-r-line"></i> Logout
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main style={ui.main}>
        {/* Metric Cards Banner */}
        <section style={ui.metricsGrid}>
          <div style={ui.metricCard}>
            <div style={ui.metricIconBox('#009dff')}>
              <i className="ri-heart-pulse-fill"></i>
            </div>
            <div>
              <div style={ui.metricVal}>{causes.length}</div>
              <div style={ui.metricLabel}>Total Causes in DB</div>
            </div>
          </div>

          <div style={ui.metricCard}>
            <div style={ui.metricIconBox('#10b981')}>
              <i className="ri-checkbox-circle-fill"></i>
            </div>
            <div>
              <div style={ui.metricVal}>{causes.filter((c) => c.isActive).length}</div>
              <div style={ui.metricLabel}>Active on Live Site</div>
            </div>
          </div>

          <div style={ui.metricCard}>
            <div style={ui.metricIconBox('#8b5cf6')}>
              <i className="ri-gift-line"></i>
            </div>
            <div>
              <div style={ui.metricVal}>{packages.length}</div>
              <div style={ui.metricLabel}>Packages Configured</div>
            </div>
          </div>

          <div style={ui.metricCard}>
            <div style={ui.metricIconBox('#f59e0b')}>
              <i className="ri-database-2-fill"></i>
            </div>
            <div>
              <div style={ui.metricVal}>MongoDB 8.0</div>
              <div style={ui.metricLabel}>thaagam_db Connected</div>
            </div>
          </div>
        </section>

        {/* Tab Controls & Actions */}
        <div style={ui.actionHeader}>
          <div style={ui.tabRow}>
            <button
              onClick={() => setActiveTab('causes')}
              style={{ ...ui.tabBtn, ...(activeTab === 'causes' ? ui.tabBtnActive : {}) }}
            >
              <i className="ri-hand-heart-line"></i> Causes Management ({causes.length})
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              style={{ ...ui.tabBtn, ...(activeTab === 'packages' ? ui.tabBtnActive : {}) }}
            >
              <i className="ri-gift-2-line"></i> Homepage Packages ({packages.length})
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              style={{ ...ui.tabBtn, ...(activeTab === 'stats' ? ui.tabBtnActive : {}) }}
            >
              <i className="ri-pie-chart-2-line"></i> Category Analytics
            </button>
          </div>

          {activeTab === 'causes' && (
            <button onClick={handleOpenAddModal} style={ui.primaryAddBtn}>
              <i className="ri-add-circle-fill"></i> Add New Cause
            </button>
          )}

          {activeTab === 'packages' && (
            <button onClick={handleOpenAddPkg} style={ui.primaryAddBtn}>
              <i className="ri-add-circle-fill"></i> Add New Package
            </button>
          )}
        </div>

        {/* Tab 1: Causes Management */}
        {activeTab === 'causes' && (
          <div style={ui.tabContentCard}>
            {/* Search and Category Filter Toolbar */}
            <div style={ui.filterToolbar}>
              <div style={ui.searchWrapper}>
                <i className="ri-search-line" style={ui.searchIcon}></i>
                <input
                  type="text"
                  placeholder="Search causes by title, slug, or tagline..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={ui.searchInput}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={ui.clearSearchBtn}>
                    ✕
                  </button>
                )}
              </div>

              <div style={ui.catPillRow}>
                <button
                  onClick={() => setSelectedCategory('all')}
                  style={{
                    ...ui.catPill,
                    ...(selectedCategory === 'all' ? ui.catPillActive : {}),
                  }}
                >
                  All ({causes.length})
                </button>
                {ALL_CATEGORIES.map((cat) => {
                  const count = causes.filter((c) => c.categories?.includes(cat)).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        ...ui.catPill,
                        ...(selectedCategory === cat ? ui.catPillActive : {}),
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Causes Table */}
            {loading ? (
              <div style={ui.loadingBox}>
                <i className="ri-loader-4-line ri-spin" style={{ fontSize: '32px', color: '#009dff' }}></i>
                <p>Loading causes from MongoDB...</p>
              </div>
            ) : filteredCauses.length === 0 ? (
              <div style={ui.emptyBox}>
                <i className="ri-inbox-line" style={{ fontSize: '48px', color: '#94a3b8' }}></i>
                <h4>No causes match your filter</h4>
                <p>Try clearing search or picking another category.</p>
              </div>
            ) : (
              <div style={ui.tableWrapper}>
                <table style={ui.table}>
                  <thead>
                    <tr style={ui.thRow}>
                      <th style={ui.th}>Thumbnail</th>
                      <th style={ui.th}>Cause Details</th>
                      <th style={ui.th}>Categories</th>
                      <th style={ui.th}>Price / Unit</th>
                      <th style={ui.th}>Status (Live)</th>
                      <th style={{ ...ui.th, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCauses.map((cause) => (
                      <tr key={cause._id} style={ui.tr}>
                        <td style={ui.td}>
                          <img
                            src={cause.image}
                            alt={cause.title}
                            style={ui.causeThumb}
                            onError={(e) => {
                              e.target.src = 'https://media.thaagam.org/media/deps/causes/card/homeless5.webp';
                            }}
                          />
                        </td>
                        <td style={ui.td}>
                          <div style={ui.causeTitle}>{cause.title}</div>
                          <div style={ui.causeSlug}>
                            <a
                              href={`/causes-detail/${cause.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              style={ui.slugLink}
                            >
                              /{cause.slug} <i className="ri-arrow-right-up-line"></i>
                            </a>
                          </div>
                          {cause.tagline && <div style={ui.causeTagline}>{cause.tagline}</div>}
                        </td>
                        <td style={ui.td}>
                          <div style={ui.badgeRow}>
                            {cause.categories?.map((cat) => (
                              <span key={cat} style={ui.categoryBadge}>
                                {cat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={ui.td}>
                          <div style={ui.priceTag}>
                            ₹{cause.unitPrice}
                            <span style={ui.priceUnit}> / {cause.unitLabel}</span>
                          </div>
                        </td>
                        <td style={ui.td}>
                          <button
                            onClick={() => handleToggleActive(cause)}
                            style={{
                              ...ui.statusPill,
                              ...(cause.isActive ? ui.statusActive : ui.statusInactive),
                            }}
                            title="Click to toggle live website visibility"
                          >
                            <span style={ui.statusDot(cause.isActive)}></span>
                            {cause.isActive ? 'Active (Live)' : 'Hidden'}
                          </button>
                        </td>
                        <td style={{ ...ui.td, textAlign: 'right' }}>
                          <div style={ui.actionBtns}>
                            <button
                              onClick={() => handleOpenEditModal(cause)}
                              style={ui.editBtn}
                              title="Edit cause"
                            >
                              <i className="ri-edit-line"></i> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCause(cause)}
                              style={ui.deleteBtn}
                              title="Delete cause"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Packages Management */}
        {activeTab === 'packages' && (
          <div style={ui.tabContentCard}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, color: '#64748b' }}>
                These package cards are displayed on the Homepage under the <strong>Packages</strong> tab.
              </p>
            </div>

            <div style={ui.pkgGrid}>
              {packages.map((pkg) => (
                <div key={pkg._id} style={ui.pkgCard}>
                  <img src={pkg.image} alt={pkg.title} style={ui.pkgImg} />
                  <div style={ui.pkgBody}>
                    <h4 style={ui.pkgTitle}>{pkg.title}</h4>
                    <div style={ui.pkgMeta}>
                      <span>ID: #{pkg.packageId}</span>
                      <span>₹{pkg.price || 0}</span>
                    </div>
                    <div style={ui.pkgActions}>
                      <button onClick={() => handleOpenEditPkg(pkg)} style={ui.editBtn}>
                        <i className="ri-edit-line"></i> Edit
                      </button>
                      <button onClick={() => handleDeletePkg(pkg)} style={ui.deleteBtn}>
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Analytics */}
        {activeTab === 'stats' && (
          <div style={ui.tabContentCard}>
            <h3 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>Causes Breakdown by Category</h3>
            <div style={ui.analyticsGrid}>
              {ALL_CATEGORIES.map((cat) => {
                const count = causes.filter((c) => c.categories?.includes(cat)).length;
                const percentage = causes.length > 0 ? Math.round((count / causes.length) * 100) : 0;
                return (
                  <div key={cat} style={ui.analyticsCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '600', color: '#334155' }}>
                        {cat.toUpperCase()}
                      </span>
                      <span style={{ fontWeight: '700', color: '#009dff' }}>{count} causes</span>
                    </div>
                    <div style={ui.progressBarBg}>
                      <div style={{ ...ui.progressBarFill, width: `${percentage}%` }}></div>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                      {percentage}% of active inventory
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Cause Add / Edit Modal */}
      {isModalOpen && (
        <div style={ui.modalOverlay}>
          <div style={ui.modalCard}>
            <div style={ui.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>
                {editingCause ? `Edit Cause: ${editingCause.title}` : 'Add New Cause'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={ui.modalCloseBtn}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCause} style={ui.modalForm}>
              <div style={ui.formGrid}>
                {/* Title */}
                <div style={ui.formCol}>
                  <label style={ui.fieldLabel}>Cause Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Feed a Homeless Person"
                    value={causeForm.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    style={ui.fieldInput}
                  />
                </div>

                {/* Slug */}
                <div style={ui.formCol}>
                  <label style={ui.fieldLabel}>URL Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. homeless"
                    value={causeForm.slug}
                    onChange={(e) => setCauseForm({ ...causeForm, slug: e.target.value })}
                    style={ui.fieldInput}
                  />
                </div>

                {/* Unit Price */}
                <div style={ui.formCol}>
                  <label style={ui.fieldLabel}>Unit Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="30"
                    value={causeForm.unitPrice}
                    onChange={(e) => setCauseForm({ ...causeForm, unitPrice: Number(e.target.value) })}
                    style={ui.fieldInput}
                  />
                </div>

                {/* Unit Label */}
                <div style={ui.formCol}>
                  <label style={ui.fieldLabel}>Unit Label *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Person, Kit, Child, Sapling"
                    value={causeForm.unitLabel}
                    onChange={(e) => setCauseForm({ ...causeForm, unitLabel: e.target.value })}
                    style={ui.fieldInput}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div style={{ marginTop: '14px' }}>
                <label style={ui.fieldLabel}>Tagline / Short Hook</label>
                <input
                  type="text"
                  placeholder="Feed the Homeless, End Hunger & Donate Food to Save Lives"
                  value={causeForm.tagline}
                  onChange={(e) => setCauseForm({ ...causeForm, tagline: e.target.value })}
                  style={ui.fieldInput}
                />
              </div>

              {/* Image URL */}
              <div style={{ marginTop: '14px' }}>
                <label style={ui.fieldLabel}>Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://media.thaagam.org/media/deps/causes/card/..."
                  value={causeForm.image}
                  onChange={(e) => setCauseForm({ ...causeForm, image: e.target.value })}
                  style={ui.fieldInput}
                />
                {causeForm.image && (
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={causeForm.image} alt="Preview" style={ui.previewImg} />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Live Image Preview</span>
                  </div>
                )}
              </div>

              {/* Categories */}
              <div style={{ marginTop: '14px' }}>
                <label style={ui.fieldLabel}>Categories (Appears under selected tabs)</label>
                <div style={ui.checkboxGrid}>
                  {ALL_CATEGORIES.map((cat) => {
                    const isChecked = causeForm.categories.includes(cat);
                    return (
                      <label key={cat} style={ui.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const newCats = e.target.checked
                              ? [...causeForm.categories, cat]
                              : causeForm.categories.filter((c) => c !== cat);
                            setCauseForm({ ...causeForm, categories: newCats });
                          }}
                        />
                        <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Active & Featured Toggles */}
              <div style={{ marginTop: '16px', display: 'flex', gap: '24px' }}>
                <label style={ui.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={causeForm.isActive}
                    onChange={(e) => setCauseForm({ ...causeForm, isActive: e.target.checked })}
                  />
                  <strong>Publish to Live Website (Active)</strong>
                </label>
                <label style={ui.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={causeForm.isFeatured}
                    onChange={(e) => setCauseForm({ ...causeForm, isFeatured: e.target.checked })}
                  />
                  <span>Featured Campaign</span>
                </label>
              </div>

              {/* Modal Footer */}
              <div style={ui.modalFooter}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={ui.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" style={ui.saveBtn}>
                  {editingCause ? 'Update Cause' : 'Create Cause'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Add / Edit Modal */}
      {isPkgModalOpen && (
        <div style={ui.modalOverlay}>
          <div style={{ ...ui.modalCard, maxWidth: '500px' }}>
            <div style={ui.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>
                {editingPkg ? `Edit Package: ${editingPkg.title}` : 'Add Package'}
              </h3>
              <button onClick={() => setIsPkgModalOpen(false)} style={ui.modalCloseBtn}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePkg} style={ui.modalForm}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={ui.fieldLabel}>Package Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wish Video"
                    value={pkgForm.title}
                    onChange={(e) => setPkgForm({ ...pkgForm, title: e.target.value })}
                    style={ui.fieldInput}
                  />
                </div>
                <div>
                  <label style={ui.fieldLabel}>Package ID (Number) *</label>
                  <input
                    type="number"
                    required
                    value={pkgForm.packageId}
                    onChange={(e) => setPkgForm({ ...pkgForm, packageId: Number(e.target.value) })}
                    style={ui.fieldInput}
                  />
                </div>
                <div>
                  <label style={ui.fieldLabel}>Price (₹)</label>
                  <input
                    type="number"
                    value={pkgForm.price}
                    onChange={(e) => setPkgForm({ ...pkgForm, price: Number(e.target.value) })}
                    style={ui.fieldInput}
                  />
                </div>
                <div>
                  <label style={ui.fieldLabel}>Image URL *</label>
                  <input
                    type="url"
                    required
                    value={pkgForm.image}
                    onChange={(e) => setPkgForm({ ...pkgForm, image: e.target.value })}
                    style={ui.fieldInput}
                  />
                </div>
              </div>

              <div style={ui.modalFooter}>
                <button type="button" onClick={() => setIsPkgModalOpen(false)} style={ui.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" style={ui.saveBtn}>
                  {editingPkg ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MODERN STYLES ──
const ui = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#0f172a',
  },
  toast: {
    position: 'fixed',
    top: '24px',
    right: '24px',
    zIndex: 9999,
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '600',
    fontSize: '14px',
    animation: 'fadeIn 0.3s ease',
  },
  nav: {
    height: '70px',
    backgroundColor: '#0c1427',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
  },
  navLogo: {
    height: '42px',
    objectFit: 'contain',
  },
  badge: {
    backgroundColor: '#009dff',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: '6px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  viewSiteBtn: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  adminInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#cbd5e1',
    padding: '0 8px',
  },
  adminEmail: {
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  main: {
    maxWidth: '1380px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '28px',
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  metricIconBox: (color) => ({
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: `${color}15`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  }),
  metricVal: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 1.2,
  },
  metricLabel: {
    fontSize: '13px',
    color: '#64748b',
    marginTop: '2px',
  },
  actionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '20px',
  },
  tabRow: {
    display: 'flex',
    gap: '8px',
    backgroundColor: '#e2e8f0',
    padding: '4px',
    borderRadius: '12px',
  },
  tabBtn: {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#475569',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  tabBtnActive: {
    backgroundColor: '#fff',
    color: '#009dff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  },
  primaryAddBtn: {
    backgroundColor: '#009dff',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '11px 20px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 14px rgba(0,157,255,0.3)',
  },
  tabContentCard: {
    backgroundColor: '#fff',
    borderRadius: '18px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    padding: '24px',
  },
  filterToolbar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  searchWrapper: {
    position: 'relative',
    maxWidth: '500px',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: '18px',
  },
  searchInput: {
    width: '100%',
    padding: '11px 36px 11px 40px',
    borderRadius: '10px',
    border: '1.5px solid #e2e8f0',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  clearSearchBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
  },
  catPillRow: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '4px',
  },
  catPill: {
    padding: '7px 14px',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    color: '#475569',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  catPillActive: {
    backgroundColor: '#009dff',
    borderColor: '#009dff',
    color: '#fff',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thRow: {
    borderBottom: '2px solid #e2e8f0',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '12px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tr: {
    borderBottom: '1px solid #f1f5f9',
    transition: 'background-color 0.15s',
  },
  td: {
    padding: '16px',
    verticalAlign: 'middle',
  },
  causeThumb: {
    width: '54px',
    height: '68px',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  causeTitle: {
    fontWeight: '700',
    color: '#0f172a',
    fontSize: '15px',
    marginBottom: '2px',
  },
  causeSlug: {
    fontSize: '12px',
  },
  slugLink: {
    color: '#009dff',
    textDecoration: 'none',
    fontWeight: '500',
  },
  causeTagline: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '4px',
    maxWidth: '400px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  badgeRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  categoryBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0284c7',
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  priceTag: {
    fontWeight: '700',
    fontSize: '15px',
    color: '#0f172a',
  },
  priceUnit: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#64748b',
  },
  statusPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.15s',
  },
  statusActive: {
    backgroundColor: '#dcfce7',
    color: '#15803d',
  },
  statusInactive: {
    backgroundColor: '#f1f5f9',
    color: '#94a3b8',
  },
  statusDot: (active) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: active ? '#16a34a' : '#94a3b8',
  }),
  actionBtns: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
  },
  editBtn: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  deleteBtn: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '6px 10px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  loadingBox: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#64748b',
  },
  emptyBox: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#64748b',
  },
  pkgGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  },
  pkgCard: {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
  },
  pkgImg: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
  },
  pkgBody: {
    padding: '14px',
  },
  pkgTitle: {
    margin: '0 0 6px 0',
    fontSize: '15px',
    fontWeight: '700',
  },
  pkgMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '12px',
  },
  pkgActions: {
    display: 'flex',
    gap: '8px',
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  analyticsCard: {
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  },
  progressBarBg: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#009dff',
    borderRadius: '4px',
  },
  // Modal UI
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 10000,
    backdropFilter: 'blur(3px)',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: '18px',
    width: '100%',
    maxWidth: '680px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    boxSizing: 'border-box',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
  },
  modalCloseBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#64748b',
  },
  modalForm: {
    padding: '24px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  formCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '6px',
    display: 'block',
  },
  fieldInput: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  previewImg: {
    width: '48px',
    height: '60px',
    borderRadius: '6px',
    objectFit: 'cover',
    border: '1px solid #e2e8f0',
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    backgroundColor: '#f8fafc',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#334155',
    cursor: 'pointer',
  },
  modalFooter: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '16px',
  },
  cancelBtn: {
    padding: '10px 18px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  saveBtn: {
    padding: '10px 22px',
    backgroundColor: '#009dff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,157,255,0.3)',
  },
};
