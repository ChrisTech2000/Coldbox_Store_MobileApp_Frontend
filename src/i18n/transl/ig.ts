import { Translations } from './en';

export default {
  appVersion: {
    newVersion: 'A new version of Coldtivate is available!', // TODO
    pleaseUpdate: 'Please update app before continuing.', // TODO
  },
  languages: {
    current: 'Bekee',
    label: 'Asụsụ',
    options: {
      en: 'Bekee',
      hi: 'Hindi',
      or: 'Oriya',
      gu: 'Gujarati',
      fr: 'French',
      pt: 'Portuguese',
      ig: 'Igbo', // TODO
      yo: 'Yoruba', // TODO
      ha: 'Hausa', // TODO
    },
  },
  gender: { female: 'Nwanyi', male: 'Nwoke', other: 'nke Ọzọ' },
  navigation: {
    error: {
      errorMessage: ' ọ dị ka ihe a agaghị nke ọma.',
      tryAgainMessage: 'Biko mekwa ya ọzọ ma emechaa.',
      serverErrorMessage:
        'Oopsy! Ọ dị ka ihe mere n’akụkụ anyị. Biko nwalee ọzọ n’oge ọzọ ma ọ bụ kpọtụrụ nkwado.',
    },
    auth: {
      SignIn: "Banye n'ime",
      SignUp: 'Debanye aha',
      ForgotPassword: 'Chefuru okwuntughe (Forgot Password)',
      PasswordReset: 'Tọgharia (Reset)',
      AppInfo: 'App ozi',
      Logout: 'Wepụ',
    },
    management: {
      Root: 'Njikwa',
      CompanyDetails: 'Nkọwa ụlọ ọrụ',
      RevenueAnalysis: 'Nyocha ego',
      UsageAnalysis: 'Nyocha ojiji ya',
      Locations: 'Ebe ano',
      AddLocation: 'Tinye ebe',
      EditLocation: 'Dezie ebe',
      CoolingUnits: 'Ngalaba jụrụ oyi ( cooling Units)',
      DisabledCoolingUnitsDescription: 'Tinye opekata mpe otu ebe.',
      CoolingUsers: 'Ndị ọrụ jụrụ oyi',
      AddCoolingUser: 'Tinye onye ọrụ jụrụ oyi',
      EditCoolingUser: 'Dezie onye ọrụ jụrụ oyi',
      AddCoolingUnit: 'Tinye nkeji jụrụ oyi',
      EditCoolingUnit: 'Dezie nkeji jụrụ oyi',
      Operators: 'Arụ ọr',
      AddOperator: 'Tinye onye ọrụ',
      EditOperator: 'Onye ọrụ ndezi',
      RegisteredEmployee: 'Onye ọrụ edebanyere aha',
      AddRegisteredEmployee: 'Tinye onye ọrụ edebanyere aha',
      RegisteredEmployeeDetails: 'Nkọwa ndị ọrụ edebanyere aha',
      DeliveryContacts: 'Delivery Contacts', // TODO
      AddUserBankAccount: '{{user}} Bank Account', // TODO
    },
    bottomTabs: {
      RootMainTabStack: 'Coldtivate  {{firstName}}',
      ProduceDetails: '{{produceCode}}',
      MarketplaceSettings: 'Ntọala ebe ahịa',
      PriceTrend: 'Usoro ọnụahịa',
      PriceRanking: 'Ogo ọnụahịa',
      Planner: 'Nhazi',
      RoomConditions: 'ỌNỌDỤ ỤLỌ',
      CratesInfo: 'OZI CRATES',
      Dashboard: 'Dashboard',
      History: 'Akụko',
      MarketPrice: 'Ọnụ ahịa',
      CoolingUnits: 'Ngalaba jụrụ oyi ( cooling Units)',
      Analytics: 'Analytics',
      CheckIn: 'Ngwa banye',
      CheckOut: 'Puo ebe a ahu',
      Maps: 'MAP',
    },
    dashboard: {
      AccountDetails: 'Nkọwa akaụntụ',
      PersonalDetails: 'Nkọwa nkeonwe',
      LocalizationPreferences: 'Mmasị mpaghara',
      ContactsSharing: 'Ịkekọrịta kọntaktị',
      Coupons: 'Ụgwọ akwụkwọ',
      CouponsActiveTab: 'Na-arụ ọrụ',
      CouponsRevokedTab: 'A kagburu',
      Marketplace: 'Ebe ana azu ahịa',
      MarketplaceFilters: 'Ihe nzacha',
      MarketplaceAllTab: 'Ha niile',
      MarketplaceFavoritesTab: 'ọkacha mma',
      Orders: 'Iwu',
      MyOrders: 'Iwu m',
      MySales: 'My Sales', // TODO
      OrderDetails: '{{orderCode}}',
      KnowledgeHub: 'Ebe Ọmụmamihe',
      QuitTutorial: 'Wepụ nkuzi',
      FAQ: 'AJỤJỤ NA AZỊZA',
      About: 'Ihe gbasara ya',
      Management: 'Njikwa',
      Tutorial: 'Nkuzi',
      PayoutOptions: 'Nhọrọ ịkwụ ụgwọ',
      PaymentMethods: 'Ụzọ ezi akwụ ụgwọ',
      Wallet: ' akpa',
      Transactions: 'Azụmahịa',
      Transaction: '{{id}}',
      ShoppingCart: 'Shopping Cart', // TODO
    },
    checkIn: {
      SelectCropType: 'Họrọ ụdị ihe ọkụkụ ichoro',
      CheckIn: 'Kwanye:',
      CropList: '{{cropType}}',
      CrateSetup: 'Kwanye:',
      CrateWeightAndPricing: 'Crate arọ na ọnụahịa',
    },
    about: {
      comsolAgreement: 'COMSOL nkwekọrịta ikike ịgba ọsọ 6.0',
      userLicense: 'Nkwekọrịta ikike onye ọrụ njedebe',
      aboutComsol: 'Banyere COMSOL',
      privacyPolicy: 'Amụma nzuzo',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: 'Nnyocha ahịa maka {{farmer}}',
      BaseSurvey: 'Nyocha onye ọrụ jụrụ oyi',
    },
    analytics: { methodology: 'Usoro' },
  },
  actions: {
    error: 'Njehie mere ebe a',
    cancel: 'Kagbuo',
    confirm: 'Gosi',
    import: 'Bubata',
    yes: 'Ee',
    no: 'Mba',
    select: 'Họrọ',
    close: 'Mechie',
    delete: 'Hichapụ',
    ok: 'Ọ DỊ MMA',
    all: 'Ha niile',
    none: 'Ọ dịghị',
    next: 'ozo',
    back: 'Azu',
    search: 'Chọọ...',
    or: 'ma ọ bụ',
    add: 'Tinye',
    edit: 'Ndezi',
    go: 'Gaawa',
    done: 'Emechaala',
    'not-available': 'Ọ dịghị',
    'complete-later': 'Mezue ma emechaa',
    'update-success': 'Emelitere ya nke ọma',
    'save-changes': 'chekwaa mgbanwe',
    save: 'Chekwa',
    continue: 'Aga nihu',
    update: 'update', // TODO
    clearAll: 'Clear all', // TODO
    apply: 'Apply', // TODO
  },
  components: {
    datePicker: {
      heading: 'Select a date', // TODO
      clearButtonLabel: 'Kpochapụ',
      confirmButtonLabel: 'Gosi',
      placeholder: 'ụbọchị /Onwa/afọ',
      startDateSelection: 'Họrọ ụbọchị mmalite:',
      endDateSelection: 'Họrọ ụbọchị ngwụcha:',
      startDateError: 'Ụbọchị mmalite enweghị ike ịbụ mgbe ọ bụla karịa ụbọchị ngwụcha.',
      endDateError: 'Ụbọchị ngwụcha enweghị ike ịbụ tupu ụbọchị mmalite.',
    },
  },
  Auth: {
    welcomePopup:
      "NnỌ na Coldtivate! Ọ bụrụ na ị bụ onye ọrụ ugbo, onye na-azụ ahịa ma ọ bụ nwee mmasị ịzụrụ ngwaahịa echekwara n'ime ụlọ oyi, biko debanye aha site na ịpị 'Debanye aha dị ka onye ọrụ jụrụ oyi ma ọ bụ onye na-azụta ihe'. Ọ bụrụ na ị na-arụ ọrụ maka ụlọ ọrụ jụrụ oyi, biko kpọtụrụ ndị ọrụ gị ka ịlele ma ụlọ ọrụ gị edebanyere aha. Ọ bụrụ na ọ bụ, ndị ọrụ gị kwesịrị iziga gị oku SMS ka ị denye aha dị ka onye ọrụ edebanyere aha ma ọ bụ onye ọrụ. Ọ bụrụ na ọ bụghị, ị nwere ike ịdebanye aha ụlọ ọrụ, ma debanye aha dị ka onye ọrụ edebanyere aha. Biko lelee ngalaba 'Agwa' maka ajụjụ ajụjụ.",
    Root: {
      welcome: 'Nnọọ na Coldtivate',
      signIn: 'Banye aka na',
      signUpCompany: 'Debanye aha dị ka ụlọ ọrụ',
      signUpCoolingUser: 'Debanye aha dị ka onye na-ajụ oyi ma ọ bụ onye na-azụ ahịa',
      appInfo: 'App ozi',
    },
    SignIn: {
      heading: 'Banye aka na',
      accounts: {
        registeredEmployee: {
          label: 'Onye ọrụ edebanyere aha',
          description:
            "Nchikota nke onwe riri Akụkụ nke ndị na-eweta ụlọ oyi. Onye ọrụ edebanyere aha nwere ike ịdebanye aha ụlọ ọrụ na ngwa ma kpọọ ndị ọrụ ndị ọzọ ka ha sonye. Ndị ọrụ edebanyere aha nwere ike ịbanye na email ma ọ bụ nọmba ekwentị., rere na Echefuola ma ọ bụ ree n'okpuru ọnụahịa ahịa kwesịrị ịdị nhata na mkpokọta emepụta.",
        },
        operator: {
          label: 'Onye ọrụ',
          description:
            'Akụkụ nke ndị na-ahụ maka ndị na-eweta ụlọ oyi. Onye ọrụ edebanyere aha nwere ike ịdebanye aha ụlọ ọrụ na ngwa ma kpọọ ndị ọrụ ndị ọzọ ka ha sonye. Ndị ọrụ edebanyere aha nwere ike ịbanye na email ma ọ bụ nọmba ekwentị.',
        },
        coolingUser: {
          label: 'Onye ji ulo oyi ime ihe',
          description:
            'Onye ọrụ ụlọ oyi na ndị ahịa. Ndị ọrụ ugbo, ndị na-azụ ahịa, ndị na-ere ahịa nwere ike ịnweta smartphone nwere ike ịbanye ebe a. Ndị ọrụ ụlọ oyi na-enweghị smartphone nwere ike ịnweta ozi nke ngwa ahụ site na ịga na ime ụlọ oyi na iso onye ọrụ na-emekọrịta ihe. Ndị na-azụ ahịa nwere ike ịbanye ebe a iji wuchaa ịzụrụ ihe.',
        },
        toasts: {
          login:
            'Aha njirimara ma ọ bụ paswọọdụ ezighi ezi. Biko gosi na ị họrọla ọrụ onye ọrụ ziri ezi',
          success: 'A banye nke ọma',
        },
      },
      form: {
        user: {
          placeholder: 'Email/nọmba ekwentị',
          description: {
            default: 'Biko nye nọmba ekwentị bara uru (nwere koodu obodo).',
            registeredEmployee: 'Biko nye email/nọmba ekwentị bara uru (nwere koodu obodo).',
          },
          messages: {
            default: 'Achọrọ nọmba ekwentị.',
            registeredEmployee: 'A chọrọ adreesị ozi-e ma ọ bụ akara ekwentị.',
          },
        },
        password: { placeholder: 'Okwungafe', messages: { required: 'Achọrọ paswọọdụ' } },
        actions: { logIn: "Banye n'ime" },
      },
    },
    SignUp: {
      select: {
        header: 'Họrọ {{fieldName}}',
        label: 'Chọọ...',
        cancel: 'Kagbuo',
        ok: 'Ọ DỊ MMA',
      },
      welcome: 'Nnọọ na Coldtivate',
      schema: {
        passwordError:
          'Okwuntughe gị kwesịrị ịdị ogologo ma ọ dịkarịa ala mkpụrụedemede 8, nwere otu mkpụrụedemede ukwu na otu obere mkpụrụedemede, yana nọmba.',
        confirmPasswordError: 'Nkwenye okwuntughe bụ iwu.',
        passwordsMismatchError: 'Okwuntughe ndị ahụ adabaghị.',
        countryError: 'Nhọrọ obodo bụ iwu.',
        firstNameError: 'Aha mbụ bụ iwu.',
        lastNameError: 'Aha ikpeazụ bụ iwu.',
        phoneError: 'Nọmba ekwentị bụ iwu.',
        invalidPhoneError: 'Nọmba ekwentị ezighi ezi',
        languageError: 'Asụsụ bụ iwu.',
        genderError: 'Nhọrọ nwoke na nwanyị bụ iwu.',
        termsError: 'Ikwesiri ikwenye na Usoro ojiji.',
        companyError: 'Aha ụlọ ọrụ bụ iwu.',
        currencyError: 'Nhọrọ ego bụ iwu.',
        emailError: 'Email bụ iwu.',
        malformedEmailError: 'Email ezighi ezi.',
      },
      commonForm: {
        firstNameLabel: 'Aha Mbu',
        lastNameLabel: 'Aha ikpeazụ',
        phoneLabel: 'Nọmba ekwentị (nwere koodu obodo)',
        passwordLabel: 'Okwungafe',
        confirmPasswordLabel: 'Kwado paswọọdụ',
        countryFieldName: 'Obodo',
        genderFieldName: 'Okike',
        submit: 'Debanye aha',
        terms: {
          agree: 'Ekwenyere m na Coldtivate',
          license: 'Nkwekọrịta ikike onye ọrụ(User License Agreement)',
          privacy: 'Nzuzo (Privacy) Iwu',
          and: 'na',
          comsol: 'Usoro eji aru oru',
        },
      },
      SignUpCompany: {
        companyHeader: 'Debanye aha ụlọ ọrụ',
        userHeader: 'Debanye aha onye ọrụ aha',
        companyNameLabel: 'Aha ụlọ ọrụ',
        emailLabel: 'Email',
        currencyFieldName: 'Ego',
        modal: {
          warning: 'Ọ bụrụ na ịdebanye aha na-enweghị ekwentị ụfọdụ ọrụ agaghị arụ ọrụ:',
          reasons: { '1': 'Ịtọgharịa akaụntụ', '2': 'Ịnata nnata (receipt) sms' },
          buttons: { continue: "Gaa n'ihu na agbanyeghị", addPhone: 'Tinye ekwentị' },
        },
      },
      SignUpCoolingUser: {
        header: 'Debanye aha dị ka onye na-ajụ oyi ma ọ bụ onye na-azụ ahịa',
        languageFieldName: 'Asụsụ',
      },
      toasts: {
        error:
          'Please ensure your details are accurate and try again. Note that one phone number and email can only be used by one account.', // TODO
      },
    },
    ForgotPassword: {
      heading: 'Chefuru okwuntughe (Forgot Password)',
      messageSentNotification: 'Ọ bụrụ na nọmba ekwentị dị, ezipụla SMS ka ịtọgharịa paswọọdụ gị.',
      instructions:
        'Iji tọgharịa paswọọdụ gị, biko tinye akara ekwentị na koodu obodo ya, nke ejikọrọ akaụntụ ahụ.',
      phoneInputLabel: 'Nọmba ekwentị',
      resetButton: 'Tọgharia (Reset)',
      requestLimitMessage: 'Request limit reached. Try again in 2 hours.', // TODO
    },
    ResetPassword: {
      schema: {
        passwordError:
          'Okwuntughe gị kwesịrị ịdị ogologo ma ọ dịkarịa ala mkpụrụedemede 8, nwere otu mkpụrụedemede ukwu na otu obere mkpụrụedemede, yana nọmba.',
        confirmPasswordError: 'Nkwenye okwuntughe bụ iwu.',
        passwordsMismatchError: 'Okwuntughe ndị ahụ adabaghị.',
      },
      passwordLabel: 'Paswọd ọhụrụ',
      confirmPasswordLabel: 'Kwado paswọọdụ',
      resetButton: 'Tọgharia (Reset)',
    },
    Invite: {
      heading: 'Nnọọ na Coldtivate',
      employee: 'Akpọrọ gị òkù ka I bụrụ onye ọrụ. Biko dejupụta fọm ka ịmechaa ndebanye aha gị.',
      operator: 'Akpọrọ gị òkù ka onye ọrụ. Biko dejupụta fọm ka ịmechaa ndebanye aha gị.',
      fields: {
        password:
          'Opekempe mkpụrụedemede asatọ, opekata mpe otu mkpụrụedemede ukwu, otu obere mkpụrụedemede na otu nọmba.',
      },
    },
  },
  Dashboard: {
    TemperatureAlert: {
      title: 'Ntụle okpomọkụ',
      subtitle: 'Anyị chọpụtara na e nwere mgbanwe. Ndị a bụ ngwa ahịa dị ugbu a na nchekwa.',
      edit: 'Ị chọrọ dezie okpomọkụ ya ?',
      temperature: 'okpomọkụ',
      newTemperature: 'Okpomọkụ ọhụrụ',
      confirm: 'Kwenye na-okpomọkụ ọhụrụ',
      continueWithoutUpdate: "Gaa n'ihu na-enweghị mmelite",
      sensorHint: "Enweghị ike ịgbakwunye okpomọkụ n'ihi na ejikọrọ ihe mmetụta na nkeji jụrụ oyi.",
      latestTemperature: 'Edebara aha okpomọkụ kachasị ọhụrụ na {{date}}.',
    },
    emptyGeneral: "N'oge a, enweghị data dị.",
    emptyCoolingUser:
      "Ihe ndị dị na nchekwa ga-apụta na dashboard mgbe ị na-eme opekata mpe otu nbanye n'ime ụlọ ọ bụla.",
    noCompanyAvailable: 'Enweghị ụlọ ọrụ dị',
    noCoolingUnitAvailable: 'Enweghị otu nju oyi dị',
    noLocationsAvailable:
      'Nnọọ na Coldtivate. Bido site na ịgbakwunye ebe ino na app gi nke di na panel njikwa gi.',
    coolingUserNavigateToMarketplace:
      'Interested in purchasing produce stored in cold rooms? Visit the Marketplace tab in the lower right!', // TODO
    MarketPrice: {
      emptyState: 'Ọnụ ahịa ahịa adịghị na obodo gị',
      'no-data-found': 'Enweghị data ahụrụ maka nchikota ahịa na ngwa ahịa a',
      commodityLabel: 'Ngwaahịa',
      commodityModalTitle: 'Ngwa horo ngwaahịa',
      Trend: {
        title: 'Họrọ ngwa ahịa na steeti iji nweta amụma ọnụahịa',
        emptyState: 'Enweghị data ahụrụ maka nchikota ahịa na ngwa ahịa a',
        pastLabel: 'Mgbe Gara aga',
        stateLabel: 'Steeti',
        stateModalTitle: 'Họrọ steeti',
        forecastLabel: 'amụma',
        chartLabel: 'Ọnụ ahịa na {{currency}}/KG',
      },
      Ranking: {
        filter: 'Wepụta site na ebeọnọ',
        monthLabel: 'onwa',
        monthModalTitle: 'Họrọ ọnwa',
        stateModalTitle: 'Họrọ steeti',
        stateLabel: 'Steeti',
        table: {
          column1: 'Steeti',
          column2: 'ụbọchị',
          column3: 'Ọnụ ahịa na {{currency}}/KG',
          emptyState: 'Ọnweghị uru dị',
        },
        'location-placeholder': 'Steeti / Mpaghara / Ahịa',
        'market-district-state': 'Ahịa / Mpaghara / Steeti',
        'district-label': 'Họrọ mpaghara',
        'district-placeholder': 'Mpaghara',
        'market-label': 'Họrọ ahịa',
        'market-placeholder': 'Ahịa',
        'select-warning': 'Biko mee nhọrọ maka mpaghara ọ bụla',
      },
    },
    CrateManagement: {
      userModalTitle: 'Họrọ onye ọrụ jụrụ oyi:',
      addUserLink:
        'Onye ọrụ jụrụ oyi adịghị na ndepụta? Tinye onye ọrụ si Management ➜ Cooling User ➜ +',
      coolingUserLabel: 'Onye ji ulo oyi ime ihe',
      selectCoolingUnitLabel: 'Họrọ nkeji jụrụ oyi',
      coolingUnitLabel: 'ngalaba jụrụ oyi',
      noUnitWarning: 'Biko họrọ otu jụrụ oyi',
      noCratesWarning: 'Onye ji ulo  jụrụ oyi aru oru enweghị igbe ọ bụla na ngalaba ulo oyi a',
      operationError: 'Ọ nwere ihe adịghị mma. Biko nwaa ọzọ ma emechaa.',
      FarmerSurvey: {
        warningMessage: 'Biko dejupụta nyocha nke ntọala maka',
        modal: {
          weeklyQuantityQuestion:
            "Gịnị bụ ọnụ ọgụgụ {{crop}} ị na-emepụta ma ọ bụ na-azụ ahịa n'ime otu izu?",
          cropSpoilageQuestion: 'Kedu ihe i chere kpatara mkpuruosisi na ihe ubi gi ji emebi?',
          marketPriceQuestion: 'Nkezi ọnụ ahịa ahịa kwa izu mgbe a na-ere {{crop}}',
          quantityDistributionQuestion: "Ego ole n'ime nke ahụ ka bụ",
          selfConsumed: 'Nke eriri na Onwe ({{unit}})',
          sold: 'Nke e rere ({{unit}})',
          lost: "Nke furu efu ma o bu nke noo n'okpuru ọnụahịa ahịa ({{unit}})",
          totalQuantity: "Nchikọta ọnụ ọgụgụ emepụtara n'ime otu izu",
          unitWeight: 'Nke ọ bụla {{crate}} bụ',
          selectSpoilageReasonsPlaceholder: 'Họrọ ihe niile metụtara',
          priceLabel: 'Onu ahịa',
          priceUnit: 'kwa {{unit}}',
          commodityShortlist: 'Ndepụta Ngwaahịa ndi ahoputara',
          unit: {
            kg: 'kg',
            crates: 'crates',
            boxes: 'Igbe',
            sacks: 'Akpa',
            baskets: 'Nkata',
            singular: {
              kg: 'kg',
              crates: 'Crati',
              boxes: 'igbe',
              sacks: 'akpa',
              baskets: 'nkata',
            },
          },
          reasonsForLoss: {
            improperHarvest: 'owuwe ihe ubi ma ọ bụ njikwa na-ezighi ezi',
            inappropriateStorage: 'Nchekwa na-ekwesịghị ekwesị / enweghị nchekwa ochie',
            overproduction: 'Mmepụta karịrị akarị',
            transportationDamage: 'Mmebi nke njem',
            pest: 'Ihe ojoo',
            diseases: 'Ọrịa',
            weather: 'Ọnọdụ ihu igwe dị oke egwu',
            price: 'Ọnụ ahịa ahịa dị ala',
            other: 'nke Ọzọ',
          },
          errorMessages: {
            number: 'Ga-abụrịrị ọnụọgụ na-abụghị efu, nke ziri ezi',
            reasonsForSpoilage: 'Biko webata opekata mpe otu ihe kpatara ya.',
            totalMismatch:
              "Nchikota nke onwe, rere na Echefuola ma ọ bụ rere n'okpuru ọnụ ahịa ahịa kwesịrị ịha nhata ngụkọta arụpụtara.",
            cropError: 'Biko họrọ ngwa ahịa',
          },
        },
      },
      CheckOut: {
        selectCrateMessage: 'Họrọ igbe ndị ịchọrọ iwepụ',
        selectAll: 'Họrọ ihe niile',
        checkIn: 'Kwanye:',
        days: 'Ubọchi',
        day: 'üböchï',
        daysLeft: '{{amount}} ụbọchị fọdụrụ',
        ttp: 'TTP',
        numberOfCrates: 'Ọnụọgụ nke crates',
        totalWeight: 'Mkpokọta ibu',
        priceType: 'Ụdị ọnụahịa',
        crate: 'Crati',
        pricePerProduct: 'Ọnụ ahịa kwa ngwaahịa',
        calculatedPrice: 'Ọnụ ego agbakọrọtara',
        discount: 'Mbelata',
        priceWithDiscount: 'Mkpokọta ọnụ ahịa',
        paymentType: {
          label: 'Ụdị ịkwụ ụgwọ',
          cash: 'Ego',
          creditCard: 'Kaadị kredit',
          bankTransfer: 'Bank Transfer', // TODO
        },
        bankTransfer: {
          title: "Receiver's Details", // TODO
          accountName: 'Account Name', // TODO
          accountNumber: 'Account Number', // TODO
          bankName: 'Bank Name', // TODO
        },
        paid: 'Akwụ ụgw',
        lockedWithinPendingOrders:
          'Crates that are locked in pending orders cannot be checked out.', // TODO
      },
      CheckIn: {
        emptyState: 'Ọnweghị igbe agbakwunyere',
        addCrates: 'Tinye Crates',
        cratesAddedLabel: 'Crates Added', // TODO
        checkInWithCode: 'Jiri koodu banye',
        estimatedCost: 'Ọnụ ego echere eche',
        pricing: 'Nye  ọnụahịa',
        day: 'üböchï',
        successMessage: 'A na-enyocha igbe nke ọma',
        emptyMessage: 'Biko tinye opekata mpe otu igbe na ndenye aha gị',
        noPlannedDaysMessage:
          'Ụbọchị echere na-efu efu na ụfọdụ ihe ndi a. Enweghị ike ịgbakọ ọnụ ahịa echere.',
        seeMore: 'See more', // TODO
        seeLess: 'See less', // TODO
        listed: 'Listed', // TODO
        WithCode: {
          modalTitle: 'Mepụta ndi itinyere site na nlele dị adị',
          modalDescription:
            "Ị ga-achọ koodu nlele a ka ịmalite nlele ọhụrụ n'ụzọ dị otú a. Ọ bụrụ na ịnweghị ya, tụlee ịmalite nlele ọhụrụ. Ọ bụrụ na ị maara ogologo oge ị na-acho ime atụmatụ ịchekwa  gi, tụlee ịgbakwunye ọnụ ọgụgụ nke ụbọchị ebe a.",
          codeLabel: 'Tinye Koodu',
          codeErrorMessage: 'Achọrọ koodu',
          failedMessage:
            "Check in failed. Please make sure your code hasn't been used already or contact support.", // TODO
        },
        SelectCropType: {
          fruits: 'Mkpụrụ osisi',
          vegetables: 'Akwụkwọ nri',
          rootVegetables: 'Akwụkwọ nri mgbọrọgwụ',
          other: 'Ihe ndị ọzọ',
        },
        SelectCrop: {
          additionalInfo: 'Ozi nkowa mgbakwunye',
        },
        Setup: {
          selectedCrop: 'Ihe ubi ahọpụtara',
          changeCropButton: 'Pịa ebe a ka ịgbanwee ihe ọkụkụ',
          individualCrateWeightButton: 'Pịa ebe a ka dezie ibu crate onye ọ bụla',
          individualCrateIdButton: 'Pịa ebe a iji dezie NJ onye ọ bụla',
          numberOfCratesLabel: 'Ọnụọgụ nke crates',
          crateWeightLabel: 'General arọ nke crate',
          pricePerDayAndCrateLabel: 'Ọnụahịa kwa ụbọchị / crate',
          pricePerDayAndKilogramLabel: 'Ọnụ ego kwa ụbọchị / kg',
          fixedPriceLabel: 'Ọnụ ahịa edobere',
          totalPriceLabel: 'Mkpokọta ọnụ ahịa',
          plannedDaysLabel: 'ọnụọgụ ụbọchị Ezubere na nchekwa ya',
          harvestDateLabel: 'Olee mgbe e wetara ihe ubi ahụ?',
          harvestDateValues: {
            today: 'Taa',
            yesterday: 'Unyiahu',
            dayBefore: 'Ụbọchị abụọ gara aga',
            evenBefore: 'Ma Ọbụ nwanne unyiahu',
          },
          crateWeightAndPricing: {
            applyAll: 'Apply to all', // TODO
            list: 'List for sale', // TODO
            addMore: 'Add more', // TODO
            sellingPrice: 'Listing selling price', // TODO
            potentialSellingPrice: 'Potential selling value', // TODO
            info: 'The price configuration refers to product sale, not cooling storage fee.', // TODO
            unavailableId: 'ID not set', // TODO
          },
          cratesError: 'Biko tinye nọmba igbe dị mma',
          crateWeightError: 'Biko tinye igbe dị mma',
          harvestDateError: 'Achọrọ ụbọchị owuwe ihe ubi',
          modals: {
            weight: "Tọọzie ibu nke Crates onye o bula n'otu n'otu",
            id: 'Tọọ NJ onye ọ bụla nke crates',
            crateLabel: 'Crati',
            selectInitialId: 'Biko tọọ akara ngosi mmalite',
            serialize: 'Serialize',
          },
        },
      },
    },
    CoolingUnitsPlanner: {
      SelectCoolingUnit: { label: 'ngalaba jụrụ oyi: {{name}}', header: 'Họrọ nkeji jụrụ oyi' },
      occupancy: 'Ọnụduọ di ugbu a na ngalaba jụrụ oyi',
      week: 'Izu a',
      today: 'Taa',
    },
    CoolingUnitsRoomConditions: {
      heading: 'Akụkọ okpomọkụ',
      temperature: 'okpomọkụ',
      lastUpdated: 'Emelitere ikpeazụ na {{date}}',
      enterTemperature: 'Tinye okpomọkụ',
      toasts: { confirmation: 'Agbanwechara okpomọkụ nke ọma' },
    },
    CoolingUnitsCratesInfo: {
      commodity: 'Ngwaahịa',
      percentage: 'Percenti',
      weight: 'Ibu',
      crates: 'crates',
      optimalTemp: 'T°C kacha mma',
      messages: {
        empty:
          "Ebe obibi na ọnọdụ okpomọkụ dị jụụ ga-apụta ebe a mgbe ịmechara opekata mpe otu nbanye n'ime ụlọ ọ bụla.",
      },
    },
    CoolingUnitsMaps: {
      singleCommodity: 'Otu ọnụ ụlọ ngwa ahịa: {{crop}}',
      multiCommodity: 'Ụlọ ọtụtụ ngwaa ahia',
      publicMaker: 'Ngalaba jụrụ oyi ọha',
      usedMarker: 'Ngwa jụrụ oyi ị jirila ruo oru',
    },
    Company: { SelectCompany: { label: 'Aha ụlọ ọrụ: {{name}}', header: 'Họrọ ụlọ ọrụ' } },
    ProduceDetails: {
      seeDetails: 'Hụ nkọwa',
      kilogram: 'kg',
      coolingUser: 'Onye ji ulo oyi ime ihe',
      contact: 'Kpọtụrụ',
      contactCopied: 'Eṅomiri!',
      crates: 'crates',
      crate: 'Crati',
      cropType: "Udi  mkpuruosisi maobu ihe enwetara n'ubi",
      numberOfCrates: 'Ọnụọgụ nke crates',
      crateIds: 'NJ Crate',
      combinedWeight: 'Ibu ejikọtara onu',
      remainingTime: 'Oge fọdụrụ iji buru ya',
      currentStorageDays: 'Ụbọchị nchekwa dị ugbu a',
      plannedDays: 'Ụbọchị akwadoro',
      pricePerDay: 'Ọnụahịa / ụbọchị',
      plannedStorageCost: 'Ọnụ ego nchekwa ahaziri',
      pickUp: "Bulie n'ime",
      days: 'Ubọchi',
      noDTMessage: 'Ngwa ahịa a nweghi Ụdị ndụ achoro.',
      checkOutButton: 'Puo ebe a ahu',
      cratesListedForSale: '{{amount}} crate(s) marked as listed for sale', // TODO
      preSaleError:
        "Please note: You can't change the listing status of crates with pending orders. If this doesn't seem to apply, please contact support for assistance.", // TODO
      operatorNoBankAccountWarning:
        "{{name}} doesn't have bank account details in order to receive payouts for their sales. Please add their Bank Account details in case they shared those with you.", // TODO
      farmerNoBankAccountWarning:
        "You don't have a Bank Account defined to receive payouts on your sales. Please add your Bank Account details", // TODO
      operatorNoCompanyBankAccount:
        "This cooling unit doesn't support marketplace listings. Please reach out to the company's manager to handle this matter.", // TODO
      employeeNoBankAccount:
        "This company doesn't have a Payouts Bank Account set up that enables receiving funds for both produces and cooling fees sold in the marketplace. Set it up to allow crates in your cooling units to be listed in the marketplace.", // TODO
      addBankAccountButton: 'Add bank account details', // TODO
      addBankAccountHeader:
        "You're setting up the bank account details on behalf of {{name}}. Please insert this data carefully as you'll not be able to make changes to it afterwards.", // TODO
      userWithoutPhone:
        'Crates belonging to this account cannot be listed for sale as no bank account can be linked to User without a phone', // TODO
    },
    SearchFilter: {
      detailsMessage:
        'Chọọ nbanye site na iji ụdị ihe ọkụkụ, aha onye ọrụ ugbo, ụbọchị nchekwa, ụbọchị fọdụrụ na nchekwa, ma ọ bụ koodu nbanye',
      idMessage: 'Chọọ igbe site na iji nọmba NJ ejiri chọpụta otu crate',
      crateDetailsButton: 'Chọọ nkọwa Crate',
      crateIdButton: 'Chọọ ID Crate',
      searchLabel: 'Chọọ...',
    },
    SortMenu: {
      title: 'Hazie site na',
      options: {
        cropType: "Udi  mkpuruosisi maobu ihe enwetara n'ubi",
        timeToPick: 'Oge iburu',
        checkInDate: 'Lelee ụbọchị (nke mbụ ruo ọhụrụ)',
        checkInDateReverse: 'Lelee ụbọchị (nke kachasị ọhụrụ na nke mbụ)',
        coolingUser: 'Aha njirimara',
      },
    },
    Management: {
      Delivery: {
        companyName: 'Company name', // TODO
        companyNamePlaceholder: 'Insert company name', // TODO
        companyNameError: 'Please insert the company name', // TODO
        contactName: 'Contact name', // TODO
        contactNamePlaceholder: 'Insert contact name', // TODO
        contactNameError: 'Please insert the contact name', // TODO
        phoneNumber: 'Phone number', // TODO
        phoneNumberPlaceholder: 'Insert phone number', // TODO
        emptyMessage: 'No contacts have been added yet', // TODO
        deleteContactMessage: 'Are you sure you want to delete this contact?', // TODO
        noAvailableContacts: 'There are no available contacts for this particular cooling unit.', // TODO
        contactedAddedSuccessfully: 'Contact added successfully.', // TODO
      },
      Location: {
        emptyState: 'Enweghị ebe agbakwunyere. Pịa na akara + ka ịgbakwunye otu.',
        text: { invited: 'Akpọrọ ({{amount}})', registered: 'Debanye aha ({{amount}})' },
        chips: {
          address: 'Adreesị',
          coordinates: 'Achikota',
          geolocation: 'Geolocation ekwentị',
        },
        fieldErrorMessages: {
          latitude: 'Enter a number between -90 and 90 (e.g., 34.0522)', // TODO
          longitude: 'Enter a number between -180 and 180 (e.g., -118.2437)', // TODO
        },
        fields: {
          name: 'Aha',
          latitude: 'Latitude',
          longitude: 'Longitude',
          country: 'Obodo',
          state: 'Steeti',
          city: 'Obodo',
          zipCode: 'Koodu nzi ozi',
          street: 'Okporo ámá',
          streetNumber: 'Nọmba okporo ụzọ',
        },
        modal: {
          message: "Ọrụ a ga-ehichapụ akụkụ niile jụrụ oyi metụtara ebe a. Ị chọrọ ịga n'ihu?",
        },
        actions: { currentLocation: 'Họrọ ebe dị ugbu a' },
        toasts: {
          addLocationSuccess: 'agbakwunyere Ebe ano nke ọma',
          editLocationSuccess: 'Ebe edeziri nke ọma',
          removeLocationSuccess: 'E ehichapụrụ ebe {{name}} nke ọma.',
          failedToFetchLocation:
            'Unable to retrieve the location. Please check the address and try again.', // TODO
          positionCancelled: 'Location request canceled.', // TODO
          positionUnauthorized: 'Location denied. Please grant permission to continue.', // TODO
          locationUnavailable: 'Location disabled. Please enable to continue.', // TODO
          locationSubmissionError: 'An error occurred. Please review your location and try again.', // TODO
        },
      },
      Operators: {
        banner:
          'Mgbe ịgbakwunye onye ọrụ, ha ga-enweta sms nwere ozi, ebe ha nwere ike ịgbalite akaụntụ ha.',
        text: { gender: 'Okike', ma: 'Nwoke', fe: 'Nwanyi', ot: 'nke Ọzọ' },
        fields: {
          selectCoolingUnit: 'Họrọ nkeji jụrụ oyi',
          coolingUnits: 'Ngalaba jụrụ oyi ( cooling Units)',
        },
        actions: { invite: 'ikpọku', save: 'chekwaa mgbanwe' },
      },
      AddOperator: {
        messages: {
          operator: 'Iji sonye na ngwa Coldtivate dị ka onye ọrụ na ulo oyi a, gaa na: {{link}}',
        },
        toasts: {
          success: 'Onye ọrụ akpọrọ a nabata nke ọma',
        },
        phoneFormat: 'Gbaa mbọ hụ na akara ekwentị etinyere nwere koodu obodo.',
      },
      EditOperator: { toasts: { success: 'E deziela Onye ọrụ  nke ọma' } },
      AddCoolingUser: { toasts: { add: 'Tinye onye ọrụ jụrụ oyi' } },
      CompanyDetails: {
        labels: {
          name: 'Aha',
          uploadLogo: 'Bulite akara ngosi',
          logo: 'Logo',
          country: 'Obodo',
          commodity: 'Ndepụta Ngwaahịa ndi ahoputara',
          currency: 'Ego',
        },
        headings: {
          country: 'Họrọ obodo',
          commodity: 'Ngwa horo ngwaahịa',
          currency: 'Họrọ ego',
        },
        actions: { save: 'chekwaa mgbanwe' },
        toasts: {
          success: 'Edeziri ya nke ọma',
          photoLibrary: 'Permission Denied: Please enable access to your Photo Library.', // TODO
        },
      },
      RegisteredEmployee: {
        invited: 'Akpọrọ ({{amount}})',
        registered: 'Debanye aha ({{amount}})',
      },
      RegisteredEmployeeDetails: {
        deletePersonal: 'Iji hichapụ akaụntụ gị, gaa na nkọwa akaụntụ.',
        deleteOther: 'Ọ bụrụ na ịchọrọ ihichapụ akaụntụ a, biko kpọtụrụ  {{contact}}',
      },
      AddRegisteredEmployee: {
        message: 'Iji sonye na ngwa Coldtivate dị ka onye ọrụ edebanyere aha, gaa na: {{link}}',
        toasts: { success: 'Onye ọrụ edebanyere aha na-akpọ nke ọma' },
      },
      CoolingUsers: {
        modals: {
          selectMethod: 'Kedu ka ịchọrọ  i si ịgbakwunye onye ọrụ ulo oyi?',
          userCode: 'Tinye koodu njirimara',
          userCodeDesc:
            'Ị nwere ike ịchọta koodu ahụ na nkọwa akaụntụ gị ma ọ bụrụ na ị debanyere aha dị ka onye ọrụ ji ulo jụrụ oyi aru oru.',
          addByCode: 'Tinye onye ọrụ site na koodu',
          addWithDetails: 'Tinye onye ọrụ na nkọwa ya',
        },
        toasts: {
          notFound: 'Ọnweghị onye ọrụ jụrụ oyi nwere koodu njirimara a.',
          taken: 'Onye ọrụ a abanyelarị na ndepụta ndị ji ulo jụrụ oyi aru oru.',
        },
      },
      EditCoolingUsers: {
        accountDetails: 'Payout Details', // TODO
        toasts: {
          noSurveys: 'No surveys have been completed yet.', // TODO
          warning:
            "Enweghị ike ihichapụ akaụntụ a n'ihi na onye ọrụ nwere nbanye na-arụ ọrụ na nkeji jụrụ oyi {{names}}. Biko gwa onye ọrụ ka ọ bịa n'ime ụlọ ka ọ buru ihe ndị a wee mechaa ndenye ọpụpụ tupu ihichapụ akaụntụ ahụ!",
          confirmation:
            "Ị ji n'aka na ịchọrọ ihichapụ onye ọrụ a na ndepụta ndị ọrụ jụrụ oyi? Ọrụ a ga-ehichapụ onye ọrụ jụrụ oyi na enweghị ike ịtụgharị ya ozo!",
          edit: 'Onye ọrụ jụrụ oyi edeziri nke ọma',
          noCoolingUnits: 'Ị nweghị nkeji jụrụ oyi',
          updateSuccess: 'Emelitere nke ọma',
        },
        pdf: {
          dateRange: 'Oke ụbọchị',
          selectedUnits: 'Ngalaba jụrụ oyi ahọpụtara',
          coolingUnit: 'ngalaba jụrụ oyi',
        },
        actions: {
          downloadFarmers: 'Budata dashboard nke onye ọrụ ugbo',
          completeLater: 'Mezue ma emechaa',
        },
      },
      CoolingUnit: {
        emptyState: 'Enweghị nkeji nju oyi agbakwunyere na ebe a. Pịa akara + ka ịgbakwunye otu.',
      },
      AddCoolingUnit: {
        heading: 'Njirimara unit jụrụ oyi',
        fields: {
          name: 'NJirimara otu jụrụ oyi',
          location: 'Ebe',
          coolingUnitType: 'Kedu ihe na-akọwa nkeji jụrụ oyi kacha mma?',
          metricUnit: 'Nkeji',
          price: 'Onu ahịa',
          capacityInMetricTons: 'Mkpokọta olu efu',
          foodCapacityInMetricTons: 'Oke nri',
          roomSizeHeading: 'Nha nkeji jụrụ oyi',
          length: 'Ogologo',
          width: 'Obosara',
          height: 'Elu',
          weight: 'Ibu',
          roomInsulator: 'Insulator',
          capacityInNumberCrates: 'Ọnụ ọgụgụ kacha elu nke crates',
          crateWeight: 'Ọkọlọtọ arọ nke crate',
          crateSizeHeading: 'Akụkụ nke ọkọlọtọ ọkọlọtọ',
          editableCheckins: 'Mee ndebanye aha ka ndị ọrụ na-edezi',
          sensorAvailable: 'Sensọ dị',
          public:
            'Ịchọrọ ime ka ngalaba jụrụ oyi hụ maka ndị nwere ike ji ya ruo oru na odi na ihu. (ebe, ụdị ọnụ ụlọ, ikike na ozi ọnụahịa)?',
          crops: 'Ngwaahịa',
          selectCrops: 'Họrọ ngwa ahịa ndia',
          refrigerantType: 'Ụdị refrigerant eji',
          amountRefrigerant: 'Ọnụ olee ka refrigerant na ada',
          powerConsumptionInMt: 'Ole ka okuike na eri nke nkeji jụrụ oyi kwa MT',
          dailyRoomWattage: 'Wattage ụlọ kwa ụbọchị',
          powerSource: 'Kedu ka esi akwanye oku ulo oyi?',
          powerSourceDieselConsumptionKwh: 'O mmanụ dizel nke generator kwa kWh',
          pvPanelType: 'Ụdị akụkụ PV Panel',
          pvPanelCount: 'Ọnụọgụ nke PV panel',
          pvPanelSize: 'Nha nke otu panel',
          pvPanelWeight: 'Ibu otu panel',
          pvPanelMaxPower: 'oku elu kachasị ndi otu panel',
          powerSourceDieselPercent: 'Mmaunu Diesel Generator',
          powerSourceGridPercent: 'oku',
          powerSourcePvPercent: 'o PV panels',
          powerSourceBiomassPercent: 'O biomass',
          electricityStorageSystem: 'Usoro nchekwa ọkụ eletrik',
          thermalStorageMethod: 'Usoro nchekwa okpomọkụ',
          batteryCount: 'Ọnụọgụ batrị',
          batteryWeight: 'Ogo batrị',
          batteryCapacity: 'Ike ndi otu batrị',
          batteryMaxCurrent: 'Nchaji onodu di otu batrị',
          batteryPeakEnergyStorage: 'Nchekwa ike na ọkwa kacha elu nke otu batrị',
          batteryType: 'Ụdị batrị',
          selectSensorType: 'Họrọ ụdị ihe mmetụta',
          selectSensor: 'Select a sensor', // TODO
          emptySensorListError:
            'It seems there are no sensors connected to your {{type}} account. Please connect at least one and try again.', // TODO
          addTempSensor: 'Tinye ihe mmetụta okpomọkụ na nkeji jụrụ oyi gị.',
          sensorDesc: {
            default: "Rịọ ozi a n'aka onye na-eweta ihe mmetụta gị ma ọ bụrụ na ichoro ya ozugbo.",
            ubibot: 'Chọputa ozi ndị a na akaụntụ ubibot gị.',
          },
          ecozen: { username: 'Aha njirimara', password: 'Okwungafe', machineId: 'Igwe Id' },
          genericSensorForm: {
            username: 'Username/Email', // TODO
            password: 'Okwungafe',
          },
          unknownSensor: 'Unknown', // TODO
          hybridFields: "Kedu pasentị nke di n' ụlọ a na-akwado site na uzo di iche iche?",
          cropSpecificPricing: 'Ọnụ ahịa ihe ubi ya kpokwem',
          value: 'Uru',
          machineId: 'ID Ụlọọrụ',
          channelId: 'ID Ụgbọchị',
          deviceTag: 'Mkpado Ngwaọrụ',
          dateAdded: 'Ụbọchị Tinyechara',
          sensorType: 'Ụdị Sensor',
        },
        coolingUnitTypes: {
          FARM_GATE_STORAGE_ROOM: "Ọ bụ ụlọ nchekwa etinyere n'ọnụ ụzọ ugbo",
          MARKET_STORAGE_ROOM: "Ọ bụ ụlọ nchekwa etinyere n'ime ahịa",
          MOVABLE_UNIT:
            'Ọ bụ ihe a na-ebugharị ebugharị (ọmụmaatụ ya dịka, gwongworo nwere refrigeration)',
          OTHER: 'nke Ọzọ',
        },
        pricing: {
          label: 'Ụdị ọnụahịa',
          PERIODICITY: 'Kwa ụbọchị',
          FIXED: 'i dozi',
          day: 'üböchï',
        },
        metricUnit: { label: 'Nkeji', KILOGRAMS: 'kg', CRATES: 'Crati' },
        toasts: {
          addSuccess: 'Ngalaba jụrụ oyi agbakwunyere nke ọma',
          integrationError:
            'Enweghị ike ijikọ na ihe mmetụta. Kwado data gị ma ọ bụ kpọtụrụ onye na-eweta ihe mmetụta gị.',
          integrationSuccess: 'Nyochaa nzere sensọ nke ọma.',
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete:
            "Ọrụ a ga-ehichapụ ngalaba jụrụ oyi, ma gụnyere akụkọ ihe mere eme na mbu. Ị chọrọ ịga n'ihu?",
        },
        buttons: { viewExisting: 'Lelee dị adị', editPricing: 'Dezie ọnụahịa' },
        toasts: {
          editSuccess: 'Ngalaba jụrụ oyi edeziri nke ọma',
          cantDelete: "Enweghị ike ihichapụ nkeji jụrụ oyi a n'ihi na ọ nwere nbanye na-arụ ọrụ.",
          successDelete: 'E hichapụrụ nkeji jụrụ oyi nke ọma {{name}}',
        },
      },
      UsageAnalysis: {
        dateSelectionLabel: 'Họrọ ụbọchị:',
        empty:
          "Nbanye na nputa ga-apụta na dashboard mgbe ị mere opekata mpe otu nbanye n'ime ụlọ ọ bụla.",
        downloadDataButton: 'Budata data',
        modal: { title: 'Tọọ nhazi', coolingUnitSelection: 'Họrọ ngalaba jụrụ oyi:' },
        summary: {
          totalCheckIns: 'Ngụkọta ọnụọgụ nbanye:',
          totalCrates: 'Ngụkọta ọnụ ọgụgụ niile nke crates',
          totalWeight: 'Mkpokọta ibu',
          totalUsers: 'Ngụkọta ọnụọgụ ndị ọrụ dị iche:',
          weightUnit: 'kg',
        },
      },
      RevenueAnalysis: {
        summary: { total: 'Mkpokọta ego ha nwetara' },
        paymentType: {
          label: 'Họrọ ụzọ ịkwụ ụgwọ:',
          cash: 'Ego',
          creditCard: 'Kaadị kredit',
          bankTransfer: 'Bank Transfer', // TODO
        },
      },
      Coupons: {
        title: 'Discount coupons', // TODO
        emptyMessage: 'Ọnweghị akwụkwọ ego agbakwunyere',
        addCoupon: 'Tinye coupon',
        code: 'Koodu ndenye ego',
        percentage: 'Pasent coupon',
        revokeTitle: 'Iwepụ ndenye ego',
        revoke: 'Revoke', // TODO
        revokeMessage:
          "Ị ji n'aka na ịchọrọ ịkagbu akwụkwọ ikike a? Ozugbo a kagburu ya, enweghị ike iji ya ọzọ ma ego agaghịzi adị. Omume a na-adịgide adịgide na enweghị ike ịmegharị ya.",
        messages: {
          codeField: 'Must be max 25 characters and contain only letters and numbers', // TODO
        },
      },
    },
    Marketplace: {
      buyerSelection: {
        onBehalfOfCompany: 'Buy on behalf of company', // TODO
        forMyself: 'Buy for myself', // TODO
        label: 'Buyer', // TODO
      },
      sorting: {
        'price-asc': 'Price ascending', // TODO
        'price-desc': 'Price descending', // TODO
        'nearby-me': 'Near to me', // TODO
      },
      distance: {
        withing5Km: '1 to 5 KM away', // TODO
        within10Km: '5 to 10 KM away', // TODO
        within25Km: '10 to 25 KM away', // TODO
        beyond25Km: 'More than 25 KM away', // TODO
      },
      priceConfig: 'The price configuration refers to product sale, not cooling storage fee.', // TODO
      addToCart: {
        addToCartButton: 'Add to cart and continue shopping', // TODO
        buyFullCrate: 'Buy full crate', // TODO
        selectQuantity: 'Select quantity', // TODO
        goToCart: 'Go to Cart Summary', // TODO
      },
      currentLocation: 'Current location', // TODO
      invalidFormatWarning:
        'Ịdọ aka ná ntị: Usoro aha obodo ezighi ezi. Nsonaazụ nwere ike ọ gaghị ịdị kpọmkwem.',
      unresolvedCityFormatWarning:
        'Ịdọ aka ná ntị: E meghị ka a mata obodo akọwapụtara nke ọma. Nsonaazụ nwere ike ọ gaghị ịdị kpọmkwem.',
      lowConfidenceWarning:
        'Ịdọ aka ná ntị: E nweghị ike ịchọpụta obodo a nke ọma. Nsonaazụ nwere ike ọ gaghị ịdị kpọmkwem.',
      filterGeneralWarning:
        'Ịdọ aka ná ntị: Ihe ụfọdụ mere n’oge ịchọpụta ebe. Nsonaazụ nwere ike ọ gaghị ịdị kpọmkwem.',
      standardCrateWeight: 'Standard weight of crate is {{value}} kg', // TODO
      owner: 'Owner', // TODO
      priceRange: 'Range Price / KG',
      Filters: {
        min: 'Min',
        max: 'Max',
        label: 'Filters',
        coolingUnitLabel: 'Cooling unit', // TODO
        coolingUnitHeading: 'Select cooling units', // TODO
        cropTypeLabel: 'Produce / Crop Type', // TODO
        cropTypeHeading: 'Select crops', // TODO
        companyLabel: 'Company', // TODO
        companyHeading: 'Select companies', // TODO
      },
      maxDistance: 'Max Distance',
    },
    AccountDetails: {
      popups: {
        default: "Ị ji n'aka na ịchọrọ ihichapụ akaụntụ gị?",
        lastRegisteredEmployee:
          'Ị bụ naanị onye ọrụ edebanyere aha na ụlọ ọrụ ahụ, omume a ga-ehichapụ ụlọ ọrụ ahụ!',
        activeCheckInOP:
          'Ngalaba jụrụ oyi (s) {{names}} nke ekenyere gị ka ị nwee nbanye na-arụ ọrụ yana ị bụ onye ọrụ ikpeazụ na ya. Ịkwesịrị ịlele ngwaahịa niile ma ọ bụ gwa onye ọrụ edebanyere aha ka ọ kenye onye ọrụ dị iche na ngalaba jụrụ oyi tupu ị nwee ike ihichapụ akaụntụ gị!',
        activeCheckInRE:
          "Ịnweghị ike ihichapụ akaụntụ gị ma ọ bụrụ na ị bụ onye ọrụ edebanyere aha ikpeazụ yana enwere nlele na-arụsi ọrụ ike na ụfọdụ nkeji jụrụ oyi, n'ihi na ihe a ga-ehichapụ ụlọ ọrụ gị. Biko hụ na a na-ebu ụzọ lelee ndenye nbanye niile nọ n'ọrụ jụrụ oyi {{names}}.",
        activeCheckInCU:
          "Ị nweghị ike ihichapụ akaụntụ gị ma ọ bụrụ na ị bụ onye ọrụ ikpeazụ edebanyere aha yana enwere nbanye na-arụ ọrụ na ụfọdụ nkeji jụrụ oyi, n'ihi na omume a ga-ehichapụ ụlọ ọrụ gị. Biko hụ na a na-ebu ụzọ lelee nbanye niile na-arụ ọrụ na ngalaba jụrụ oyi {{names}}.",
      },
      fields: { location: 'Ebe', userCode: 'Onye ọrụ jụrụ oyi e mbubata Koodu' },
      toasts: { success: 'E melitere Onye ọrụ  nke ọma' },
      sections: {
        sellerSettings: 'Ntọala ndị na-ere ere',
        companySellerSettings: 'Seller Settings (Company)', // TODO
        buyerSettings: 'Ntọala ịzụ ahịa',
        details: 'Nkọwa',
      },
      ContactsSharing: {
        publicPhone: 'Mee nọmba ekwentị ọhaneze',
        publicEmail: 'Mee ka e-mail bụrụ ọha',
      },
      PayoutSettings: {
        addTitle: 'Biko tinye ozi akaụntụ ụlọ akụ gị',
        editTitle: 'Ozi akaụntụ ụlọ akụ gị',
        addTittleForCompany: "Please insert you company's bank account information", // TODO
        editTitleForCompany: "Your company's bank account information", // TODO
        form: {
          nameLabel: 'Account name', // TODO
          namePlaceholder: 'Insert account name', // TODO
          accountNumberLabel: 'Nọmba akaụntụ',
          accountNumberPlaceholder: 'Tinye nọmba akaụntụ',
          bank: 'Bank', // TODO
          countryLabel: 'Country', // TODO
          nigeria: 'Nigeria', // TODO
          selectBank: 'Select bank from list', // TODO
          accountType: 'Account Type', // TODO
          selectAccountType: 'Select account type', // TODO
          accountTypes: {
            personal: 'Personal', // TODO
            business: 'Business', // TODO
          },
          errors: {
            accountName: 'Account name is required', // TODO
            account: 'Achọrọ nọmba akaụntụ',
            accountType: 'Account type is required', // TODO
            bank: 'Achọrọ aha ụlọ akụ',
          },
        },
        successMessage: 'Agbakwunyere akaụntụ ụlọ akụ nke ọma.',
        errorMessage:
          'Anyị enweghi ike ịnweta nkọwa akaụntụ ahụ. Biko lelee nọmba akaụntụ na aha banki maka njehie ọ bụla.',
      },
      PaymentSettings: {
        cards: 'Kaadị',
        creditCard: {
          predefined: 'akọwara ụzọ',
          owner: 'Aha Onye ji kaadị',
          date: 'Ụbọchị mmebi',
          cvv: 'CVV',
        },
        AddCreditCard: {
          title: 'Biko tinye ozi kaadị gị',
          form: {
            cardName: 'Aha kaadị',
            cardNamePlaceholder: 'Fanye aha kaadị',
            cardNumber: 'Nọmba kaadị',
            cardNumberPlaceholder: 'Fanye nọmba kaadị',
            expiryDate: 'Ụbọchị mmebi',
            securityCode: 'Koodu nchekwa',
            securityCodePlaceholder: 'Tinye koodu nchekwa kaadị',
            predefinedMethod: 'Usoro ịkwụ ụgwọ akọwara ụzọ',
            successMessage: 'Agbakwunyere kaadị nke ọma',
            cardNameError: 'Achọrọ aha kaadị',
            cardNumberError: 'Achọrọ nọmba kaadị',
            securityCodeError: 'Achọrọ koodu nchekwa',
          },
        },
      },
    },
    About: {
      runtimeAgree: 'Comsol Oge Nkwekọrịta',
      userLicense: 'Nkwekọrịta ikike onye ọrụ njedebe',
      privacyPolicy: 'Amụma nzuzo',
      comsolAbout: 'Akuko ihe Banyere Comsol',
    },
    KnowledgeHub: {
      comic: 'Njem onye ọrụ ugbo: ihe na-atọ ọchị',
      cooling: 'Kedu ihe bụ Cooling-as-a- Service?',
      quality: 'Otu esi ebuli ogo ihe ubi',
      optimal: "Ọnọdụ nchekwa kacha mma n'ime ọnụ ụlọ oyi ọtụtụ ngwa ahịa",
      table: 'Tebụl nchekwa ihe ubi',
      sensors: 'Ihe mmetụta okpomọkụ na ụdị oge-ịkpọlite',
      tips: 'Ndụmọdụ maka ịlele na crates',
      glitches: "Otu esi emeghachi omume na glitches teknụzụ n'ime ụlọ oyi",
      source: 'Isi mmalite: biko rụtụ aka na ntuziaka ndị ọrụ maka ozi ndị ọzọ:',
      clickHere: 'pịa ebe a',
    },
    History: {
      cropsLabel: '{{crop}} and {{amount}} more', // TODO
      priceLabel: 'Onu ahịa',
      empty:
        "Nbanye na nputa ga-apụta na dashboard mgbe ị mere opekata mpe otu nbanye n'ime ụlọ ọ bụla.",
      sortMenuOptions: {
        cropType: "Udi  mkpuruosisi maobu ihe enwetara n'ubi",
        movementDate: 'Ụbọchị mmegharị (nke mbụ ruo nke ọhụrụ)',
        movementDateReverse: 'Ụbọchị mmegharị (nke kachasị ọhụrụ ruo nke mbụ)',
        checkInFirst: 'Buru ụzọ banye',
        checkOutFirst: 'Lelee mbụ',
        coolingUser: 'Aha njirimara',
      },
      optionsMenu: {
        common: {
          pdfReceipt: 'Budata nnata pdf',
          seeMovement: 'See movement', // TODO
        },
        checkOut: {
          seeDetails: 'Hụ nkọwa',
          smsReceipt: 'Budata nnata SMS',
          marketSurvey: 'Dejupụta nyocha ahịa',
        },
        checkIn: { edit: 'Dezie ndebanye aha' },
      },
      detailsModal: {
        operatorNameLabel: 'Lelee Aha onye na ọrụ na ulo oyi',
        operatorNumberLabel: 'Lelee nọmba onye ọrụ',
        checkOutDateLabel: 'Lelee ụbọchị',
        marketSurveyLabel: 'Emechara nyocha ahịa',
        cratesLabel: 'crates',
        combinedWeightLabel: 'Ibu ejikọtara onu',
        paymentMethodLabel: 'Ụzọ nkwụnye ụgwọ',
        cropTypeLabel: "Udi  mkpuruosisi maobu ihe enwetara n'ubi",
        checkInCodeLabel: 'Lelee koodu ntinye',
        crateIdsLabel: 'NJ Crate',
      },
      pdfModal: {
        coolingUserLabel: 'Onye ji ulo oyi ime ihe',
        dateLabel: 'ụbọchị',
        weightLabel: 'Ibu (kg)',
        downloadButton: 'Budata akwụkwọ ọnụahịa',
        downloadName: '{{code}}-nnata',
        successMessage: 'ebudatara nnata!',
        errorMessage: 'Ọ nwere ihe adịghị mma. Biko nwaa ọzọ ma emechaa.',
        checkOut: {
          title: 'Ụlọ ọrụ',
          checkOutLabel: 'Lelee koodu',
          idLabel: 'NJ',
          itemLabel: 'Ihe',
          calculatedPriceLabel: 'Ọnụ ego agbakọrọtara',
          discountLabel: 'Mbelata',
          totalPrice: 'Mkpokọta ọnụ ahịa',
        },
        checkIn: {
          title: 'Nbanye nnata',
          operatorLabel: 'Onye ọrụ',
          codeLabel: 'Koodu nbanye',
          companyLabel: 'Ụlọ ọrụ',
          coolingUnitLabel: 'ngalaba jụrụ oyi',
          priceLabel: 'Ọnụ ego {{currency}} / ụbọchị',
          cropLabel: 'ihe ubi',
          numberOfCratesLabel: 'Ọnụọgụ nke crates',
          totalLabel: 'Mkpokọta',
        },
      },
      editCheckIn: {
        contactLabel: 'Kpọtụrụ',
        coolingUserLabel: 'Onye ji ulo oyi ime ihe',
        disclaimer: 'Disclaimer: Oge ị ga-ebuli bụ ụbọchị echere atụmatụ ya.',
        disclaimerMessage:
          "Nkwuputa. Rịba ama na oge ị ga-ebuli bụ ụbọchị a na-eme atụmatụ. Ntụle a gbadoro ụkwụ n'ụdị agbaziri agbaziri maka ụdị mkpụrụ osisi ma ọ bụ akwụkwọ nri yana ịme anwansị ọnụọgụ. Nbibi nke ngwaahịa a na-adaberekwa na ọnọdụ ihu igwe mpaghara, ọnọdụ na-eto eto, ụbọchị owuwe ihe ubi na ndị ọzọ. Ya mere, ndịiche site na oge amụma anyị ga-ebuli ụbọchị nwere ike ime.",
        selectCropLabel: 'Ngwa horo ngwaahịa',
        successMessage: 'Emelitere nbanye nke ọma!',
        errorMessage: 'Imelite ndebanye aha adịghị. Biko nwaa ọzọ.',
      },
      survey: {
        fillMessage: 'Biko dejupụta nyocha ntọala maka {{crop}}!',
        baseSurvey: {
          occupationQuestion: 'Kedu ihe kowatara gi ofuma?',
          occupationFarmer: 'Onye ọrụ ugbo',
          occupationTrader: 'onye azuma ahia/Onye na-ato ahia',
          usageQuestion: "Ị na-eji ụlọ oyi n'oge gara aga?",
          newUser: 'Mba, abụ m onye ọrụ',
          oldUser: 'Ee, ejirila m ụlọ oyi',
          mostUsedCommoditiesQuestion: "Ihe ndi enweputara n'ubi/ ngwa ahia ndi ana ere ere",
          commodity: 'Ngwaahịa',
          newCommodity: 'Ngwaahịa {{index}}',
          fillCommoditiesMessage:
            "Biko dejupụta ajụjụ ndị a n'okpuru maka ngwa ahịa ndị ị na-eme atụmatụ iwebata n'ime ụlọ ọtụtụ oge.",
          addCommodityButton: 'Tinye ngwa ahịa',
          genericFormError: 'Biko họrọ nhọrọ',
          experienceError: 'Biko webata uru',
        },
        marketSurvey: {
          title: 'Biko zaa ajụjụ ndị a maka akpa {{crop}} ị lepụrụ.',
          locationQuestion: 'Ebee ka erere ngwaahịa gị?',
          locations: {
            farm: 'Ọnụ ụzọ ugbo',
            market: 'Ahịa mpaghara',
            both: 'Ma ugbo-ọnụ ụzọ na ahịa',
          },
          priceQuestion: 'Kedu ọnụ ahịa ị nwetara maka ya?',
          spoiledProducesQuestion:
            "Kedu ihe dị na nchekwa n'izu gara aga mebiri ma ọ bụ ree ya n'okpuru ọnụ ahịa ahịa?",
          spoilageReasonsQuestion: 'Kedu ihe i chere kpatara mkpuruosisi na ihe ubi gi ji emebi?',
          formError: 'Biko họrọ nhọrọ',
        },
      },
      stringTemplates: {
        movementType: {
          checkOut: 'Puo ebe a ahu',
          checkIn: 'Ngwa banye',
          checkedOut: 'Achọpụtara',
          checkedIn: 'Abanye',
        },
      },
    },
    MyOrders: {
      coolingFees: 'Cooling fees', // TODO
      soldFor: 'Sold for', // TODO
      ownedBy: 'Owned by', // TODO
      you: 'You', // TODO
      sort: {
        mostRecent: 'Most recent', // TODO
        oldest: 'Oldest', // TODO
        date: 'Date', // TODO
      },
      status: {
        'payment-pending': 'Payment Pending', // TODO
        'payment-expired': 'Payment Expired', // TODO
        cancelled: 'Cancelled', // TODO
        paid: 'Paid', // TODO
      },
      title: 'Order Overview', // TODO
      orderId: 'Order ID', // TODO
      cropType: 'Crop Type', // TODO
      coolingUnit: 'Cooling Unit', // TODO
      orderTotal: 'Order Total', // TODO
      backToTopButton: 'Back to the top', // TODO
    },
    ShoppingCart: {
      cartUpdatedMessage:
        'A na-ewepụ ụfọdụ ngwaahịa n’ụlọ ahịa gị maka na ha adịkwaghị maka ịzụta.',
      ownership: 'Change cart ownership to {{name}}', // TODO
      changeOwnership:
        'Change the shopping cart ownership to {{name}}. This may affect the contents of your cart, including the possible removal of certain crates that might not be available after this change. Are you sure you want to proceed?', // TODO
      empty: 'Your cart is empty', // TODO
      daysLeft: 'days left', // TODO
      weight: 'KG available', // TODO
      perKg: '/ KG', // TODO
      totalToPay: 'Total to pay', // TODO
      pay: 'Pay', // TODO
      orderHeader: 'Order', // TODO
      subtotal: 'Subtotal', // TODO
      produce: 'Produce', // TODO
      discount: 'Discount', // TODO
      fees: 'Service fees', // TODO
      marketFees: 'Marketplace fee', // TODO
      paymentFees: 'Payment fee', // TODO
      coolingFees: 'Cooling fee', // TODO
      viewContacts: 'View contact(s)', // TODO
      contactsForDelivery: 'Contact(s) for delivery information', // TODO
      gotItButton: 'Got it!', // TODO
      pickupMethods: 'Pickup method', // TODO
      selectPickupMethod: 'Select a pickup method', // TODO
      selectPickupMethodInfo: 'A pickup method selection is required for each cooling unit.', // TODO
      pickupMethodSelectionMissing: 'Missing pickup method selection for {{amount}} cooling units.', // TODO
      pickUpToday: 'Pickup today', // TODO
      keepInStorageDailyRate: 'Keep in storage ({{price}} / day)', // TODO
      keepInStorageFixedRate: 'Keep in storage ({{price}})', // TODO
      delivery: 'Delivery', // TODO
      contactName: 'Contact name', // TODO
      phoneNumber: 'Phone number', // TODO
      thankYouMessage: 'Thank You for Ordering', // TODO
      orderOverview: 'Order overview', // TODO
      products: 'Products', // TODO
      consultOrders: 'Consult My Orders', // TODO
      total: 'Total', // TODO
      couponQuestion: 'Have a discount coupon?', // TODO
      redeem: 'Redeem code.', // TODO
      redeemCoupon: 'Redeem coupon', // TODO
      couponPlaceholder: 'E.g. 20OFF', // TODO
      discountsApplied: 'Discounts Applied', // TODO
      pickupModal: {
        today: 'Please pick up your order at {{company}}, located at {{location}} today.', // TODO
        storage: 'Your crates are now being stored at {{company}}, located at {{location}}.', // TODO
        delivery:
          "Please contact the available numbers to arrange delivery. You can see the list of delivery options under 'Order details'.", // TODO
      },
      errors: {
        invalid: 'Invalid value', // TODO
        minimumCartValue: 'Order must be at least ₦100.', // TODO
      },
      method: 'Method:', // TODO
      deliveryInfo:
        'Note that the delivery fee is dependant on the provider. If delivery is scheduled for tomorrow, a cooling fee of {{value}} will also be applied.', // TODO
      pickUpTodayInfo:
        'Please ensure you pick up your products by the end of the day to avoid any additional cooling fees.', // TODO
      keepInStorageInfo: 'The cooling fee will be applied when you pick up your order.', // TODO
      orderOverviewSubtitle:
        "You can revisit this information under the tab 'My Orders' in the 'Marketplace' screen.", // TODO
    },
    Analytics: {
      emptyState: 'Enweghị data igosi',
      company: 'Ụlọ ọrụ',
      aggregated: 'chịkọtara',
      comparison: 'Ntụnyere',
      downloadDataButton: 'Budata data',
      users: 'Ndị ọrụ',
      impact: 'Mmetụta',
      maleLabel: ' 👨🏽Nwoke: {{amount}}',
      femaleLabel: '👩🏽  Nwanyi: {{amount}}',
      otherLabel: 'nke Ọzọ',
      usersTotal: 'Ngụkọta ọnụ ọgụgụ ndị ọrụ jụrụ oyi dị iche = {{amount}}',
      operatorsTotal: 'Ngụkọta ọnụ ọgụgụ ndị ọrụ = {{amount}}',
      beneficiariesTotal: 'Ngụkọta ọnụ ọgụgụ ndị ga-erite uru na-apụtachaghị ìhè = {{amount}}',
      totalCratesLabel: 'Ngụkọta igbe (Crates)',
      totalQuantityLabel: 'Ngụkọta ọnụọgụ (kg)',
      totalOperations: 'Mgbakọta arụmọrụ',
      checkedInLabel: 'Abanye = {{amount}}',
      checkedOutLabel: 'Achọpụtara = {{amount}}',
      methodologyButton: 'Lelee usoro',
      farmersAnalytics: {
        coolingUserName: 'Aha njirimara Onye ji ulo oyi aro',
        coolingUserType: 'Ụdị onye ọrụ jụrụ oyi',
        avgStorageTime: 'Nkezi Oge Nchekwa',
        coldStorageCost: 'Ọnụ ego nchekwa oyi',
        days: 'Ubọchi',
        baselineSurveyButton: 'Dejupụta nyocha nke ntọala',
        baseLineSurveyMessage: 'Ị nwere nyocha {{amount}} iji mechaa 😟',
        postCheckOutSurveyButton: 'Jupụta nyocha nlele biputere',
        postCheckOutSurveyMessage: 'Ị nwere nyocha {{amount}} iji mechaa 😟',
        noChangeFoodLoss: 'Enweghị mgbanwe na ọnwụ nri',
        increaseInFoodLoss: 'Mmụba na ọnwụ nri',
        decreaseInFoodLoss: 'Mbelata na ọnwụ nri',
        increaseInRevenue: 'Mmụba na ego ha nwetara',
        decreaseInRevenue: 'Mbelata ego ha nwetara',
        foodLossEvolution: "🥗 Evolushọn na-efunahụ nri kwa mkpụrụ (n'elu 5)",
        changePercentage: '% Gbanwee',
        crops: 'Ihe ubi',
        foodLossLevels: 'Nri ọnwụ ọkwa',
        revenueEvolution: '💰 Nkezi mmalite mgbanwe ego',
        revenueCropEvolution: "💰 Nkezi mgbanwe ego ha nwetara n'otu mkpụrụ (n'elu 5)",
        noChangeRevenue: 'Enweghị mgbanwe na ego ha nwetara',
        revenueLevels: 'Ọkwa ego',
        baselineSurveyLabel: 'Ọnụọgụ nke nyocha Baseline emechara',
        postCheckoutSurveyLabel: 'Ọnụọgụ nyocha nlele Post Checkout emechara',
        allPostCheckoutSurveysCompleted: 'Emechara nyocha niile nlegharị anya 🤝',
        allBaselineSurveysCompleted: 'Emechara nyocha Baseline niile',
      },
      companyTab: {
        usersTab: {
          employeesTotal: 'Ngụkọta ọnụ ọgụgụ ndị ọrụ edebanyere aha = {{amount}}',
          usersType: 'Ụdị ndị ọrụ jụrụ oyi',
          farmersLabel: '🧑🏽‍🌾  Ndị ọrụ ugbo: {{amount}}',
          tradersLabel: '👩🏽‍💼 Ndi Ahịa: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'Nkezi ọnụnọ nke nkeji jụrụ oyi',
          occupancyContent: '🏘️ {{amount}}%',
        },
        impactTab: {
          foodLossLabel: 'Iji weezuga nri meefu',
          revenueLabel: 'Evolushọn ego ndị ọrụ na-eme ka ọ dị jụụ',
          co2Label: '💨 CO2e emission evolushọn',
          surveysAmountLabel: 'Mba. nke nnyocha e mere iji gbakọọ nri ọnwụ na ego evolushọn',
          co2Increase: 'Mgbapụta CO2e kwa kilogram nke ngwaahịa mụbara site na jụrụ oyi',
          co2Decrease: 'Mkpọpụta CO2e kwa kilogram nke ngwaahịa belatara site na ntụ oyi',
          co2WithoutCooling: "N'arọ nke CO2e kwa n'arọ nke ihe a na-emepụta na-enweghị oyi",
          co2WithCooling: "Kg nke CO2e kwa n'arọ nke ngwaahịa ewepụtara na jụrụ oyi",
          from: 'Site na',
          to: 'Iji',
        },
        downloadFileName: 'nyocha-data',
        utilization: 'Iji',
        goBackButton: "Laghachi ruo n' isi",
        companyNameLabel: 'Aha ụlọ ọrụ',
        revenueLabel: 'Mkpokọta ego ha nwetara',
        coolingUnitsLabel: 'Nkeji jụrụ oyi',
        singleCoolingUnitContent: '1 nkeji',
        coolingUnitsContent: 'nkeji {{amount}}',
        capacityLabel: 'Mkpokọta ike jụrụ oyi',
        capacityContent: ' {{amount}} metrik tonne',
        coolingUnitTypeLabel: 'Ụdị nkeji oyi',
        coolingUnitTypeMarket: '{{amount}} ọnụ ụlọ ahịa',
        coolingUnitTypeFarmGate: '{{amount}} ọnụ ụzọ ámá ugbo',
        coolingUnitTypeMovable: '{{amount}} ime ụlọ',
      },
      tabsShared: {
        configurationMessage: 'Biko hazie ụbọchị gị & nkeji oyi ka ị nweta',
        configureButton: 'Hazie',
        crates: 'crates',
        dateRangeLabel: 'Oke ụbọchị',
        selectedUnitsLabel: 'Ngalaba jụrụ oyi ahọpụtara',
        totalCo2Label: '💨 Mkpokọta CO2e ewepụtara:',
        roomRevenue: 'Ọnụ ego ụlọ',
      },
      comparisonTab: {
        sortingLabel: 'Hazie',
        coolingUnit: 'ngalaba jụrụ oyi',
        genderHeader: 'Nwoke | Nwanyị | Ndị ọzọ',
        genderSecondaryHeader: 'Nwoke | Nwanyị',
        total: 'Mkpokọta',
        sortingMenuOptions: {
          descending: 'Na-arịda',
          ascending: 'Na-arịgo',
          coolingUnitName: 'Aha nkeji oyi',
        },
        usersTab: {
          operators: 'Arụ ọr',
          users: 'Ndị ọrụ jụrụ oyi na-arụ ọrụ',
          activeUsers: 'Ndị ọrụ na-arụsi ọrụ ike',
          beneficiaries: 'Ndị na-erite uru na-apụtachaghị ìhè',
        },
        cratesTab: {
          crates: 'crates',
          kg: 'kg',
          operations: 'Ọrụ',
          checkedIn: 'Abanye',
          checkedOut: 'Achọpụtara',
          checkedInCropDistribution: 'Nleba anya nkesa ihe ụbi (crates)',
          checkedInKgDistribution: 'Nleba anya ihe ụbi (kg)',
          checkInCropDistribution: 'Lelee ntinye ihe ubi',
          checkedOutCropDistribution: 'Lelee nkesa ihe ụbi (crates)',
          checkedOutKgDistribution: 'Lelee nkesa ihe ụbi (kg)',
          checkOutCropDistribution: 'Lelee nkesa ihe ọkụkụ',
          co2: '💨 CO2e ewepụtara maka jụrụ oyi',
          co2EmissionsLabel: 'Mgbapụta CO2e (kg)',
          co2DistributionLabel: 'Nkesa ihe ubi CO2e',
          co2Kg: 'Kg CO2 emitted', // TODO
        },
        impactTab: {
          occupancyLabel: 'Nkezi ọnụnọ nke nkeji jụrụ oyi',
          occupancy: 'Ọnụnọ',
          foodLossLabel: 'Iji weezuga nri meefu',
          revenueLabel: 'Evolushọn ego ndị ọrụ na-eme ka ọ dị jụụ',
          changePercentage: '% Gbanwee',
          completePercentage: '% Mezu oke',
          foodLossLevels: 'ọkwa nri furu efu',
          revenueLevels: 'Ọkwa ego',
          revenuePerRoomLabel: "📈 Ego n'otu ọnụ ụlọ",
          co2Label: '💨 CO2e emission evolushọn',
          surveysAmountLabel: 'Mba. nke nnyocha e mere iji gbakọọ nri ọnwụ na ego evolushọn',
          co2EmissionsLabel: 'CO2e (kg)',
        },
      },
    },
    Notifications: {
      text: { notifications: 'ngosi' },
      sensorError:
        "Ihe mmetụta maka ụlọ oyi {{unitName}} ezitebeghị data ọ bụla n'ime awa 12 gara aga. Biko jiri aka tinye data ruo mgbe edoziri ya.",
      survey: 'Biko dejupụta nyocha ahịa maka {{farmer}}, maka ngagharị, {{movementCode}}.',
      link: 'Biko gaa ebe a ka emechaa ya',
      coolingUserSurvey: 'Ị banyela mana ị mechabeghị nyocha maka ihe ubi a {{crop}} ',
      operatorSurvey:
        'Ị banyela nke onye oru ugbo mana ị mechabeghị nyocha maka ihe ọkụkụ a {{crop}} {{farmer}}',
      pickup:
        'Ekwesịrị iburu akpa gị nke {{crop}} ozugbo enwere ike! ( lelee ụbọchị: {{checkIn}}, NJ nkeji jụrụ oyi: {{unitId}}, lelee NJ: {{movementCode}}).',
      notifyCoolingUser:
        'Biko mee ka onye ọrụ {{farmer}} mara na ekwesịrị iburu akpa ya nke {{crop}} ozugbo enwere ike! ( lelee ụbọchị: {{checkIn}}, NJ nkeji jụrụ oyi: {{unitId}}, lelee NJ: {{movementCode}}).',
      checkIn: 'Onye ọrụ {{ Farmer}} edezila ntinye nbanye {{movementCode}} na {{date}}.',
      surveyAlreadyFilled: 'Ejupụtalarị nyocha',
      orderRequiresMovement:
        "Mkpụrụ osisi na akwụkwọ nri kwesịrị ikesakwa ha n'etiti igbe. Pịa maka nkọwa banyere ihe ị ga-ebufe.",
      listingPriceUpdated:
        'Ọnụahịa ndepụta maka crates nchekwa {{crop}} na {{unitName}} emelitere: {{priceTag}}',
    },
  },
  tutorial: {
    welcome: 'Nnọọ na Coldtivate. Nke a bụ ngagharị nke ọrụ.',
    farmerWelcome:
      'Welcome to Coldtivate! This tutorial will help you understand how to use the app.', // TODO
    quit: 'Kwụsị nkuzi',
    congratulations: 'Ekele! Ị gụchara nkuzi ahụ! Laghachi na dashboard ka ịmalite iji ngwa ahụ.',
    prev: 'Nzọụkwụ gara aga',
    next: 'Osote',
    start: 'Start Tutorial', // TODO
    final:
      'Congratulations! You have completed the tutorial! Go back to the dashboard to start using the app.', // TODO
    backToDashboard: 'Laghachi na Dashboard', // TODO
    steps: {
      openDrawer:
        'On the top left, you find a menu with the main functionalities. Go ahead and click it.', // TODO
      repeatTutorial: 'Ọ bụrụ na ịchọrọ ikiri nkuzi a ọzọ, ị nwekwara ike ịhụ ya na menu.',
      managementNavigation:
        'N\'ime menu, ị nwere ike ịnyagharịa na taabụ "Management" wee tinye ebe ọhụrụ, nkeji oyi, ndị ọrụ edebanyere aha na ndị ọrụ.',
      operatorManagementNavigation:
        'In the Menu, you can navigate to "Management" and tap there to add or edit Cooling Users', // TODO
      addCoolingUser:
        'Enwere ike ịgbakwunye ndị ọrụ jụrụ oyi na-edebeghị aha na Coldtivate site na itinye nkọwa ha (aha, nọmba ekwentị). Enwere ike ịgbakwunye ndị ọrụ jụrụ oyi ndị debanyere aha na ngwa ahụ site na koodu. Ha nwere ike ịchọta koodu ha na profaịlụ ha -> "Nkọwa akaụntụ" -> "koodu na-ebubata onye ọrụ oyi".',
      navigateToCoolingUser: 'Go ahead and click the Cooling Users tab', // TODO
      listCoolingUsers:
        "A na-amata ndị ọrụ jụrụ oyi nwere smartphone site na akara ekwentị dị n'akụkụ aka nri nke ihuenyo ahụ. Ndị ọzọ na-eji ekwentị bụ isi na-eme ka ndị ọrụ jụrụ oyi. N'okwu abụọ a, ị nwere ike pịa aha iji nweta nkọwa ha yana nyocha onye ọrụ jụrụ oyi.",
      navigateToAddCoolingUser: "Clicking the '+' sign allows you to add a new Cooling User.", // TODO
      coolingUnitStep:
        "Ị nwere ike ịnyagharịa gafee nkeji jụrụ site na ịpị menu dropdown dị n'elu.",
      initiateCheckIn1:
        'Once you add a cooling user, you can make a check-in for that cooling user. Go ahead and click the activity button.', // TODO
      initiateCheckIn2: 'Now click on the check-in button (the one in green).', // TODO
      checkIn1:
        'To complete the check-in, you need to click on "Add Crates" and follow the instructions step by step. Click \'Continue\' to see what the result would look like.', // TODO
      checkIn2:
        "Mgbe ịmechara usoro ahụ niile, ị ga-ahụ nkọwa nke igbe ndị ị na-achọ ịbanye n'ime ụlọ ahụ.",
      checkIn3:
        'Ọ bụrụ na afọ juru gị afọ, ị nwere ike pịa "Kwenye" na a ga-agbakwunye krates ọhụrụ na Dashboard.',
      history:
        'Clicking on "History", you can see all the movements in the room. The check-outs for which the after-storage survey has not been completed are marked by a red dot.', // TODO
      coolingUnits:
        'Pịa na " nkeji jụrụ oyi "ka ịhụ ike nke a jụrụ oyi ụbọchị 7 na-esote (Planner tab) na okpomọkụ nke ụlọ (room ọnọdụ taabụ).',
      roomConditions:
        'Ị nwere ike iji aka kwalite ọnọdụ okpomọkụ nke ụlọ jụrụ oyi na "Ọnọdụ ime ụlọ" ma ọ bụrụ na ịnweghị ihe mmetụta ejikọrọ na ngwa ahụ.',
      checkOut1:
        'Iji malite ndenye ọpụpụ, pịa bọtịnụ Ọrụ wee pịa bọtịnụ uhie. Mgbe ahụ soro ntuziaka ka mezue ndenye ọpụpụ.',
      checkOut2: 'Ị nwere ike ịhọrọ ngalaba jụrụ oyi na ihe ọkụkụ ịchọrọ ịlele.',
      checkOut3: 'Ozugbo akwụchara ihe ndị ahụ, pịa bọtịnụ dị iche iche wee mechaa nlele ahụ.',
      navigateToLocations:
        'The first thing you will need to do is add a location. Go ahead and click the locations tab.', // TODO
      locations:
        'You can add a location by selecting a name and adding its latitude and longitude, by sharing your GPS coordinates (if you are at the cold room location), or by typing the address.', // TODO
      navigateToCoolingUnits:
        'After a location has been added, you can add a cooling unit. Go ahead and click the cooling units tab.', // TODO
      addCoolingUnits:
        'A cooling unit can be added by completing the details above. If you have temperature sensors in the cooling unit and an API in place, you can input the credentials and automatically connect your sensors to the app.', // TODO
      addEmployeesOperators:
        'You can add Registered Employees and Operators through the Management screen. In order to add either role, you will need their phone number. They will receive an SMS with an invitation link. A phone number can be used for only one user.', // TODO
      employeeCoolingUnitsStep:
        'Once you have selected a cooling unit you will see an overview of: the crates currently in storage in the "Dashboard" tab, statistics about utilisation and impact in the "Analytics" tab, and the list of crates for sale in the "Marketplace" tab. Clicking on "More", you can also navigate to the "Crop Prices", "History", "Cooling Units", and "Orders" tab.', // TODO
      localizationPreferences:
        'You can change the language of the app by selecting "Localization Preferences". Make sure to click the "Save changes" button for the language to be changed!', // TODO
      accountDetailsNavigation:
        'In the menu, you can navigate to "Account Details" and tap there to view/edit a set of configurations related to your account. Go ahead and try it.', // TODO
      coolingUserSurvey:
        'Oge izizi imepe ngwa ahụ, a na-agwa gị ka ịmechaa nyocha dị mkpirikpi. Ọ dị ezigbo mkpa na ị dejupụta nyocha maka ngwa ahụ iji nye gị ndụmọdụ ahaziri ahazi. Ọ bụrụ na ịnweghị ike imeju nyocha ahụ oge mbụ ị banyere, ị nwere ike ịnweta nyocha ahụ na "Nkọwa akaụntụ" -> "Nyocha onye ọrụ jụrụ oyi". Daalụ maka iwepụta oge iji mezue nyocha ahụ!',
      coolingUserCode:
        'The first time you arrive at a cold room to store your produce, the operator will ask you to provide her / him with your personal code, to add you to the list of cold room users. You can find this code in "Personal details" -> "Cooling User Import Code".', // TODO
      knowledgeHub:
        'N\'ime menu, ị nwere ike ịchọta "Ebe Ọmụma", nke nwere ndụmọdụ gbasara ogologo oge a ga-echekwa ihe ọkụkụ dị iche iche, na okpomọkụ ha kacha mma. Lelee ya ka ị ghọta otú ụlọ oyi nwere ike isi nyere gị aka ichekwa àgwà nke mkpụrụ osisi na akwụkwọ nri dị iche iche!',
      faq: "Na menu, ị nwekwara ike ịhụ ajụjụ a na-ajụkarị (FAQ). Anyị na-akwado ka ịlele ha ka ịmatakwu gbasara ngwa na uru nke ịchekwa ngwaahịa gị n'ime ụlọ oyi.",
      dashboardStep1:
        'Ozugbo onye ọrụ ahụ mechara nyocha gị, ị ga-enwe ike ịhụ ihe ndị a na-emepụta na nchekwa n\'ime ụlọ dị na ngalaba "Dashboard". Kaadị ọ bụla nwere oghere nke otu ụdị ihe ubi a tụlere ọnụ.',
      dashboardStep2:
        'Kaadị ọ bụla dị na dashboard nwere ozi gbasara: ụdị ihe ọkụkụ, ọnụọgụ crates echekwara, ụbọchị ole echekwara ya, ọnụahịa ụbọchị (maka akpa niile ọnụ), na NJ ndebanye.',
      dashboardStep3:
        'Ọnụ ọgụgụ ụcha nke ụbọchị na-egosi "Oge iji bulie" (TTPU), nke pụtara ụbọchị ole ihe ọkụkụ gị ka ga-adị mma, ma ọ bụrụ na ọ na-anọ na friji. Agba uhie pụtara na ihe a na-emepụta na-efunahụ àgwà ya ma ekwesịrị iburu ya ozugbo enwere ike.',
      dashboardStep4:
        'Ọ bụrụ na agba nke kaadị ahụ bụ edo edo (ụbọchị 2-5 fọdụrụ) ma ọ bụ akwụkwọ ndụ akwụkwọ ndụ (ihe karịrị ụbọchị 5), ịkwesighi ichegbu onwe gị banyere crates. A na-agbakọ ọnụ ọgụgụ nke ụbọchị ọtụtụ ugboro kwa ụbọchị, yabụ gbaa mbọ hụ na ị na-elele "Dashboard" mgbe niile ka ịhụ ka àgwà nke krates gị n\'ime ụlọ si na-agbanwe.',
      dashboardStep5:
        "Ọ bụrụ na ị nwere crates echekwara n'ọtụtụ ọnụ ụlọ, ị nwere ike ịgbanwe ụlọ ị na-elele site na ịhọrọ ụlọ ọrụ na nkeji oyi site na dropdown.",
      dashboardStep6:
        'When your crates are approaching the Time to pick up and the card turns red, you will receive a notification that advises you to go to the room, pick up those crates, and sell them. You can check your notifications by clicking the bell on the right.', // TODO
      farmerHistory:
        'In the tab "History" you can see a summary of all check-ins and check-outs that you have completed in each room. If you see a red dot next to a check out, please click on the three dots and "Fill in market survey". Here, we would like to understand at what price you have sold your produce, and if anything got spoiled. We use this information to improve the operations at the cold room, so it is important that you answer accurately.', // TODO
      farmersCoolingUnits:
        'To check for cooling units near you, you can navigate to the buttons on the bottom of the screens, clicking on the tab "More", "Cooling units" and selecting "Map". By clicking on each pin on the map, you can see the type of unit and the price of storage.', // TODO
      farmersUnitsPlanner:
        'Na taabụ "Ụdị jụrụ oyi" ị nwere ike ịhụ Map ahụ, ebe obibi ugbu a na ọdịnihu nke ụlọ (na "Planner") na okpomọkụ nke ụlọ ahụ (na "ọnọdụ ime ụlọ"). Ihuenyo ndị a na-enyere gị aka inyocha anya ihe na-eme na ụlọ oyi, na-enweghị ịga ebe ahụ n\'onwe gị ịlele!',
      marketPrice:
        'If you see a tab named "Crop Prices", you can check the prices of different fruits and vegetables across the country in the last days, and a forecast of the prices for the future. For now, this option is only available for selected countries.', // TODO
      farmerFinalStep:
        'Congratulations! You have completed the tutorial! If you have questions about the app, we recommend checking the FAQ, asking an operator of the cold room, or writing us at app@yourvcca.org.', // TODO
      more: 'Clicking on "More", you will be able to select the "History", "Crop Prices", "Cooling Units", and "Orders" screens.', // TODO
    },
  },
} satisfies Translations;
