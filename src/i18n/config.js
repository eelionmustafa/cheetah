import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      navigation: {
        ourStory: 'Our Story',
        categories: 'Categories',
        products: 'Products',
        profile: 'Profile',
        login: 'Login',
        signup: 'Sign Up',
        cart: 'Shopping Cart'
      },

      home: {
        welcome: 'Welcome to Cheetah',
        tagline: 'Discover amazing products at lightning-fast speeds',
        shopNow: 'Shop Now',
        learnMore: 'Learn More',
        featuredProducts: 'Featured Products',
        addToCart: 'Add to Cart',
        addedToCart: 'Added to your cart successfully!'
      },

      footer: {
        about: 'About Cheetah',
        aboutText: 'Your one-stop destination for all your shopping needs. Fast, reliable, and secure shopping experience.',
        quickLinks: 'Quick Links',
        contact: 'Contact Us',
        connect: 'Connect With Us',
        rights: 'All rights reserved.'
      },

      dashboard: {
        overview: 'Dashboard Overview',
        totalUsers: 'Total Users',
        totalOrders: 'Total Orders',
        activeDeliveries: 'Active Deliveries',
        totalRevenue: 'Total Revenue',
        products: 'Products',
        users: 'Users',
        orders: 'Orders',
        deliveries: 'Deliveries',
        reports: 'Reports',
        settings: 'Settings',
        userDashboard: 'User Dashboard',
        welcomeMessage: 'Welcome to your dashboard! Here you can manage your orders and profile.'
      },

      delivery: {
        deliveryDashboard: 'Delivery Dashboard',
        todaysDeliveries: "Today's Deliveries",
        completed: 'Completed',
        pending: 'Pending',
        inProgress: 'In Progress',
        filterStatus: 'Filter Status',
        allDeliveries: 'All Deliveries',
        searchAddress: 'Search Address',
        customer: 'Customer',
        address: 'Address',
        time: 'Time',
        items: 'Items',
        status: 'Status',
        complete: 'Complete'
      },

      categories: {
        title: 'Product Categories',
        searchPlaceholder: 'Search categories...',
        sortBy: 'Sort By',
        sortByName: 'Name',
        sortByPopularity: 'Popularity',
        electronics: 'Electronics',
        electronicsDesc: 'Latest gadgets and electronic devices',
        fashion: 'Fashion',
        fashionDesc: 'Trendy clothing and accessories',
        homeLiving: 'Home & Living',
        homeLivingDesc: 'Furniture and home decor',
        sports: 'Sports',
        sportsDesc: 'Sports equipment and accessories',
        books: 'Books',
        booksDesc: 'Books and educational materials',
        beauty: 'Beauty',
        beautyDesc: 'Cosmetics and beauty products'
      },

      products: {
        title: 'Our Products',
        searchPlaceholder: 'Search products...',
        sortBy: 'Sort By',
        sortByName: 'Name',
        sortByPrice: 'Price',
        laptop: 'Laptop',
        laptopDesc: 'High-performance laptop for work and gaming',
        smartphone: 'Smartphone',
        smartphoneDesc: 'Latest smartphone with advanced features',
        headphones: 'Headphones',
        headphonesDesc: 'Premium wireless headphones',
        smartwatch: 'Smartwatch',
        smartwatchDesc: 'Smart wearable with health tracking',
        tablet: 'Tablet',
        tabletDesc: 'Versatile tablet for work and entertainment',
        camera: 'Camera',
        cameraDesc: 'Professional digital camera'
      },

      ourStory: {
        title: 'Our Story',
        subtitle: 'The Journey of Cheetah - Speed, Style, and Success',
        beginning: {
          title: 'The Beginning',
          text: 'Cheetah was born from a simple idea: to create an e-commerce platform that combines the speed and agility of a cheetah with the reliability and trust of a well-established marketplace. Our journey began in 2024 with a small team of passionate individuals who shared a vision of revolutionizing online shopping.'
        },
        mission: {
          title: 'Our Mission',
          text: 'We strive to provide our customers with a seamless shopping experience, offering a wide range of products at competitive prices. Our commitment to speed, reliability, and customer satisfaction sets us apart in the e-commerce landscape.'
        },
        values: {
          title: 'Our Values',
          text: 'Speed: We believe in fast and efficient service, just like the cheetah. Quality: We ensure that every product meets our high standards. Trust: We build lasting relationships with our customers through transparency and reliability.'
        },
        future: {
          title: 'Our Future',
          text: 'As we continue to grow, we remain committed to our core values while embracing innovation and technology. We envision Cheetah becoming the leading e-commerce platform, known for its speed, reliability, and customer-centric approach.'
        }
      },

      login: {
        title: 'Login',
        email: 'Email Address',
        password: 'Password',
        submit: 'Sign In',
        noAccount: "Don't have an account?",
        signup: 'Sign Up',
        error: 'Invalid email or password',
        roleSelect: 'Select Role',
        roleAdmin: 'Admin',
        roleDelivery: 'Delivery Person',
        roleUser: 'User'
      },

      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        total: 'Total',
        checkout: 'Checkout',
        quantity: 'Quantity',
        remove: 'Remove item',
        addToCart: 'Add to cart',
        updateCart: 'Update cart',
        clearCart: 'Clear cart',
        itemAdded: 'Item added to cart',
        itemRemoved: 'Item removed from cart',
        cartCleared: 'Cart cleared',
        quantityUpdated: 'Quantity updated',
        continueShopping: 'Continue Shopping',
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        free: 'Free',
        decreaseQuantity: 'Decrease quantity',
        increaseQuantity: 'Increase quantity'
      },

      checkout: {
        title: 'Checkout',
        shipping: 'Shipping',
        payment: 'Payment',
        review: 'Review',
        back: 'Back',
        next: 'Next',
        placeOrder: 'Place Order',
        thankYou: 'Thank you for your order!',
        orderConfirmation: 'Your order has been placed and will be delivered soon.',
        continueShopping: 'Continue Shopping',
        shippingInfo: 'Shipping Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        address: 'Address',
        city: 'City',
        state: 'State/Province',
        zipCode: 'Zip / Postal Code',
        country: 'Country',
        phone: 'Phone Number',
        paymentInfo: 'Payment Information',
        paymentMethod: 'Payment Method',
        creditCard: 'Credit Card',
        cardName: 'Name on card',
        cardNumber: 'Card number',
        expDate: 'Expiry date',
        cvv: 'CVV',
        paypalInfo: 'You will be redirected to PayPal to complete your payment.',
        payWithPaypal: 'Pay with PayPal',
        orderReview: 'Order Review',
        shippingDetails: 'Shipping Details',
        paymentDetails: 'Payment Details',
        orderItems: 'Order Items',
        quantity: 'Quantity',
        subtotal: 'Subtotal',
        total: 'Total',
        required: 'This field is required',
        orderSuccess: 'Order placed successfully!',
        orderError: 'There was an error placing your order. Please try again.'
      },

      orderConfirmation: {
        thankYou: 'Thank you for your order!',
        orderPlaced: 'Your order has been successfully placed.',
        orderNumber: 'Order Number',
        emailSent: 'A confirmation email has been sent to your email address.',
        whatsNext: 'What\'s Next?',
        trackOrder: 'Track Your Order',
        orderHistory: 'View Order History',
        contactSupport: 'Contact Support',
        continueShopping: 'Continue Shopping',
        loading: 'Loading your order details...',
        estimatedDelivery: 'Estimated Delivery',
        trackOrderDesc: 'Check the status and location of your order in real-time.',
        orderHistoryDesc: 'View all your past orders and their details.',
        needHelp: 'Need Help?',
        needHelpDesc: 'Our support team is here to help with any questions about your order.',
        trackButton: 'Track Order',
        viewOrders: 'View Orders',
        contactOptions: 'Contact Options',
        emailUs: 'Email Us',
        callUs: 'Call Us',
        whatsapp: 'WhatsApp Us',
        trackingInfo: 'Your order #{orderNumber} is being processed and will be shipped soon.',
        trackingError: 'There was an error tracking your order. Please try again later.',
        fetchError: 'There was an error fetching your order details. Please try again later.',
        error: 'Error',
        currentStatus: 'Current Status',
        processing: 'Processing'
      },

      auth: {
        register: {
          title: 'Create Account',
          firstName: 'First Name',
          lastName: 'Last Name',
          username: 'Username',
          email: 'Email',
          phone: 'Phone Number',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          submit: 'Register',
          loginLink: 'Already have an account? Login'
        },
        login: {
          title: 'Login',
          email: 'Email',
          password: 'Password',
          submit: 'Login',
          registerLink: "Don't have an account? Register"
        }
      },

      common: {
        loading: 'Loading...'
      }
    }
  },
  al: {
    translation: {
      // Navigation
      'nav.ourStory': 'Historia Jonë',
      'nav.categories': 'Kategoritë',
      'nav.products': 'Produktet',
      'nav.profile': 'Profili',
      'nav.login': 'Hyr',
      'nav.signup': 'Regjistrohu',
      'nav.cart': 'Shporta e Blerjeve',

      // Home page
      'home.welcome': 'Mirë se vini në Cheetah',
      'home.tagline': 'Zbuloni produkte të mahnitshme me shpejtësi të shkëlqyeshme',
      'home.shopNow': 'Bli Tani',
      'home.learnMore': 'Mëso Më Shumë',
      'home.featuredProducts': 'Produktet e Veçanta',
      'home.addToCart': 'Shto në Shportë',
      'home.addedToCart': 'U shtua në shportën tuaj me sukses!',

      // Footer
      'footer.about': 'Rreth Cheetah',
      'footer.aboutText': 'Destinacioni juaj i vetëm për të gjitha nevojat tuaja të blerjeve. Eksperiencë e shpejtë, e besueshme dhe e sigurt blerjeje.',
      'footer.quickLinks': 'Lidhje të Shpejta',
      'footer.contact': 'Na Kontaktoni',
      'footer.connect': 'Lidhuni Me Ne',
      'footer.rights': 'Të gjitha të drejtat e rezervuara.',

      // Dashboard
      'dashboard.overview': 'Përmbledhja e Paneli',
      'dashboard.totalUsers': 'Totali i Përdoruesve',
      'dashboard.totalOrders': 'Totali i Porosive',
      'dashboard.activeDeliveries': 'Dorëzimet Aktive',
      'dashboard.totalRevenue': 'Të Ardhurat Totale',
      'dashboard.products': 'Produktet',
      'dashboard.users': 'Përdoruesit',
      'dashboard.orders': 'Porositë',
      'dashboard.deliveries': 'Dorëzimet',
      'dashboard.reports': 'Raportet',
      'dashboard.settings': 'Cilësimet',
      'dashboard.userDashboard': 'Paneli i Përdoruesit',
      'dashboard.welcomeMessage': 'Mirë se vini në panelin tuaj! Këtu mund të menaxhoni porositë dhe profilin tuaj.',

      // Delivery Dashboard
      'delivery.deliveryDashboard': 'Paneli i Dorëzimeve',
      'delivery.todaysDeliveries': 'Dorëzimet e Sotme',
      'delivery.completed': 'E Përfunduar',
      'delivery.pending': 'Në Pritje',
      'delivery.inProgress': 'Në Proces',
      'delivery.filterStatus': 'Filtro Sipas Statusit',
      'delivery.allDeliveries': 'Të Gjitha Dorëzimet',
      'delivery.searchAddress': 'Kërko Adresën',
      'delivery.customer': 'Klienti',
      'delivery.address': 'Adresa',
      'delivery.time': 'Koha',
      'delivery.items': 'Artikujt',
      'delivery.status': 'Statusi',
      'delivery.complete': 'Përfundo',

      // Categories
      'categories.title': 'Kategoritë e Produkteve',
      'categories.searchPlaceholder': 'Kërko kategoritë...',
      'categories.sortBy': 'Rendit Sipas',
      'categories.sortByName': 'Emrit',
      'categories.sortByPopularity': 'Popullaritetit',
      'categories.electronics': 'Elektronika',
      'categories.electronicsDesc': 'Pajisjet dhe veglat elektronike më të fundit',
      'categories.fashion': 'Moda',
      'categories.fashionDesc': 'Veshje dhe aksesorë të modës',
      'categories.homeLiving': 'Shtëpi & Jetë',
      'categories.homeLivingDesc': 'Mobilje dhe dekorim shtëpie',
      'categories.sports': 'Sporte',
      'categories.sportsDesc': 'Pajisje dhe aksesorë sportive',
      'categories.books': 'Libra',
      'categories.booksDesc': 'Libra dhe materiale edukative',
      'categories.beauty': 'Bukuri',
      'categories.beautyDesc': 'Kozmetikë dhe produkte bukurie',

      // Products
      'products.title': 'Produktet e Veçanta',
      'products.searchPlaceholder': 'Kërko produktet...',
      'products.sortBy': 'Rendit Sipas',
      'products.sortByName': 'Emrit',
      'products.sortByPrice': 'Cmimi',
      'products.laptop': 'Laptop',
      'products.laptopDesc': 'Laptop i performancës së larta për punë dhe lojë',
      'products.smartphone': 'Smartphone',
      'products.smartphoneDesc': 'Smartphone i fundit me funksione avancuar',
      'products.headphones': 'Këputë',
      'products.headphonesDesc': 'Këputë të pavarur të lira',
      'products.smartwatch': 'Smartwatch',
      'products.smartwatchDesc': 'Smartwearable me ndjekje të shëndetit',
      'products.tablet': 'Tablet',
      'products.tabletDesc': 'Tablet e shumëfunksionalitetit për punë dhe lojë',
      'products.camera': 'Kamera',
      'products.cameraDesc': 'Kamera digitale profesionale',

      // Our Story
      'ourStory.title': 'Historia Jonë',
      'ourStory.subtitle': 'Journey e Cheetah - Shpejtësi, Stil dhe Sukses',
      'ourStory.beginning.title': 'Fillimi',
      'ourStory.beginning.text': 'Cheetah u lind nga një ide e thjeshtë: të krijojmë një platformë e-commerce që kombinon shpejtësinë dhe shkathtësinë e gepardit me besueshmërinë dhe besimin e një tregu të vendosur. Journeyja jonë filloi në vitin 2024 me një ekip të vogël të individëve të pasionuar që ndanin një vizion për revolucionizimin e blerjeve online.',
      'ourStory.mission.title': 'Misioni Ynë',
      'ourStory.mission.text': 'Ne përpiqemi të ofrojmë klientëve tanë një eksperiencë blerjeje të lehtë, duke ofruar një gamë të gjerë produktesh me çmime konkurruese. Angazhimi ynë për shpejtësi, besueshmëri dhe kënaqësinë e klientit na dallon në peizazhin e e-commerce.',
      'ourStory.values.title': 'Vlerat Tona',
      'ourStory.values.text': 'Shpejtësi: Ne besojmë në shërbim të shpejtë dhe efikas, pikërisht si gepardi. Cilësi: Ne sigurojmë që çdo produkt të përmbushë standardet tona të larta. Besim: Ne ndërtojmë marrëdhënie të qëndrueshme me klientët tanë përmes transparencës dhe besueshmërisë.',
      'ourStory.future.title': 'E Ardhmja Jonë',
      'ourStory.future.text': 'Ndërsa vazhdojmë të rritemi, mbetemi të përkushtuar ndaj vlerave tona themelore ndërsa përqafojmë inovacionin dhe teknologjinë. Ne e shohim Cheetah si platformën kryesore të e-commerce, e njohur për shpejtësinë, besueshmërinë dhe qasjen e saj të fokusuar në klient.',

      // Login
      'login.title': 'Hyr',
      'login.email': 'Adresa e Emailit',
      'login.password': 'Fjalëkalimi',
      'login.submit': 'Hyr',
      'login.noAccount': 'Nuk keni llogari?',
      'login.signup': 'Regjistrohu',
      'login.error': 'Email ose fjalëkalim i pavlefshëm',
      'login.roleSelect': 'Zgjidhni Rolin',
      'login.roleAdmin': 'Administrator',
      'login.roleDelivery': 'Personi i Dorëzimit',
      'login.roleUser': 'Përdorues',

      // Cart translations
      cart: {
        title: 'Shporta e Blerjeve',
        empty: 'Shporta juaj është e zbrazët',
        total: 'Totali',
        checkout: 'Përfundo Blerjen',
        quantity: 'Sasia',
        remove: 'Hiq produktin',
        addToCart: 'Shto në shportë',
        updateCart: 'Përditëso shportën',
        clearCart: 'Pastro shportën',
        itemAdded: 'Produkti u shtua në shportë',
        itemRemoved: 'Produkti u hoq nga shporta',
        cartCleared: 'Shporta u pastrua',
        quantityUpdated: 'Sasia u përditësua',
        continueShopping: 'Vazhdo Blerjen',
        orderSummary: 'Përmbledhja e Porosisë',
        subtotal: 'Nëntotali',
        shipping: 'Transporti',
        free: 'Falas',
        decreaseQuantity: 'Ul sasinë',
        increaseQuantity: 'Rrit sasinë'
      },

      // Checkout translations
      checkout: {
        title: 'Përfundimi i Blerjes',
        shipping: 'Transporti',
        payment: 'Pagesa',
        review: 'Rishikimi',
        back: 'Kthehu',
        next: 'Vazhdo',
        placeOrder: 'Vendos Porosinë',
        thankYou: 'Faleminderit për porosinë tuaj!',
        orderConfirmation: 'Porosia juaj është vendosur dhe do të dërgohet së shpejti.',
        continueShopping: 'Vazhdo Blerjen',
        shippingInfo: 'Informacioni i Transportit',
        firstName: 'Emri',
        lastName: 'Mbiemri',
        address: 'Adresa',
        city: 'Qyteti',
        state: 'Shteti/Rajoni',
        zipCode: 'Kodi Postar',
        country: 'Shteti',
        phone: 'Numri i Telefonit',
        paymentInfo: 'Informacioni i Pagesës',
        paymentMethod: 'Metoda e Pagesës',
        creditCard: 'Kartë Krediti',
        cardName: 'Emri në kartë',
        cardNumber: 'Numri i kartës',
        expDate: 'Data e skadimit',
        cvv: 'CVV',
        paypalInfo: 'Ju do të ridrejtoheni te PayPal për të përfunduar pagesën tuaj.',
        payWithPaypal: 'Paguaj me PayPal',
        orderReview: 'Rishikimi i Porosisë',
        shippingDetails: 'Detajet e Transportit',
        paymentDetails: 'Detajet e Pagesës',
        orderItems: 'Produktet e Porosisë',
        quantity: 'Sasia',
        subtotal: 'Nëntotali',
        total: 'Totali',
        required: 'Kjo fushë është e detyrueshme',
        orderSuccess: 'Porosia u vendos me sukses!',
        orderError: 'Pati një gabim gjatë vendosjes së porosisë suaj. Ju lutemi provoni përsëri.'
      },

      // Order Confirmation translations
      orderConfirmation: {
        thankYou: 'Faleminderit për porosinë tuaj!',
        orderPlaced: 'Porosia juaj u vendos me sukses.',
        orderNumber: 'Numri i Porosisë',
        emailSent: 'Një email konfirmimi është dërguar në adresën tuaj të emailit.',
        whatsNext: 'Çfarë Më tej?',
        trackOrder: 'Gjurmo Porosinë Tuaj',
        orderHistory: 'Shiko Historinë e Porosive',
        contactSupport: 'Kontakto Mbështetjen',
        continueShopping: 'Vazhdo Blerjen',
        loading: 'Duke ngarkuar detajet e porosisë...',
        estimatedDelivery: 'Dorëzimi i Vlerësuar',
        trackOrderDesc: 'Kontrollo statusin dhe vendndodhjen e porosisë suaj në kohë reale.',
        orderHistoryDesc: 'Shiko të gjitha porositë e tua të mëparshme dhe detajet e tyre.',
        needHelp: 'Keni nevojë për ndihmë?',
        needHelpDesc: 'Ekipi ynë i mbështetjes është këtu për t\'ju ndihmuar me çdo pyetje rreth porosisë suaj.',
        trackButton: 'Gjurmo Porosinë',
        viewOrders: 'Shiko Porositë',
        contactOptions: 'Opsionet e Kontaktit',
        emailUs: 'Na Shkruani',
        callUs: 'Na Telefononi',
        whatsapp: 'Na Kontaktoni në WhatsApp',
        trackingInfo: 'Porosia juaj #{orderNumber} po procesohet dhe do të dërgohet së shpejti.',
        trackingError: 'Pati një gabim gjatë gjurmimit të porosisë suaj. Ju lutemi provoni përsëri më vonë.',
        fetchError: 'Pati një gabim gjatë marrjes së detajeve të porosisë suaj. Ju lutemi provoni përsëri.',
        error: 'Gabim',
        currentStatus: 'Statusi Aktual',
        processing: 'Duke Procesuar'
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 