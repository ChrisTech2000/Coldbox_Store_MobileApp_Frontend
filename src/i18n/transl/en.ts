const en = {
  appVersion: {
    newVersion: 'A new version of Coldtivate is available!',
    pleaseUpdate: 'Please update app before continuing.',
  },
  languages: {
    current: 'English',
    label: 'Language',
    options: {
      en: 'English',
      hi: 'Hindi',
      or: 'Oriya',
      gu: 'Gujarati',
      fr: 'French',
      pt: 'Portuguese',
      ig: 'Igbo',
      yo: 'Yoruba',
      ha: 'Hausa',
      ar: 'Arabic',
    },
  },
  gender: {
    female: 'Female',
    male: 'Male',
    other: 'Other',
  },
  navigation: {
    error: {
      errorMessage: 'Oops... looks like something went wrong.',
      tryAgainMessage: 'Please try again later.',
      serverErrorMessage:
        'Oops! Looks like something went wrong on our side. Please try again later or contact support.',
    },
    auth: {
      SignIn: 'Log in',
      SignUp: 'Sign up',
      ForgotPassword: 'Forgot Password',
      PasswordReset: 'Reset',
      AppInfo: 'App info',
      Logout: 'Log-out',
    },
    management: {
      Root: 'Management',
      CompanyDetails: 'Company Details',
      RevenueAnalysis: 'Revenue analysis',
      UsageAnalysis: 'Usage Analysis',
      Locations: 'Locations',
      AddLocation: 'Add Location',
      EditLocation: 'Edit Location',
      CoolingUnits: 'Cooling Units',
      DisabledCoolingUnitsDescription: 'Add at least one location',
      CoolingUsers: 'Cooling Users',
      AddCoolingUser: 'Add Cooling User',
      EditCoolingUser: 'Edit Cooling User',
      AddCoolingUnit: 'Add Cooling Unit',
      EditCoolingUnit: 'Edit Cooling Unit',
      Operators: 'Operators',
      AddOperator: 'Add Operator',
      EditOperator: 'Edit Operator',
      RegisteredEmployee: 'Registered Employees',
      AddRegisteredEmployee: 'Add Registered Employee',
      RegisteredEmployeeDetails: 'Registered Employee Details',
      DeliveryContacts: 'Delivery Contacts',
      LegacyContacts: 'Legacy Contacts',
      AddUserBankAccount: '{{user}} Bank Account',
    },
    bottomTabs: {
      RootMainTabStack: "{{firstName}}'s Coldtivate",
      ProduceDetails: '{{produceCode}}',
      MarketplaceSettings: 'Marketplace settings',
      PriceTrend: 'Price trend',
      PriceRanking: 'Price ranking',
      Planner: 'Planner',
      RoomConditions: 'Room Conditions',
      CratesInfo: 'Crates Info',
      Dashboard: 'Dashboard',
      History: 'History',
      MarketPrice: 'Crop Prices',
      CoolingUnits: 'Cooling units',
      Analytics: 'Analytics',
      CheckIn: 'Check In',
      CheckOut: 'Check Out',
      Maps: 'Maps',
      More: 'More',
    },
    dashboard: {
      AccountDetails: 'Account details',
      PersonalDetails: 'Personal details',
      LocalizationPreferences: 'Localization preferences',
      ContactsSharing: 'Contacts sharing',
      Coupons: 'Coupons',
      CouponsActiveTab: 'Active',
      CouponsRevokedTab: 'Revoked',
      Marketplace: 'Marketplace',
      MarketplaceFilters: 'Filters',
      MarketplaceAllTab: 'All',
      MarketplaceFavoritesTab: 'Favorites',
      Orders: 'Orders',
      MyOrders: 'My Orders',
      MySales: 'My Sales',
      OrderDetails: '{{orderCode}}',
      KnowledgeHub: 'Knowledge Hub',
      QuitTutorial: 'Quit Tutorial',
      FAQ: 'FAQ',
      About: 'About',
      Management: 'Management',
      Tutorial: 'Tutorial',
      PayoutOptions: 'Payout options',
      PaymentMethods: 'Payment methods',
      Wallet: 'Wallet',
      Transactions: 'Transactions',
      Transaction: '{{id}}',
      ShoppingCart: 'Shopping Cart',
    },
    checkIn: {
      SelectCropType: 'Select Crop Type',
      CheckIn: 'CheckIn',
      CropList: '{{cropType}}',
      CrateSetup: 'CheckIn',
      CrateWeightAndPricing: 'Crate weight and pricing',
    },
    about: {
      comsolAgreement: 'COMSOL Runtime License Agreement 6.0',
      userLicense: 'END USER LICENSE AGREEMENT',
      aboutComsol: 'About COMSOL',
      privacyPolicy: 'Privacy Policy',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: 'After-storage survey for {{farmer}}',
      BaseSurvey: 'Cooling user survey',
    },
    analytics: {
      methodology: 'Methodology',
    },
  },
  actions: {
    error: 'An error occurred',
    cancel: 'Cancel',
    confirm: 'Confirm',
    import: 'Import',
    yes: 'Yes',
    no: 'No',
    select: 'Select',
    close: 'Close',
    delete: 'Delete',
    ok: 'Ok',
    all: 'All',
    none: 'None',
    next: 'Next',
    back: 'Back',
    search: 'Search...',
    or: 'or',
    add: 'Add',
    edit: 'Edit',
    go: 'Go!',
    done: 'Done',
    'not-available': 'N/A',
    'complete-later': 'Complete later',
    'update-success': 'Succesfully updated',
    'save-changes': 'Save changes',
    save: 'Save',
    continue: 'Continue',
    update: 'update',
    clearAll: 'Clear all',
    apply: 'Apply',
    assign: 'Assign',
  },
  components: {
    datePicker: {
      heading: 'Select a date', // TODO
      clearButtonLabel: 'Clear',
      confirmButtonLabel: 'Confirm',
      placeholder: 'dd/mm/yyyy',
      startDateSelection: 'Select start date:',
      endDateSelection: 'Select end date:',
      startDateError: "Start date can't be later than end date.",
      endDateError: "End date can't be earlier than start date.",
    },
  },
  Auth: {
    welcomePopup:
      "Welcome to Coldtivate! If you are a farmer, a trader, or are interested in purchasing produce stored in the cold rooms, please sign up by clicking on 'Sign up as cooling user or consumer'. If you work for a cooling company, please contact your responsible to check whether your company is registered. If it is, your responsible should send you an SMS invite for you to sign up as a registered employee or as an operator. If not, you can sign up the company, and register as a registered employee. Please check the 'App info' section for FAQs.",
    Root: {
      welcome: 'Welcome to Coldtivate',
      signIn: 'Sign In',
      signUpCompany: 'Sign up as Company',
      signUpCoolingUser: 'Sign Up as a Cooling User or Consumer',
      appInfo: 'App Info',
    },
    SignIn: {
      heading: 'Sign In',
      accounts: {
        registeredEmployee: {
          label: 'Registered Employee',
          description:
            'Part of the cold room provider management team. A registered employee can register the company in the app and invite other employees to join. Registered employees can log in with email or phone number.',
        },
        operator: {
          label: 'Operator',
          description:
            'Employee physically present at the cold room and managing its check-in, check-out operations. Operators can be invited by registered employees to join the company. Operators can log in with a phone number.',
        },
        coolingUser: {
          label: 'Cooling User',
          description:
            'The cold room user and consumer. Farmers, traders, retailers who have access to a smartphone can log in here. Cold room users without a smartphone can access the information of the app by visiting a cold room and interacting with the operator. Consumers can log in here to complete purchases.',
        },
        toasts: {
          login:
            'The username or password are not correct. Please confirm you have selected the right user role',
          success: 'Successfully logged in',
        },
      },
      form: {
        user: {
          placeholder: 'Email/Phone Number',
          description: {
            default: 'Please provide valid phone number (with country code).',
            registeredEmployee: 'Please provide valid email/phone number (with country code).',
          },
          messages: {
            default: 'Phone number is required.',
            registeredEmployee: 'An email address or a phone number is required.',
          },
        },
        password: {
          placeholder: 'Password',
          messages: {
            required: 'Password is required',
          },
        },
        actions: {
          logIn: 'Log in',
        },
      },
    },
    SignUp: {
      select: {
        header: 'Select a {{fieldName}}',
        label: 'Search...',
        cancel: 'Cancel',
        ok: 'OK',
      },
      welcome: 'Welcome to Coldtivate',
      schema: {
        passwordError:
          'Your password needs to be at least 8 characters long, contain one uppercase and one lowercase letters, and a number.',
        confirmPasswordError: 'Password confirmation is mandatory.',
        passwordsMismatchError: 'The passwords do not match.',
        countryError: 'Country selection is mandatory.',
        firstNameError: 'First Name is mandatory.',
        lastNameError: 'Last Name is mandatory.',
        phoneError: 'Phone number is mandatory.',
        invalidPhoneError:
          'Phone number is invalid. Please ensure the area code is included (e.g., +447000000000).',
        languageError: 'Language is mandatory.',
        genderError: 'Gender selection is mandatory.',
        termsError: 'You need to agree to the Terms of Use.',
        companyError: 'Company Name is mandatory.',
        currencyError: 'Currency selection is mandatory.',
        emailError: 'Email is mandatory.',
        malformedEmailError: 'Invalid email.',
      },
      commonForm: {
        firstNameLabel: 'First Name',
        lastNameLabel: 'Last Name',
        phoneLabel: 'Phone Number (with country code)',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm Password',
        countryFieldName: 'country',
        genderFieldName: 'gender',
        submit: 'Sign Up',
        terms: {
          agree: 'I agree to Coldtivate',
          license: 'User License Agreement',
          privacy: 'Privacy Policy',
          and: 'and',
          comsol: 'COMSOL Terms of Use',
        },
      },
      SignUpCompany: {
        companyHeader: 'Sign Up Company',
        userHeader: 'Sign Up Registered Employee',
        companyNameLabel: 'Company Name',
        emailLabel: 'Email',
        currencyFieldName: 'currency',
        modal: {
          warning: 'If you register without a phone some functionalities will not work:',
          reasons: {
            1: 'Resetting account',
            2: 'Receiving sms receipts',
          },
          buttons: {
            continue: 'Continue Anyway',
            addPhone: 'Add Phone',
          },
        },
      },
      SignUpCoolingUser: {
        header: 'Sign Up as a Cooling User or Consumer',
        languageFieldName: 'language',
      },
      toasts: {
        error:
          'Please ensure your details are accurate and try again. Note that one phone number and email can only be used by one account.',
      },
    },
    ForgotPassword: {
      heading: 'Forgot Password',
      messageSentNotification:
        'If the phone number exists, an sms has been sent to reset your password.',
      instructions:
        "In order to reset your password, please enter the phone number with it's country code, to which the account is connected.",
      phoneInputLabel: 'Phone Number',
      resetButton: 'Reset',
      requestLimitMessage: 'Request limit reached. Try again in 2 hours.',
    },
    ResetPassword: {
      schema: {
        passwordError:
          'Your password needs to be at least 8 characters long, contain one uppercase and one lowercase letters, and a number.',
        confirmPasswordError: 'Password confirmation is mandatory.',
        passwordsMismatchError: 'The passwords do not match.',
      },
      passwordLabel: 'New Password',
      confirmPasswordLabel: 'Confirm Password',
      resetButton: 'Reset',
    },
    Invite: {
      heading: 'Welcome to Coldtivate',
      employee:
        'You have been invited as Employee. Please fill in the form to finish your registration.',
      operator:
        'You have been invited as Operator. Please fill in the form to finish your registration.',
      fields: {
        password:
          'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.',
      },
    },
  },
  Dashboard: {
    TemperatureAlert: {
      title: 'Temperature alert',
      subtitle: 'We noticed there was a change. These are the commodities currently in storage.',
      edit: 'Do you want to edit the temperature ?',
      temperature: 'Temperature',
      newTemperature: 'New temperature',
      confirm: 'Confirm new temperature',
      continueWithoutUpdate: 'Continue without update',
      sensorHint: 'Cannot add temperature because a sensor is connected to the cooling unit.',
      latestTemperature: 'The latest temperature was registered on {{date}}.',
    },
    emptyGeneral: 'At the moment, there is no available data.',
    emptyCoolingUser:
      'Items in storage will appear in the dashboard when you do at least one check-in in any room.',
    noCompanyAvailable: 'No company available',
    noCoolingUnitAvailable: 'No cooling unit available',
    noLocationsAvailable:
      'Welcome to Coldtivate. Get started by adding locations to your app in the management panel.',
    coolingUserNavigateToMarketplace:
      'Interested in purchasing produce stored in cold rooms? Visit the Marketplace tab in the lower right!',
    MarketPrice: {
      emptyState: 'Crop Prices are not available in your country',
      'no-data-found': 'No data found for this market and commodity combination',
      commodityLabel: 'Commodity',
      commodityModalTitle: 'Select a commodity',
      Trend: {
        title: 'Select a commodity and a state to get a price forecast',
        emptyState: 'No data found for this market and commodity combination',
        pastLabel: 'Past',
        stateLabel: 'State',
        stateModalTitle: 'Select a state',
        forecastLabel: 'Forecast',
        chartLabel: 'Price in {{currency}}/Kg',
      },
      Ranking: {
        filter: 'Filter by location',
        monthLabel: 'Months',
        monthModalTitle: 'Select the months',
        stateModalTitle: 'Select the states',
        stateLabel: 'States',
        table: {
          column1: 'State',
          column2: 'Date',
          column3: 'Price in {{currency}}/Kg',
          emptyState: 'No value available',
        },
        'location-placeholder': 'State / District / Market',
        'market-district-state': 'Market / District / State',
        'district-label': 'Select a district',
        'district-placeholder': 'District',
        'market-label': 'Select a market',
        'market-placeholder': 'Market',
        'select-warning': 'Please make a selection for each field',
      },
    },
    CrateManagement: {
      userModalTitle: 'Select a cooling user',
      addUserLink: 'Cooling user not in list? Add the user from Management ➜ Cooling users ➜ +',
      coolingUserLabel: 'Cooling user',
      selectCoolingUnitLabel: 'Select a cooling unit',
      coolingUnitLabel: 'Cooling unit',
      noUnitWarning: 'Please select a cooling unit',
      noCratesWarning: "The selected Cooling user doesn't have any crates in this cooling unit",
      operationError: 'Something went wrong. Please try again later or contact support.',
      FarmerSurvey: {
        warningMessage: 'Please fill in the baseline survey for {{crop}}!',
        modal: {
          weeklyQuantityQuestion:
            'What is the quantity of {{crop}} that you produce or trade in a week?',
          cropSpoilageQuestion: 'What is the main reason for crop spoilage?',
          marketPriceQuestion: 'Average market price per week when selling {{crop}}',
          quantityDistributionQuestion: 'How much of that is:',
          selfConsumed: 'Self-consumed ({{unit}})',
          sold: 'Sold ({{unit}})',
          lost: 'Lost or sold below market price ({{unit}})',
          totalQuantity: 'Total quantity produced in a week',
          unitWeight: 'Each {{crate}} is',
          selectSpoilageReasonsPlaceholder: 'Select all reasons that apply',
          priceLabel: 'Price',
          priceUnit: 'per {{unit}}',
          commodityShortlist: 'Commodity shortlist',
          unit: {
            kg: 'Kg',
            crates: 'Crates',
            boxes: 'Boxes',
            sacks: 'Sacks',
            baskets: 'Baskets',
            singular: {
              kg: 'kg',
              crates: 'crate',
              boxes: 'box',
              sacks: 'sack',
              baskets: 'basket',
            },
          },
          reasonsForLoss: {
            improperHarvest: 'Improper harvest or handling',
            inappropriateStorage: 'Inappropriate storage / lack of cold storage',
            overproduction: 'Overproduction',
            transportationDamage: 'Transportation damage',
            pest: 'Pest',
            diseases: 'Diseases',
            weather: 'Extreme weather conditions',
            price: 'Market prices too low',
            other: 'Other',
          },
          errorMessages: {
            number: 'Must be a non-null, positive number',
            reasonsForSpoilage: 'Please introduce at least one reason.',
            totalMismatch:
              'The sum of Self-consumed, Sold and Lost or sold below market price should be equal to the total quantity produced.',
            cropError: 'Please select a commodity',
          },
        },
      },
      CheckOut: {
        selectCrateMessage: 'Select the crates you want to remove',
        selectAll: 'Select All',
        checkIn: 'Check-in',
        days: 'days',
        day: 'day',
        daysLeft: '{{amount}} days left',
        ttp: 'TTP',
        numberOfCrates: 'Number of crates',
        totalWeight: 'Total Weight',
        priceType: 'Price type',
        crate: 'crate',
        pricePerProduct: 'Price per product:',
        calculatedPrice: 'Calculated price',
        discount: 'Discount',
        transactionFeeDetails: 'Transaction fee details',
        coolingFeesAlreadyPaid: 'Cooling fees already paid',
        coolingFeesAlreadyPaidTooltip:
          'Part of one or more crates in this operation were sold on the marketplace. The corresponding cooling fees were already deducted from your payout.',
        priceWithDiscount: 'Total price',
        paymentType: {
          label: 'Payment type',
          cash: 'Cash',
          creditCard: 'Credit Card',
          bankTransfer: 'Bank Transfer',
        },
        bankTransfer: {
          title: "Receiver's Details",
          accountName: 'Account Name',
          accountNumber: 'Account Number',
          bankName: 'Bank Name',
        },
        paid: 'Paid',
        lockedWithinPendingOrders:
          'Crates that are locked in pending orders cannot be checked out.',
      },
      CheckIn: {
        emptyState: 'No boxes added yet',
        addCrates: 'Add Crates',
        cratesAddedLabel: 'Crates Added',
        checkInWithCode: 'Check in with code',
        estimatedCost: 'Estimated Cost',
        pricing: 'Pricing',
        day: 'day',
        successMessage: 'Crates were successfully checked in',
        emptyMessage: 'Please add at least one crate to your check in',
        noPlannedDaysMessage:
          'Missing planned days on some items. Cannot calculate estimated cost.',
        seeMore: 'See more',
        seeLess: 'See less',
        listed: 'Listed',
        WithCode: {
          modalTitle: 'Create Check In from existing Check Out',
          modalDescription:
            'You will need the check out code to start a new check in in this way. If you don’t have it, consider starting a new check in. If you know how long you plan to store, consider adding the number of days here.',
          codeLabel: 'Add code',
          codeErrorMessage: 'Code is required',
          failedMessage:
            "Check in failed. Please make sure your code hasn't been used already or contact support.",
        },
        SelectCropType: {
          fruits: 'Fruits',
          vegetables: 'Vegetables',
          rootVegetables: 'Root Vegetables',
          other: 'Other Items',
        },
        SelectCrop: {
          additionalInfo: 'Additional Info',
        },
        Setup: {
          selectedCrop: 'Selected crop',
          changeCropButton: 'Click here to change crop',
          individualCrateWeightButton: 'Click here to edit individual crate weight',
          individualCrateIdButton: 'Click here to edit individual crate IDs',
          numberOfCratesLabel: 'Number of crates',
          crateWeightLabel: 'Crate weight and marketplace listing',
          pricePerDayAndCrateLabel: 'Price per day / crate',
          pricePerDayAndKilogramLabel: 'Price per day / kg',
          fixedPriceLabel: 'Fixed price',
          totalPriceLabel: 'Total price',
          plannedDaysLabel: 'Planned number of days in storage',
          harvestDateLabel: 'When was the crop harvested?',
          harvestDateValues: {
            today: 'Today',
            yesterday: 'Yesterday',
            dayBefore: 'Two days back',
            evenBefore: 'Even Before',
          },
          crateWeightAndPricing: {
            applyAll: 'Apply to all',
            list: 'List for sale',
            addMore: 'Add more',
            sellingPrice: 'Listing selling price',
            potentialSellingPrice: 'Potential selling value',
            info: 'The price configuration refers to product sale, not cooling storage fee.',
            unavailableId: 'ID not set',
          },
          cratesError: 'Please insert a positive crate number',
          crateWeightError: 'Please insert a positive crate weight',
          harvestDateError: 'Harvest date is required',
          modals: {
            weight: 'Set Individual Weight of Crates',
            id: 'Set Individual ID of Crates',
            crateLabel: 'Crate',
            selectInitialId: 'Please set the starting crate ID',
            serialize: 'Serialize',
          },
        },
      },
    },
    CoolingUnitsPlanner: {
      SelectCoolingUnit: {
        label: 'Cooling unit: {{name}}',
        header: 'Select a cooling unit',
      },
      occupancy: 'Current occupancy of the cooling unit',
      week: 'This week',
      today: 'Today',
    },
    CoolingUnitsRoomConditions: {
      heading: 'Temperature history',
      temperature: 'Temperature',
      lastUpdated: 'Last updated at {{date}}',
      enterTemperature: 'Enter temperature',
      toasts: {
        confirmation: 'Temperature modified correctly',
      },
    },
    CoolingUnitsCratesInfo: {
      commodity: 'Commodity',
      percentage: 'Percentage',
      weight: 'Weight',
      crates: 'Crates',
      optimalTemp: 'Optimal T°C',
      messages: {
        empty:
          'Cooling units occupancy and temperature will appear here when you do at least one check-in in any room.',
      },
    },
    CoolingUnitsMaps: {
      singleCommodity: 'Single commodity room: {{crop}}',
      multiCommodity: 'Multicommodity room',
      publicMaker: 'Public cooling unit',
      usedMarker: 'Cooling unit you already used',
    },
    Company: {
      SelectCompany: {
        label: 'Company: {{name}}',
        header: 'Select a company',
      },
    },
    ProduceDetails: {
      seeDetails: 'See Details',
      kilogram: 'kg',
      coolingUser: 'Cooling User',
      contact: 'Contact',
      contactCopied: 'Copied!',
      crates: 'crates',
      crate: 'crate',
      cropType: 'Crop type',
      numberOfCrates: 'Number of crates',
      crateIds: 'Crate IDs',
      combinedWeight: 'Combined weight',
      remainingTime: 'Remaining time to pick up',
      currentStorageDays: 'Current storage days',
      plannedDays: 'Planned days',
      pricePerDay: 'Price / day',
      plannedStorageCost: 'Planned storage costs',
      pickUp: 'Pick up within',
      days: 'Days',
      noDTMessage: 'A Shelf-life model is not available for this particular commodity.',
      checkOutButton: 'Check out',
      cratesListedForSale: '{{amount}} crate(s) marked as listed for sale',
      preSaleError:
        "Please note: You can't change the listing status of crates with pending orders. If this doesn't seem to apply, please contact support for assistance.",
      operatorNoBankAccountWarning:
        "{{name}} doesn't have bank account details in order to receive payouts for their sales. Please add their Bank Account details in case they shared those with you.",
      farmerNoBankAccountWarning:
        "You don't have a Bank Account defined to receive payouts on your sales. Please add your Bank Account details",
      operatorNoCompanyBankAccount:
        "This cooling unit doesn't support marketplace listings. Please reach out to the company's manager to handle this matter.",
      employeeNoBankAccount:
        "This company doesn't have a Payouts Bank Account set up that enables receiving funds for both produces and cooling fees sold in the marketplace. Set it up to allow crates in your cooling units to be listed in the marketplace.",
      addBankAccountButton: 'Add bank account details',
      addBankAccountHeader:
        "You're setting up the bank account details on behalf of {{name}}. Please insert this data carefully as you'll not be able to make changes to it afterwards.",
      userWithoutPhone:
        'Crates belonging to this account cannot be listed for sale as no bank account can be linked to User without a phone.',
    },
    SearchFilter: {
      detailsMessage:
        'Search for a check-in using crop type, farmer name, days in storage, days left in storage, or check-in code',
      idMessage: 'Search for a crate using the ID number used to identify a specific crate',
      crateDetailsButton: 'Search for Crate Details',
      crateIdButton: 'Search for Crate ID',
      searchLabel: 'Search',
    },
    SortMenu: {
      title: 'Sort by',
      options: {
        cropType: 'Crop type',
        timeToPick: 'Time to pick up',
        checkInDate: 'Check in date (first to latest)',
        checkInDateReverse: 'Check in date (latest to first)',
        coolingUser: "Cooling user's name",
      },
    },
    Management: {
      Delivery: {
        companyName: 'Company name',
        companyNamePlaceholder: 'Insert company name',
        companyNameError: 'Please insert the company name',
        contactName: 'Contact name',
        contactNamePlaceholder: 'Insert contact name',
        contactNameError: 'Please insert the contact name',
        phoneNumber: 'Phone number',
        phoneNumberPlaceholder: 'Insert phone number',
        emptyMessage: 'No contacts have been added yet',
        deleteContactMessage: 'Are you sure you want to delete this contact?',
        noAvailableContacts: 'There are no available contacts for this particular cooling unit.',
        contactedAddedSuccessfully: 'Contact added successfully.',
        contactUpdatedSuccessfully: 'Contact updated successfully',
        contactStatusChangedSuccessfully: 'Contact status changed successfully',
        show: 'Show',
        hide: 'Hide',
        unassigned: 'Unassigned',
        roomContacts: 'Room Contacts',
        rooms: 'Rooms',
        addContact: 'Add Contact',
        editContact: 'Edit Contact',
        selectRoom: 'Select Room',
        legacyContactsModal: {
          title: 'Update room-specific contacts',
          description:
            "We've updated the delivery contacts system to be room-specific. You have {{count}} existing contacts that need to be assigned to a room.",
          descriptionPrefix: "We've updated the delivery contacts system to be room-specific. ",
          descriptionBold: 'You have {{count}} existing contact{{plural}}',
          descriptionSuffix: ' that need to be assigned to a room.',
          important: 'Important',
          importantMessage:
            'This ensures accurate delivery information for each cooling unit in your company.',
          remindMeLater: 'Remind me later',
          assignNow: 'Assign Now',
        },
        legacyContactsBanner: {
          title: '{{count}} Unassigned Legacy Contacts',
          title_one: '{{count}} Unassigned Legacy Contact',
          title_other: '{{count}} Unassigned Legacy Contacts',
          description: 'These contacts need to be assigned to specific rooms.',
          link: 'Assign Contacts to Rooms →',
        },
        legacyContactsScreen: {
          warningTitle: 'Assign {{count}} Contacts to Rooms',
          warningTitle_one: 'Assign {{count}} Contact to Room',
          warningTitle_other: 'Assign {{count}} Contacts to Rooms',
          warningMessage:
            'Select a room for each contact, then click "Assign Selected" or assign them one by one.',
          assignToRoom: 'Assign to room',
          allRooms: 'All Rooms',
          contactAssignedSuccessfully: 'Contact assigned successfully',
          contactDeletedSuccessfully: 'Contact deleted successfully',
          allAssignedMessage: 'All legacy contacts have been assigned!',
          roomLocation: 'Room Location',
          assignSelected: 'Assign Selected',
        },
      },
      Location: {
        emptyState: 'No locations added yet. Click on the + sign to add one.',
        text: {
          invited: 'Invited ({{amount}})',
          registered: 'Registered ({{amount}})',
        },
        chips: {
          address: 'Address',
          coordinates: 'Coordinates',
          geolocation: 'Phone Geolocation',
        },
        fields: {
          name: 'Name',
          latitude: 'Latitude',
          longitude: 'Longitude',
          country: 'Country',
          state: 'State',
          city: 'City',
          zipCode: 'Postal Code',
          street: 'Street',
          streetNumber: 'Street Number',
        },
        fieldErrorMessages: {
          latitude: 'Enter a number between -90 and 90 (e.g., 34.0522)',
          longitude: 'Enter a number between -180 and 180 (e.g., -118.2437)',
        },
        modal: {
          message:
            'This operation will delete all cooling units associated with this location. Do you want to continue?',
        },
        actions: {
          currentLocation: 'Choose current location',
        },
        toasts: {
          addLocationSuccess: 'Successfully added location',
          editLocationSuccess: 'Successfully edited location',
          removeLocationSuccess: 'Location {{name}} was successfully deleted.',
          failedToFetchLocation:
            'Unable to retrieve the location. Please check the address and try again.',
          positionCancelled: 'Location request canceled.',
          positionUnauthorized: 'Location denied. Please grant permission to continue.',
          locationUnavailable: 'Location disabled. Please enable to continue.',
          locationSubmissionError: 'An error occurred. Please review your location and try again.',
        },
      },
      Operators: {
        banner:
          'After adding the user, they will receive an sms with an invitation link, where they can activate their account.',
        text: {
          gender: 'Gender',
          ma: 'Male',
          fe: 'Female',
          ot: 'Other',
        },
        fields: {
          selectCoolingUnit: 'Select a cooling unit',
          coolingUnits: 'Cooling unit(s)',
        },
        actions: {
          invite: 'Invite',
          save: 'Save changes',
        },
      },
      AddOperator: {
        messages: {
          operator: 'To join the Coldtivate app as an Operator, go to: {{link}}',
        },
        toasts: {
          success: 'Successfully invited operator',
        },
        phoneFormat: 'Make sure the entered phone number has a country code.',
      },
      EditOperator: {
        toasts: {
          success: 'Successfully edited operator',
        },
      },
      AddCoolingUser: {
        toasts: {
          add: 'Add Cooling user',
        },
      },
      CompanyDetails: {
        labels: {
          name: 'Name',
          uploadLogo: 'Upload Logo',
          logo: 'Logo',
          country: 'Country',
          commodity: 'Commodity Shortlist',
          currency: 'Currency',
        },
        headings: {
          country: 'Select a country',
          commodity: 'Select a commodity',
          currency: 'Select a currency',
        },
        actions: {
          save: 'Save Changes',
        },
        toasts: {
          success: 'Successfully edited',
          photoLibrary: 'Permission Denied: Please enable access to your Photo Library.',
        },
      },
      RegisteredEmployee: {
        invited: 'Invited ({{amount}})',
        registered: 'Registered ({{amount}})',
      },
      RegisteredEmployeeDetails: {
        deletePersonal: 'To delete your account, go to Account Details.',
        deleteOther: 'If you want to delete this account, please contact {{contact}}',
      },
      AddRegisteredEmployee: {
        message: 'To join the Coldtivate app as a Registered Employee, go to: {{link}}',
        toasts: {
          success: 'Successfully invited registered employee',
        },
      },
      CoolingUsers: {
        modals: {
          selectMethod: 'How do you want to add the user?',
          userCode: 'Enter an user code',
          userCodeDesc:
            'You can find the code in your account-details if you registered as a cooling user.',
          addByCode: 'Add user by code',
          addWithDetails: 'Add user with details',
        },
        toasts: {
          notFound: 'No cooling user with this user code were found.',
          taken: 'This user is already in your list of cooling users.',
        },
      },
      EditCoolingUsers: {
        accountDetails: 'Payout Details',
        toasts: {
          warning:
            'This account cannot be deleted because the user has active check-ins in the cooling unit(s) {{names}}. Please notify the user to come to the room to pick up these items and complete the check-outs before deleting the account!',
          confirmation:
            'Are you sure you want to delete this user from your list of cooling users? This operation will delete this cooling user and can not be reversed!',
          edit: 'Successfully edited cooling user',
          noCoolingUnits: "You don't have any cooling units yet",
          noSurveys: 'No surveys have been completed yet.',
          updateSuccess: 'Successfully updated',
        },
        pdf: {
          dateRange: 'Date range',
          selectedUnits: 'Selected cooling units',
          coolingUnit: 'Cooling unit',
        },
        actions: {
          downloadFarmers: "Download farmer's dashboard data",
          completeLater: 'Complete later',
        },
      },
      CoolingUnit: {
        emptyState: 'No cooling units added in this location. Click on the + sign to add one.',
      },
      AddCoolingUnit: {
        heading: 'Cooling unit properties',
        fields: {
          name: 'Cooling unit ID',
          location: 'Location',
          coolingUnitType: 'What describes the cooling unit best?',
          metricUnit: 'Unit',
          price: 'Price',
          capacityInMetricTons: 'Total empty volume',
          foodCapacityInMetricTons: 'Max volume of food',
          roomSizeHeading: 'Cooling unit size',
          length: 'Length',
          width: 'Width',
          height: 'Height',
          weight: 'Weight',
          roomInsulator: 'Insulator',
          capacityInNumberCrates: 'Max number of crates',
          crateWeight: 'Standard weight of a crate',
          crateSizeHeading: 'Dimensions of a standard crate',
          editableCheckins: 'Make check-ins editable by operators',
          sensorAvailable: 'Sensor available',
          public:
            'Do you want to make your cooling unit visible for potential cooling users (location, type of room, capacity and price information)?',
          crops: 'Commodities',
          selectCrops: 'Select commodities',
          refrigerantType: 'Type of refrigerant used',
          amountRefrigerant: 'Amount of refrigerant',
          powerConsumptionInMt: 'Power consumption of cooling unit per MT',
          dailyRoomWattage: 'Daily wattage of the room',
          powerSource: 'How is the cooling unit powered?',
          powerSourceDieselConsumptionKwh: 'Diesel consumption of the generator per kWh',
          pvPanelType: 'Type of PV Panels',
          pvPanelCount: 'Number of PV panels',
          pvPanelSize: 'Size of a single panel',
          pvPanelWeight: 'Weight of a single panel',
          pvPanelMaxPower: 'Maximum power of a single panel',
          powerSourceDieselPercent: 'Diesel Generator',
          powerSourceGridPercent: 'Grid',
          powerSourcePvPercent: 'PV Panels',
          powerSourceBiomassPercent: 'Biomass',
          electricityStorageSystem: 'Electricity storage system',
          thermalStorageMethod: 'Thermal storage method',
          batteryCount: 'Number of batteries',
          batteryWeight: 'Battery size',
          batteryCapacity: 'Capacity of one battery',
          batteryMaxCurrent: 'Maximum charging current of one battery',
          batteryPeakEnergyStorage: 'Energy storage at peak level of one battery',
          batteryType: 'Type of batteries',
          selectSensorType: 'Select a sensor type',
          emptySensorListError:
            'It seems there are no sensors connected to your {{type}} account. Please connect at least one and try again.',
          selectSensor: 'Select a sensor',
          addTempSensor: 'Add a temperature sensor to your cooling unit.',
          sensorDesc: {
            default: 'Request this info from your sensor provider if not at hand.',
            ubibot: 'Find this information in your ubibot account.',
          },
          ecozen: {
            username: 'Username',
            password: 'Password',
            machineId: 'Machine Id',
          },
          genericSensorForm: {
            username: 'Username/Email',
            password: 'Password',
          },
          unknownSensor: 'Unknown',
          hybridFields: 'Which percentage of the room is powered by the different sources?',
          cropSpecificPricing: 'Crop-specific pricing',
          value: 'Value',
          machineId: 'Machine ID',
          channelId: 'Channel ID',
          deviceTag: 'Device Tag',
          dateAdded: 'Date Added',
          sensorType: 'Sensor Type',
        },
        coolingUnitTypes: {
          FARM_GATE_STORAGE_ROOM: 'It is a storage room placed at a farm-gate',
          MARKET_STORAGE_ROOM: 'It is a storage room placed at a market',
          MOVABLE_UNIT: 'It is a movable unit (for example, a refrigerated truck)',
          OTHER: 'Other',
        },
        pricing: {
          label: 'Price type',
          PERIODICITY: 'Per day',
          FIXED: 'Fixed',
          day: 'day',
        },
        metricUnit: {
          label: 'Unit',
          KILOGRAMS: 'kg',
          CRATES: 'Crate',
        },
        toasts: {
          addSuccess: 'Successfully added cooling unit',
          integrationError:
            'Unable to connect to the sensor. Validate your data or contact your sensor provider.',
          integrationSuccess: 'Successfully authenticated the sensor credentials.',
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete:
            'This operation will delete this cooling unit including its history. Do you want to continue?',
        },
        buttons: {
          viewExisting: 'View Existing',
          editPricing: 'Edit Pricing',
        },
        toasts: {
          editSuccess: 'Successfully edited cooling unit',
          cantDelete: "This cooling unit can't be deleted because it has active check-ins.",
          successDelete: 'Cooling unit {{name}} was successfully deleted.',
        },
      },
      UsageAnalysis: {
        dateSelectionLabel: 'Select days:',
        empty:
          'Check-ins and check-outs will appear in the dashboard when you do at least one check-in in any room.',
        downloadDataButton: 'Download data',
        modal: {
          title: 'Set configuration',
          coolingUnitSelection: 'Select cooling unit:',
        },
        summary: {
          totalCheckIns: 'Total number of check ins:',
          totalCrates: 'Total number of crates:',
          totalWeight: 'Total weight:',
          totalUsers: 'Total number of distinct users:',
          weightUnit: 'kg',
        },
      },
      RevenueAnalysis: {
        summary: {
          total: 'Total revenue',
        },
        paymentType: {
          label: 'Select payment methods:',
          cash: 'Cash',
          creditCard: 'Credit Card',
          bankTransfer: 'Bank Transfer',
        },
      },
      Coupons: {
        title: 'Discount coupons',
        emptyMessage: 'No coupons have been added yet',
        addCoupon: 'Add Coupon',
        code: 'Coupon code',
        percentage: 'Coupon percentage',
        revokeTitle: 'Revoking Coupon',
        revoke: 'Revoke',
        revokeMessage:
          'Are you sure you want to revoke this coupon? Once revoked, it cannot be used again and the discount will no longer be available. This action is permanent and cannot be undone.',
        messages: {
          codeField: 'Must be max 25 characters and contain only letters and numbers',
        },
      },
    },
    Marketplace: {
      buyerSelection: {
        onBehalfOfCompany: 'Buy on behalf of company',
        forMyself: 'Buy for myself',
        label: 'Buyer',
      },
      sorting: {
        'price-asc': 'Price ascending',
        'price-desc': 'Price descending',
        'nearby-me': 'Near to me',
      },
      distance: {
        withing5Km: '1 to 5 KM away',
        within10Km: '5 to 10 KM away',
        within25Km: '10 to 25 KM away',
        beyond25Km: 'More than 25 KM away',
      },
      priceConfig: 'The price configuration refers to product sale, not cooling storage fee.',
      addToCart: {
        addToCartButton: 'Add to cart and continue shopping',
        buyFullCrate: 'Buy full crate',
        selectQuantity: 'Select quantity',
        goToCart: 'Add to Cart and view summary',
      },
      currentLocation: 'Current location',
      invalidFormatWarning:
        'Warning: The city name format is invalid. Results may not be accurate.',
      unresolvedCityFormatWarning:
        'Warning: The specified city could not be resolved accurately. Results may not be accurate.',
      lowConfidenceWarning:
        'Warning: The city could not be confidently identified. Results may not be accurate.',
      filterGeneralWarning:
        'Warning: An issue occurred during geolocation. Results may not be accurate.',
      standardCrateWeight: 'Standard weight of crate is {{value}} kg',
      owner: 'Owner',
      priceRange: 'Range Price / KG',
      Filters: {
        min: 'Min',
        max: 'Max',
        label: 'Filters',
        coolingUnitLabel: 'Cooling unit',
        coolingUnitHeading: 'Select cooling units',
        cropTypeLabel: 'Produce / Crop Type',
        cropTypeHeading: 'Select crops',
        companyLabel: 'Company',
        companyHeading: 'Select companies',
      },
      maxDistance: 'Max Distance',
    },
    AccountDetails: {
      popups: {
        default: 'Are you sure that you want to delete your account?',
        lastRegisteredEmployee:
          'You are the only Registered Employee in the company, this action will delete the company!',
        activeCheckInOP:
          'The cooling unit(s) {{names}} that you are assigned to has active check-ins and you are the last operator in it. You need to check out all the produce or notify a Registered Employee to assign a different operator to this cooling unit before you can delete your account!',
        activeCheckInRE:
          'You can not delete your account if you are the last Registered Employee and there are active check-ins on some cooling units, as this action would delete your company. Please make sure all active check-ins in cooling unit(s) {{names}} are checked out first.',
        activeCheckInCU:
          'You can not delete your account because you have active check-ins in cooling unit(s) {{names}}. Please check out these items first, and then try again to delete your account!',
      },
      fields: {
        location: 'Location',
        userCode: 'Cooling User Import Code',
      },
      toasts: {
        success: 'Successfully updated user',
      },
      sections: {
        sellerSettings: 'Seller Settings',
        companySellerSettings: 'Seller Settings (Company)',
        buyerSettings: 'Buyer Settings',
        details: 'Details',
      },
      ContactsSharing: {
        publicPhone: 'Make phone number public',
        publicEmail: 'Make e-mail public',
      },
      PayoutSettings: {
        addTitle: 'Please insert your bank account information',
        editTitle: 'Your bank account information',
        addTittleForCompany: "Please insert you company's bank account information",
        editTitleForCompany: "Your company's bank account information",
        form: {
          nameLabel: 'Account name',
          namePlaceholder: 'Insert account name',
          accountNumberLabel: 'Account number',
          accountNumberPlaceholder: 'Insert account number',
          countryLabel: 'Country',
          nigeria: 'Nigeria',
          selectBank: 'Select bank from list',
          bank: 'Bank',
          accountType: 'Account Type',
          selectAccountType: 'Select account type',
          accountTypes: {
            personal: 'Personal',
            business: 'Business',
          },
          errors: {
            accountName: 'Account name is required',
            account: 'Account number is required',
            accountType: 'Account type is required',
            bank: 'Bank selection is required',
          },
        },
        successMessage: 'Bank account added successfully.',
        errorMessage:
          "We couldn't verify the account details. Please review the account number and bank name for any possible mistakes.",
      },
      PaymentSettings: {
        cards: 'Cards',
        creditCard: {
          predefined: 'Predefined',
          owner: 'Card Holder Name',
          date: 'Expiry Date',
          cvv: 'CVV',
        },
        AddCreditCard: {
          title: 'Please insert your card information',
          form: {
            cardName: 'Card name',
            cardNamePlaceholder: 'Insert card name',
            cardNumber: 'Card number',
            cardNumberPlaceholder: 'Insert card number',
            expiryDate: 'Expiry date',
            securityCode: 'Security code',
            securityCodePlaceholder: 'Insert the card security code',
            predefinedMethod: 'Predefined payment method',
            successMessage: 'Card added successfully',
            cardNameError: 'Card name is required',
            cardNumberError: 'Card number is required',
            securityCodeError: 'Security code is required',
          },
        },
      },
    },
    About: {
      runtimeAgree: 'Comsol Runtime Agreement',
      userLicense: 'End User License Agreement',
      privacyPolicy: 'Privacy Policy',
      comsolAbout: 'Comsol About',
    },
    KnowledgeHub: {
      comic: "Farmer's journey: Comic Strip",
      cooling: 'What is Cooling-as-a-Service?',
      quality: 'How to maximize crop quality',
      optimal: 'Optimal storage conditions in multi-commodity cold rooms',
      table: 'Crop storage table',
      sensors: 'Temperature sensors and Time-to-Pick-Up model',
      tips: 'Tips for checking in crates',
      glitches: 'How to respond to technical glitches in the cold room',
      source: 'Source: please refer to the Operators’ Manual for further information:',
      clickHere: 'Click here',
    },
    History: {
      cropsLabel: '{{crop}} and {{amount}} more',
      priceLabel: 'Price',
      empty:
        'Check-ins and check-outs will appear in the dashboard when you do at least one check-in in any room.',
      sortMenuOptions: {
        cropType: 'Crop type',
        movementDate: 'Movement date (first to latest)',
        movementDateReverse: 'Movement date (latest to first)',
        checkInFirst: 'Check in first',
        checkOutFirst: 'Check out first',
        coolingUser: "Cooling user's name",
      },
      optionsMenu: {
        common: {
          pdfReceipt: 'Download PDF receipt',
          seeMovement: 'See movement',
        },
        checkOut: {
          seeDetails: 'See details',
          smsReceipt: 'Download SMS receipt',
          marketSurvey: 'Fill in market survey',
        },
        checkIn: {
          edit: 'Edit check in',
        },
      },
      detailsModal: {
        operatorNameLabel: 'Check out operator Name',
        operatorNumberLabel: 'Check out operator number',
        checkOutDateLabel: 'Check Out date',
        marketSurveyLabel: 'Market survey completed',
        cratesLabel: 'Crates',
        combinedWeightLabel: 'Combined weight',
        paymentMethodLabel: 'Payment Method',
        cropTypeLabel: 'Crop type',
        checkInCodeLabel: 'Check In code',
        crateIdsLabel: 'Crate IDs',
      },
      pdfModal: {
        coolingUserLabel: 'Cooling User',
        dateLabel: 'Date',
        weightLabel: 'Weight (Kg)',
        downloadButton: 'Download Invoice',
        downloadName: '{{code}}-receipt',
        successMessage: 'Receipt downloaded!',
        errorMessage: 'Something went wrong. Please try again later.',
        checkOut: {
          title: 'Company',
          checkOutLabel: 'Check out code',
          idLabel: 'ID',
          itemLabel: 'Item',
          calculatedPriceLabel: 'Calculated cooling fee',
          discountLabel: 'Discount',
          totalPrice: 'Total cooling fee',
        },
        checkIn: {
          title: 'Check-in receipt',
          operatorLabel: 'Operator',
          codeLabel: 'Check-in code',
          companyLabel: 'Company',
          coolingUnitLabel: 'Cooling Unit',
          priceLabel: 'Price {{currency}} / Day',
          cropLabel: 'Crop',
          numberOfCratesLabel: 'Number of Crates',
          totalLabel: 'Total',
        },
      },
      editCheckIn: {
        contactLabel: 'Contact',
        coolingUserLabel: 'Cooling User',
        disclaimer: 'Disclaimer: The time to pick up is an estimated amount of days.',
        disclaimerMessage:
          'Disclaimer. Note that the time to pick up is an estimated amount of days. This estimation was based on calibrated models for the fruit or vegetable species and a numerical simulation. The actual quality degradation of the product however also depends on local weather conditions, growing conditions, harvest date and others. Therefore, deviations from our predicted time to pick up days can occur.',
        selectCropLabel: 'Select a commodity',
        successMessage: 'Check-in updated successfully!',
        errorMessage: 'Failed to update check-in. Please try again.',
      },
      survey: {
        fillMessage:
          'Please fill in the <0>Cooling user survey</0> (baseline survey) for {{crop}}!',
        baseSurvey: {
          occupationQuestion: 'What defines you best?',
          occupationFarmer: 'A farmer',
          occupationTrader: 'A small vendor/trader/wholesaler',
          usageQuestion: 'Have you used the cold room in the past?',
          newUser: 'No, I am a new user',
          oldUser: 'Yes, I have used the cold room',
          mostUsedCommoditiesQuestion: 'Most harvested/traded commodities?',
          commodity: 'Commodity',
          newCommodity: 'Commodity {{index}}',
          fillCommoditiesMessage:
            'Please fill in the below questions for the commodities that you plan to bring to the room more often.',
          addCommodityButton: 'Add commodity',
          genericFormError: 'Please select an option',
          experienceError: 'Please introduce a value',
        },
        marketSurvey: {
          title:
            'Please answer the following questions for the crates of {{crop}} you checked out.',
          locationQuestion: 'Where did you sell your produce?',
          locations: {
            farm: 'Farm-gate',
            market: 'Local market',
            both: 'Both farm-gate and market',
          },
          priceQuestion: 'What price did you receive for it?',
          spoiledProducesQuestion:
            'How much of what was in storage last week was spoiled or sold below the average market price?',
          spoilageReasonsQuestion: 'What is the main reason for crop spoilage?',
          formError: 'Please select an option',
        },
      },
      stringTemplates: {
        movementType: {
          checkOut: 'Check Out',
          checkIn: 'Check In',
          checkedOut: 'Checked out',
          checkedIn: 'Checked in',
        },
      },
    },
    MyOrders: {
      coolingFees: 'Cooling fees',
      soldFor: 'Sold for',
      amountReceived: 'Amount Received',
      transactionDetails: 'Transaction details',
      soldTo: 'Sold to {{buyerName}}',
      soldForDescription: 'the selling price of the goods',
      coolingFeeDescription:
        'the cost of storing your crops in the cooling unit. This amount is deducted from the selling price before payout and is being transferred to the cooling company to cover your cooling fee. No other action is required from your side.',
      amountReceivedDescription:
        'this is the actual amount transferred to your bank account after cooling fees.',
      ownedBy: 'Owned by',
      you: 'You',
      sort: {
        mostRecent: 'Most recent',
        oldest: 'Oldest',
        date: 'Date',
      },
      status: {
        'payment-pending': 'Payment Pending',
        'payment-expired': 'Payment Expired',
        cancelled: 'Cancelled',
        paid: 'Paid',
      },
      title: 'Order Overview',
      orderId: 'Order ID',
      cropType: 'Crop Type',
      coolingUnit: 'Cooling Unit',
      orderTotal: 'Order Total',
      backToTopButton: 'Back to the top',
    },
    ShoppingCart: {
      cartUpdatedMessage:
        'Some products have been removed from your cart because they are no longer available for purchase.',
      ownership: 'Change cart ownership to {{name}}',
      changeOwnership:
        'Change the shopping cart ownership to {{name}}. This may affect the contents of your cart, including the possible removal of certain crates that might not be available after this change. Are you sure you want to proceed?',
      empty: 'Your cart is empty',
      daysLeft: 'days left',
      weight: 'KG available',
      perKg: '/ KG',
      totalToPay: 'Total to pay',
      pay: 'Pay',
      orderHeader: 'Order',
      subtotal: 'Subtotal',
      produce: 'Produce',
      discount: 'Discount',
      fees: 'Service fees',
      marketFees: 'Marketplace fee',
      paymentFees: 'Payment fee',
      coolingFees: 'Cooling fee',
      viewContacts: 'View contact(s)',
      contactsForDelivery: 'Contact(s) for delivery information',
      contacts: 'Contacts',
      legacyContactsWarning:
        "{{companyName}} has not assigned delivery contacts to this room. This is a list of all of {{companyName}}'s delivery contacts.",
      gotItButton: 'Got it!',
      pickupMethods: 'Pickup method',
      selectPickupMethod: 'Select a pickup method',
      selectPickupMethodInfo: 'A pickup method selection is required for each cooling unit.',
      pickupMethodSelectionMissing: 'Missing pickup method selection for {{amount}} cooling units.',
      pickUpToday: 'Pickup today',
      keepInStorageDailyRate: 'Keep in storage ({{price}} / day)',
      keepInStorageFixedRate: 'Keep in storage ({{price}})',
      delivery: 'Delivery',
      contactName: 'Contact name',
      phoneNumber: 'Phone number',
      thankYouMessage: 'Thank You for Ordering',
      orderOverview: 'Order overview',
      products: 'Products',
      consultOrders: 'Consult My Orders',
      total: 'Total',
      couponQuestion: 'Have a discount coupon?',
      redeem: 'Redeem code.',
      redeemCoupon: 'Redeem coupon',
      couponPlaceholder: 'E.g. 20OFF',
      discountsApplied: 'Discounts Applied',
      method: 'Method:',
      deliveryInfo:
        'Note that the delivery fee is dependant on the provider. If delivery is scheduled for tomorrow, a cooling fee of {{value}} will also be applied.',
      pickUpTodayInfo:
        'Please ensure you pick up your products by the end of the day to avoid any additional cooling fees.',
      keepInStorageInfo: 'The cooling fee will be applied when you pick up your order.',
      orderOverviewSubtitle:
        "You can revisit this information under the tab 'My Orders' in the 'Marketplace' screen.",
      pickupModal: {
        today: 'Please pick up your order at {{company}}, located at {{location}}, today.',
        storage: 'Your crates are now being stored at {{company}}, located at {{location}}.',
        delivery:
          "Please contact the available numbers to arrange delivery. You can see the list of delivery options under 'Order details'.",
      },
      errors: {
        invalid: 'Invalid value',
        minimumCartValue: 'Order must be at least ₦100.',
      },
    },
    Analytics: {
      emptyState: 'No data to display',
      company: 'Company',
      aggregated: 'Aggregated',
      comparison: 'Comparison',
      downloadDataButton: 'Download data',
      users: 'Users',
      impact: 'Impact',
      maleLabel: '👨🏽 Male: {{amount}}',
      femaleLabel: '👩🏽 Female: {{amount}}',
      otherLabel: 'Other: {{amount}}',
      usersTotal: 'Total number of distinct cooling users = {{amount}}',
      operatorsTotal: 'Total number of operators = {{amount}}',
      beneficiariesTotal: 'Total number of indirect beneficiaries = {{amount}}',
      totalCratesLabel: '🧺 Total crates',
      totalQuantityLabel: '📦 Total quantity (kg)',
      totalOperations: '👷🏽‍♂️ Total operations',
      checkedInLabel: 'Checked In: {{amount}}',
      checkedOutLabel: 'Checked Out: {{amount}}',
      methodologyButton: 'View Methodology',
      farmersAnalytics: {
        coolingUserName: 'Cooling User Name',
        coolingUserType: 'Cooling User Type',
        avgStorageTime: 'Average Storage Time',
        coldStorageCost: 'Cold Storage Cost',
        days: 'day(s)',
        baselineSurveyButton: 'Fill Baseline Surveys',
        baseLineSurveyMessage: 'You have {{amount}} surveys to complete 😟',
        postCheckOutSurveyButton: 'Fill Post Checkout Surveys',
        postCheckOutSurveyMessage: 'You have {{amount}} surveys to complete 😟',
        noChangeFoodLoss: 'No change in food loss',
        increaseInFoodLoss: 'Increase in food loss',
        decreaseInFoodLoss: 'Decrease in food loss',
        increaseInRevenue: 'Increase in revenue',
        decreaseInRevenue: 'Decrease in revenue',
        foodLossEvolution: '🥗 Food loss evolution per crop (top 5)',
        changePercentage: '% Change',
        crops: 'Crops',
        foodLossLevels: 'Food loss levels',
        revenueEvolution: '💰 Average revenue evolution',
        revenueCropEvolution: '💰 Average revenue evolution per crop (top 5)',
        noChangeRevenue: 'No change in revenue',
        revenueLevels: 'Revenue levels',
        baselineSurveyLabel: '📊 No. of baseline surveys completed',
        postCheckoutSurveyLabel: '📊 No. of post-checkout surveys completed',
        allPostCheckoutSurveysCompleted: 'All post-checkout surveys completed 🤝',
        allBaselineSurveysCompleted: 'All baseline surveys completed 🤝',
      },
      companyTab: {
        usersTab: {
          employeesTotal: 'Total number of registered employees = {{amount}}',
          usersType: 'Type of cooling users',
          farmersLabel: '🧑🏽‍🌾 Farmers: {{amount}}',
          tradersLabel: '👩🏽‍💼 Traders: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'Average occupancy of cooling units:',
          occupancyContent: '🏘️ {{amount}}%',
        },
        impactTab: {
          foodLossLabel: '🥗 Food loss evolution',
          revenueLabel: '💰 Cooling user revenue evolution',
          co2Label: '💨 CO2e emission evolution',
          surveysAmountLabel: '📊 No. of surveys used to calculate food loss and revenue evolution',
          co2Increase: 'CO2e emissions per kg of produce increased with cooling',
          co2Decrease: 'CO2e emissions per kg of produce decreased with cooling',
          co2WithoutCooling: 'Kg of CO2e per kg of produce emitted without cooling',
          co2WithCooling: 'Kg of CO2e per kg of produce emitted with cooling',
          from: 'From',
          to: 'To',
        },
        downloadFileName: 'analytics-data',
        utilization: 'Utilization',
        goBackButton: 'Back to main',
        companyNameLabel: 'Company Name',
        revenueLabel: 'Total Revenue',
        coolingUnitsLabel: 'Nº of cooling Units',
        singleCoolingUnitContent: '1 unit',
        coolingUnitsContent: '{{amount}} units',
        capacityLabel: 'Total cooling capacity',
        capacityContent: '{{amount}} metric tonnes',
        coolingUnitTypeLabel: 'Cooling unit type',
        coolingUnitTypeMarket: '{{amount}} market rooms',
        coolingUnitTypeFarmGate: '{{amount}} farm-gate rooms',
        coolingUnitTypeMovable: '{{amount}} movable rooms',
      },
      tabsShared: {
        configurationMessage: 'Please configure your dates & cooling units to have access',
        configureButton: 'Configure',
        crates: 'Crates',
        dateRangeLabel: 'Date range:',
        selectedUnitsLabel: 'Selected cooling units:',
        totalCo2Label: '💨 Total CO2e emitted:',
        roomRevenue: '📈 Room revenue',
      },
      comparisonTab: {
        sortingLabel: 'Sort',
        coolingUnit: 'Cooling Unit',
        genderHeader: 'Male | Female | Other',
        genderSecondaryHeader: 'Male | Female',
        total: 'total',
        sortingMenuOptions: {
          descending: 'Descending',
          ascending: 'Ascending',
          coolingUnitName: 'Cooling Unit Name',
        },
        usersTab: {
          operators: 'Operators',
          users: 'Active cooling users',
          activeUsers: 'Active users',
          beneficiaries: 'Indirect beneficiaries',
        },
        cratesTab: {
          crates: 'Crates',
          kg: 'Kg',
          operations: 'Operations',
          checkedIn: 'Checked In',
          checkedOut: 'Checked Out',
          checkedInCropDistribution: '🧺 Check-in crop distribution (crates) ',
          checkedInKgDistribution: '⚖️ Check-in crop distribution (kg)',
          checkInCropDistribution: 'Check-in crop distribution',
          checkedOutCropDistribution: '🧺 Check-out crop distribution (crates) ',
          checkedOutKgDistribution: '⚖️ Check-out crop distribution (kg) ',
          checkOutCropDistribution: 'Check-out crop distribution',
          co2: '💨 CO2e emitted for cooling',
          co2EmissionsLabel: 'CO2e emissions (kg)',
          co2DistributionLabel: 'CO2e crop distribution',
          co2Kg: 'Kg CO2 emitted',
        },
        impactTab: {
          occupancyLabel: '🏘️ Average occupancy of cooling units',
          occupancy: 'Occupancy',
          foodLossLabel: '🥗 Food loss evolution',
          revenueLabel: '💰 Cooling user revenue evolution',
          changePercentage: '% Change',
          completePercentage: '% Complete',
          foodLossLevels: 'Food loss levels',
          revenueLevels: 'Revenue levels',
          revenuePerRoomLabel: '📈 Revenue per room',
          co2Label: '💨 CO2e emission evolution',
          surveysAmountLabel: '📊 No. of surveys used to calculate food loss and revenue evolution',
          co2EmissionsLabel: 'CO2e (kg)',
        },
      },
    },
    Notifications: {
      text: {
        notifications: 'Notifications',
      },
      sensorError:
        'The sensor for cold room {{unitName}} has not sent any data in the last 12 hours. Please enter data manually until it is fixed.',
      survey: 'Please fill in the after-storage survey for {{farmer}} regarding {{crop}}.',
      link: 'Please go here to complete it.',
      coolingUserSurvey:
        'You have checked in {{crop}} but you have not completed the survey for this crop.',
      operatorSurvey:
        'You have checked in {{crop}} for {{farmer}} but you have not completed the survey for this crop.',
      pickup:
        'Your crates of {{crop}} should be picked up as soon as possible! (check in date: {{checkIn}}, cooling unit ID: {{unitId}}, check in ID: {{movementCode}}).',
      notifyCoolingUser:
        'Please notify the user {{farmer}} that his/her crates of {{crop}} should be picked up as soon as possible! (check in date: {{checkIn}}, cooling unit ID: {{unitId}}, check in ID: {{movementCode}}).',
      checkIn: 'Operator {{farmer}} has edited check-in {{movementCode}} on {{date}}.',
      surveyAlreadyFilled: 'Survey has already been filled',
      orderRequiresMovement:
        'Produces need to be redistributed between crates. Click for details on which items to move.',
      listingPriceUpdated:
        'The listing prices for the crates storing {{crop}} at {{unitName}} have been updated: {{priceTag}}',
    },
  },
  tutorial: {
    welcome: 'Welcome to Coldtivate! This is a walkthrough of the functionalities.',
    farmerWelcome:
      'Welcome to Coldtivate! This tutorial will help you understand how to use the app.',
    quit: 'Quit Tutorial',
    congratulations:
      'Congratulations! You have completed the tutorial! Go back to the dashboard to start using the app.',
    prev: 'Previous step',
    next: 'Next',
    start: 'Start Tutorial',
    final:
      'Congratulations! You have completed the tutorial! Go back to the dashboard to start using the app.',
    backToDashboard: 'Back to Dashboard',
    steps: {
      openDrawer:
        'On the top left, you find a menu with the main functionalities. Go ahead and click it.',
      repeatTutorial: 'If you want to watch this tutorial again, you can also find it in the menu.',
      managementNavigation:
        'In the menu, you can navigate to the "Management" tab and there add new Locations, Cooling Units, Registered Employees and Operators.',
      operatorManagementNavigation:
        'In the Menu, you can navigate to "Management" and tap there to add or edit Cooling Users',
      addCoolingUser:
        'Cooling users who have not registered on Coldtivate can be added by inserting their details (name, phone number). Cooling users who already signed up in the app can be added by code. They can find their code on their profile -> "Account details" -> "Cooling User Import Code".',
      navigateToCoolingUser: 'Go ahead and click the Cooling Users tab',
      listCoolingUsers:
        'Cooling users with a smartphone are identified by a phone icon on the right side of the screens. The others are cooling users with a basic phone. In both cases, you can click on a name to access their details and the cooling user survey.',
      navigateToAddCoolingUser: "Clicking the '+' sign allows you to add a new Cooling User.",
      coolingUnitStep:
        'You can navigate across cooling units by clicking on the dropdown menu at the top.',
      initiateCheckIn1:
        'Once you add a cooling user, you can make a check-in for that cooling user. Go ahead and click the activity button.',
      initiateCheckIn2: 'Now click on the check-in button (the one in green).',
      checkIn1:
        'To complete the check-in, you need to click on "Add Crates" and follow the instructions step by step. Click \'Continue\' to see what the result would look like.',
      checkIn2:
        'After having completed all the steps, you will see an overview of the crates you are about to check into the room.',
      checkIn3:
        'If you are satisfied, you can click "Confirm" and the new crates will be added to the Dashboard.',
      history:
        'Clicking on "History", you can see all the movements in the room. The check-outs for which the after-storage survey has not been completed are marked by a red dot.',
      coolingUnits:
        'Click on "Cooling Units" to see the capacity of a cooling unit in the next 7 days (Planner tab) and the temperature of the room (Room conditions tab).',
      roomConditions:
        ' You can manually update the temperature of the cooling room in "Room conditions" in case you do not have a sensor connected with the app.',
      checkOut1:
        'To start a check-out, click on the Activity button and then on the red button. Then follow the instructions to complete the check-out.',
      checkOut2: 'You can choose the cooling unit and crops you want to check out.',
      checkOut3:
        'Once the items are paid for, click on the respective button and finalize the check out.',
      navigateToLocations:
        'The first thing you will need to do is add a location. Go ahead and click the locations tab.',
      locations:
        'You can add a location by selecting a name and adding its latitude and longitude, by sharing your GPS coordinates (if you are at the cold room location), or by typing the address.',
      navigateToCoolingUnits:
        'After a location has been added, you can add a cooling unit. Go ahead and click the cooling units tab.',
      addCoolingUnits:
        'A cooling unit can be added by completing the details above. If you have temperature sensors in the cooling unit and an API in place, you can input the credentials and automatically connect your sensors to the app.',
      addEmployeesOperators:
        'You can add Registered Employees and Operators through the Management screen. In order to add either role, you will need their phone number. They will receive an SMS with an invitation link. A phone number can be used for only one user.',
      employeeCoolingUnitsStep:
        'Once you have selected a cooling unit you will see an overview of: the crates currently in storage in the "Dashboard" tab, statistics about utilisation and impact in the "Analytics" tab, and the list of crates for sale in the "Marketplace" tab. Clicking on "More", you can also navigate to the "Crop Prices", "History", "Cooling Units", and "Orders" tab.',
      localizationPreferences:
        'You can change the language of the app by selecting "Localization Preferences". Make sure to click the "Save changes" button for the language to be changed!',
      accountDetailsNavigation:
        'In the menu, you can navigate to "Account Details" and tap there to view/edit a set of configurations related to your account. Go ahead and try it.',
      coolingUserSurvey:
        'The first time you open the app, you are asked to complete a short survey. It is very important that you fill in the survey for the app to provide you with customized recommendations. If you cannot fill in the survey the first time you log in, you can access the survey in "Account details" -> "Cooling User Survey". Thank you for taking the time to complete the survey!',
      coolingUserCode:
        'The first time you arrive at a cold room to store your produce, the operator will ask you to provide her / him with your personal code, to add you to the list of cold room users. You can find this code in "Personal details" -> "Cooling User Import Code".',
      knowledgeHub:
        'In the menu, you can find the "Knowledge Hub", which contains advice on how long different crops can be stored, and their optimal temperature. Check it out to understand how much the cold room can help you to preserve the quality of different fruits and vegetables!',
      faq: 'In the menu, you can also find the Frequently Asked Questions (FAQ). We recommend you check them out to learn more about the app and the benefit of storing your produce in the cold rooms.',
      dashboardStep1:
        'Once the operator has completed a check-in for you, you will be able to see the produce in storage in the room in the "Dashboard" section. Every card contains a set of crates of the same type of crop that were checked in together.',
      dashboardStep2:
        'Each card in the dashboard contains information about: the type of crop, the number of crates stored, how many days they have already been stored for, the daily price (for all crates together), and the check-in ID.',
      dashboardStep3:
        'The colored number of days indicates the "Time to pick up" (TTPU), which means for how many days your produce is still going to be good for, if it stays refrigerated. A red color means that the produce is losing its quality and should be picked up as soon as possible.',
      dashboardStep4:
        'If the color of the card is yellow (2-5 days left) or green (more than 5 days), you do not need to worry about the crates. The number of days is recalculated multiple times per day, so make sure to check the "Dashboard" regularly to see how the quality of your crates in the room is evolving.',
      dashboardStep5:
        'If you have crates stored in multiple rooms, you can change the room you are viewing by selecting a company and cooling unit from the dropdown.',
      dashboardStep6:
        'When your crates are approaching the Time to pick up and the card turns red, you will receive a notification that advises you to go to the room, pick up those crates, and sell them. You can check your notifications by clicking the bell on the right.',
      farmerHistory:
        'In the tab "History" you can see a summary of all check-ins and check-outs that you have completed in each room. If you see a red dot next to a check out, please click on the three dots and "Fill in market survey". Here, we would like to understand at what price you have sold your produce, and if anything got spoiled. We use this information to improve the operations at the cold room, so it is important that you answer accurately.',
      farmersCoolingUnits:
        'To check for cooling units near you, you can navigate to the buttons on the bottom of the screens, clicking on the tab "More", "Cooling units" and selecting "Map". By clicking on each pin on the map, you can see the type of unit and the price of storage.',
      farmersUnitsPlanner:
        'In the tab "Cooling Units" you can find the Map, the current and future occupancy of the room (in "Planner") and the temperature of the room (in "Room conditions"). These screens help you monitor remotely what is happening at the cold rooms, without having to go there in person to check!',
      marketPrice:
        'If you see a tab named "Crop Prices", you can check the prices of different fruits and vegetables across the country in the last days, and a forecast of the prices for the future. For now, this option is only available for selected countries.',
      farmerFinalStep:
        'Congratulations! You have completed the tutorial! If you have questions about the app, we recommend checking the FAQ, asking an operator of the cold room, or writing us at app@yourvcca.org.',
      more: 'Clicking on "More", you will be able to select the "History", "Crop Prices", "Cooling Units", and "Orders" screens.',
      marketplaceStep1:
        'This is the Coldtivate digital marketplace, where all users can buy and sell produce that is being stored in the cold room. Each crate for sale is listed here, and you can buy any amount (in kg) or the full crate.',
      marketplaceStep2:
        'After selecting items to buy, click the shopping cart icon to see the items in your cart.',
      shoppingCart:
        'To complete your purchase, you can review the items in your shopping cart and click continue to follow the instructions step by step to complete your order.',
      marketplaceStep3:
        'On the main marketplace tab you can also navigate to view a summarized history of your orders and sales through the My orders and My sales pages. Go ahead and click My orders to learn more.',
      myOrders:
        'Here you can see each order you have made through the marketplace, with all the details of each order captured inside each card - click on the arrow on the right for more details about each order.',
      operatorListForSale:
        'You can support a Cooling User to place an item for sale on the marketplace. Click on the arrow to the right to see the details.',
      coolingUserListForSale:
        'You can manage which crates to place for sale on the marketplace. Click on the arrow to the right to see the details.',
      commonListForSale: 'Click “List for sale” to place crate #1 for sale.',
      commonListForSalePrice:
        'After listing the crate for sale, you can also enter the listing selling price below! These settings can be edited at any time.',
    },
  },
};

export default en;
export type Translations = typeof en;
