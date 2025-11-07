/*
 * Script to power the Lip Glaze catalog.
 *
 * Implements a simple shopping cart using localStorage for persistence.
 * Products are defined in a list and rendered dynamically. Cart operations
 * (add/remove/update) update both the UI and storage. Checkout form
 * submission clears the cart and redirects to a success page.
 */

(function () {
    // Translation dictionary for multi-language support (English and Indonesian)
    const translations = {
        en: {
            navProducts: 'Products',
            navCart: 'Cart',
            navShadeFinder: 'Shade Finder',
            heroTitle: 'Discover Your Perfect Lip Glaze',
            heroSubtitle: 'Explore our curated collection of luscious shades and finishes.',
            shopNow: 'Shop Now',
            sectionFeatured: 'Featured Products',
            addToCart: 'Add to Cart',
            viewDetails: 'View Details',
            cartTitle: 'Your Cart',
            cartProduct: 'Product',
            cartPrice: 'Price',
            cartQuantity: 'Quantity',
            cartSubtotal: 'Subtotal',
            cartAction: 'Action',
            totalLabel: 'Total:',
            continueShopping: 'Continue Shopping',
            checkoutButton: 'Checkout',
            checkoutTitle: 'Checkout',
            shippingInfo: 'Shipping Information',
            fullName: 'Full Name',
            email: 'Email',
            address: 'Address',
            phoneNumber: 'Phone Number',
            paymentMethod: 'Payment Method',
            creditCard: 'Credit Card',
            ewallet: 'E-Wallet',
            ewalletProvider: 'E‑Wallet Provider',
            ewalletNumber: 'E‑Wallet Number',
            cardName: 'Name on Card',
            cardNumber: 'Card Number',
            expiry: 'Expiry Date (MM/YY)',
            cvv: 'CVV',
            placeOrder: 'Place Order',
            successTitle: 'Thank You!',
            successMsg1: 'Your order has been placed successfully.',
            successMsg2: 'We\'ve sent a confirmation to your email.',
            backHome: 'Back to Home',
            testimonialsTitle: 'Testimonials',
            filterCategoryLabel: 'Category:',
            filterPriceLabel: 'Sort by:',
            categoryAll: 'All',
            categoryClassic: 'Classic',
            categoryGlossy: 'Glossy',
            categorySet: 'Set',
            categoryLuxury: 'Luxury',
            priceDefault: 'Default',
            priceLowHigh: 'Price: Low - High',
            priceHighLow: 'Price: High - Low',
            miniCartTitle: 'Cart',
            miniCartEmpty: 'Your cart is empty.',
            miniCartTotal: 'Total:',
            viewCart: 'View Cart',
            proceedCheckout: 'Checkout',
            productAdded: 'Product added to cart!',
            shadeFinderTitle: 'Shade Finder',
            shadeFinderIntro: 'Select your skin tone to get personalized recommendations.',
            toneFair: 'Fair',
            toneMedium: 'Medium',
            toneTan: 'Tan',
            toneDeep: 'Deep',
            findShade: 'Find My Shade',
            recommendedProducts: 'Recommended Products'
        },
        id: {
            navProducts: 'Produk',
            navCart: 'Keranjang',
            navShadeFinder: 'Shade Finder',
            heroTitle: 'Temukan Lip Glaze Sempurna Anda',
            heroSubtitle: 'Jelajahi koleksi warna dan hasil akhir yang memukau.',
            shopNow: 'Belanja Sekarang',
            sectionFeatured: 'Produk Unggulan',
            addToCart: 'Tambah ke Keranjang',
            viewDetails: 'Detail',
            cartTitle: 'Keranjang Anda',
            cartProduct: 'Produk',
            cartPrice: 'Harga',
            cartQuantity: 'Jumlah',
            cartSubtotal: 'Subtotal',
            cartAction: 'Aksi',
            totalLabel: 'Total:',
            continueShopping: 'Lanjut Belanja',
            checkoutButton: 'Checkout',
            checkoutTitle: 'Checkout',
            shippingInfo: 'Informasi Pengiriman',
            fullName: 'Nama Lengkap',
            email: 'Email',
            address: 'Alamat',
            phoneNumber: 'Nomor Telepon',
            paymentMethod: 'Metode Pembayaran',
            creditCard: 'Kartu Kredit',
            ewallet: 'E‑Wallet',
            ewalletProvider: 'Penyedia E‑Wallet',
            ewalletNumber: 'Nomor E‑Wallet',
            cardName: 'Nama pada Kartu',
            cardNumber: 'Nomor Kartu',
            expiry: 'Tanggal Kedaluwarsa (BB/TT)',
            cvv: 'CVV',
            placeOrder: 'Pesan Sekarang',
            successTitle: 'Terima Kasih!',
            successMsg1: 'Pesanan Anda telah berhasil dibuat.',
            successMsg2: 'Kami telah mengirim konfirmasi ke email Anda.',
            backHome: 'Kembali ke Beranda',
            testimonialsTitle: 'Testimoni',
            filterCategoryLabel: 'Kategori:',
            filterPriceLabel: 'Urutkan:',
            categoryAll: 'Semua',
            categoryClassic: 'Klasik',
            categoryGlossy: 'Glossy',
            categorySet: 'Set',
            categoryLuxury: 'Mewah',
            priceDefault: 'Default',
            priceLowHigh: 'Harga: Murah - Mahal',
            priceHighLow: 'Harga: Mahal - Murah',
            miniCartTitle: 'Keranjang',
            miniCartEmpty: 'Keranjang Anda kosong.',
            miniCartTotal: 'Total:',
            viewCart: 'Lihat Keranjang',
            proceedCheckout: 'Checkout',
            productAdded: 'Produk ditambahkan ke keranjang!',
            shadeFinderTitle: 'Shade Finder',
            shadeFinderIntro: 'Pilih warna kulit Anda untuk rekomendasi personal.',
            toneFair: 'Cerahan',
            toneMedium: 'Sedang',
            toneTan: 'Cokelat',
            toneDeep: 'Gelap',
            findShade: 'Temukan Shade Saya',
            recommendedProducts: 'Rekomendasi Produk'
        }
    };

    /**
     * Get current language from localStorage or default to 'en'.
     */
    function getCurrentLang() {
        return localStorage.getItem('lang') || 'en';
    }

    /**
     * Apply translations to elements with the data-i18n attribute. Also update
     * placeholders if data-i18n-placeholder is provided.
     */
    function applyTranslations() {
        const lang = getCurrentLang();
        document.documentElement.setAttribute('lang', lang);
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        // translate placeholders if present
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    /**
     * Setup language selector dropdown. When changed, save language to
     * localStorage and reapply translations. Also re-render products so that
     * dynamic button labels reflect the new language.
     */
    function setupLanguageSwitcher() {
        const select = document.getElementById('languageSelect');
        if (!select) return;
        // Set initial selection
        select.value = getCurrentLang();
        select.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('lang', lang);
            applyTranslations();
            // Re-render dynamic content such as products
            renderProducts();
            updateMiniCart();
            // update cart page translation of headers and buttons if present
            applyCartTranslations();
            // update shade finder recommendations if visible
            updateShadeRecommendations();
        });
    }

    /**
     * Apply translations specific to the cart page (table headings, buttons). This
     * is called when the language is changed or when the cart page is rendered.
     */
    function applyCartTranslations() {
        const lang = getCurrentLang();
        // Table headers
        const cartTable = document.getElementById('cartTable');
        if (cartTable) {
            const theadCells = cartTable.querySelectorAll('thead th');
            if (theadCells.length >= 5) {
                theadCells[0].textContent = translations[lang].cartProduct;
                theadCells[1].textContent = translations[lang].cartPrice;
                theadCells[2].textContent = translations[lang].cartQuantity;
                theadCells[3].textContent = translations[lang].cartSubtotal;
                theadCells[4].textContent = translations[lang].cartAction;
            }
        }
        // Cart title
        const cartTitleEl = document.querySelector('h2[data-i18n="cartTitle"]');
        if (cartTitleEl) {
            cartTitleEl.textContent = translations[lang].cartTitle;
        }
        // Continue shopping and checkout buttons
        const contBtn = document.querySelector('.btn-group a[href*="index.html"]');
        if (contBtn) {
            contBtn.textContent = translations[lang].continueShopping;
        }
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.textContent = translations[lang].checkoutButton;
        }
        // Total label
        const totalDiv = document.querySelector('.total');
        if (totalDiv) {
            // only replace the label before colon
            const parts = totalDiv.textContent.split(':');
            if (parts.length >= 2) {
                totalDiv.firstChild.textContent = translations[lang].totalLabel + ' ';
            }
        }
    }
    // Product catalog definition. Prices are in Indonesian Rupiah (IDR).
    const products = [
        {
            id: 1,
            name: 'Rosy Blush',
            price: 149000,
            image: 'images/lip2.png',
            description: 'A delicate rosy shade with a silky finish.',
            details: 'Soft pink hue with a silky finish that compliments fair to medium skin tones. Long‑lasting moisture and lightweight feel.',
            category: 'Classic',
            tones: ['fair', 'medium']
        },
        {
            id: 2,
            name: 'Coral Shine',
            price: 159000,
            image: 'images/lip3.png',
            description: 'Vibrant coral gloss for a bold, youthful look.',
            details: 'Vibrant coral gloss with high shine that brightens any complexion. Perfect for beach vibes and festive looks.',
            category: 'Glossy',
            tones: ['medium', 'tan', 'deep']
        },
        {
            id: 3,
            name: 'Glamour Pink',
            price: 139000,
            image: 'images/lip1.png',
            description: 'Classic pink glaze with a moisturizing touch.',
            details: 'Classic pink glaze enriched with vitamin E for hydration. Suitable for daily wear with a natural finish.',
            category: 'Classic',
            tones: ['fair', 'medium']
        },
        {
            id: 4,
            name: 'Trio Blossom',
            price: 189000,
            image: 'images/lip4.png',
            description: 'A set of three vibrant shades to match every mood.',
            details: 'A set of three vibrant shades—rosy, coral, and nude—in travel‑friendly sizes. Ideal for experimenting with different looks.',
            category: 'Set',
            tones: ['fair', 'medium', 'tan']
        },
        {
            id: 5,
            name: 'Golden Glam',
            price: 179000,
            image: 'images/lip5.png',
            description: 'Luxurious lipstick with a golden touch for a radiant look.',
            details: 'Luxurious lipstick with a hint of gold shimmer for a radiant finish. Enriched with antioxidants to nourish lips.',
            category: 'Luxury',
            tones: ['tan', 'deep']
        }
    ];

    // Selected category and sort order for product filtering
    let selectedCategory = 'all';
    let sortOrder = 'default';

    /**
     * Retrieve cart from localStorage.
     * @returns {Array}
     */
    function getCart() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart'));
            return Array.isArray(cart) ? cart : [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Save cart to localStorage.
     * @param {Array} cart
     */
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    /**
     * Update navigation cart count badge.
     */
    function updateNavCartCount() {
        const navCountEl = document.getElementById('navCartCount');
        if (!navCountEl) return;
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        navCountEl.textContent = totalItems;
    }

    /**
     * Render products on the home page.
     */
    function renderProducts() {
        const grid = document.getElementById('productGrid');
        if (!grid) return;
        grid.innerHTML = '';
        // Determine language for dynamic button labels
        const lang = getCurrentLang();
        // Create a shallow copy to avoid mutating original array
        let list = products.slice();
        // Filter by category
        if (selectedCategory && selectedCategory !== 'all') {
            list = list.filter(p => p.category === selectedCategory);
        }
        // Sort by price if needed
        if (sortOrder === 'asc') {
            list.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            list.sort((a, b) => b.price - a.price);
        }
        list.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card animate-on-scroll';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price">Rp&nbsp;${product.price.toLocaleString('id-ID')}</div>
                    <button class="btn-add" data-id="${product.id}">${translations[lang].addToCart}</button>
                    <button class="btn-details" data-id="${product.id}">${translations[lang].viewDetails}</button>
                </div>
            `;
            // Add to cart event
            const addBtn = card.querySelector('.btn-add');
            addBtn.addEventListener('click', () => addToCart(product.id));
            // Show product details modal
            const detailBtn = card.querySelector('.btn-details');
            detailBtn.addEventListener('click', () => showProductModal(product));
            grid.appendChild(card);
        });
        // After injecting cards, apply scroll animations again
        initScrollAnimations();
    }

    /**
     * Add a product to the cart by id.
     * @param {number} productId
     */
    function addToCart(productId) {
        let cart = getCart();
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
            }
        }
        saveCart(cart);
        updateNavCartCount();
        updateMiniCart();
        // Show message in current language
        const lang = getCurrentLang();
        alert(translations[lang]?.productAdded || 'Product added to cart!');
    }

    /**
     * Render the cart page table.
     */
    function renderCartPage() {
        const cartTable = document.getElementById('cartTable');
        if (!cartTable) return;
        const tbody = cartTable.querySelector('tbody');
        tbody.innerHTML = '';
        const cart = getCart();
        let total = 0;
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="display:flex; align-items:center; gap:0.75rem;">
                    <img class="cart-item-img" src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                </td>
                <td>Rp&nbsp;${item.price.toLocaleString('id-ID')}</td>
                <td>
                    <input type="number" class="quantity-input" min="1" value="${item.quantity}" data-id="${item.id}">
                </td>
                <td>Rp&nbsp;<span class="subtotal">${subtotal.toLocaleString('id-ID')}</span></td>
                <td><button class="btn-delete" data-id="${item.id}" style="background:none;color:#e91e63;border:none;cursor:pointer;">&times;</button></td>
            `;
            tbody.appendChild(tr);
        });
        document.getElementById('cartTotal').textContent = total.toLocaleString('id-ID');
        // Attach events for quantity change and delete
        tbody.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                let qty = parseInt(e.target.value);
                if (isNaN(qty) || qty < 1) {
                    qty = 1;
                    e.target.value = 1;
                }
                updateQuantity(id, qty);
            });
        });
        tbody.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                removeItem(id);
            });
        });
    }

    /**
     * Update quantity of an item in the cart.
     * @param {number} id
     * @param {number} qty
     */
    function updateQuantity(id, qty) {
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity = qty;
            saveCart(cart);
            renderCartPage();
            updateNavCartCount();
            updateMiniCart();
        }
    }

    /**
     * Remove an item from the cart.
     * @param {number} id
     */
    function removeItem(id) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
        renderCartPage();
        updateNavCartCount();
        updateMiniCart();
    }

    /**
     * Handle checkout form submission.
     */
    function handleCheckoutForm() {
        const form = document.getElementById('checkoutForm');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, process payment here.
            // Clear cart
            localStorage.removeItem('cart');
            // Redirect to success page
            window.location.href = 'success.html';
        });
    }

    // Initializers based on page context
    document.addEventListener('DOMContentLoaded', () => {
        // Apply translations to static text
        applyTranslations();
        // Setup language switcher dropdown
        setupLanguageSwitcher();
        // Setup filter controls for category and price sort
        setupFilterControls();
        // Render products grid with current filter/sort
        renderProducts();
        // Render cart page if present and apply translations
        renderCartPage();
        applyCartTranslations();
        // Setup mini cart and update nav count
        updateNavCartCount();
        setupMiniCart();
        updateMiniCart();
        // Setup product modal events
        setupProductModal();
        // Setup shade finder page if present
        setupShadeFinder();
        // Setup checkout page payment method toggling
        setupPaymentOptions();
        // Handle checkout form submission if present
        handleCheckoutForm();
        // Initialize scroll-triggered animations
        initScrollAnimations();
    });

    /**
     * Update translation of shade finder recommendation section after
     * language change. This ensures that Add to Cart buttons and the
     * recommendations heading reflect the current language without
     * requiring the user to regenerate recommendations.
     */
    function updateShadeRecommendations() {
        const lang = getCurrentLang();
        const resultsContainer = document.getElementById('shadeRecommendations');
        if (resultsContainer) {
            resultsContainer.querySelectorAll('.btn-add').forEach(btn => {
                btn.textContent = translations[lang].addToCart;
            });
        }
        const resultSection = document.getElementById('shadeResult');
        if (resultSection && !resultSection.classList.contains('hidden')) {
            const heading = resultSection.querySelector('h3[data-i18n="recommendedProducts"]');
            if (heading) {
                heading.textContent = translations[lang].recommendedProducts;
            }
        }
    }

    /**
     * Initialize scroll-triggered animations for elements with the class
     * `.animate-on-scroll`. When the element enters the viewport it will
     * receive the `animated` class which triggers CSS keyframe animations.
     */
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        if (!('IntersectionObserver' in window) || elements.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(el => observer.observe(el));
    }

    /**
     * Setup payment method toggling on the checkout page. When the user
     * selects a different payment method (credit card vs e‑wallet), the
     * corresponding input fields are shown and their required attributes
     * updated accordingly. This allows basic form validation to apply only
     * to the visible payment fields.
     */
    function setupPaymentOptions() {
        const cardFields = document.getElementById('cardFields');
        const ewalletFields = document.getElementById('ewalletFields');
        if (!cardFields || !ewalletFields) return;
        const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
        const cardInputs = cardFields.querySelectorAll('input');
        const ewalletProvider = document.getElementById('ewalletProvider');
        const ewalletNumber = document.getElementById('ewalletNumber');

        function updateFields() {
            const selected = document.querySelector('input[name="paymentMethod"]:checked')?.value;
            if (selected === 'ewallet') {
                // Show e‑wallet fields, hide card fields
                cardFields.classList.add('hidden');
                ewalletFields.classList.remove('hidden');
                // Set required attributes appropriately
                cardInputs.forEach(input => input.required = false);
                if (ewalletProvider) ewalletProvider.required = true;
                if (ewalletNumber) ewalletNumber.required = true;
            } else {
                // Show card fields, hide e‑wallet fields
                cardFields.classList.remove('hidden');
                ewalletFields.classList.add('hidden');
                // Set required attributes accordingly
                cardInputs.forEach(input => input.required = true);
                if (ewalletProvider) ewalletProvider.required = false;
                if (ewalletNumber) ewalletNumber.required = false;
            }
        }

        paymentRadios.forEach(radio => {
            radio.addEventListener('change', updateFields);
        });
        // Initialize on load
        updateFields();
    }

    /**
     * Setup category and price sort filter controls on the home page. When
     * the user changes the selected category or sort order, update the
     * corresponding variables and re-render the product grid.
     */
    function setupFilterControls() {
        const categorySelect = document.getElementById('categorySelect');
        const priceSortSelect = document.getElementById('priceSortSelect');
        if (categorySelect) {
            categorySelect.value = selectedCategory;
            categorySelect.addEventListener('change', (e) => {
                selectedCategory = e.target.value;
                renderProducts();
            });
        }
        if (priceSortSelect) {
            priceSortSelect.value = sortOrder;
            priceSortSelect.addEventListener('change', (e) => {
                sortOrder = e.target.value;
                renderProducts();
            });
        }
    }

    /**
     * Show the product detail modal for the given product. Populates the
     * modal content with product information such as image, name,
     * description, and extended details. Uses translation for modal
     * headings if needed.
     * @param {Object} product
     */
    function showProductModal(product) {
        const modal = document.getElementById('productModal');
        if (!modal) return;
        const imgEl = modal.querySelector('#modalImage');
        const nameEl = modal.querySelector('#modalName');
        const descEl = modal.querySelector('#modalDesc');
        const detailsEl = modal.querySelector('#modalDetails');
        // Populate fields
        if (imgEl) imgEl.src = product.image;
        if (nameEl) nameEl.textContent = product.name;
        if (descEl) descEl.textContent = product.description;
        if (detailsEl) detailsEl.textContent = product.details;
        modal.classList.add('open');
    }

    /**
     * Setup product modal events: attach close button handler and hide
     * modal when clicking outside of modal content.
     */
    function setupProductModal() {
        const modal = document.getElementById('productModal');
        if (!modal) return;
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('open');
            });
        }
        // Hide when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }

    /**
     * Update the mini cart displayed in the drop-down menu. Populates the
     * list of items and computes the total price. Translations are applied
     * to the empty message and labels.
     */
    function updateMiniCart() {
        const cartMenu = document.getElementById('cartMenu');
        if (!cartMenu) return;
        const listEl = document.getElementById('miniCartItems');
        const totalEl = document.getElementById('miniCartTotalPrice');
        const lang = getCurrentLang();
        const cart = getCart();
        if (listEl) listEl.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            if (listEl) {
                const li = document.createElement('li');
                li.textContent = translations[lang].miniCartEmpty;
                listEl.appendChild(li);
            }
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.className = 'mini-cart-item';
                li.innerHTML = `<span class="mini-cart-name">${item.name}</span> x${item.quantity} <span class="mini-cart-price">Rp&nbsp;${(item.price * item.quantity).toLocaleString('id-ID')}</span>`;
                total += item.price * item.quantity;
                if (listEl) listEl.appendChild(li);
            });
        }
        if (totalEl) {
            totalEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
        }
        // Apply translations to mini cart labels if present
        const miniCartTitle = document.getElementById('miniCartTitle');
        if (miniCartTitle) miniCartTitle.textContent = translations[lang].miniCartTitle;
        const miniCartTotalLabel = document.getElementById('miniCartTotalLabel');
        if (miniCartTotalLabel) miniCartTotalLabel.textContent = translations[lang].miniCartTotal;
        const viewCartBtn = document.getElementById('miniViewCartBtn');
        if (viewCartBtn) viewCartBtn.textContent = translations[lang].viewCart;
        const checkoutBtn = document.getElementById('miniCheckoutBtn');
        if (checkoutBtn) checkoutBtn.textContent = translations[lang].proceedCheckout;
    }

    /**
     * Setup the mini cart drop-down: toggle visibility on cart link click and
     * hide when clicking outside. Updates the cart content each time it
     * becomes visible.
     */
    function setupMiniCart() {
        const cartLink = document.querySelector('.cart-link');
        const cartMenu = document.getElementById('cartMenu');
        if (!cartLink || !cartMenu) return;
        cartLink.addEventListener('click', (e) => {
            // Prevent default navigation to cart page; the full cart can be
            // accessed via the View Cart button inside the menu
            e.preventDefault();
            cartMenu.classList.toggle('open');
            updateMiniCart();
        });
        // Hide mini cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartMenu.contains(e.target) && !cartLink.contains(e.target)) {
                cartMenu.classList.remove('open');
            }
        });
    }

    /**
     * Setup the shade finder page interactions. When the user selects a
     * skin tone and clicks the find button, recommended products are
     * displayed. Uses product tones property to determine matches.
     */
    function setupShadeFinder() {
        const findBtn = document.getElementById('shadeFinderBtn');
        if (!findBtn) return;
        findBtn.addEventListener('click', () => {
            const selectedToneInput = document.querySelector('input[name="skinTone"]:checked');
            if (!selectedToneInput) return;
            const selectedTone = selectedToneInput.value;
            const lang = getCurrentLang();
            const recommendations = products.filter(p => Array.isArray(p.tones) && p.tones.includes(selectedTone));
            const resultsContainer = document.getElementById('shadeRecommendations');
            const resultSection = document.getElementById('shadeResult');
            if (resultsContainer) resultsContainer.innerHTML = '';
            recommendations.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card animate-on-scroll';
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="price">Rp&nbsp;${product.price.toLocaleString('id-ID')}</div>
                        <button class="btn-add" data-id="${product.id}">${translations[lang].addToCart}</button>
                    </div>
                `;
                card.querySelector('.btn-add').addEventListener('click', () => addToCart(product.id));
                if (resultsContainer) resultsContainer.appendChild(card);
            });
            if (resultSection) resultSection.classList.remove('hidden');
            initScrollAnimations();
        });
    }
})();