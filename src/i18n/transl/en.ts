const en = {
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
    },
  },
  navigation: {
    auth: {
      SignIn: 'Log in',
      SignUp: 'Sign up',
      ForgotPassword: 'Forgot Password',
      PasswordReset: 'Reset',
      AppInfo: 'सामान्यतःपूछे जाने वाले प्रश्न',
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
      CoolingUsers: 'Cooling Users',
      AddCoolingUser: 'Add Cooling User',
      EditCoolingUser: 'Edit Cooling User',
      AddCoolingUnit: 'Add Cooling Unit',
      EditCoolingUnit: 'Edit Cooling Unit',
      Operators: 'Operators',
      AddOperator: 'Add Operator',
      EditOperator: 'Edit Operator',
      RegisteredEmployee: 'Registered Employee',
      AddRegisteredEmployee: 'Add Registered Employee',
      RegisteredEmployeeDetails: 'Registered Employee Details',
    },
    bottomTabs: {
      RootMainTabStack: '{{firstName}} Coldtivate',
      ProduceDetails: '{{produceCode}}',
      PriceTrend: 'Price trend',
      PriceRanking: 'Price ranking',
      Planner: 'Planner',
      RoomConditions: 'Room Conditions',
      CratesInfo: 'Crates Info',
      Dashboard: 'Dashboard',
      History: 'History',
      MarketPrice: 'Market Price',
      CoolingUnits: 'Cooling units',
      Analytics: 'Analytics',
      CheckIn: 'Check In',
      CheckOut: 'Check Out',
    },
    dashboard: {
      AccountDetails: 'Account details',
      KnowledgeHub: 'Knowledge Hub',
      QuitTutorial: 'Quit Tutorial',
      FAQ: 'FAQ',
      About: 'About',
      Management: 'Management',
      Tutorial: 'Tutorial',
    },
    checkIn: {
      SelectCropType: 'Select Crop Type',
      CheckIn: 'CheckIn',
      CropList: '{{cropType}}',
      CrateSetup: 'CheckIn',
    },
    about: {
      comsolAgreement: 'COMSOL Runtime License Agreement 6.0',
      userLicense: 'END USER LICENSE AGREEMENT',
      aboutComsol: 'About COMSOL',
      privacyPolicy: 'Privacy Policy',
    },
    history: {
      EditCheckIn: '{{code}}',
      MarketSurvey: 'Market Survey for {{farmer}}',
      BaseSurvey: 'Cooling user survey',
    },
  },
  actions: {
    error: 'An error occured',
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
  },
  components: {
    datePicker: {
      clearButtonLabel: 'Clear',
      confirmButtonLabel: 'Confirm',
      placeholder: 'dd/mm/yyyy',
      startDateSelection: 'Select start date',
      endDateSelection: 'Select end date',
    },
  },
  Auth: {
    Root: {
      welcome: 'Welcome to Coldtivate',
      signIn: 'Sign In',
      signUpCompany: 'Sign up as Company',
      signUpCoolingUser: 'Sign up as Cooling User',
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
            'The cold room user. Farmers, traders, retailers who have access to a smartphone can log in here. Cold room users without a smartphone can access the information of the app by visiting a cold room and interacting with the operator.',
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
        invalidPhoneError: 'Phone number is invalid',
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
        terms:
          'I agree to Coldtivate User License Agreement, Privacy Policy and COMSOL Terms of Use',
        submit: 'Sign Up',
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
        header: 'Sign Up Registered Employee',
        languageFieldName: 'language',
      },
    },
    ForgotPassword: {
      heading: 'Forgot Password',
      messageSentNotification:
        'If the phone number exists, an sms has been sent to reset your password.',
      instructions:
        'In order to reset your password, please enter the phone number with it&apos;s country code, to which the account is connected.',
      phoneInputLabel: 'Phone Number',
      resetButton: 'Reset',
      link: {
        partOne: 'Click on this link to reset your password {{baseLink}}',
      },
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
    emptyGeneral: 'At the moment, there is no available data.',
    emptyCoolingUser:
      'Items in storage will appear in the dashboard when you do at least one check-in in any room.',
    noCompanyAvailable: 'No company available',
    noCoolingUnitAvailable: 'No cooling unit available',
    noLocationsAvailable:
      'Welcome to Coldtivate. Get started by adding locations to your app in the management panel.',
    CrateManagement: {
      userModalTitle: 'Select a cooling user',
      coolingUserLabel: 'Cooling user',
      selectCoolingUnitLabel: 'Select a cooling unit',
      coolingUnitLabel: 'Cooling unit',
      noUnitWarning: 'Please select a cooling unit',
      noCratesWarning: "The selected Cooling user doesn't have any crates in this cooling unit",
      operationError: 'Something went wrong. Please try again later.',
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
            inappropriateStorage: 'Inappropriate storage / lack of old storage',
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
        ttp: 'TTP',
        numberOfCrates: 'Number of crates',
        totalWeight: 'Total Weight',
        priceType: 'Price type',
        crate: 'crate',
        pricePerProduct: 'Price per product:',
        calculatedPrice: 'Calculated price',
        discount: 'Discount',
        priceWithDiscount: 'Total price',
        paymentType: {
          label: 'Payment type',
          cash: 'Cash',
          creditCard: 'Credit Card',
        },
        paid: 'Paid',
      },
      CheckIn: {
        emptyState: 'No boxes added yet',
        addCrates: 'Add Crates',
        checkInWithCode: 'Check in with code',
        estimatedCost: 'Estimated Cost',
        pricing: 'Pricing',
        day: 'day',
        successMessage: 'Crates were successfully checked in',
        emptyMessage: 'Please add at least one crate to your check in',
        noPlannedDaysMessage:
          'Missing planned days on some items. Cannot calculate estimated cost.',
        WithCode: {
          modalTitle: 'Create Check In from existing Check Out',
          modalDescription:
            'You will need the check out code to start a new check in in this way. If you don’t have it, consider starting a new check in. If you know how long you plan to store, consider adding the number of days here.',
          codeLabel: 'Add code',
          codeErrorMessage: 'Code is required',
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
          crateWeightLabel: 'General weight of crate',
          pricePerDayLabel: 'Price per day / crate',
          totalPriceLabel: 'Total price',
          plannedDaysLabel: 'Planned number of days in storage',
          harvestDateLabel: 'When was the crop harvested?',
          harvestDateValues: {
            today: 'Today',
            yesterday: 'Yesterday',
            dayBefore: 'Two days back',
            evenBefore: 'Even Before',
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
    },
    CoolingUnitsRoomConditions: {
      heading: 'Temperature history',
      temperature: 'Temperature',
      lastUpdated: 'Last updated at {{date}}',
      enterTemperature: 'Enter temperature',
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
    Company: {
      SelectCompany: {
        label: 'Company: {{name}}',
        header: 'Select a company',
      },
    },
    ProduceDetails: {
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
    },
    SearchFilter: {
      detailsMessage:
        'Search for a check-in using crop type, farmer name, days in storage, days left in storage, or check-in code',
      idMessage: 'Search for a crate using the crate ID number used to identify a specific crate',
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
      },
    },
    Management: {
      Location: {
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
        modal: {
          message:
            'This operation will delete all cooling units associated with this location. Do you want to continue?',
        },
        actions: {
          currentLocation: 'Choose current location',
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
      },
      CompanyDetails: {
        labels: {
          name: 'Name',
          uploadLogo: 'Upload Logo',
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
        toasts: {
          warning:
            'This account cannot be deleted because the user has active check-ins in the cooling unit(s) {{names}}. Please notify the user to come to the room to pick up these items and complete the check-outs before deleting the account!',
          confirmation:
            'Are you sure you want to delete this user from your list of cooling users? This operation will delete this cooling user and can not be reversed!',
        },
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
          addTempSensor: 'Add a temperature sensor to your cooling unit.',
          sensorDesc: {
            default: 'Request this info from your sensor provider if not at hand.',
            ubibot: 'Find these informations in your ubibot account.',
          },
          ecozen: {
            username: 'Username',
            password: 'Password',
            machineId: 'Machine Id',
          },
          ubibot: {
            accountKey: 'Account Key',
            channelId: 'Channel Id',
          },
          figorr: {
            apiKey: 'API Key',
            deviceTag: 'Device Tag',
          },
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
        },
        metricUnit: {
          label: 'Unit',
          KILOGRAMS: 'kg',
          CRATES: 'Crate',
        },
      },
      EditCoolingUnit: {
        modal: {
          askDelete:
            'This operation will delete this cooling unit including its history. Do you want to continue?',
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
        },
      },
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
    },
    About: {
      runtimeAgree: 'Comsol Runtime Agreement',
      userLicense: 'End User License Agreement',
      privacyPolicy: 'Privacy Policy',
      comsolAbout: 'Comsol About',
    },
    History: {
      priceLabel: 'Price',
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
          calculatedPriceLabel: 'Calculated price',
          discountLabel: 'Discount',
          totalPrice: 'Total price',
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
        fillMessage: 'Please fill in the base survey for {{crop}}!',
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
        sendSMS: `{{companyName}} - {{movementType}} Receipt: 
        Movement code: {{code}}
        Crops: {{crops}}
        Total weight: {{weight}} Kg
        {{movementTypeForDate}}: {{date}}
        Price: {{price}}
        Paid by: {{farmersName}}
        `,
        movementType: {
          checkOut: 'Check Out',
          checkIn: 'Check In',
          checkedOut: 'Checked out',
          checkedIn: 'Checked in',
        },
      },
    },
    Analytics: {
      company: 'Company',
      aggregated: 'Aggregated',
      comparison: 'Comparison',
      downloadDataButton: 'Download data',
      companyTab: {
        usersTab: {
          employeesTotal: 'Total number of registered employees = {{amount}}',
          operatorsTotal: 'Total number of operators = {{amount}}',
          usersTotal: 'Total number of distinct cooling users = {{amount}}',
          usersType: 'Type of cooling users',
          beneficiariesTotal: 'Total number of indirect beneficiaries = {{amount}}',
          maleLabel: '👨🏽 Male: {{amount}}',
          femaleLabel: '👩🏽 Female: {{amount}}',
          otherLabel: 'Other: {{amount}}',
          farmersLabel: '🧑🏽‍🌾 Farmers: {{amount}}',
          tradersLabel: '👩🏽‍💼 Traders: {{amount}}',
        },
        utilizationTab: {
          occupancyLabel: 'Average occupancy of cooling units:',
          occupancyContent: '🏘️ {{amount}}%',
          totalCratesLabel: '🧺 Total crates:',
          totalQuantityLabel: '📦 Total quantity (kg):',
          totalOperations: '👷🏽‍♂️ Total operations:',
          checkedInLabel: 'Checked In: {{amount}}',
          checkedOutLabel: 'Checked Out: {{amount}}',
        },
        impactTab: {
          foodLossLabel: '🥗 Food loss evolution',
          revenueLabel: '💰 Cooling user revenue evolution',
          co2Label: '💨 CO2e emission evolution',
          surveysAmountLabel: '📊 No. of surveys used to calculate food loss and revenue evolution',
          co2Description: 'CO2e emissions per kg of produce increased with cooling',
          co2WithoutCooling: 'Kg of CO2e per kg of produce emitted without cooling',
          co2WithCooling: 'Kg of CO2e per kg of produce emitted with cooling',
          from: 'From',
          to: 'To',
        },
        users: 'Users',
        utilization: 'Utilization',
        impact: 'Impact',
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
        methodologyButton: 'View Methodology',
      },
    },
  },
};

export default en;
export type Translations = typeof en;
