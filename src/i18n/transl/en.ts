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
    'not-available': 'N/A',
    'complete-later': 'Complete later',
    'update-success': 'Succesfully updated',
    'save-changes': 'Save changes',
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
        submit: 'SignUp',
      },
      SignUpCompany: {
        companyHeader: 'Sign Up Company',
        userHeader: 'Sign Up Registered Employee',
        companyNameLabel: 'Company Name',
        emailLabel: 'Company Name',
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
        partOne:
          'Click on this link to reset your password https://app.coldtivate.org/auth/reset/?resetcode=',
        partTwo: '&phoneNumber={{phone}}  Add https:// if url is not working',
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
      },
    },
  },
};

export default en;
export type Translations = typeof en;
