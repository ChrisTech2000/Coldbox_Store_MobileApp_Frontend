import { ERoles } from '#types/global';
import { APP_LOCALES, type TranslationLocales } from '#i18n/constants';

type Faq = {
  id: number;
  title: string;
  role: ERoles[];
  text: string;
};

export const FAQ_CONTENT: Record<TranslationLocales, Faq[]> = {
  [APP_LOCALES.ENGLISH]: [
    {
      id: 1,
      title: 'Why should I use the app?',
      role: [ERoles.AUTH],
      text: 'The app is designed to support cold room providers in their day-to-day operations at the cold rooms, farmers who are using cold rooms, and consumers interested in buying crops stored in the cold rooms. The app features a digital inventory, remote monitoring and shelf-life model for each stored crate, and a marketplace to link buyers and sellers. It also includes the Knowledge Hub, which provides commodity-specific recommendations on optimal storage temperature and storage life. ',
    },
    {
      id: 2,
      title: 'Who can use the app?',
      role: [ERoles.AUTH],
      text: 'The app can be used by cold storage companies, farmers and traders interested in using cold storage, and potential buyers around the world. Throughout the app, there are three user roles: (i) Registered employee: part of the cold room provider management team. A person that is responsible for setting up and managing the room, is in charge of overlooking the operators activities on the ground, without being physically present at the location. For example: a company CEO, CFO, etc. (ii) Operator: an employee physically present at the cold room and managing its check-in, check-out operations. This person is in direct contact with the cold room users, and reports to a company registered employee. (iii) Cooling users or consumer: the cold room users (can be farmers, traders, retailers, etc) or consumer (individual, retailer, wholesaler). This role is for anybody who wants to register in the app without being linked to a cooling company. Cooling users who have a smartphone can log in on the app as users. If they don"t have a smartphone, operators do the cooling users" operations on their behalf.',
    },
    {
      id: 3,
      title: 'How can I sign up as a Registered employee?',
      role: [ERoles.AUTH],
      text: 'If you are the first employee from your company to sign up, you can click on the "Sign up as a company" button and follow the steps to register your company and yourself (including personal details and password). Once you have successfully signed up, you can log in as a Registered employee in the app and send a SMS invitation to other Registered employees to join your company. Once the company is created, all Registered Employees should be invited by SMS. Otherwise, they will not be connected to the same company.',
    },
    {
      id: 4,
      title: 'How can I sign up as an Operator?',
      role: [ERoles.AUTH],
      text: 'To sign up, you need to be invited by a Registered employee. You will receive an SMS with an activation link, from where you can set up your personal details and password.',
    },
    {
      id: 5,
      title: 'How can I sign up as a Cooling user or Consumer?',
      role: [ERoles.AUTH],
      text: 'Cooling users with smartphones and Consumers can register clicking on "Sign up as a cooling user or consumer" in the homepage and providing their personal details and password. Cooling users who don"t have a smartphone can be added to the app by the operators. This operation is needed to initiate a check-in for those cooling users. Cooling users need to provide a phone number, which the operator will use to contact the cooling users in case of need. No password is required in this case.',
    },
    {
      id: 6,
      title: 'I cannot complete the registration as a user. What should I do?',
      role: [ERoles.AUTH],
      text: 'To complete the registration, please make sure that the following conditions are satisfied: (i) You are entering a phone number with the correct country code (e.g. +91 for India); (ii) The phone number you provided has not been used to register any other user; (iii) The password you are entering fulfils all requested conditions; (iv) The passwords you are entering are the same - you can click on the eye symbol to reveal the passwords and check they are equal.',
    },
    {
      id: 7,
      title: "I don't have a phone but want to use the app. What should I do?",
      role: [ERoles.AUTH],
      text: 'If you are a registered employee, an operator, or a consumer, you need to provide a valid phone number to sign up. A smartphone is needed to correctly use the app. If you are a cooling user and don"t have a phone, we also advise you to provide a valid phone number, so that the operator can contact you in case of need. You can give the phone number of a family member or a friend if you don"t have your own. If this is not possible, the operator can still store the produce in the room by selecting "User without phone" as the cooling user at check-in.',
    },
    {
      id: 8,
      title: 'Which details are needed for logging in as a Registered employee?',
      role: [ERoles.AUTH],
      text: 'Registered employees can log in with email or phone number, and their password.',
    },
    {
      id: 9,
      title: 'Which details are needed for logging in as an Operator?',
      role: [ERoles.AUTH],
      text: 'Operators can log in with their phone number and password.',
    },
    {
      id: 10,
      title: 'Which details are needed for logging in as a Cooling user or Consumer?',
      role: [ERoles.AUTH],
      text: 'Cooling users with smartphone can log in with their phone number and password. Cooling users who don"t have a smartphone do not need to log in: the operator can do the operations on their behalf. Consumers interested in seeing the marketplace can log in with their phone number and password.',
    },
    {
      id: 11,
      title: 'I have lost my password. What should I do?',
      role: [ERoles.AUTH],
      text: 'If you have lost your password, you can restore your account by clicking on ‘Forgot password’ at sign in, enter your phone number, and you will receive an SMS with a link to set a new password.',
    },
    {
      id: 12,
      title: "I haven't received any invitation per SMS. What should I do?",
      role: [ERoles.AUTH],
      text: 'Registered employees and operators can be invited to join the app by a registered employee of the same company. If the registered employee has invited you, but you have not received any SMS, please contact the registered employee directly. Common causes are: (i) Wrong number typed (note that a country calling code is needed); (ii) You have already accepted an invitation linked to that number. A phone number can only be used for one user. Cooling users with a smartphone and Consumers can join the app without invitation. Cooling users without a smartphone can be registered in the app by operators.',
    },
    {
      id: 13,
      title: 'How can I edit my profile?',
      role: [ERoles.EMPLOYEE],
      text: 'By clicking on "Menu" -> "Account details", you can see your profile and edit your "Personal details" (first and last name, phone number, email, and gender). Under "Localization preferences", you can change the app language. Under "Seller settings", you can set up your bank account details, create coupons, and make your contact details public for marketplace users. To change the details of your company, locations, and cooling units, navigate to "Menu" -> "Management", and then select the menu item you wish to change.',
    },
    {
      id: 14,
      title: 'How can I edit my profile?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'By clicking on "Menu" -> "Account details", you can see your profile and edit your "Personal details" (first and last name, phone number, and gender). Under "Localization preferences", you can change the app language. Under "Seller settings", you can set up your bank account details, create coupons, and make your contact details public for marketplace users. ',
    },
    {
      id: 15,
      title: 'How can I assign operators to cooling units?',
      role: [ERoles.EMPLOYEE],
      text: 'There are three ways to link an operator to a cooling unit. You can assign a cooling unit (or more than one) to an operator when you are sending him/her the invitation. Otherwise, you can modify the cooling units associated with a given operator by navigating to "Management" -> "Operators", selecting the operator, and then clicking on "Select a cooling unit". Finally, when creating a cooling unit in "Management" -> "Cooling units", you can also assign operators to it. Remember to save your changes before exiting!',
    },
    {
      id: 16,
      title:
        'A cooling user arrives at the cold room but has no phone. Can I still register him/her?',
      role: [ERoles.OPERATOR],
      text: 'Yes, you can start a check in for that person using the cooling user named "User without a phone". As multiple people might use this account for check in, make sure to add a name tag to the crates in the room to identify the owner of each crate.',
    },
    {
      id: 17,
      title: 'I am in an area where there is low internet connection: Can I still use the app?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Currently, only the Knowledge Hub section is available offline. The information in the Dashboard and Marketplace might still be visible, but could be inaccurate in case of no connectivity. We recommend checking again when the connection is stable.',
    },
    {
      id: 18,
      title: 'How do I register my company?',
      role: [ERoles.EMPLOYEE],
      text: 'To register your company, on the welcome screen select "Sign up as company" and fill in the required information. Enter a password then click "Sign up" and you are ready to go!',
    },
    {
      id: 19,
      title: 'How do I register a new location for my company?',
      role: [ERoles.EMPLOYEE],
      text: 'Each cooling unit needs to be created at a location (and multiple cooling units can be created for the same location). To add a new location for your company, in the menu select "Management" > "Locations". Click on the "+" on the top right corner to add a new location. Fill in the required information. Click "add" to confirm.',
    },
    {
      id: 20,
      title: 'How do I register a new cooling unit for my company?',
      role: [ERoles.EMPLOYEE],
      text: 'To register a new cooling unit for your company, you need to have at least one location created. Then, in the menu select "Management" > "Cooling units". Click on the "+" on the top right corner to add a new cooling unit. Fill in the required information. Click "add" to confirm.',
    },
    {
      id: 21,
      title: 'How do I invite other Registered employees from my company to register for the app?',
      role: [ERoles.EMPLOYEE],
      text: 'To invite other Registered employees for your company, in the menu select "Management" > "Registered Employee". Click on the "+" on the top right corner to add the telephone number of the employee you want to invite. Click "Invite" to confirm: your colleague will receive an SMS with a link that guides him/her directly to the sign up screen. In addition, you will also receive an email with the invitation link. Please forward this to the operator in case he/she did not receive it via SMS.',
    },
    {
      id: 22,
      title: 'How do I invite cold storage operators to register for the app?',
      role: [ERoles.EMPLOYEE],
      text: 'To send an invitation to operators for your cooling units, in the menu select "Management" > "Operators". Click on the "+" on the top right corner to add the telephone number of the operator you want to invite. Click "Invite" to confirm: the operator will receive a message with a link that guides him/her directly to the sign up screen. In addition, you will also receive an email with the invitation link. Please forward this to the operator in case he/she did not receive it via SMS.',
    },
    {
      id: 23,
      title: 'How do I monitor the temperature of a cooling unit?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'To monitor the temperature of a specific cooling unit, click on "More" in the bottom right corner of the navigation bar, select "Cooling Units", navigate to "Room conditions", and select the cooling unit of interest from the dropdown. In this panel, you will see a graph with the temperature over time - you can click on a datapoint to see the temperature value and timestamp. If the room has sensors connected to the app, you will be able to see the actual room temperature here. Else, the graph will show the temperatures that the room operator has manually set within the app. To check the temperature of another cooling unit, you can select it from the dropdown on the top of the page. ',
    },
    {
      id: 24,
      title: 'How do I monitor the occupancy of a cooling unit?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'To manage the occupancy of a specific cooling unit click on "More" in the bottom right corner of the navigation bar, select "Cooling Units", navigate to "Planner", and select the cooling unit of interest from the dropdown. Here you can see the current occupancy (top) and the predicted occupancy for the next 7 days (bottom). The information about the future occupancy is based on the number of days each user declares as planned days in storage at check-in. Beware that this is just an estimate and might be inaccurate.',
    },
    {
      id: 25,
      title: 'How can I see which items are stored in a room?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Click on the "Dashboard" icon at the bottom of the screen and select the cooling unit of interest from the dropdown to see the list of all stored items in a cooling unit.',
    },
    {
      id: 26,
      title: 'How can I see past check-in and check-outs of a cooling unit?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'To see past movements of a cooling unit click on "More" in the bottom right corner of the navigation bar, and select "History": past check-ins (icons with green crate), check-outs (icons with orange crate), and marketplace operations (icons with blue cart) with transaction details are displayed. If a specific transaction is of interest the search function can assist you in finding it!',
    },
    {
      id: 28,
      title: 'What are the main tasks the operator can do in the app?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'The operator can: register new cooling users, initiate check-ins, monitor items in storage and room occupancy, initiate check-outs, and monitor the temperature of the cooling unit he/she is responsible for. The operator can also assist cooling users in listing some crates for sale and setting a selling price.',
    },
    {
      id: 29,
      title: 'How can I register new cooling users?',
      role: [ERoles.OPERATOR],
      text: 'To register a new cooling user, in the Menu navigate to "Management" > "Cooling Users". Click on the "+" on the top right corner and choose whether to add an already registered user with a code, or add the user details. A cooling user who has a smartphone and has already registered in Coldtivate has a unique code, which he/she can find under "Menu" -> "Account details" -> "Personal Details" -> Cooling User Import Code. If the user has no smartphone, or is not registered yet, you can add the user by adding the name, gender and telephone number. If the user does not have his/her own number, the number of another person (e.g. friends, relatives) can be used, but please remember that one phone number can be used only once. Click "Save changes" to confirm. To complete the registration, you need to fill in a short survey by asking a few questions to the cooling user. The survey can also be completed at a later point by navigating to "Management" -> "Cooling Users" -> "Cooling User Survey".',
    },
    {
      id: 30,
      title:
        'The cooling user has no time to answer the survey questions at registration. What should I do?',
      role: [ERoles.OPERATOR],
      text: 'You can skip the survey questions by clicking "Complete later". In this case, you will be prompted to complete the survey the first time you are creating a check in for that cooling user. It is recommended to take the time and answer the survey questions thoroughly: in this way the user can get a more tailored experience with the Coldtivate app!',
    },
    {
      id: 31,
      title: 'How can I initiate a check in?',
      role: [ERoles.OPERATOR],
      text: 'To initiate a check-in, navigate to the Dashboard and click on the Activity Manager button on the lower right, and then click on the green button.',
    },
    {
      id: 32,
      title: 'How can I initiate a check out?',
      role: [ERoles.OPERATOR],
      text: 'There are two ways to initiate a check out, both starting in the Dashboard page. You can click on the Activity Manager button on the lower right, and then click on the red button. In this way, you can select for which cooling user (and in which cooling unit) you want to start the check out, and can check out his/her crates from multiple check ins. Alternatively, you can click on "See details" for an item you see in the Dashboard (make sure to be in the correct cooling unit), and click on "Check out". In this case, you can only check-out crates from that storage item.',
    },
    {
      id: 33,
      title: 'I have temperature sensors in the cold room. Can they be connected to Coldtivate? ',
      role: [ERoles.EMPLOYEE],
      text: 'In order to connect a sensor to a cooling unit, the sensor needs to have an API setup. The API should use a username and password which are sent through a POST request of Content-Type: application/json. The response should include an accessToken, which can be used for another POST request. The POST request needs to include in the url the room-identifier, the type of value (temperature, humidity), and the token as a header with the key Authorization. The response should be the last recorded temperature in this room, in the format {date: dateTimeStamp, value: numerical}. The temperature should be in Celsius. At the moment, we are supporting the Ecozen, UbiBot, Figorr, and Victron Energy sensors APIs. If you have another type of sensors you would like to integrate with Coldtivate, please reach out to app@yourvcca.org.',
    },
    {
      id: 34,
      title: 'How can I set the temperature of the cooling unit?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'To set the temperature of the cooling unit, please follow the procedure defined by your company. The app can be used to monitor, but not to update, the temperature in the cold room. However, if the app is not linked to sensors, it is important that you update the set temperature in the app. You can do so by clicking "Enter temperature" inside the "More" -> "Cooling Units" > "Room conditions" panel. Updating the temperature here allows you to visualize the temperature evolution in the app and enables accurate predictions on the remaining days the commodity in storage will be good for. If the app is linked to sensors, the option of changing the temperature in the app is disabled, as the app periodically extracts this information directly from the sensors.',
    },
    {
      id: 35,
      title: 'How to contact a cooling user for the after-storage market survey?',
      role: [ERoles.OPERATOR],
      text: 'In the "More" -> "History" tab you can see the list of the latest check-outs. You should contact each cooling user who did a check out to fill in the after-storage survey, which can be accessed by clicking on the three dots next to the check-out and selecting "Fill in market survey". By clicking on "See details", you can check which commodity was in storage and the phone number of the user in case you want to contact him/her by phone. Else, you can wait until the next time the user comes to the cold room to store other crops. A red dot will identify the check-outs in the History list for which the market survey has not been completed yet. You will be reminded about the check outs that need your attention in the notification panel and can click on the notification to open the survey.',
    },
    {
      id: 36,
      title: 'What is the Knowledge Hub?',
      role: [ERoles.AUTH],
      text: 'The Knowledge Hub is a page that can be reached by clicking on the Menu on the top left. It contains useful information about best storage practices for different commodities, including optimal temperature and approximate storage time under this temperature.',
    },
    {
      id: 37,
      title: 'How do I read the information of one item in the Dashboard?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Each item in the Dashboard displays a set of crates of the same crop type that have been checked-in together. The number of days at the top are the predicted remaining days until the time to pick up. Below, you see the crop type and the check-in ID. The number next to the crate symbol is the number of crates checked-in. Next to it, you see the cooling fee, and the number of days the crates have been in storage for. The number next to the card on the right side identifies how many crates are listed as "for sale" in the marketplace. At the bottom of each item, you see the onwer of the crates and the contact details.',
    },
    {
      id: 38,
      title: 'What is the time to pick up?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'The time to pick up is the suggested number of days left for the cooling user to pick up a commodity. Afterward, the commodity would start to lose its marketability. A time to pick up equal to zero indicates that the user should come to collect the item in storage immediately and has up to 2 days to sell it to the market. It can be seen in the Dashboard and in the detailed view for each storage item.',
    },
    {
      id: 39,
      title: 'How is the time to pick up calculated? By which factors is it influenced?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Fresh vegetables and fruits are perishable, and how they lose their freshness after harvest is largely based on temperature. The time to pick up is, therefore, calculated based on the temperature of the corresponding cooling unit, and on the initial quality of the product when it is brought to the cooling unit. The parameters used in this calculation are unique to each commodity. You can have some insights on how perishability differs among different commodities in the Knowledge Hub.',
    },
    {
      id: 40,
      title: 'The time to pick up is 0 days but the produce is still looking good. Why?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'The time to pick up is the predicted value. Thus, it is possible that a cooling user can check out and still manage to sell well a storage item with time to pick up equal to 0 days. However, be aware that some quality loss is invisible to human eyes, and it is still a good practice to follow the indication given by the time to pick up as much as you can. The time to pick up prediction is especially accurate if the app is linked to temperature sensors. If you don’t have them in place, we advise you to install them in your cooling units. Please refer to the questions on temperature sensors for more information about the setup.',
    },
    {
      id: 41,
      title: 'The time to pick up is more than 0 days but the produce is almost spoiled. Why?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'The time to pick up is a predicted value. Thus, rare cases may occur, where the produce gets spoiled while the time to pick up is larger than 0. As quality decay of fresh produce largely depends on temperature, temperature data helps the prediction to be more accurate. For example, the issue may arise when there are no temperature sensors linked to the app, and the operator has set the wrong temperature in the room. If you don’t have temperature sensors in place, we advise you to install them in your cooling units. Please refer to the questions on temperature sensors for more information about the setup.',
    },
    {
      id: 42,
      title:
        'The room occupancy for one of the next days is red (less than 20%). What is this based on? Should I get worried?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'The occupancy is shown as red when more than 80% of the cooling unit capacity is utilized. The information about the future occupancy is based on the number of days each user declares as planned days in storage at check-in. Beware that this is just an estimate and might be inaccurate. As such, the red room occupancy is just a sign that the room is getting full. You do not need to worry but can take action accordingly. For example, consider contacting cooling users whose commodity in storage has the lowest time to pick up to advise them to check out soon. You can see an ordered list of the most urgent items to check out under ‘Dashboard’ when you order by time to pick up.',
    },
    {
      id: 43,
      title:
        'A cooling user is bringing to the room a commodity that is not on the list. Can I still check that in?',
      role: [ERoles.OPERATOR],
      text: 'Sure, in this case you can start a check in selecting "Other" from the commodity list. Under "Additional info", you can also type the commodity name, which hekps you in finding it again.',
    },
    {
      id: 44,
      title:
        'In the Dashboard, each item has a colored bar. What does the color of the bar represent?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'The color represents the remaining days before the time to pick up. You will see the bar in red when it is less than 2 days, in yellow when less than 7 days, and green when more than 7 days. These values are specific for each storage item and are recalculated multiple times per day based on the temperature in the cooling unit. When no model for calculation is available, the color of the bar would be gray.',
    },
    {
      id: 45,
      title:
        'I have successfully completed a check in but cannot yet see the items in the dashboard. Why?',
      role: [ERoles.OPERATOR],
      text: 'The dashboard can take a moment to update. Also please verify that you are looking in the correct cooling unit. If you keep observing the issue, please report it to app@yourvcca.org.',
    },
    {
      id: 46,
      title:
        'I have successfully completed a check out but can still see the items in the dashboard. Why?',
      role: [ERoles.OPERATOR],
      text: 'The dashboard can take a moment to update. Also please verify that the items you checked-out were the correct ones, and that you are looking in the correct cooling unit. If you keep observing the issue, please report it to app@yourvcca.org.',
    },
    {
      id: 47,
      title: 'How can I check that the temperature sensor is working fine?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'After a registered employee has enabled a sensor connection to a given cooling unit, the button for manual temperature input in the "More" -> "Cooling Units" > "Room conditions" panel will be grayed-out. The sensor data is fetched every 6 hours, so if the sensor is working properly you should see the temperature plot with new points multiple times per day. When a sensor has not sent data in 12 hours, a notification is sent to the room operators and registered employees.',
    },
    {
      id: 48,
      title: 'I got a notification that the sensor is not working. What should I do?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'The notification is sent after not receiving data from the sensor for more than 12 hours, and it means the set temperature in the "Cooling Units" > "Room conditions" panel is now being used. The app will try to reconnect to the sensor every 1 hour, thus we advise to wait a few hours in case this is a connectivity issue. If there is no new sensor data for several hours or days, the problem might be on the hardware side, for example, the sensor might have run out of battery.',
    },
    {
      id: 49,
      title: 'How can the time to pick up be calculated if there are no sensors?',
      role: [ERoles.EMPLOYEE],
      text: 'When no sensors are connected to the app, the model to calculate the time to pick up relies on the temperature set by the Operator. That is also the reason why the Operator is prompted to input a new set temperature at every new check in and check out. For the model to be accurate, it is crucial that the temperature is up-to-date. Please instruct the operators at your cooling unit about this important step.',
    },
    {
      id: 50,
      title: 'Every time I start a check-in, I get a temperature alert popup. Why?',
      role: [ERoles.OPERATOR],
      text: 'This pop up is a reminder for you to inform the app about the correct set temperature of the cooling room in case no sensors are in place (or if they are not working properly). You should check whether the value indicated in the popup is the same as the one you can read in the control panel at the room. If this is not the case, you should update the temperature. Else, you can confirm and continue with the check in. Having an updated set temperature is very important for the model that calculates the time to pick up to be accurate.',
    },
    {
      id: 51,
      title: 'Every time I complete a check-out, I get a temperature alert popup. Why?',
      role: [ERoles.OPERATOR],
      text: 'The temperature of a cooling unit should be set depending on what commodities are in storage, because different commodities have different optimal temperatures (you can see an overview in the Knowledge Hub). The popup appearing after a check out has been completed shows a summary of the commodities that are left in the room and informs you about the optimal temperature for each of them. In this way, you can make an informed decision about whether the temperature in the room should be changed. You can also find this information by going to "More" -> "Cooling units" -> "Crates info".',
    },
    {
      id: 52,
      title:
        'Why do I need to ask a cooling user to fill in a questionnaire before he/she can check in the first crate?',
      role: [ERoles.OPERATOR],
      text: 'The team developing the app is collecting some basic information about the cooling users when they first start using the room as baseline data that will be compared with the data acquired by the app. The sole intent is to improve the app design and cold room utilization.',
    },
    {
      id: 53,
      title: 'Why do I need to ask cooling users about the selling price of each storage item?',
      role: [ERoles.OPERATOR],
      text: 'You will be asked to contact a cooling user who has recently checked out some produce from the room and ask about where and for which price they have sold the item that was stored in the room. This information will help the team developing the app to validate and improve the accuracy of the market prices forecasts provided.',
    },
    {
      id: 54,
      title: "I don't understand parts of the app. Who should I contact?",
      role: [ERoles.EMPLOYEE],
      text: 'Make sure to check the tutorial and the FAQ section, as they contain useful information about the app which may help to clarify your questions. If you would like to get in contact with the app support team, please send an email to app@yourvcca.org.',
    },
    {
      id: 56,
      title: 'I found a bug in the app. Who should I contact?',
      role: [ERoles.EMPLOYEE],
      text: 'Please make sure you have the latest version of the app installed. If the problem persists, please notify the app support team by sending an email to app@yourvcca.org or by filling in the feedback form: https://forms.gle/ceohKHT2QCcE3rFs5 .',
    },
    {
      id: 57,
      title: 'Something is not working properly in the app. Who should I contact?',
      role: [ERoles.OPERATOR],
      text: 'Please make sure you have the latest version of the app installed. If the problem persists, please contact the Registered employee you are reporting to and / or notify the app support team by sending an email to app@yourvcca.org or by filling in the feedback form: https://forms.gle/2gKVzZjkJSPqEAan9 .',
    },
    {
      id: 58,
      title: 'I want to provide feedback about my experience with the app. Who should I contact?',
      role: [ERoles.EMPLOYEE],
      text: 'The app support team would love to hear about your experience using this app and welcomes your feedback, please send an email to app@yourvcca.org or submit your feedback via the form: https://forms.gle/ceohKHT2QCcE3rFs5 .',
    },
    {
      id: 60,
      title: "Which prices are displayed when clicking on the 'Crop prices' icon?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'In this tab, you can see the market price predictions either in a plot or in a table format. The Price Trend page allows for visualizing the last month of data and the 14-days forecast for a specific market and commodity (in India) or a monthly forecast per state (in Nigeria). The Price Ranking page allows to visualize all market prices forecasts ordered from highest to lowest, and with the posibility to filter by date, state, district and market (in India).',
    },
    {
      id: 61,
      title: "Why are some states and markets missing in the 'Crop prices' section?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Due to data availability, the model has only been implemented for a few commodities in some selected states in India and Nigeria. The Crop Prices tab only lists market, commodities and states for which a forecast is available.',
    },
    {
      id: 62,
      title: 'How are the future market prices calculated?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'A machine learning model is trained on historical market price data and other data such as currency conversion rate and petrol price, to make forecasts of future market prices.',
    },
    {
      id: 66,
      title: 'I have no time to answer the survey questions at sign up. What should I do?',
      role: [ERoles.COOLING_USER],
      text: 'You can skip the survey questions by clicking "Complete later". You will find the survey as part of your Account Details and can complete it anytime. However, It is recommended to take the time to answer the survey questions thoroughly when you start using the room: in this way you can get a more tailored experience with the Coldtivate app!',
    },
    {
      id: 67,
      title: 'I am interested in storing my crops in cold rooms. How can I find them?',
      role: [ERoles.COOLING_USER],
      text: 'To find cold rooms near you, navigate to "More" in the bottom right corner of the navigation bar, select "Cooling units" and "Map". Here you can search for nearby cold rooms, and then bring your crates to the room. The cold room operator can help you understand how the room works, how you are going to be charged, and what are the benefits of using cold storage.',
    },
    {
      id: 68,
      title: 'How do I connect the sensors in the room with the app?',
      role: [ERoles.OPERATOR],
      text: 'If there are temperature sensors in the room that can be connected to the Coldtivate app, please communicate with your responsible. Only user with a Registered employee role can link sensors to cooling units created in Coldtivate.',
    },
    {
      id: 69,
      title: 'What is the after-storage market survey and why should I fill it in?',
      role: [ERoles.COOLING_USER],
      text: 'The market survey can be accessed by clicking on the three dots next to each check out in the "More" -> "History" tab and selecting "Fill in market survey". The survey is very short and asks for information about the selling price of the produce you had previously stored in the room, as well as about how much of it got spoiled. This information will be treated as confidential and solely used by the Coldtivate team to evaluate the impact of using cold storage. A red dot will identify the check outs for which the market survey has not been completed yet. You will be reminded about the check outs that need your attention in the notification panel and can click on the notification to open the survey. You can also access the surveys you need to fill in in the "Analytics" tab, and then clicking on "Impact". ',
    },
    {
      id: 70,
      title: 'The time to pick up is more than 0 days but the produce is almost spoiled. Why?',
      role: [ERoles.COOLING_USER],
      text: 'The time to pick up is a predicted value. Thus, rare cases may occur, where the produce gets spoiled while the time to pick up is larger than 0. As quality decay of fresh produce largely depends on temperature, temperature data helps the prediction to be more accurate. For example, the issue may arise when there are no temperature sensors linked to the app, and the operator has not regularly updated the temperature of the room in the app. Please notify the operator of the room in case this happens.',
    },
    {
      id: 71,
      title: 'Why do I need to fill in a questionnaire when I register on the app?',
      role: [ERoles.COOLING_USER],
      text: 'The team developing the app is collecting some basic information about the cooling users when they first start using the room as baseline data that will be compared with the data acquired by the app. The sole intent is to improve the app design and cold room utilization.',
    },
    {
      id: 73,
      title: "I don't understand parts of the app. Who should I contact?",
      role: [ERoles.COOLING_USER],
      text: 'Make sure to check the tutorial and the FAQ section, as they contain useful information about the app which may help to clarify your questions. If your question is still unanswered, please contact the operator of a cold room, or write to app@yourvcca.org',
    },
    {
      id: 74,
      title: 'Something is not working properly in the app. Who should I contact?',
      role: [ERoles.COOLING_USER],
      text: 'Please make sure you have the latest version of the app installed. If the problem persists, please contact the operator of a cold room and / or notify the app support team by sending an email to app@yourvcca.org.',
    },
    {
      id: 75,
      title: 'I would like to delete my account. What should I do?',
      role: [ERoles.EMPLOYEE],
      text: 'To delete your account you can navigate to "Menu" -> "Account Details", and click Delete. Please be careful, this action can not be reversed! If you are the last Registered Employee of the company, this action will delete the company. If there are pending checkins, you will not be able to delete your account until all the crates have been checked-out in the app by one of your operators.',
    },
    {
      id: 76,
      title: 'I would like to delete my account. What should I do?',
      role: [ERoles.OPERATOR],
      text: 'To delete your account you can navigate to "Menu" -> "Account Details", and click Delete. Please be careful, this action can not be reversed! If you are the last Operator assigned to one of the rooms where there are open check-ins, you cannot delete your account until a registered employee assigns another operator to the room, or all crates have been checked-out in the app.',
    },
    {
      id: 77,
      title: 'I would like to delete my account. What should I do?',
      role: [ERoles.COOLING_USER],
      text: 'To delete your account you can navigate to "Menu" -> "Account Details", and click Delete. Please be careful, this action can not be reversed! If you have open check-ins in any of the rooms, you can not delete your account until all crates are checked-out from the rooms. Please make sure to collect your crates at the room! In case you think there are pending crates in the app that you have already removed, please communicate with the room"s operator to sort it out.',
    },
    {
      id: 78,
      title: 'How can I delete a cooling unit or a location?',
      role: [ERoles.EMPLOYEE],
      text: 'You can delete cooling units and locations going to "Menu" -> "Management" -> "Cooling Units" / "Locations" and clicking Delete. You will only be able to do so if there are no pending check-ins in the rooms. Else, please communicate to the operators to complete the check-outs before you attempt to delete the rooms and locations.',
    },
    {
      id: 79,
      title: 'How can I delete another registered employee or an operator from my company?',
      role: [ERoles.EMPLOYEE],
      text: 'You are not allowed to delete other users from the app. However, you can unassign operators from your rooms by navigating to "Menu" -> "Management" -> "Operators". If you still want to enitrely remove the user so that they don"t have access to your company, please write an email to app@yourvcca.org and explain why this is needed.',
    },
    {
      id: 80,
      title: 'How can I delete a cooling user from the list?',
      role: [ERoles.OPERATOR],
      text: 'To delete a cooling user from the list, navigate to "Management" -> "Cooling users", click on the cooling user name and then the button "Delete". Please note that only users with no pending check-ins can be deleted! If there are pending check-ins, please contact the user to pick up the produce. Note that this action cannot be reversed! If the user has a smartphone, this operation will remove him/her from your list, but the user will still be able to use Coldtivate. If the user has no smartphone, this operation deletes his/her account and frees the associated phone number.',
    },
    {
      id: 81,
      title: 'Where can I monitor whether the operators have used the app recently?',
      role: [ERoles.EMPLOYEE],
      text: 'To check the last time the operators and other registered employees have logged in into the app, you can navigate to "Menu" -> "Management" -> "Operator" / "Registered Employee". The date and time you see next to the name are the last login date and time.',
    },
    {
      id: 82,
      title: 'Where can I monitor the revenue generated by each room and other usage statistics?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'You can navigate to "Menu" -> "Management" -> "Revenue Analysis", select the cooling units and the time interval of interest, and you will see the total revenue associated with the check-out from these rooms. You can also filter by cooling user, payment method, and time. To visualise summary statistics of your check-ins per room (as number of users, total number of crates, etc), you can navigate to "Menu" -> "Management" -> "Usage Analysis". Also here you can filter by date and cooling unit. In both pages, information can be downloaded as Excel files. In the "Analyis" tab, you can find more a dashboard with information about users, revenue, utilisation, and impact. Finally, to monitor the total number of crates, weight, and optimal temperatures for the crops currently in the room, you can navigate to "More" -> "Cooling units" -> "Crates info".',
    },
    {
      id: 83,
      title:
        'How can I find out who is the contact person for a cooling unit where my produce is stored?',
      role: [ERoles.COOLING_USER],
      text: 'By clicking on an item in the dashboard, you can see the name and the contact number of the operator who did the check in for you. You can copy the number to clipboard and contact the operator per phone or sms.',
    },
    {
      id: 84,
      title: 'I have received a notification. What should I do?',
      role: [ERoles.COOLING_USER],
      text: 'You might receive different types of notifications: first, the app can inform you about the fact that some of the crates you have stored are about to get spolied. We advise you to collect the crates from the room as fast as possible. Another notification you might receive is to remind you to complete the after-storage market survey or the baseline survey.You can click on the notification to access the surveys. The information we collect there is very valuable for the Coldtivate team to monitor the benefit of using cold rooms compared to storing the produce outside. In you have crates listed "for sale" in the marketplace, you will also receive notifications when crates are sold, and in case the operator updates the selling price. In case you have not requested the price change, please talk to the operator immediately. ',
    },
    {
      id: 85,
      title: 'What is displayed on the map of cooling units?',
      role: [ERoles.COOLING_USER],
      text: 'On the map you can visualize your location (you will be asked for permission for Coldtivate to access your location), the location of the cooling units around you, and some information about the units (single or multicommodity, company, pricing). By going to the cold room, you can get more information from the cold room operator on operation of the unit and opportunity for storage.',
    },
    {
      id: 86,
      title: 'I want to provide feedback about my experience with the app. Who should I contact?',
      role: [ERoles.OPERATOR],
      text: 'The app support team would love to hear about your experience using this app and welcomes your feedback, please send an email to app@yourvcca.org or submit your feedback via the form: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 87,
      title: 'I want to provide feedback about my experience with the app. Who should I contact?',
      role: [ERoles.COOLING_USER],
      text: 'The app support team would love to hear about your experience using this app and welcomes your feedback, please send an email to app@yourvcca.org.',
    },
    {
      id: 88,
      title:
        "An operator is asking me for a code to add me to the company's list of cooling users. Where can I find the code?",
      role: [ERoles.COOLING_USER],
      text: 'When you signed up in Coldtivate, you have received an unique identifier in form of a code. This code can be used by an operator to add you to the company"s list of cooling users, which is needed for the operators to check-in your crates. The code can be found under "Menu" -> "Account Details" -> "Personal Details" -> Cooling User Import Code.',
    },
    {
      id: 89,
      title: 'How can I change the language of the app? ',
      role: [ERoles.AUTH],
      text: 'To change the app language, you can click on the dropdown you see in the bottom of the homepage, or, once you are logged in into your profile, navigate to the "Menu" -> "Account details" -> "Localization preferences". ',
    },
    {
      id: 90,
      title:
        'My temperature sensor type is supported by Coldtivate (Ecozen, UbiBot, Figorr, Victron Energy). How can I set up sensors?',
      role: [ERoles.EMPLOYEE],
      text: 'In order to connect a sensor to a cooling unit, you can navigate to "Menu" -> "Management" -> "Cooling Units", select the unit for which the sensor should be set up, and then toggle "Sensor available". You can follow the instruction for each supported sensor type and authenticate. Remeber to clock "Save" at the bottom of the page for the changes to be saved. You should see temperature readings from your sensors in the next 6 hours under "More" -> "Cooling units" -> "Room conditions". ',
    },
    {
      id: 91,
      title:
        "What is the difference between the 'Company', 'Aggregated', and 'Comparison' view in the Analytics tab? ",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'The Analytics tab in the navigation bar provides summary statistics for all the company cold rooms. In the "Company" view, you see a data on users, utilisation, and impact for all cooling units since you start using Coldtivate. By clicking on "Aggregated", you are prompted to configure which cooling units and time period you are interested in. The displayed data for users, utilisation, and impact is aggregated across the selected cooling units in the chosen time period. If you would like to compare across units, you can use the "Comparison" tab. Here, the data is displayed in tables, where data from each cooling unit in teh chosen time period is dispalyed. You can sort the data and change the cooling units and time period anytime. ',
    },
    {
      id: 92,
      title: 'How is the data displayed in the Analytics tab calculated?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'The goal of the Analytics tab is to offer a comprehensive view of what is happening at the cold rooms. User and utilisation data are calculated from the check-in and check-out information recorded in Coldtivate. You can thus understand how many users and operations are done, and what is the revenue or average occupancy of each cold room. The data of the impact section, on the other hand, is based on surveys that cooling users are asked to fill in when they are registered (ie. before they start using cold storage) and regularly as they check-out produce from the cold room. This data is crucial to estimate the evolution of postharvest loss and users" revenue as they use cooling. Finally, the CO2 estimation compares the emission associated with cooling the crops stored in the cold room with the predicted emissions the same crop would have caused when stored unrefrigerated. ',
    },
    {
      id: 93,
      title: 'How is the data displayed in the Analytics tab calculated?',
      role: [ERoles.COOLING_USER],
      text: 'The goal of the Analytics tab is to offer you a comprehensive view of the impact of cooling on your crops. Data displayed under "Crates" is calculated from the check-in and check-out information recorded in Coldtivate. You can thus how much you stored which crop and the average storage time. The data of the "Impact" section is based on surveys that you are asked to fill in when they you register (ie. before you start using cold storage) and regularly as you check-out produce from the cold room. This data is crucial to estimate the evolution of postharvest loss and revenue as you use cooling. A reminder to fill in the surveys is shown on top of the page, and we encourage you to fill them in whenever possible. In both section, you can use the "Configure" button on the top right to select specific cold rooms or a time period. If nothing is selected, you see all data available since you started using Coldtivate.',
    },
    {
      id: 94,
      title: 'I log in but I cannot see the marketplace functionality. Why?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'If the marketplace is supported in your country, you will see a "Marketplace" icon in the bottom navigation bar. If you can"t see it, it means this functionality is not supported in your country. At the moment, the marketplace is only available for users based in Nigeria. If you are a Registered Employee and are interested in piloting the marketplace in your country, please contact us at app@yourvcca.org.',
    },
    {
      id: 95,
      title: 'What is the role of a cooling company in the marketplace? ',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'A cooling company and its employees can decide their level of involvement in the marketplace. As the functionality relies on crates being checked-in in the Coldtivate app, a marketplace can only work if the cold room operator regularly registers the check-in and check-out operations in the app. For produce bought via the marketplace, the cooling company is receiving the cooling fee as part of the digital transaction. It is thus crucial that a Registered Employee sets the company bank account details: to do so, you should navigate to "Menu" -> "Management" -> "Seller Settings (Company)" -> "Payout options". In addition, cooling companies can decide to buy produce from the farmers (playing the role of the buyer) and then re-selling those crops in the marketplace (playing the role of the seller). Both transactions can be done via Coldtivate marketplace. Note that both Operators and Registered Employees have the option to either buy for themselves (as individuals) or on behalf of the company they represent.   ',
    },
    {
      id: 96,
      title: 'What is the role of a cold room operator in the marketplace? ',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Cold room operators in the marketplace have three main roles. 1) They help cooling users without a smartphone to set up their bank account (so that they can receive digital payments), list their crates "for sale" and their price. 2) They are responsible for keeping the produce in the cold room organized following the principle that all produce contained in a crate belongs to a single user: when some produce in a crate is bought (and thus belongs to a different owner), the operator receives a notification to move the bought produce to a separate crate. If an entire crate is bought, no action is required. 3) Cold room operators are responsible for all check-out operations, including those resulting from the marketplace: when a buyer (or a delivery representative) arrives at the cold room to pick up the bought produce, the operator should check-out that crate from Coldtivate. ',
    },
    {
      id: 97,
      title: 'How are cooling fees collected in the marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'When crates are bought in the marketplace, the cooling fee up to that day is deducted from the price the buyer is paying and transferred to the cooling company. In this way, the seller does not have to settle the cooling fee, as this is already done in the digital transaction. For this reason, it is crucial that both seller and cooling companies have a bank account set up in Coldtivate. For example, if a crate is bought for 20 USD, and a seller owes 3 USD of cooling fees, out of the 20 USD paid by the buyer, 17 USD will be transferred to the bank account of the seller, and 3 USD will be transferred to the bank account of the cooling company. If the buyer comes to pick up the produce on the same day as the purchase, no other cooling fee is due (because the daily fee is already paid by the seller). However, if the buyer decides to keep the produce in storage, the standard cooling fee applies, and the price will be calculated depending on the number of days the produce is kept in the cold room until the buyer picks it up. The cold room operator is responsible for collecting these cooling fees at check-out. Note that in case of delivery, the same logic applies. ',
    },
    {
      id: 98,
      title: 'How can I start selling produce in the marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'For your crates to be available for sale, you need to do two actions. 1) Set up a bank account, where the revenue is going to be deposited. If you have a smartphone, you can do it by navigating to "Menu" -> "Account details" -> "Payout options". If you don"t have a smartphone, the operator can set up the bank accounts from his/her interface ("Management" -> "Cooling Users" -> "Payout details". Please note that as all payments are done digitally in the marketplace, you have to provide a valid bank account before anything is listed "for sale". 2) If you have a smartphone, for any checked-in set of crates, you can click on the ">" sign on the right side of each dashboard item, navigate to "Crate weight and marketplace listing", set which crates you would like to set "for sale" and the price per kg. Consumers in the marketplace will be able to see these crates, and buy at the indicated amount. You will receive a notification any time a purchase is completed. If you don"t have a smartphone, the cold room operator can set crates "for sale" when you do the check-in, or after, following the same steps. You will receive an SMS if the operator updates your listed crates or the price after a check-in. ',
    },
    {
      id: 99,
      title: 'Can buyers see my contact details?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'You can decide yourself whether customers interested in buying your produce should be able to see your contact details. This can be useful in case of price negotiation or recurrent orders for produce that is not yet stored in the cold room (and thus not visible for the buyer). You can update your settings anytime under "Menu" -> "Account details" -> "Contacts sharing". ',
    },
    {
      id: 100,
      title: 'I would like to offer a discount to a buyer. How can I do it? ',
      role: [ERoles.EMPLOYEE],
      text: 'Under  "Menu" -> "Account details" -> "Discount coupons", you can create coupons which have a code and a percentage discount. These are the coupons that are valid for produce that you sell (as individual). To set coupons that are valid for produced owned by the company, you can navigate to "Menu" -> "Mangement" -> "Discount coupons" under "Seller settings (Company)". You can share the coupon code with the customer, and she can redeem the code in the payment screen. Coupon codes remain valid until you revoke them. If you would like to offer a discount to all potential buyers, you can lower the selling price visible in the marketplace. ',
    },
    {
      id: 101,
      title: 'I would like to offer a discount to a buyer. How can I do it? ',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Under  "Menu" -> "Account details" -> "Discount coupons", you can create coupons which have a code and a percentage discount. You can share the coupon code with the customer, and she can redeem the code in the payment screen. Coupon codes remain valid until you revoke them. If you would like to offer a discount to all potential buyers, you can lower the selling price visible in the marketplace. ',
    },
    {
      id: 102,
      title: 'How can cold room operators help me to commercialise my crops? ',
      role: [ERoles.COOLING_USER],
      text: 'Cold room operators are your contact point for anything related to storing produce in the cold rooms, and can also help you to market your crop even if you do not have access to a smartphone. From their interface, they can set up your bank account details, where you will receive revenues from sale of produce. At check-in, they can help you list crates "for sale", which makes them visible in the marketplace, and set the selling price (per kg) for each produce. If you change your mind, you can always ask to add or remove crates from the marketplace by listing or delisting them as "for sale". In some cold rooms, operators or their collaborators are also responsible for purchasing produce directly from farmers, and selling it to retailers. Whether you are a farmer or trader interested in this option, or a retailer interested in buying in bulk from the cold room, please contact the cooling company to explore this opportunity. ',
    },
    {
      id: 103,
      title: "What is the option 'Buy on behalf of company' I see in the marketplace? ",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Operators and Registered Employees can sell and buy produce in the marketplace either for themselves, as individuals, or on behalf of the company they represent. This option allows all transactions to be executed from and to the company"s bank account, and not via the individual bank accounts. When an Operator or Registered Employee buys produce "on behalf of a company", the company pays the due amount to the seller, and becomes the owner of the crates. If those crates are listed for sale in the marketplace, they are shown as owned by the cooling company, and the selling fee is sent to the company bank account. When an Operator or Registered employee buys produce for themselves, they will pay the due amount to the seller from their personal bank account details provided and become the owner of the crates personally. If they are stored in the cooling unit, they will be listed under the Operator or Registered Employees name and if they are listed for sale on the marketplace, they will be shown as owned by the Operator or Registered Employee as well.',
    },
    {
      id: 104,
      title: 'What are the fees that are shown in the marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'The selling price of each item displayed in the marketplace is directly set by the seller and depends on how many kg are bought. On top of that amount, the marketplace includes two fees: the Marketplace fee is a 3.5% transaction fee collected by the Coldtivate team to host and maintain the application functional. The Payment fee is the fee that the digital payment system (PayStack in Nigeria) is charging to process the transaction. ',
    },
    {
      id: 105,
      title:
        "I am a buyer interested in purchasing produce from the cold rooms, but I don't see anything in the marketplace. Why?",
      role: [ERoles.COOLING_USER],
      text: 'If you navigate to the Marketplace tab but are unable to see any produce, this might be due to filters that you have applied to the search (such as location, price range, or crop of interest), or it might be because no item is available for sale in your vicinity. In case you know of an existing cold room nearby, we recommend asking the cold room operator whether any cooling user is interested in selling produce via the marketplace functionality and ask for those items to be listed in the app. ',
    },
    {
      id: 106,
      title: 'Do you offer delivery services?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'The marketplace does not offer delivery services at this point, but facilitates the connection with logistics solutions that can deliver produce to the buyers. As a Registered Employee, you have the option to add delivery contacts under "Menu" -> "Management" -> "Seller Settings (Company)" -> "Delivery Contacts". They are displayed to all buyers purchasing produce from your cold rooms at payment. If you are a buyer, you are encouraged to contact them to organise your delivery. Please note that if the produce is picked up on the same day as the purchase, no cooling fee applies, but if you keep the crops in storage, a daily cooling fee is due. Make sure to discuss this with the delivery contact you are negotiating with.   ',
    },
    {
      id: 107,
      title:
        "I received a notification in the app saying that 'Produce needs to be redistributed'. What is that? ",
      role: [ERoles.OPERATOR],
      text: 'Because of the check-in procedure at the cold room, the content of one crate belong to a single farmer or trader. As, in the marketplace, a buyer can purchase some kg out of a crate belonging to a seller, the amount bought should be moved to a separate crate. This notification informs you that a purchase has been completed, and by clicking on it you can visualize from which crate the produce should be taken. Keeping crates organized is vital to ensure that crops are not checked-out by mistake, and that cooling fees are collected correctly. We recommend using the "Crate ID" functionality at check-in to tag crates in Coldtivate with physical crates and more easily track which crates require your attention based on the notification. ',
    },
    {
      id: 108,
      title: 'How much produce can I buy in the marketplace? ',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'For each item displayed in the marketplace, you can buy the full crate or any number of kilograms contained in the crate. The minimal amount that can be bought is 1 kg. ',
    },
    {
      id: 109,
      title: 'I have bought some produce and would like to re-sell it. How do I do it? ',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'When you buy some produce from the marketplace, you become the owner of the purchased amount. In the "Dashboard", you will see a new entry that indicates what you have stored in the cold room. If you want to sell it for sale, you can click on the ">" sign on the right side of the dashboard item, navigate to "Crate weight and marketplace listing", set which crates you would like to set "for sale" and the price per kg. Consumers in the marketplace will be able to see these crates, and buy at the indicated amount. Please note that to set crates for sale, your bank account needs to be set up. Follow the instructions to add your bank account details, or navigate to "Menu" -> "Account details" -> "Payout options".',
    },
    {
      id: 110,
      title: 'I exited the marketplace payment process. How can I finalize my purchase? ',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'When you initiate a purchase by clicking on "Pay" in the Shopping Cart, you are redirected to the payment provider (PayStack in Nigeria). If, for any reason, you abandon the process, your order will be marked as "Payment pending". You can find your order under the "My Orders" tab in the marketplace page. You can click on the item to finalize the payment. You have 30 minutes to complete the payment, after which the order is considered "Cancelled" and the amount is freed for other buyers to purchase it.',
    },
    {
      id: 111,
      title: 'I am unable to check-out some crops. Why is this happening? ',
      role: [ERoles.OPERATOR],
      text: 'If you are trying to check-out some crates that are listed in the marketplace, and are unable to check them out, this is likely due to the fact that they are part of a pending payment order. This means that a buyer has added them to the shopping cart and initiated a purchase process. The buyer has 30 minutes to complete the payment, after which the order will be canceled. After the 30 minutes have passed, you will be able to check-out the crate. ',
    },
  ],
  [APP_LOCALES.ARABIC]: [
    {
      id: 1,
      title: 'لماذا يجب علي استخدام التطبيق؟',
      role: [ERoles.AUTH],
      text: 'تم تصميم التطبيق لدعم مزودي غرف التبريد في عملياتهم اليومية في غرف التبريد، والمزارعين الذين يستخدمون غرف التبريد، والمستهلكين المهتمين بشراء المحاصيل المخزنة في غرف التبريد. يتميز التطبيق بمخزون رقمي ومراقبة عن بعد ونموذج لعمر التخزين لكل صندوق مخزن، وسوق لربط المشترين والبائعين. كما يتضمن مركز المعرفة، الذي يقدم توصيات خاصة بالسلع حول درجة حرارة التخزين المثلى وعمر التخزين.',
    },
    {
      id: 2,
      title: 'من يمكنه استخدام التطبيق؟',
      role: [ERoles.AUTH],
      text: 'يمكن استخدام التطبيق من قبل شركات التخزين البارد والمزارعين والتجار المهتمين باستخدام التخزين البارد والمشترين المحتملين في جميع أنحاء العالم. في جميع أنحاء التطبيق، هناك ثلاثة أدوار للمستخدم: (أ) الموظف المسجل: جزء من فريق إدارة مزود غرفة التبريد. الشخص المسؤول عن إعداد الغرفة وإدارتها، مسؤول عن الإشراف على أنشطة المشغلين على الأرض، دون أن يكون موجودًا فعليًا في الموقع. على سبيل المثال: الرئيس التنفيذي للشركة، والمدير المالي، وما إلى ذلك. (ب) المشغل: موظف موجود فعليًا في غرفة التبريد ويدير عمليات تسجيل الوصول والمغادرة. هذا الشخص على اتصال مباشر بمستخدمي غرفة التبريد، ويقدم تقاريره إلى موظف مسجل في الشركة. (ج) مستخدمو التبريد أو المستهلك: مستخدمو غرفة التبريد (يمكن أن يكونوا مزارعين أو تجارًا أو تجار تجزئة، وما إلى ذلك) أو المستهلك (فرد أو بائع تجزئة أو تاجر جملة). هذا الدور مخصص لأي شخص يريد التسجيل في التطبيق دون الارتباط بشركة تبريد. يمكن لمستخدمي التبريد الذين لديهم هاتف ذكي تسجيل الدخول إلى التطبيق كمستخدمين. إذا لم يكن لديهم هاتف ذكي، يقوم المشغلون بعمليات مستخدمي التبريد نيابة عنهم.',
    },
    {
      id: 3,
      title: 'كيف يمكنني التسجيل كموظف مسجل؟',
      role: [ERoles.AUTH],
      text: 'إذا كنت أول موظف من شركتك يقوم بالتسجيل، فيمكنك النقر على زر "التسجيل كشركة" واتباع الخطوات لتسجيل شركتك ونفسك (بما في ذلك التفاصيل الشخصية وكلمة المرور). بمجرد التسجيل بنجاح، يمكنك تسجيل الدخول كموظف مسجل في التطبيق وإرسال دعوة عبر الرسائل القصيرة للموظفين المسجلين الآخرين للانضمام إلى شركتك. بمجرد إنشاء الشركة، يجب دعوة جميع الموظفين المسجلين عبر الرسائل القصيرة. وإلا فلن يتم ربطهم بنفس الشركة.',
    },
    {
      id: 4,
      title: 'كيف يمكنني التسجيل كمشغل؟',
      role: [ERoles.AUTH],
      text: 'للتسجيل، تحتاج إلى دعوة من موظف مسجل. ستتلقى رسالة قصيرة مع رابط تفعيل، ومن هناك يمكنك إعداد تفاصيلك الشخصية وكلمة المرور.',
    },
    {
      id: 5,
      title: 'كيف يمكنني التسجيل كمستخدم تبريد أو مستهلك؟',
      role: [ERoles.AUTH],
      text: 'يمكن لمستخدمي التبريد الذين لديهم هواتف ذكية والمستهلكين التسجيل بالنقر فوق "التسجيل كمستخدم تبريد أو مستهلك" في الصفحة الرئيسية وتقديم تفاصيلهم الشخصية وكلمة المرور. يمكن للمشغلين إضافة مستخدمي التبريد الذين ليس لديهم هاتف ذكي إلى التطبيق. هذه العملية ضرورية لبدء تسجيل الدخول لمستخدمي التبريد هؤلاء. يحتاج مستخدمو التبريد إلى تقديم رقم هاتف، والذي سيستخدمه المشغل للاتصال بمستخدمي التبريد في حالة الحاجة. لا يلزم كلمة مرور في هذه الحالة.',
    },
    {
      id: 6,
      title: 'لا أستطيع إكمال عملية التسجيل كمستخدم، ماذا يجب أن أفعل؟',
      role: [ERoles.AUTH],
      text: 'لإكمال التسجيل، يرجى التأكد من استيفاء الشروط التالية: (أ) إدخال رقم هاتف برمز البلد الصحيح (على سبيل المثال +91 للهند)؛ (ب) لم يتم استخدام رقم الهاتف الذي قدمته لتسجيل أي مستخدم آخر؛ (ج) كلمة المرور التي تدخلها تلبي جميع الشروط المطلوبة؛ (د) كلمات المرور التي تدخلها هي نفسها - يمكنك النقر فوق رمز العين للكشف عن كلمات المرور والتحقق من تساويها.',
    },
    {
      id: 7,
      title: 'ليس لدي هاتف ولكنني أريد استخدام التطبيق. ماذا علي أن أفعل؟',
      role: [ERoles.AUTH],
      text: 'إذا كنت موظفًا مسجلاً أو مشغلاً أو مستهلكًا، فأنت بحاجة إلى تقديم رقم هاتف صالح للتسجيل. يلزم وجود هاتف ذكي لاستخدام التطبيق بشكل صحيح. إذا كنت من مستخدمي أجهزة التبريد وليس لديك هاتف، فننصحك أيضًا بتقديم رقم هاتف صالح، حتى يتمكن المشغل من الاتصال بك في حالة الحاجة. يمكنك إعطاء رقم هاتف أحد أفراد الأسرة أو أحد الأصدقاء إذا لم يكن لديك رقمك الخاص. إذا لم يكن ذلك ممكنًا، فلا يزال بإمكان المشغل تخزين المنتجات في الغرفة عن طريق تحديد "مستخدم بدون هاتف" كمستخدم تبريد عند تسجيل الوصول.',
    },
    {
      id: 8,
      title: 'ما هي التفاصيل المطلوبة لتسجيل الدخول كموظف مسجل؟',
      role: [ERoles.AUTH],
      text: 'يمكن للموظفين المسجلين تسجيل الدخول باستخدام البريد الإلكتروني أو رقم الهاتف، وكلمة المرور الخاصة بهم.',
    },
    {
      id: 9,
      title: 'ما هي التفاصيل المطلوبة لتسجيل الدخول كمشغل؟',
      role: [ERoles.AUTH],
      text: 'يمكن للمشغلين تسجيل الدخول باستخدام رقم هاتفهم وكلمة المرور.',
    },
    {
      id: 10,
      title: 'ما هي التفاصيل المطلوبة لتسجيل الدخول كمستخدم تبريد أو مستهلك؟',
      role: [ERoles.AUTH],
      text: 'يمكن لمستخدمي Cooling الذين لديهم هواتف ذكية تسجيل الدخول باستخدام رقم الهاتف وكلمة المرور. ولا يحتاج مستخدمو Cooling الذين لا يمتلكون هواتف ذكية إلى تسجيل الدخول: يمكن للمشغل إجراء العمليات نيابة عنهم. ويمكن للمستهلكين المهتمين برؤية السوق تسجيل الدخول باستخدام رقم الهاتف وكلمة المرور.',
    },
    {
      id: 11,
      title: 'لم أتلق أي دعوة عبر الرسائل النصية القصيرة. ماذا يجب أن أفعل؟',
      role: [ERoles.AUTH],
      text: 'إذا فقدت كلمة المرور الخاصة بك، يمكنك استعادة حسابك بالنقر على "نسيت كلمة المرور" عند تسجيل الدخول، وإدخال رقم هاتفك، وستتلقى رسالة قصيرة تحتوي على رابط لتعيين كلمة مرور جديدة.',
    },
    {
      id: 12,
      title: 'لقد فقدت كلمة المرور الخاصة بي. ماذا يجب أن أفعل؟',
      role: [ERoles.AUTH],
      text: 'إذا فقدت كلمة المرور الخاصة بك، يمكنك استعادة حسابك بالضغط على "نسيت كلمة المرور" عند تسجيل الدخول، وأدخل رقم هاتفك، وسوف تتلقى رسالة نصية قصيرة تحتوي على رابط لتعيين كلمة مرور جديدة.',
    },
    {
      id: 13,
      title: 'ما هو مركز المعرفة؟',
      role: [ERoles.EMPLOYEE],
      text: 'مركز المعرفة هو صفحة يمكن الوصول إليها بالنقر على القائمة الموجودة في أعلى اليسار. تحتوي على معلومات مفيدة حول أفضل ممارسات التخزين للسلع المختلفة، بما في ذلك درجة الحرارة المثلى ووقت التخزين التقريبي تحت هذه الدرجة من الحرارة.',
    },
    {
      id: 14,
      title: 'كيف يمكنني تعديل الملف الشخصي الخاص بي؟',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'بالنقر على "القائمة" -> "تفاصيل الحساب"، يمكنك رؤية ملفك الشخصي وتعديل "تفاصيلك الشخصية" (الاسم الأول والأخير ورقم الهاتف والبريد الإلكتروني والجنس). ضمن "تفضيلات التوطين"، يمكنك تغيير لغة التطبيق. ضمن "إعدادات البائع"، يمكنك إعداد تفاصيل حسابك المصرفي وإنشاء قسائم وجعل تفاصيل الاتصال الخاصة بك عامة لمستخدمي السوق. لتغيير تفاصيل شركتك ومواقعك ووحدات التبريد، انتقل إلى "القائمة" -> "الإدارة"، ثم حدد عنصر القائمة الذي ترغب في تغييره.',
    },
    {
      id: 15,
      title: 'كيف يمكنني تعديل الملف الشخصي الخاص بي؟',
      role: [ERoles.EMPLOYEE],
      text: 'هناك ثلاث طرق لربط مشغل بوحدة تبريد. يمكنك تعيين وحدة تبريد (أو أكثر) إلى مشغل عندما ترسل له/لها الدعوة. وإلا، يمكنك تعديل وحدات التبريد المرتبطة بمشغل معين من خلال الانتقال إلى "الإدارة" -> "المشغلون"، واختيار المشغل، ثم النقر على "اختيار وحدة تبريد". أخيرًا، عند إنشاء وحدة تبريد في "الإدارة" -> "وحدات التبريد"، يمكنك أيضًا تعيين مشغلين لها. تذكر أن تحفظ التغييرات قبل الخروج!',
    },
    {
      id: 16,
      title: 'كيف يمكنني تعيين مشغلين لوحدات التبريد؟',
      role: [ERoles.OPERATOR],
      text: 'نعم، يمكنك بدء تسجيل دخول لهذا الشخص باستخدام مستخدم التبريد المسمى "مستخدم بدون هاتف". نظرًا لإمكانية استخدام عدة أشخاص لهذا الحساب للتسجيل، تأكد من إضافة بطاقة اسم على الصناديق في الغرفة لتحديد مالك كل صندوق.',
    },
    {
      id: 17,
      title: 'يصل مستخدم التبريد إلى الغرفة الباردة ولكنه لا يملك هاتفًا. هل يمكنني تسجيله؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'نعم، يمكنك بدء تسجيل الدخول لهذا الشخص باستخدام حساب المستخدم الذي يحمل اسم "مستخدم بدون هاتف". ونظرًا لأن العديد من الأشخاص قد يستخدمون هذا الحساب لتسجيل الدخول، فتأكد من إضافة بطاقة اسم إلى الصناديق الموجودة في الغرفة لتحديد مالك كل صندوق.',
    },
    {
      id: 18,
      title: 'كيف أقوم بتسجيل شركتي؟',
      role: [ERoles.EMPLOYEE],
      text: 'لتسجيل شركتك، في شاشة الترحيب اختر "التسجيل كشركة" وقم بملء المعلومات المطلوبة. أدخل كلمة مرور ثم انقر على "التسجيل" وأنت جاهز للانطلاق!',
    },
    {
      id: 19,
      title: 'كيف أقوم بتسجيل موقع جديد لشركتي؟',
      role: [ERoles.EMPLOYEE],
      text: 'يجب إنشاء كل وحدة تبريد في موقع (ويمكن إنشاء وحدات تبريد متعددة لنفس الموقع). لإضافة موقع جديد لشركتك، في القائمة اختر "الإدارة" > "المواقع". انقر على "+" في الزاوية العلوية اليمنى لإضافة موقع جديد. قم بملء المعلومات المطلوبة. انقر على "إضافة" للتأكيد.',
    },
    {
      id: 20,
      title: 'كيف أقوم بتسجيل وحدة تبريد جديدة لشركتي؟',
      role: [ERoles.EMPLOYEE],
      text: 'لتسجيل وحدة تبريد جديدة لشركتك، تحتاج إلى إنشاء موقع واحد على الأقل. ثم، في القائمة اختر "الإدارة" > "وحدات التبريد". انقر على "+" في الزاوية العلوية اليمنى لإضافة وحدة تبريد جديدة. قم بملء المعلومات المطلوبة. انقر على "إضافة" للتأكيد.',
    },
    {
      id: 21,
      title: 'كيف يمكنني دعوة الموظفين المسجلين الآخرين من شركتي للتسجيل في التطبيق؟',
      role: [ERoles.EMPLOYEE],
      text: 'لدعوة موظفين مسجلين آخرين لشركتك، في القائمة اختر "الإدارة" > "مزود الخدمة". انقر على "+" في الزاوية العلوية اليمنى لإضافة رقم هاتف الموظف الذي تريد دعوته. انقر على "دعوة" للتأكيد: سيتلقى زميلك رسالة قصيرة تحتوي على رابط يوجهه مباشرة إلى شاشة التسجيل. بالإضافة إلى ذلك، ستتلقى أيضًا بريدًا إلكترونيًا يحتوي على رابط الدعوة. يرجى إعادة توجيه هذا إلى المشغل في حالة عدم استلامه عبر الرسائل القصيرة.',
    },
    {
      id: 22,
      title: 'كيف يمكنني دعوة مشغلي التخزين البارد للتسجيل في التطبيق؟',
      role: [ERoles.EMPLOYEE],
      text: 'لإرسال دعوة إلى المشغلين لوحدات التبريد الخاصة بك، في القائمة اختر "الإدارة" > "المشغلون". انقر على "+" في الزاوية العلوية اليمنى لإضافة رقم هاتف المشغل الذي تريد دعوته. انقر على "دعوة" للتأكيد: سيتلقى المشغل رسالة تحتوي على رابط يوجهه مباشرة إلى شاشة التسجيل. بالإضافة إلى ذلك، ستتلقى أيضًا بريدًا إلكترونيًا يحتوي على رابط الدعوة. يرجى إعادة توجيه هذا إلى المشغل في حالة عدم استلامه عبر الرسائل القصيرة.',
    },
    {
      id: 23,
      title: 'كيف يمكنني مراقبة درجة حرارة وحدة التبريد؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'لمراقبة درجة حرارة وحدة تبريد معينة، انقر فوق "المزيد" في الزاوية اليمنى السفلية من شريط التنقل، وحدد "وحدات التبريد"، وانتقل إلى "ظروف الغرفة"، وحدد وحدة التبريد المطلوبة من القائمة المنسدلة. في هذه اللوحة، سترى رسمًا بيانيًا بدرجة الحرارة بمرور الوقت - يمكنك النقر فوق نقطة بيانات لمعرفة قيمة درجة الحرارة والطابع الزمني. إذا كانت الغرفة بها أجهزة استشعار متصلة بالتطبيق، فستتمكن من رؤية درجة حرارة الغرفة الفعلية هنا. وإلا، سيعرض الرسم البياني درجات الحرارة التي قام مشغل الغرفة بتعيينها يدويًا داخل التطبيق. للتحقق من درجة حرارة وحدة تبريد أخرى، يمكنك تحديدها من القائمة المنسدلة أعلى الصفحة.',
    },
    {
      id: 24,
      title: 'كيف يمكنني مراقبة إشغال وحدة التبريد؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'لإدارة إشغال وحدة تبريد معينة، انقر على "المزيد" في الزاوية اليمنى السفلية من شريط التنقل، وحدد "وحدات التبريد"، وانتقل إلى "المخطط"، وحدد وحدة التبريد المطلوبة من القائمة المنسدلة. هنا يمكنك رؤية الإشغال الحالي (أعلى) والإشغال المتوقع للأيام السبعة القادمة (أسفل). تعتمد المعلومات حول الإشغال المستقبلي على عدد الأيام التي يعلنها كل مستخدم كأيام مخططة للتخزين عند تسجيل الوصول. انتبه إلى أن هذا مجرد تقدير وقد يكون غير دقيق.',
    },
    {
      id: 25,
      title: 'كيف يمكنني رؤية العناصر المخزنة في غرفة ما؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'انقر على أيقونة "لوحة المعلومات" في أسفل الشاشة واختر وحدة التبريد المطلوبة من القائمة المنسدلة لرؤية قائمة بجميع العناصر المخزنة في وحدة التبريد.',
    },
    {
      id: 26,
      title: 'كيف يمكنني رؤية عمليات تسجيل الدخول والخروج السابقة لوحدة التبريد؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'للاطلاع على الحركات السابقة لوحدة تبريد، انقر على "المزيد" في الزاوية اليمنى السفلية من شريط التنقل، ثم حدد "التاريخ": يتم عرض عمليات تسجيل الدخول السابقة (الأيقونات ذات الصندوق الأخضر)، وعمليات الخروج (الأيقونات ذات الصندوق البرتقالي)، وعمليات السوق (الأيقونات ذات العربة الزرقاء) مع تفاصيل المعاملات. إذا كانت معاملة معينة محل اهتمامك، فيمكن أن تساعدك وظيفة البحث في العثور عليها!',
    },
    {
      id: 28,
      title: 'ما هي المهام الرئيسية التي يمكن للمشغل القيام بها في التطبيق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'يستطيع المشغل: تسجيل مستخدمي التبريد الجدد، وبدء عمليات تسجيل الدخول، ومراقبة العناصر المخزنة وشغل الغرف، وبدء عمليات تسجيل الخروج، ومراقبة درجة حرارة وحدة التبريد التي يتحمل مسؤوليتها. كما يستطيع المشغل مساعدة مستخدمي التبريد في إدراج بعض الصناديق للبيع وتحديد سعر البيع.',
    },
    {
      id: 29,
      title: 'كيف يمكنني تسجيل مستخدمي التبريد الجدد؟',
      role: [ERoles.OPERATOR],
      text: 'لتسجيل مستخدم تبريد جديد، انتقل في القائمة إلى "الإدارة" > "مستخدمو التبريد". انقر فوق "+" في الزاوية اليمنى العليا واختر ما إذا كنت تريد إضافة مستخدم مسجل بالفعل برمز، أو إضافة تفاصيل المستخدم. يمتلك مستخدم التبريد الذي لديه هاتف ذكي وقد سجل بالفعل في Coldtivate رمزًا فريدًا، والذي يمكنه العثور عليه ضمن "القائمة" -> "تفاصيل الحساب" -> "التفاصيل الشخصية" -> رمز استيراد مستخدم التبريد. إذا لم يكن لدى المستخدم هاتف ذكي، أو لم يتم تسجيله بعد، فيمكنك إضافة المستخدم عن طريق إضافة الاسم والجنس ورقم الهاتف. إذا لم يكن لدى المستخدم رقم خاص به، فيمكن استخدام رقم شخص آخر (مثل الأصدقاء والأقارب)، ولكن يرجى تذكر أنه لا يمكن استخدام رقم هاتف واحد إلا مرة واحدة. انقر فوق "حفظ التغييرات" للتأكيد. لإكمال التسجيل، تحتاج إلى ملء استبيان قصير عن طريق طرح بعض الأسئلة على مستخدم التبريد. يمكنك أيضًا إكمال الاستطلاع في وقت لاحق بالانتقال إلى "الإدارة" -> "تبريد المستخدمين" -> "استطلاع تبريد المستخدمين".',
    },
    {
      id: 30,
      title:
        'ليس لدى مستخدم التبريد الوقت للإجابة على أسئلة الاستبيان عند التسجيل. ماذا يجب أن أفعل؟',
      role: [ERoles.OPERATOR],
      text: 'يمكنك تخطي أسئلة الاستبيان بالنقر على "إكمال لاحقًا". في هذه الحالة، سيطلب منك إكمال الاستبيان في المرة الأولى التي تقوم فيها بإنشاء تسجيل دخول لمستخدم التبريد هذا. يوصى بأخذ الوقت والإجابة على أسئلة الاستبيان بشكل شامل: بهذه الطريقة يمكن للمستخدم الحصول على تجربة أكثر تخصيصًا مع تطبيق Coldtivate!',
    },
    {
      id: 31,
      title:
        'يطلب مني أحد المشغلين إدخال رمز لإضافتي إلى قائمة مستخدمي التبريد بالشركة. أين يمكنني العثور على الرمز؟',
      role: [ERoles.OPERATOR],
      text: 'لبدء عملية تسجيل دخول، انتقل إلى لوحة المعلومات وانقر على زر مدير النشاط في الجزء السفلي الأيمن، ثم انقر على الزر الأخضر.',
    },
    {
      id: 32,
      title: 'ليس لدي وقت للإجابة على أسئلة الاستبيان عند التسجيل. ماذا ينبغي لي أن أفعل؟',
      role: [ERoles.OPERATOR],
      text: 'هناك طريقتان لبدء عملية تسجيل الخروج، كلاهما يبدأ في صفحة لوحة المعلومات. يمكنك النقر على زر مدير النشاط في الجزء السفلي الأيمن، ثم النقر على الزر الأحمر. بهذه الطريقة، يمكنك اختيار لأي مستخدم تبريد (وفي أي وحدة تبريد) تريد بدء تسجيل الخروج، ويمكنك تسجيل خروج صناديقه/صناديقها من عمليات تسجيل دخول متعددة. بدلاً من ذلك، يمكنك النقر على "عرض التفاصيل" لعنصر تراه في لوحة المعلومات (تأكد من أنك في وحدة التبريد الصحيحة)، والنقر على "تسجيل الخروج". في هذه الحالة، يمكنك فقط تسجيل خروج الصناديق من عنصر التخزين هذا.',
    },
    {
      id: 33,
      title: 'أرغب في تخزين محاصيلي في غرف باردة، كيف يمكنني العثور عليها؟',
      role: [ERoles.EMPLOYEE],
      text: 'للعثور على غرف التبريد القريبة منك، انتقل إلى "المزيد" في الزاوية اليمنى السفلية من شريط التنقل، ثم حدد "وحدات التبريد" و"الخريطة". هنا يمكنك البحث عن غرف التبريد القريبة، ثم إحضار الصناديق الخاصة بك إلى الغرفة. يمكن لمشغل غرفة التبريد مساعدتك في فهم كيفية عمل الغرفة، وكيفية تحصيل الرسوم منك، وما هي فوائد استخدام التخزين البارد.',
    },
    {
      id: 34,
      title: 'كيف يمكنني البدء في تسجيل الوصول؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'لبدء تسجيل الوصول، انتقل إلى لوحة المعلومات وانقر على زر مدير النشاط في أسفل اليمين، ثم انقر على الزر الأخضر.',
    },
    {
      id: 35,
      title: 'كيف يمكنني البدء في عملية الخروج؟',
      role: [ERoles.OPERATOR],
      text: 'هناك طريقتان لبدء عملية الخروج، تبدأ كل منهما من صفحة لوحة المعلومات. يمكنك النقر فوق زر مدير النشاط في أسفل اليمين، ثم النقر فوق الزر الأحمر. بهذه الطريقة، يمكنك تحديد مستخدم التبريد (وفي أي وحدة تبريد) الذي تريد بدء عملية الخروج له، ويمكنك تسجيل خروج صناديقه من عمليات تسجيل دخول متعددة. بدلاً من ذلك، يمكنك النقر فوق "عرض التفاصيل" لعنصر تراه في لوحة المعلومات (تأكد من أنه في وحدة التبريد الصحيحة)، والنقر فوق "تسجيل الخروج". في هذه الحالة، يمكنك تسجيل خروج الصناديق من عنصر التخزين هذا فقط.',
    },
    {
      id: 36,
      title: 'لدي أجهزة استشعار درجة الحرارة في الغرفة الباردة. هل يمكن توصيلها بجهاز Coldtivate؟',
      role: [ERoles.AUTH],
      text: 'مركز المعرفة هو صفحة يمكن الوصول إليها بالنقر على القائمة في الجزء العلوي الأيسر. يحتوي على معلومات مفيدة حول أفضل ممارسات التخزين للسلع المختلفة، بما في ذلك درجة الحرارة المثلى ووقت التخزين التقريبي تحت هذه الدرجة.',
    },
    {
      id: 37,
      title: 'كيف أقوم بربط أجهزة الاستشعار الموجودة في الغرفة بالتطبيق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'إذا كانت هناك أجهزة استشعار لدرجة الحرارة في الغرفة يمكن توصيلها بتطبيق Coldtivate، فيرجى التواصل مع المسؤول. يمكن فقط للمستخدم الذي لديه دور موظف مسجل ربط أجهزة الاستشعار بوحدات التبريد التي تم إنشاؤها في Coldtivate.',
    },
    {
      id: 38,
      title: 'كيف يمكنني ضبط درجة حرارة وحدة التبريد؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'وقت الاستلام هو عدد الأيام المقترحة المتبقية لمستخدم التبريد لاستلام السلعة. بعد ذلك، ستبدأ السلعة في فقدان قابليتها للتسويق. يشير وقت الاستلام المساوي للصفر إلى أنه يجب على المستخدم القدوم لجمع العنصر من التخزين فورًا ولديه ما يصل إلى يومين لبيعه في السوق. يمكن رؤيته في لوحة المعلومات (أعلى اليمين) وفي العرض التفصيلي لكل عنصر تخزين.',
    },
    {
      id: 39,
      title: 'كيفية التواصل مع مستخدم التبريد لإجراء مسح لسوق ما بعد التخزين؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'الخضروات والفواكه الطازجة قابلة للتلف، وكيفية فقدانها لنضارتها بعد الحصاد تعتمد بشكل كبير على درجة الحرارة. لذلك، يتم حساب وقت الاستلام بناءً على درجة حرارة وحدة التبريد المقابلة، وعلى الجودة الأولية للمنتج عندما يتم إحضاره إلى وحدة التبريد. المعايير المستخدمة في هذا الحساب فريدة لكل سلعة. يمكنك الحصول على بعض الرؤى حول كيفية اختلاف قابلية التلف بين السلع المختلفة في مركز المعرفة.',
    },
    {
      id: 40,
      title: 'ما هو مسح سوق ما بعد التخزين ولماذا يجب أن أقوم بملئه؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'يمكن الوصول إلى مسح السوق من خلال النقر على النقاط الثلاث بجوار كل عملية شراء في علامة التبويب "المزيد" -> "السجل" وتحديد "ملء مسح السوق". المسح قصير جدًا ويطلب معلومات حول سعر بيع المنتج الذي قمت بتخزينه سابقًا في الغرفة، بالإضافة إلى مقدار ما فسد منه. سيتم التعامل مع هذه المعلومات على أنها سرية وسيتم استخدامها حصريًا من قبل فريق Coldtivate لتقييم تأثير استخدام التخزين البارد. ستحدد النقطة الحمراء عمليات الشراء التي لم يتم إكمال مسح السوق لها بعد. سيتم تذكيرك بعمليات الشراء التي تحتاج إلى اهتمامك في لوحة الإشعارات ويمكنك النقر فوق الإشعار لفتح المسح. يمكنك أيضًا الوصول إلى الاستطلاعات التي تحتاج إلى تعبئتها في علامة التبويب "التحليلات"، ثم النقر فوق "التأثير".',
    },
    {
      id: 41,
      title: 'كيف يمكنني قراءة معلومات عنصر واحد في لوحة المعلومات؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'يعرض كل عنصر في لوحة المعلومات مجموعة من الصناديق من نفس نوع المحصول والتي تم تسجيلها معًا. عدد الأيام في الأعلى هو الأيام المتبقية المتوقعة حتى وقت الاستلام. أدناه، يمكنك رؤية نوع المحصول ومعرف التسجيل. الرقم بجوار رمز الصندوق هو عدد الصناديق المسجلة. بجواره، يمكنك رؤية رسوم التبريد وعدد الأيام التي ظلت فيها الصناديق مخزنة. الرقم بجوار البطاقة على الجانب الأيمن يحدد عدد الصناديق المدرجة على أنها "معروضة للبيع" في السوق. في أسفل كل عنصر، يمكنك رؤية رقم الصندوق وتفاصيل الاتصال.',
    },
    {
      id: 42,
      title: 'ما هو الوقت المناسب لالتقاط؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'يتم عرض الإشغال باللون الأحمر عندما يتم استخدام أكثر من 80٪ من سعة وحدة التبريد. تعتمد المعلومات حول الإشغال المستقبلي على عدد الأيام التي يصرح بها كل مستخدم كأيام مخططة في التخزين عند تسجيل الدخول. انتبه إلى أن هذا مجرد تقدير وقد يكون غير دقيق. وعلى هذا النحو، فإن إشغال الغرفة باللون الأحمر هو مجرد علامة على أن الغرفة أصبحت ممتلئة. لا داعي للقلق ولكن يمكنك اتخاذ إجراء وفقًا لذلك. على سبيل المثال، ضع في اعتبارك الاتصال بمستخدمي التبريد الذين لديهم سلع في التخزين وأقل وقت للاستلام لتقديم المشورة لهم بتسجيل الخروج قريبًا. يمكنك رؤية قائمة مرتبة بالعناصر الأكثر إلحاحًا للخروج ضمن "لوحة المعلومات" عند الترتيب حسب وقت الاستلام.',
    },
    {
      id: 43,
      title: 'كيف يتم حساب وقت الاستلام؟ ما هي العوامل التي تتأثر بذلك؟',
      role: [ERoles.OPERATOR],
      text: 'تُعد الخضروات والفواكه الطازجة سريعة التلف، وتعتمد طريقة فقدانها لنضارتها بعد الحصاد إلى حد كبير على درجة الحرارة. وبالتالي، يتم حساب وقت الالتقاط بناءً على درجة حرارة وحدة التبريد المقابلة، وعلى الجودة الأولية للمنتج عند إحضاره إلى وحدة التبريد. المعايير المستخدمة في هذا الحساب فريدة من نوعها لكل سلعة. يمكنك الحصول على بعض الأفكار حول كيفية اختلاف قابلية التلف بين السلع المختلفة في مركز المعرفة.',
    },
    {
      id: 44,
      title: 'الوقت المستغرق لالتقاط المنتج هو 0 يوم ولكن المنتج لا يزال يبدو جيدًا. لماذا؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'يمثل اللون الأيام المتبقية قبل وقت الاستلام. سترى الشريط باللون الأحمر عندما يكون أقل من يومين، وباللون الأصفر عندما يكون أقل من 7 أيام، وباللون الأخضر عندما يكون أكثر من 7 أيام. هذه القيم محددة لكل عنصر تخزين ويتم إعادة حسابها عدة مرات في اليوم بناءً على درجة الحرارة في وحدة التبريد. عندما لا يتوفر نموذج للحساب، يكون لون الشريط رماديًا.',
    },
    {
      id: 45,
      title: 'الوقت المستغرق لالتقاط المنتج هو أكثر من 0 يوم ولكن المنتج فاسد تقريبًا. لماذا؟',
      role: [ERoles.OPERATOR],
      text: 'قد تستغرق لوحة المعلومات لحظة للتحديث. يرجى أيضًا التحقق من أنك تنظر في وحدة التبريد الصحيحة. إذا استمرت المشكلة، يرجى الإبلاغ عنها إلى app@yourvcca.org.',
    },
    {
      id: 46,
      title: 'الوقت المستغرق لالتقاط المنتج هو أكثر من 0 يوم ولكن المنتج فاسد تقريبًا. لماذا؟',
      role: [ERoles.OPERATOR],
      text: 'قد تستغرق لوحة المعلومات لحظة للتحديث. يرجى أيضًا التحقق من أن العناصر التي قمت بتسجيل خروجها كانت صحيحة، وأنك تنظر في وحدة التبريد الصحيحة. إذا استمرت المشكلة، يرجى الإبلاغ عنها إلى app@yourvcca.org.',
    },
    {
      id: 47,
      title:
        'نسبة إشغال الغرف في أحد الأيام التالية حمراء (أقل من 20%). على أي أساس تم تحديد ذلك؟ هل يجب أن أقلق؟',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'يظهر الإشغال باللون الأحمر عندما يتم استخدام أكثر من 80% من سعة وحدة التبريد. تعتمد المعلومات حول الإشغال المستقبلي على عدد الأيام التي يعلنها كل مستخدم كأيام مخططة للتخزين عند تسجيل الوصول. انتبه إلى أن هذا مجرد تقدير وقد يكون غير دقيق. وبالتالي، فإن إشغال الغرفة باللون الأحمر هو مجرد علامة على أن الغرفة أصبحت ممتلئة. لا داعي للقلق ولكن يمكنك اتخاذ الإجراءات وفقًا لذلك. على سبيل المثال، فكر في الاتصال بمستخدمي التبريد الذين لديهم سلع مخزنة لديها أقل وقت للاستلام لإبلاغهم بالخروج قريبًا. يمكنك رؤية قائمة مرتبة بالعناصر الأكثر إلحاحًا للخروج ضمن "لوحة المعلومات" عند الطلب حسب وقت الاستلام.',
    },
    {
      id: 48,
      title:
        'يقوم مستخدم التبريد بإحضار سلعة غير مدرجة في القائمة إلى الغرفة. هل يمكنني التحقق من ذلك؟',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'يتم إرسال الإشعار بعد عدم تلقي بيانات من جهاز الاستشعار لأكثر من 12 ساعة، وهذا يعني أنه يتم الآن استخدام درجة الحرارة المعينة في لوحة "وحدات التبريد" > "ظروف الغرفة". سيحاول التطبيق إعادة الاتصال بجهاز الاستشعار كل ساعة، لذلك ننصحك بالانتظار لبضع ساعات في حال كانت هذه مشكلة اتصال. إذا لم تكن هناك بيانات جديدة من جهاز الاستشعار لعدة ساعات أو أيام، فقد تكون المشكلة في الجانب المادي، على سبيل المثال، قد تكون بطارية جهاز الاستشعار قد نفدت.',
    },
    {
      id: 49,
      title: 'في لوحة المعلومات، يوجد لكل عنصر شريط ملون. ماذا يمثل لون الشريط؟',
      role: [ERoles.EMPLOYEE],
      text: 'عندما لا تكون هناك أجهزة استشعار متصلة بالتطبيق، يعتمد نموذج حساب وقت الاستلام على درجة الحرارة التي يحددها المشغل. هذا هو السبب أيضًا في أنه يُطلب من المشغل إدخال درجة حرارة جديدة محددة في كل عملية تسجيل دخول وخروج جديدة. لكي يكون النموذج دقيقًا، من الضروري أن تكون درجة الحرارة محدثة. يرجى توجيه المشغلين في وحدة التبريد الخاصة بك حول هذه الخطوة المهمة.',
    },
    {
      id: 50,
      title:
        'لقد أكملت عملية تسجيل الدخول بنجاح ولكن لا يمكنني رؤية العناصر الموجودة في لوحة المعلومات حتى الآن. لماذا؟',
      role: [ERoles.OPERATOR],
      text: 'هذه النافذة المنبثقة هي تذكير لك لإبلاغ التطبيق بدرجة الحرارة المحددة الصحيحة لغرفة التبريد في حالة عدم وجود أجهزة استشعار (أو إذا كانت لا تعمل بشكل صحيح). يجب عليك التحقق مما إذا كانت القيمة المشار إليها في النافذة المنبثقة هي نفسها التي يمكنك قراءتها في لوحة التحكم في الغرفة. إذا لم يكن الأمر كذلك، فيجب عليك تحديث درجة الحرارة. وإلا، يمكنك التأكيد والاستمرار في تسجيل الدخول. وجود درجة حرارة محددة محدثة مهم جدًا لكي يكون النموذج الذي يحسب وقت الاستلام دقيقًا.',
    },
    {
      id: 51,
      title:
        'لقد أكملت عملية الدفع بنجاح ولكن لا يزال بإمكاني رؤية العناصر في لوحة المعلومات. لماذا؟',
      role: [ERoles.OPERATOR],
      text: 'قد يستغرق تحديث لوحة المعلومات بعض الوقت. يُرجى أيضًا التأكد من أن العناصر التي قمت بفحصها هي العناصر الصحيحة، وأنك تبحث في وحدة التبريد الصحيحة. إذا استمرت في ملاحظة المشكلة، فيرجى الإبلاغ عنها على app@yourvcca.org.',
    },
    {
      id: 52,
      title: 'كيف يمكنني التأكد من أن مستشعر درجة الحرارة يعمل بشكل جيد؟',
      role: [ERoles.OPERATOR],
      text: 'يقوم فريق تطوير التطبيق بجمع بعض المعلومات الأساسية عن مستخدمي التبريد عندما يبدأون باستخدام الغرفة كبيانات أساسية ستتم مقارنتها مع البيانات التي يتم الحصول عليها من التطبيق. الهدف الوحيد هو تحسين تصميم التطبيق واستخدام غرفة التبريد.',
    },
    {
      id: 53,
      title: 'لقد تلقيت إشعارًا بأن المستشعر لا يعمل. ماذا يجب أن أفعل؟',
      role: [ERoles.OPERATOR],
      text: 'سيُطلب منك الاتصال بمستخدم التبريد الذي قام مؤخرًا بتسجيل خروج بعض المنتجات من الغرفة والسؤال عن المكان والسعر الذي باعوا به العنصر الذي تم تخزينه في الغرفة. ستساعد هذه المعلومات فريق تطوير التطبيق في التحقق من دقة تنبؤات أسعار السوق المقدمة وتحسينها.',
    },
    {
      id: 54,
      title: 'كيف يمكن حساب وقت الاستلام إذا لم تكن هناك أجهزة استشعار؟',
      role: [ERoles.EMPLOYEE],
      text: 'تأكد من التحقق من البرنامج التعليمي وقسم الأسئلة الشائعة، حيث يحتويان على معلومات مفيدة حول التطبيق قد تساعد في توضيح أسئلتك. إذا كنت ترغب في الاتصال بفريق دعم التطبيق، يرجى إرسال بريد إلكتروني إلى app@yourvcca.org.',
    },
    {
      id: 55,
      title:
        'في كل مرة أبدأ فيها عملية تسجيل الدخول، تظهر لي نافذة منبثقة لتنبيهي بدرجة الحرارة. لماذا؟',
      role: [ERoles.OPERATOR],
      text: 'تأكد من التحقق من البرنامج التعليمي وقسم الأسئلة الشائعة، حيث يحتويان على معلومات مفيدة حول التطبيق قد تساعد في توضيح أسئلتك. إذا بقي سؤالك دون إجابة، يرجى الاتصال بالموظف المسجل الذي تقدم تقاريرك إليه.',
    },
    {
      id: 56,
      title:
        'في كل مرة أقوم فيها بإتمام عملية الدفع، تظهر لي نافذة منبثقة لتنبيهي بدرجة الحرارة. لماذا؟',
      role: [ERoles.EMPLOYEE],
      text: 'يرجى التأكد من تثبيت أحدث إصدار من التطبيق. إذا استمرت المشكلة، يرجى إبلاغ فريق دعم التطبيق عن طريق إرسال بريد إلكتروني إلى app@yourvcca.org أو عن طريق ملء نموذج التعليقات: https://forms.gle/ceohKHT2QCcE3rFs5 .',
    },
    {
      id: 57,
      title:
        'لماذا أحتاج إلى أن أطلب من مستخدم التبريد ملء استبيان قبل أن يتمكن من تسجيل الدخول إلى الصندوق الأول؟',
      role: [ERoles.OPERATOR],
      text: 'يرجى التأكد من تثبيت أحدث إصدار من التطبيق. إذا استمرت المشكلة، يرجى الاتصال بالموظف المسجل الذي تقدم تقاريرك إليه و/أو إبلاغ فريق دعم التطبيق عن طريق إرسال بريد إلكتروني إلى app@yourvcca.org أو عن طريق ملء نموذج التعليقات: https://forms.gle/2gKVzZjkJSPqEAan9 .',
    },
    {
      id: 58,
      title: 'لماذا أحتاج إلى ملء استبيان عندما أقوم بالتسجيل في التطبيق؟',
      role: [ERoles.EMPLOYEE],
      text: 'يسعد فريق دعم التطبيق الاستماع إلى تجربتك في استخدام هذا التطبيق ويرحب بملاحظاتك، يرجى إرسال بريد إلكتروني إلى app@yourvcca.org أو تقديم ملاحظاتك عبر النموذج: https://forms.gle/ceohKHT2QCcE3rFs5 .',
    },
    {
      id: 60,
      title: 'لماذا أحتاج إلى السؤال من مستخدمي التبريد عن سعر بيع كل عنصر تخزين؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'في هذا التبويب، يمكنك رؤية توقعات أسعار السوق إما في رسم بياني أو في شكل جدول. تتيح صفحة اتجاه الأسعار تصور بيانات الشهر الماضي وتوقعات الـ 14 يومًا لسوق وسلعة محددة (في الهند) أو توقعات شهرية لكل ولاية (في نيجيريا). تتيح صفحة ترتيب الأسعار تصور جميع توقعات أسعار السوق مرتبة من الأعلى إلى الأدنى، مع إمكانية التصفية حسب التاريخ والولاية والمنطقة والسوق (في الهند).',
    },
    {
      id: 61,
      title: 'لا أفهم أجزاء من التطبيق. من يجب أن أتواصل معه؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'تأكد من مراجعة البرنامج التعليمي وقسم الأسئلة الشائعة، حيث يحتويان على معلومات مفيدة حول التطبيق والتي قد تساعد في توضيح أسئلتك. إذا كنت ترغب في التواصل مع فريق دعم التطبيق، يرجى إرسال بريد إلكتروني إلى app@yourvcca.org.',
    },
    {
      id: 62,
      title: 'لا أفهم أجزاء من التطبيق. من يجب أن أتواصل معه؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'يتم تدريب نموذج تعلم آلي على بيانات أسعار السوق التاريخية وبيانات أخرى مثل معدل تحويل العملات وسعر البنزين، لعمل توقعات لأسعار السوق المستقبلية.',
    },
    {
      id: 66,
      title: 'لا أفهم أجزاء من التطبيق. من يجب أن أتواصل معه؟',
      role: [ERoles.COOLING_USER],
      text: 'يمكنك تخطي أسئلة الاستبيان بالنقر على "إكمال لاحقًا". ستجد الاستبيان كجزء من تفاصيل حسابك ويمكنك إكماله في أي وقت. ومع ذلك، يوصى بأخذ الوقت للإجابة على أسئلة الاستبيان بشكل شامل عندما تبدأ في استخدام الغرفة: بهذه الطريقة يمكنك الحصول على تجربة أكثر تخصيصًا مع تطبيق Coldtivate!',
    },
    {
      id: 67,
      title: 'لقد وجدت خطأ في التطبيق. من يجب أن أتصل به؟',
      role: [ERoles.COOLING_USER],
      text: 'يرجى التأكد من تثبيت أحدث إصدار من التطبيق. إذا استمرت المشكلة، يرجى إخطار فريق دعم التطبيق عن طريق إرسال بريد إلكتروني إلى app@yourvcca.org أو عن طريق ملء نموذج الملاحظات: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 68,
      title: 'هناك شيء لا يعمل بشكل صحيح في التطبيق. من يجب أن أتصل به؟',
      role: [ERoles.OPERATOR],
      text: 'إذا كانت هناك أجهزة استشعار لدرجة الحرارة في الغرفة يمكن توصيلها بتطبيق Coldtivate، يرجى التواصل مع المسؤول عنك. فقط المستخدم الذي لديه دور موظف مسجل يمكنه ربط أجهزة الاستشعار بوحدات التبريد التي تم إنشاؤها في Coldtivate.',
    },
    {
      id: 69,
      title: 'هناك شيء لا يعمل بشكل صحيح في التطبيق. من يجب أن أتصل به؟',
      role: [ERoles.COOLING_USER],
      text: 'يرجى التأكد من تثبيت أحدث إصدار من التطبيق. إذا استمرت المشكلة، يرجى الاتصال بمشغل الغرفة الباردة و/أو إخطار فريق دعم التطبيق عن طريق إرسال بريد إلكتروني إلى app@yourvcca.org.',
    },
    {
      id: 70,
      title: 'أريد تقديم ملاحظات حول تجربتي مع التطبيق. من يجب أن أتواصل معه؟',
      role: [ERoles.COOLING_USER],
      text: 'وقت الاستلام هو قيمة متوقعة. وبالتالي، قد تحدث حالات نادرة، حيث يتلف المنتج بينما وقت الاستلام أكبر من 0. نظرًا لأن تدهور جودة المنتجات الطازجة يعتمد بشكل كبير على درجة الحرارة، فإن بيانات درجة الحرارة تساعد على جعل التنبؤ أكثر دقة. على سبيل المثال، قد تنشأ المشكلة عندما لا تكون هناك أجهزة استشعار لدرجة الحرارة مرتبطة بالتطبيق، ولم يقم المشغل بتحديث درجة حرارة الغرفة بانتظام في التطبيق. يرجى إخطار مشغل الغرفة في حالة حدوث ذلك.',
    },
    {
      id: 71,
      title: 'أريد تقديم ملاحظات حول تجربتي مع التطبيق. من يجب أن أتواصل معه؟',
      role: [ERoles.COOLING_USER],
      text: 'يقوم فريق تطوير التطبيق بجمع بعض المعلومات الأساسية عن مستخدمي التبريد عندما يبدأون باستخدام الغرفة كبيانات أساسية ستتم مقارنتها مع البيانات التي يتم الحصول عليها من التطبيق. الهدف الوحيد هو تحسين تصميم التطبيق واستخدام غرفة التبريد.',
    },
    {
      id: 73,
      title: 'أريد تقديم ملاحظات حول تجربتي مع التطبيق. من يجب أن أتواصل معه؟',
      role: [ERoles.COOLING_USER],
      text: 'تأكد من التحقق من البرنامج التعليمي وقسم الأسئلة الشائعة، حيث يحتويان على معلومات مفيدة حول التطبيق قد تساعد في توضيح أسئلتك. إذا بقي سؤالك دون إجابة، يرجى الاتصال بمشغل غرفة التبريد، أو الكتابة إلى app@yourvcca.org',
    },
    {
      id: 74,
      title: 'أنا في منطقة حيث الاتصال بالإنترنت ضعيف: هل لا يزال بإمكاني استخدام التطبيق؟',
      role: [ERoles.COOLING_USER],
      text: 'يرجى التأكد من تثبيت أحدث إصدار من التطبيق. إذا استمرت المشكلة، يرجى الاتصال بمشغل غرفة التبريد و/أو إبلاغ فريق دعم التطبيق عن طريق إرسال بريد إلكتروني إلى app@yourvcca.org.',
    },
    {
      id: 75,
      title: 'ما هي الأسعار التي تظهر عند الضغط على أيقونة "أسعار المحاصيل"؟',
      role: [ERoles.EMPLOYEE],
      text: 'لحذف حسابك يمكنك الانتقال إلى "القائمة" -> "تفاصيل الحساب"، والنقر على حذف. يرجى توخي الحذر، لا يمكن التراجع عن هذا الإجراء! إذا كنت آخر موظف مسجل في الشركة، فإن هذا الإجراء سيحذف الشركة. إذا كانت هناك عمليات تسجيل دخول معلقة، فلن تتمكن من حذف حسابك حتى يتم تسجيل خروج جميع الصناديق في التطبيق من قبل أحد المشغلين لديك.',
    },
    {
      id: 76,
      title: 'لماذا لا يتم ذكر بعض الولايات والأسواق في قسم "أسعار المحاصيل"؟',
      role: [ERoles.OPERATOR],
      text: 'لحذف حسابك يمكنك الانتقال إلى "القائمة" -> "تفاصيل الحساب"، والنقر على حذف. يرجى توخي الحذر، لا يمكن التراجع عن هذا الإجراء! إذا كنت آخر مشغل معين لإحدى الغرف التي توجد فيها عمليات تسجيل دخول مفتوحة، فلا يمكنك حذف حسابك حتى يقوم موظف مسجل بتعيين مشغل آخر للغرفة، أو يتم تسجيل خروج جميع الصناديق في التطبيق.',
    },
    {
      id: 77,
      title: 'كيف يتم حساب أسعار السوق المستقبلية؟',
      role: [ERoles.COOLING_USER],
      text: 'لحذف حسابك يمكنك الانتقال إلى "القائمة" -> "تفاصيل الحساب"، والنقر على حذف. يرجى توخي الحذر، لا يمكن التراجع عن هذا الإجراء! إذا كان لديك عمليات تسجيل دخول مفتوحة في أي من الغرف، فلا يمكنك حذف حسابك حتى يتم تسجيل خروج جميع الصناديق من الغرف. يرجى التأكد من جمع صناديقك من الغرفة! في حال كنت تعتقد أن هناك صناديق معلقة في التطبيق قمت بإزالتها بالفعل، يرجى التواصل مع مشغل الغرفة لحل المشكلة.',
    },
    {
      id: 78,
      title: 'أريد حذف حسابي ماذا يجب أن أفعل؟',
      role: [ERoles.EMPLOYEE],
      text: 'يمكنك حذف وحدات التبريد والمواقع بالذهاب إلى "القائمة" -> "الإدارة" -> "وحدات التبريد" / "المواقع" والنقر على حذف. ستتمكن من القيام بذلك فقط إذا لم تكن هناك عمليات تسجيل دخول معلقة في الغرف. وإلا، يرجى التواصل مع المشغلين لإكمال عمليات الخروج قبل محاولة حذف الغرف والمواقع.',
    },
    {
      id: 79,
      title: 'أريد حذف حسابي ماذا يجب أن أفعل؟',
      role: [ERoles.EMPLOYEE],
      text: 'لا يُسمح لك بحذف المستخدمين الآخرين من التطبيق. ومع ذلك، يمكنك إلغاء تعيين المشغلين من غرفك بالانتقال إلى "القائمة" -> "الإدارة" -> "المشغلون". إذا كنت لا تزال ترغب في إزالة المستخدم بالكامل بحيث لا يتمكن من الوصول إلى شركتك، يرجى كتابة بريد إلكتروني إلى app@yourvcca.org وشرح سبب الحاجة إلى ذلك.',
    },
    {
      id: 80,
      title: 'أريد حذف حسابي ماذا يجب أن أفعل؟',
      role: [ERoles.OPERATOR],
      text: 'لحذف مستخدم تبريد من القائمة، انتقل إلى "الإدارة" -> "مستخدمو التبريد"، انقر على اسم مستخدم التبريد ثم على زر "حذف". يرجى ملاحظة أنه يمكن حذف المستخدمين الذين ليس لديهم عمليات تسجيل دخول معلقة فقط! إذا كانت هناك عمليات تسجيل دخول معلقة، يرجى الاتصال بالمستخدم لاستلام المنتجات. لاحظ أنه لا يمكن التراجع عن هذا الإجراء! إذا كان المستخدم يمتلك هاتفًا ذكيًا، فإن هذه العملية ستزيله من قائمتك، لكن المستخدم سيظل قادرًا على استخدام Coldtivate. إذا لم يكن لدى المستخدم هاتف ذكي، فإن هذه العملية تحذف حسابه/ها وتحرر رقم الهاتف المرتبط به.',
    },
    {
      id: 81,
      title: 'كيف يمكنني حذف وحدة تبريد أو موقع؟',
      role: [ERoles.EMPLOYEE],
      text: 'للتحقق من آخر مرة قام فيها المشغلون والموظفون المسجلون الآخرون بتسجيل الدخول إلى التطبيق، يمكنك الانتقال إلى "القائمة" -> "الإدارة" -> "المشغل" / "مزود الخدمة". التاريخ والوقت اللذان تراهما بجانب الاسم هما تاريخ ووقت آخر تسجيل دخول.',
    },
    {
      id: 82,
      title: 'كيف يمكنني حذف موظف مسجل أو مشغل آخر من شركتي؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'لا يُسمح لك بحذف مستخدمين آخرين من التطبيق. ومع ذلك، يمكنك إلغاء تعيين مشغلين من غرفك بالانتقال إلى "القائمة" -> "الإدارة" -> "المشغلون". إذا كنت لا تزال ترغب في إزالة المستخدم بالكامل حتى لا يتمكن من الوصول إلى شركتك، فيرجى كتابة بريد إلكتروني إلى app@yourvcca.org وشرح سبب الحاجة إلى ذلك.',
    },
    {
      id: 83,
      title: 'كيف يمكنني حذف مستخدم التبريد من القائمة؟',
      role: [ERoles.COOLING_USER],
      text: 'بالنقر على عنصر في لوحة المعلومات، يمكنك رؤية اسم ورقم هاتف المشغل الذي قام بعملية تسجيل الدخول لك. يمكنك نسخ الرقم إلى الحافظة والاتصال بالمشغل عبر الهاتف أو الرسائل القصيرة.',
    },
    {
      id: 84,
      title: 'أين يمكنني مراقبة ما إذا كان المشغلون قد استخدموا التطبيق مؤخرًا؟',
      role: [ERoles.COOLING_USER],
      text: 'للتحقق من آخر مرة قام فيها المشغلون وغيرهم من الموظفين المسجلين بتسجيل الدخول إلى التطبيق، يمكنك الانتقال إلى "القائمة" -> "الإدارة" -> "المشغل" / "الموظف المسجل". التاريخ والوقت الذي تراه بجوار الاسم هما تاريخ ووقت آخر تسجيل دخول.',
    },
    {
      id: 85,
      title: 'أين يمكنني مراقبة الإيرادات الناتجة عن كل غرفة وإحصائيات الاستخدام الأخرى؟',
      role: [ERoles.COOLING_USER],
      text: 'يمكنك الانتقال إلى "القائمة" -> "الإدارة" -> "تحليل الإيرادات"، وتحديد وحدات التبريد والفترة الزمنية المطلوبة، وستشاهد إجمالي الإيرادات المرتبطة بالخروج من هذه الغرف. يمكنك أيضًا التصفية حسب مستخدم التبريد وطريقة الدفع والوقت. لتصور إحصائيات موجزة لعمليات تسجيل الوصول لكل غرفة (مثل عدد المستخدمين وإجمالي عدد الصناديق وما إلى ذلك)، يمكنك الانتقال إلى "القائمة" -> "الإدارة" -> "تحليل الاستخدام". يمكنك أيضًا التصفية هنا حسب التاريخ ووحدة التبريد. في كلتا الصفحتين، يمكن تنزيل المعلومات كملفات Excel. في علامة التبويب "التحليل"، يمكنك العثور على لوحة معلومات تحتوي على معلومات حول المستخدمين والإيرادات والاستخدام والتأثير. أخيرًا، لمراقبة العدد الإجمالي للصناديق والوزن ودرجات الحرارة المثلى للمحاصيل الموجودة حاليًا في الغرفة، يمكنك الانتقال إلى "المزيد" -> "وحدات التبريد" -> "معلومات الصناديق".',
    },
    {
      id: 86,
      title: 'كيف يمكنني معرفة من هو الشخص المسؤول عن وحدة التبريد التي يتم تخزين منتجاتي فيها؟',
      role: [ERoles.OPERATOR],
      text: 'يسعد فريق دعم التطبيق الاستماع إلى تجربتك في استخدام هذا التطبيق ويرحب بملاحظاتك، يرجى إرسال بريد إلكتروني إلى app@yourvcca.org أو تقديم ملاحظاتك عبر النموذج: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 87,
      title: 'لقد تلقيت إشعارًا. ماذا يجب أن أفعل؟',
      role: [ERoles.COOLING_USER],
      text: 'يسعد فريق دعم التطبيق الاستماع إلى تجربتك في استخدام هذا التطبيق ويرحب بملاحظاتك، يرجى إرسال بريد إلكتروني إلى app@yourvcca.org.',
    },
    {
      id: 88,
      title: 'ماذا يظهر على خريطة وحدات التبريد؟',
      role: [ERoles.COOLING_USER],
      text: 'على الخريطة، يمكنك تصور موقعك (سيتم طلب الإذن لك لكي تتمكن Coldtivate من الوصول إلى موقعك)، وموقع وحدات التبريد من حولك، وبعض المعلومات حول الوحدات (سلعة واحدة أو متعددة، والشركة، والتسعير). من خلال الذهاب إلى غرفة التبريد، يمكنك الحصول على مزيد من المعلومات من مشغل غرفة التبريد حول تشغيل الوحدة وفرصة التخزين.',
    },
    {
      id: 89,
      title: 'كيف يمكنني تغيير لغة التطبيق؟',
      role: [ERoles.AUTH],
      text: 'لتغيير لغة التطبيق، يمكنك النقر على القائمة المنسدلة التي تراها في أسفل الصفحة الرئيسية، أو بمجرد تسجيل الدخول إلى ملفك الشخصي، انتقل إلى "القائمة" -> "تفاصيل الحساب" -> "تفضيلات التوطين".',
    },
    {
      id: 90,
      title:
        'يدعم Coldtivate (Ecozen، UbiBot، Figorr، Victron Energy) نوع مستشعر درجة الحرارة الخاص بي. كيف يمكنني إعداد أجهزة الاستشعار؟',
      role: [ERoles.EMPLOYEE],
      text: 'لتوصيل جهاز استشعار بوحدة تبريد، يمكنك الانتقال إلى "القائمة" -> "الإدارة" -> "وحدات التبريد"، ثم تحديد الوحدة التي يجب إعداد جهاز الاستشعار لها، ثم تبديل "جهاز الاستشعار متاح". يمكنك اتباع التعليمات لكل نوع جهاز استشعار مدعوم والمصادقة. تذكر النقر على "حفظ" في أسفل الصفحة لحفظ التغييرات. يجب أن ترى قراءات درجة الحرارة من أجهزة الاستشعار الخاصة بك في غضون 6 ساعات القادمة ضمن "المزيد" -> "وحدات التبريد" -> "ظروف الغرفة".',
    },
    {
      id: 91,
      title: 'ما هو الفرق بين عرض "الشركة" و"المجمع" و"المقارنة" في علامة التبويب "التحليلات"؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'توفر علامة التبويب "التحليلات" في شريط التنقل إحصائيات موجزة لجميع غرف التبريد الخاصة بالشركة. في عرض "الشركة"، سترى بيانات حول المستخدمين والاستخدام والتأثير لجميع وحدات التبريد منذ أن بدأت في استخدام Coldtivate. بالنقر فوق "مجمع"، يُطلب منك تكوين وحدات التبريد والفترة الزمنية التي تهمك. يتم تجميع البيانات المعروضة للمستخدمين والاستخدام والتأثير عبر وحدات التبريد المحددة في الفترة الزمنية المختارة. إذا كنت ترغب في المقارنة بين الوحدات، فيمكنك استخدام علامة التبويب "مقارنة". هنا، يتم عرض البيانات في جداول، حيث يتم عرض البيانات من كل وحدة تبريد في الفترة الزمنية المختارة. يمكنك فرز البيانات وتغيير وحدات التبريد والفترة الزمنية في أي وقت.',
    },
    {
      id: 92,
      title: 'كيف يتم حساب البيانات المعروضة في علامة التبويب "التحليلات"؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'الهدف من علامة التبويب "التحليلات" هو تقديم رؤية شاملة لما يحدث في غرف التبريد. يتم حساب بيانات المستخدم والاستخدام من معلومات تسجيل الدخول والخروج المسجلة في Coldtivate. وبالتالي يمكنك فهم عدد المستخدمين والعمليات التي تم إجراؤها، وما هي الإيرادات أو متوسط الإشغال لكل غرفة تبريد. من ناحية أخرى، تستند بيانات قسم التأثير إلى الاستطلاعات التي يُطلب من مستخدمي التبريد ملؤها عند تسجيلهم (أي قبل أن يبدأوا في استخدام التخزين البارد) وبشكل منتظم أثناء تسجيلهم للمنتجات من غرفة التبريد. هذه البيانات ضرورية لتقدير تطور خسائر ما بعد الحصاد وإيرادات المستخدمين أثناء استخدامهم للتبريد. أخيرًا، يقارن تقدير ثاني أكسيد الكربون الانبعاثات المرتبطة بتبريد المحاصيل المخزنة في غرفة التبريد بالانبعاثات المتوقعة التي كان من الممكن أن يسببها نفس المحصول عند تخزينه بدون تبريد.',
    },
    {
      id: 93,
      title: 'كيف يتم حساب البيانات المعروضة في علامة التبويب "التحليلات"؟',
      role: [ERoles.COOLING_USER],
      text: 'الهدف من علامة التبويب "التحليلات" هو تزويدك برؤية شاملة لتأثير التبريد على محاصيلك. يتم حساب البيانات المعروضة تحت "الصناديق" من معلومات الدخول والخروج المسجلة في Coldtivate. وبالتالي يمكنك معرفة كمية المحصول المخزن ومتوسط وقت التخزين. تعتمد بيانات قسم "التأثير" على الاستطلاعات التي يُطلب منك تعبئتها عند التسجيل (أي قبل البدء في استخدام التخزين البارد) وبشكل منتظم عند إخراج المنتجات من الغرفة الباردة. هذه البيانات ضرورية لتقدير تطور خسائر ما بعد الحصاد والإيرادات عند استخدام التبريد. يتم عرض تذكير لملء الاستطلاعات في أعلى الصفحة، ونحن نشجعك على تعبئتها كلما أمكن ذلك. في كلا القسمين، يمكنك استخدام زر "تكوين" في أعلى اليمين لتحديد غرف تبريد معينة أو فترة زمنية. إذا لم يتم تحديد أي شيء، فسترى جميع البيانات المتاحة منذ أن بدأت في استخدام Coldtivate.',
    },
    {
      id: 94,
      title: 'لقد قمت بتسجيل الدخول ولكنني لا أستطيع رؤية وظائف السوق. لماذا؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'إذا كان السوق مدعومًا في بلدك، فسترى أيقونة "السوق" في شريط التنقل السفلي. إذا لم تتمكن من رؤيتها، فهذا يعني أن هذه الوظيفة غير مدعومة في بلدك. في الوقت الحالي، السوق متاح فقط للمستخدمين المقيمين في نيجيريا. إذا كنت موظفًا مسجلاً ومهتمًا بتجربة السوق في بلدك، فيرجى الاتصال بنا على app@yourvcca.org.',
    },
    {
      id: 95,
      title: 'ما هو دور شركة التبريد في السوق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'يمكن لشركة التبريد وموظفيها تحديد مستوى مشاركتهم في السوق. نظرًا لأن الوظيفة تعتمد على تسجيل الصناديق في تطبيق Coldtivate، فلا يمكن للسوق أن يعمل إلا إذا سجل مشغل غرفة التبريد بانتظام عمليات تسجيل الدخول والخروج في التطبيق. بالنسبة للمنتجات التي يتم شراؤها عبر السوق، تتلقى شركة التبريد رسوم التبريد كجزء من المعاملة الرقمية. وبالتالي، من الأهمية بمكان أن يحدد الموظف المسجل تفاصيل حساب الشركة المصرفي: للقيام بذلك، يجب عليك الانتقال إلى "القائمة" -> "الإدارة" -> "إعدادات البائع (الشركة)" -> "خيارات الدفع". بالإضافة إلى ذلك، يمكن لشركات التبريد أن تقرر شراء المنتجات من المزارعين (تلعب دور المشتري) ثم إعادة بيع تلك المحاصيل في السوق (تلعب دور البائع). يمكن إجراء كلتا المعاملتين عبر سوق Coldtivate. لاحظ أن كل من المشغلين والموظفين المسجلين لديهم خيار الشراء لأنفسهم (كأفراد) أو نيابة عن الشركة التي يمثلونها.',
    },
    {
      id: 96,
      title: 'ما هو دور مشغل غرفة التبريد في السوق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'مشغلو الغرف الباردة في السوق لديهم ثلاثة أدوار رئيسية. 1) يساعدون مستخدمي التبريد الذين ليس لديهم هاتف ذكي في إعداد حسابهم المصرفي (حتى يتمكنوا من تلقي المدفوعات الرقمية)، وإدراج صناديقهم "للبيع" وسعرها. 2) هم مسؤولون عن الحفاظ على المنتجات في الغرفة الباردة منظمة وفقًا لمبدأ أن جميع المنتجات الموجودة في الصندوق تنتمي إلى مستخدم واحد: عندما يتم شراء بعض المنتجات في الصندوق (وبالتالي تنتمي إلى مالك مختلف)، يتلقى المشغل إشعارًا بنقل المنتجات المشتراة إلى صندوق منفصل. إذا تم شراء الصندوق بالكامل، فلا يلزم اتخاذ أي إجراء. 3) مشغلو الغرف الباردة مسؤولون عن جميع عمليات الدفع، بما في ذلك تلك الناتجة عن السوق: عندما يصل المشتري (أو مندوب التوصيل) إلى الغرفة الباردة لالتقاط المنتجات المشتراة، يجب على المشغل دفع ثمن هذا الصندوق من Coldtivate.',
    },
    {
      id: 97,
      title: 'كيف يتم تحصيل رسوم التبريد في السوق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'عند شراء الصناديق في السوق، يتم خصم رسوم التبريد حتى ذلك اليوم من السعر الذي يدفعه المشتري وتحويلها إلى شركة التبريد. وبهذه الطريقة، لا يتعين على البائع تسوية رسوم التبريد، حيث يتم ذلك بالفعل في المعاملة الرقمية. لهذا السبب، من الأهمية بمكان أن يكون لدى كل من البائع وشركات التبريد حساب مصرفي تم إنشاؤه في Coldtivate. على سبيل المثال، إذا تم شراء صندوق مقابل 20 دولارًا أمريكيًا، وكان البائع مدينًا برسوم تبريد قدرها 3 دولارات أمريكية، من أصل 20 دولارًا أمريكيًا يدفعها المشتري، سيتم تحويل 17 دولارًا أمريكيًا إلى الحساب المصرفي للبائع، وسيتم تحويل 3 دولارات أمريكية إلى الحساب المصرفي لشركة التبريد. إذا جاء المشتري لاستلام المنتج في نفس يوم الشراء، فلن تكون هناك رسوم تبريد أخرى مستحقة (لأن الرسوم اليومية مدفوعة بالفعل من قبل البائع). ومع ذلك، إذا قرر المشتري الاحتفاظ بالمنتج في المخزن، فسيتم تطبيق رسوم التبريد القياسية، وسيتم حساب السعر بناءً على عدد الأيام التي يتم فيها الاحتفاظ بالمنتج في الغرفة الباردة حتى يلتقطه المشتري. يقع على عاتق مشغل غرفة التبريد مسؤولية تحصيل رسوم التبريد هذه عند الخروج. يرجى ملاحظة أنه في حالة التسليم، ينطبق نفس المنطق.',
    },
    {
      id: 98,
      title: 'كيف يمكنني البدء ببيع المنتجات في السوق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'لكي تكون صناديقك متاحة للبيع، عليك القيام بخطوتين. 1) قم بإعداد حساب مصرفي، حيث سيتم إيداع الإيرادات. إذا كان لديك هاتف ذكي، فيمكنك القيام بذلك بالانتقال إلى "القائمة" -> "تفاصيل الحساب" -> "خيارات الدفع". إذا لم يكن لديك هاتف ذكي، فيمكن للمشغل إعداد الحسابات المصرفية من واجهته ("الإدارة" -> "تبريد المستخدمين" -> "تفاصيل الدفع". يرجى ملاحظة أنه نظرًا لأن جميع المدفوعات تتم رقميًا في السوق، فيجب عليك تقديم حساب مصرفي صالح قبل إدراج أي شيء "للبيع". 2) إذا كان لديك هاتف ذكي، لأي مجموعة صناديق مسجلة، يمكنك النقر فوق علامة ">" على الجانب الأيمن من كل عنصر في لوحة المعلومات، والانتقال إلى "وزن الصندوق وإدراج السوق"، وتعيين الصناديق التي ترغب في تعيينها "للبيع" والسعر لكل كيلوجرام. سيتمكن المستهلكون في السوق من رؤية هذه الصناديق والشراء بالكمية المشار إليها. ستتلقى إشعارًا في أي وقت يتم فيه إتمام عملية شراء. إذا لم يكن لديك هاتف ذكي، يمكن لمشغل غرفة التبريد تعيين الصناديق "للبيع" عند إجراء عملية تسجيل الوصول، أو بعد ذلك، باتباع نفس الخطوات. ستتلقى رسالة نصية قصيرة إذا قام المشغل بتحديث الصناديق المدرجة لديك أو السعر بعد تسجيل الوصول.',
    },
    {
      id: 99,
      title: 'هل يمكن للمشترين رؤية تفاصيل الاتصال الخاصة بي؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'يمكنك أن تقرر بنفسك ما إذا كان العملاء المهتمون بشراء منتجاتك يجب أن يتمكنوا من رؤية تفاصيل الاتصال الخاصة بك. يمكن أن يكون هذا مفيدًا في حالة التفاوض على الأسعار أو الطلبات المتكررة للمنتجات التي لم يتم تخزينها بعد في الغرفة الباردة (وبالتالي لا يمكن للمشتري رؤيتها). يمكنك تحديث إعداداتك في أي وقت ضمن "القائمة" -> "تفاصيل الحساب" -> "مشاركة جهات الاتصال".',
    },
    {
      id: 100,
      title: 'أرغب في تقديم خصم للمشتري، كيف يمكنني القيام بذلك؟',
      role: [ERoles.EMPLOYEE],
      text: 'تحت "القائمة" -> "تفاصيل الحساب" -> "كوبونات الخصم"، يمكنك إنشاء كوبونات تحتوي على رمز ونسبة خصم. هذه هي الكوبونات الصالحة للمنتجات التي تبيعها (بصفتك فردًا). لتعيين كوبونات صالحة للمنتجات المملوكة للشركة، يمكنك الانتقال إلى "القائمة" -> "الإدارة" -> "كوبونات الخصم" ضمن "إعدادات البائع (الشركة)". يمكنك مشاركة رمز الكوبون مع العميل، ويمكنه استرداد الرمز في شاشة الدفع. تظل أكواد الكوبون صالحة حتى تقوم بإلغائها. إذا كنت ترغب في تقديم خصم لجميع المشترين المحتملين، فيمكنك خفض سعر البيع المرئي في السوق.',
    },
    {
      id: 101,
      title: 'أرغب في تقديم خصم للمشتري، كيف يمكنني القيام بذلك؟',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'تحت "القائمة" -> "تفاصيل الحساب" -> "كوبونات الخصم"، يمكنك إنشاء كوبونات تحتوي على رمز ونسبة خصم. يمكنك مشاركة رمز الكوبون مع العميل، ويمكنه استرداد الرمز في شاشة الدفع. تظل رموز الكوبون صالحة حتى تقوم بإلغائها. إذا كنت ترغب في تقديم خصم لجميع المشترين المحتملين، فيمكنك خفض سعر البيع المرئي في السوق.',
    },
    {
      id: 102,
      title: 'كيف يمكن لمشغلي غرف التبريد مساعدتي في تسويق محاصيلي؟',
      role: [ERoles.COOLING_USER],
      text: 'مشغلو غرف التبريد هم نقطة الاتصال الخاصة بك لأي شيء يتعلق بتخزين المنتجات في غرف التبريد، ويمكنهم أيضًا مساعدتك في تسويق محصولك حتى إذا لم يكن لديك وصول إلى هاتف ذكي. من خلال واجهتهم، يمكنهم إعداد تفاصيل حسابك المصرفي، حيث ستتلقى عائدات من بيع المنتجات. عند تسجيل الوصول، يمكنهم مساعدتك في إدراج الصناديق "للبيع"، مما يجعلها مرئية في السوق، وتحديد سعر البيع (لكل كيلوجرام) لكل منتج. إذا غيرت رأيك، فيمكنك دائمًا طلب إضافة أو إزالة الصناديق من السوق عن طريق إدراجها أو إلغاء إدراجها على أنها "للبيع". في بعض غرف التبريد، يكون المشغلون أو المتعاونون معهم مسؤولين أيضًا عن شراء المنتجات مباشرة من المزارعين وبيعها لتجار التجزئة. سواء كنت مزارعًا أو تاجرًا مهتمًا بهذا الخيار، أو بائع تجزئة مهتمًا بالشراء بكميات كبيرة من غرفة التبريد، يرجى الاتصال بشركة التبريد لاستكشاف هذه الفرصة.',
    },
    {
      id: 103,
      title: 'ما هو خيار "الشراء نيابة عن الشركة" الذي أراه في السوق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'يمكن للمشغلين والموظفين المسجلين بيع وشراء المنتجات في السوق إما لأنفسهم أو كأفراد أو نيابة عن الشركة التي يمثلونها. يتيح هذا الخيار تنفيذ جميع المعاملات من وإلى الحساب المصرفي للشركة، وليس عبر الحسابات المصرفية الفردية. عندما يشتري المشغل أو الموظف المسجل منتجات "نيابة عن شركة"، تدفع الشركة المبلغ المستحق للبائع، وتصبح مالكة الصناديق. إذا تم إدراج هذه الصناديق للبيع في السوق، فسيتم عرضها على أنها مملوكة لشركة التبريد، ويتم إرسال رسوم البيع إلى الحساب المصرفي للشركة. عندما يشتري المشغل أو الموظف المسجل منتجات لأنفسهم، فسوف يدفع المبلغ المستحق للبائع من تفاصيل حسابه المصرفي الشخصي المقدم ويصبح مالكًا للصناديق شخصيًا. إذا تم تخزينها في وحدة التبريد، فسيتم إدراجها باسم المشغل أو الموظفين المسجلين وإذا تم إدراجها للبيع في السوق، فسيتم عرضها على أنها مملوكة للمشغل أو الموظف المسجل أيضًا.',
    },
    {
      id: 104,
      title: 'ما هي الرسوم التي تظهر في السوق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'يتم تحديد سعر بيع كل عنصر معروض في السوق مباشرة من قبل البائع ويعتمد على عدد الكيلوجرامات المشتراة. بالإضافة إلى هذا المبلغ، يتضمن السوق رسمين: رسوم السوق هي رسوم معاملة بنسبة 3.5% يتم تحصيلها من قبل فريق Coldtivate لاستضافة التطبيق وصيانته. رسوم الدفع هي الرسوم التي يفرضها نظام الدفع الرقمي (PayStack في نيجيريا) لمعالجة المعاملة.',
    },
    {
      id: 105,
      title:
        'أنا مشتري مهتم بشراء المنتجات من الغرف الباردة، ولكنني لا أرى أي شيء في السوق. لماذا؟',
      role: [ERoles.COOLING_USER],
      text: 'إذا انتقلت إلى علامة التبويب "السوق" ولكنك لم تتمكن من رؤية أي منتج، فقد يكون ذلك بسبب عوامل التصفية التي قمت بتطبيقها على البحث (مثل الموقع أو نطاق السعر أو المحصول الذي يهمك)، أو قد يكون ذلك بسبب عدم توفر أي منتج للبيع في منطقتك. في حالة معرفتك بغرفة تبريد موجودة في مكان قريب، نوصيك بسؤال مشغل الغرفة المبردة عما إذا كان أي مستخدم تبريد مهتمًا ببيع المنتجات عبر وظيفة السوق وطلب إدراج هذه العناصر في التطبيق.',
    },
    {
      id: 106,
      title: 'هل تقدمون خدمات التوصيل؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'لا يقدم السوق خدمات التوصيل في هذه المرحلة، لكنه يسهل الاتصال بحلول لوجستية يمكنها توصيل المنتجات إلى المشترين. بصفتك موظفًا مسجلاً، لديك خيار إضافة جهات اتصال التوصيل ضمن "القائمة" -> "الإدارة" -> "إعدادات البائع (الشركة)" -> "جهات اتصال التوصيل". يتم عرضها لجميع المشترين الذين يشترون المنتجات من غرف التبريد الخاصة بك عند الدفع. إذا كنت مشتريًا، فننصحك بالاتصال بهم لتنظيم التوصيل. يرجى ملاحظة أنه إذا تم استلام المنتج في نفس يوم الشراء، فلن يتم تطبيق رسوم التبريد، ولكن إذا قمت بتخزين المحاصيل، فيجب دفع رسوم تبريد يومية. تأكد من مناقشة هذا الأمر مع جهة اتصال التوصيل التي تتفاوض معها.',
    },
    {
      id: 107,
      title: 'لقد تلقيت إشعارًا في التطبيق يفيد بأن "المنتج يحتاج إلى إعادة توزيعه". ما هذا؟',
      role: [ERoles.OPERATOR],
      text: 'نظرًا لإجراءات تسجيل الدخول في الغرفة الباردة، فإن محتويات الصندوق الواحد تنتمي إلى مزارع أو تاجر واحد. وكما هو الحال في السوق، يمكن للمشتري شراء بعض الكيلوجرامات من صندوق مملوك لبائع، فيجب نقل الكمية المشتراة إلى صندوق منفصل. يخبرك هذا الإشعار بأن عملية الشراء قد اكتملت، ومن خلال النقر عليه، يمكنك تصور الصندوق الذي يجب أخذ المنتجات منه. يعد الحفاظ على تنظيم الصناديق أمرًا حيويًا لضمان عدم تسجيل خروج المحاصيل عن طريق الخطأ، وتحصيل رسوم التبريد بشكل صحيح. نوصي باستخدام وظيفة "معرف الصندوق" عند تسجيل الدخول لوضع علامة على الصناديق في Coldtivate بصناديق مادية وتتبع الصناديق التي تتطلب انتباهك بسهولة أكبر بناءً على الإشعار.',
    },
    {
      id: 108,
      title: 'ما هي كمية المنتجات التي يمكنني شراؤها في السوق؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'لكل منتج معروض في السوق، يمكنك شراء الصندوق بالكامل أو أي عدد من الكيلوجرامات الموجودة في الصندوق. الحد الأدنى للكمية التي يمكن شراؤها هو 1 كيلوجرام.',
    },
    {
      id: 109,
      title: 'لقد اشتريت بعض المنتجات وأرغب في إعادة بيعها. كيف يمكنني القيام بذلك؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'عندما تشتري بعض المنتجات من السوق، تصبح مالكًا للكمية المشتراة. في "لوحة التحكم"، سترى إدخالًا جديدًا يشير إلى ما قمت بتخزينه في الغرفة الباردة. إذا كنت تريد بيعه للبيع، فيمكنك النقر فوق علامة ">" على الجانب الأيمن من عنصر لوحة التحكم، والانتقال إلى "وزن الصندوق وقائمة السوق"، وتعيين الصناديق التي ترغب في تعيينها "للبيع" والسعر لكل كيلوجرام. سيتمكن المستهلكون في السوق من رؤية هذه الصناديق والشراء بالكمية المشار إليها. يرجى ملاحظة أنه لتعيين الصناديق للبيع، يجب إعداد حسابك المصرفي. اتبع التعليمات لإضافة تفاصيل حسابك المصرفي، أو انتقل إلى "القائمة" -> "تفاصيل الحساب" -> "خيارات الدفع".',
    },
    {
      id: 110,
      title: 'لقد خرجت من عملية الدفع في السوق. كيف يمكنني إتمام عملية الشراء؟',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'عند بدء عملية شراء بالنقر فوق "الدفع" في عربة التسوق، سيتم إعادة توجيهك إلى موفر الدفع (PayStack في نيجيريا). إذا تخليت عن العملية لأي سبب من الأسباب، فسيتم وضع علامة على طلبك على أنه "قيد الانتظار". يمكنك العثور على طلبك ضمن علامة التبويب "طلباتي" في صفحة السوق. يمكنك النقر فوق العنصر لإتمام الدفع. لديك 30 دقيقة لإكمال الدفع، وبعد ذلك يعتبر الطلب "ملغى" ويتم تحرير المبلغ للمشترين الآخرين لشرائه.',
    },
    {
      id: 111,
      title: 'لا أستطيع تسجيل بعض المحاصيل. لماذا يحدث هذا؟',
      role: [ERoles.OPERATOR],
      text: 'إذا كنت تحاول دفع ثمن بعض الصناديق المدرجة في السوق، ولم تتمكن من دفع ثمنها، فمن المحتمل أن يكون ذلك بسبب كونها جزءًا من أمر دفع معلق. وهذا يعني أن المشتري قد أضافها إلى عربة التسوق وبدأ عملية الشراء. ويتاح للمشتري 30 دقيقة لإتمام الدفع، وبعدها سيتم إلغاء الطلب. وبعد مرور 30 دقيقة، ستتمكن من دفع ثمن الصندوق.',
    },
  ],
  [APP_LOCALES.PORTUGUESE]: [
    {
      id: 1,
      title: 'Porque devo usar a aplicação?',
      role: [ERoles.AUTH],
      text: 'A aplicação foi desenvolvida para apoiar os operadores de unidades de refrigeração nas suas operações diárias, agricultores que utilizam estas unidades e consumidores interessados em comprar produtos armazenados nelas. A aplicação inclui um inventário digital, monitorização remota e um modelo de tempo de prateleira para cada caixa armazenada, bem como um marketplace que liga compradores e vendedores. Também inclui o Centro de Conhecimento, que fornece recomendações específicas para cada produto sobre a temperatura ideal de conservação e o tempo de armazenamento.',
    },
    {
      id: 2,
      title: 'Quem pode usar a aplicação?',
      role: [ERoles.AUTH],
      text: 'A aplicação pode ser usada por empresas de unidades de refrigeração, agricultores e comerciantes interessados em utilizar estas unidades, bem como por potenciais compradores em todo o mundo. Ao longo da aplicação, existem três perfis de utilizador: (i) Funcionário registado: membro da equipa de gestão do fornecedor da unidade de refrigeração. É responsável por configurar e gerir a unidade, supervisionando as atividades dos operadores no terreno, sem estar fisicamente presente no local. Por exemplo: CEO da empresa, CFO, etc. (ii) Operador: funcionário presente fisicamente na unidade de refrigeração e responsável pelas operações de entrada e saída de produtos. Esta pessoa está em contacto direto com os utilizadores da unidade e reporta a um funcionário registado da empresa. (iii) Utilizadores da unidade de refrigeração ou consumidores: os utilizadores da unidade (podem ser agricultores, comerciantes, retalhistas, etc.) ou consumidores (individuais, retalhistas, grossistas). Este perfil destina-se a qualquer pessoa que se queira registar na aplicação sem estar associada a uma empresa de refrigeração. Utilizadores com um smartphone podem iniciar sessão na aplicação como utilizadores. Caso não tenham smartphone, os operadores realizam as operações em nome destes utilizadores.',
    },
    {
      id: 3,
      title: 'Como posso registar-me como Funcionário Registado?',
      role: [ERoles.AUTH],
      text: 'Se for o primeiro funcionário da sua empresa a registar-se, pode clicar no botão "Registar empresa" e seguir os passos para registar a sua empresa e os seus dados pessoais (incluindo informações pessoais e palavra-passe). Depois de completar o registo com sucesso, pode iniciar sessão na aplicação como Funcionário Registado e enviar um convite por SMS a outros Funcionários Registados para se juntarem à sua empresa. Uma vez criada a empresa, todos os Funcionários Registados devem ser convidados por SMS. Caso contrário, não ficarão associados à mesma empresa.',
    },
    {
      id: 4,
      title: 'Como posso registar-me como Operador?',
      role: [ERoles.AUTH],
      text: 'Para se registar, precisa de ser convidado por um Funcionário Registado. Receberá um SMS com um link de ativação, a partir do qual poderá definir os seus dados pessoais e a sua palavra-passe.',
    },
    {
      id: 5,
      title: 'Como posso registar-me como Utilizador de unidade de refrigeração ou Consumidor?',
      role: [ERoles.AUTH],
      text: 'Utilizadores de unidades de refrigeração com smartphone e Consumidores podem registar-se clicando em "Registar como utilizador de unidade de refrigeração ou consumidor" na página inicial e fornecendo os seus dados pessoais e palavra-passe. Utilizadores de unidades de refrigeração que não têm smartphone podem ser adicionados à aplicação pelos operadores. Esta operação é necessária para iniciar um check-in em nome desses utilizadores. Os utilizadores devem fornecer um número de telefone, que será usado pelo operador para contacto, se necessário. Neste caso, não é necessária uma palavra-passe.',
    },
    {
      id: 6,
      title: 'Não consigo concluir o registo como utilizador. O que devo fazer?',
      role: [ERoles.AUTH],
      text: 'Para concluir o registo, por favor certifique-se de que as seguintes condições estão preenchidas: (i) Está a introduzir um número de telefone com o indicativo correto do país (por exemplo, +91 para a Índia); (ii) O número de telefone fornecido não foi utilizado para registar outro utilizador; (iii) A palavra-passe introduzida cumpre todos os requisitos solicitados; (iv) As palavras-passe introduzidas são iguais — pode clicar no símbolo do olho para revelar as palavras-passe e verificar se são idênticas.',
    },
    {
      id: 7,
      title: 'Não tenho telemóvel, mas quero usar a aplicação. O que devo fazer?',
      role: [ERoles.AUTH],
      text: 'Se for um funcionário registado, operador ou consumidor, precisa de fornecer um número de telefone válido para se registar. É necessário ter um smartphone para utilizar corretamente a aplicação. Se for um utilizador de unidade de refrigeração e não tiver telemóvel, recomendamos também que forneça um número de telefone válido, para que o operador o possa contactar em caso de necessidade. Pode fornecer o número de um familiar ou amigo, caso não tenha um próprio. Se isso não for possível, o operador poderá ainda assim armazenar os produtos na unidade selecionando "Utilizador sem telemóvel" como utilizador de unidade de refrigeração no momento do check-in.',
    },
    {
      id: 8,
      title: 'Que dados são necessários para iniciar sessão como Funcionário Registado?',
      role: [ERoles.AUTH],
      text: 'Funcionários registados podem iniciar sessão com o e-mail ou número de telefone e a respetiva palavra-passe.',
    },
    {
      id: 9,
      title: 'Que dados são necessários para iniciar sessão como Operador?',
      role: [ERoles.AUTH],
      text: 'Os operadores podem iniciar sessão com o seu número de telefone e palavra-passe.',
    },
    {
      id: 10,
      title:
        'Que dados são necessários para iniciar sessão como Utilizador de unidade de refrigeração ou Consumidor?',
      role: [ERoles.AUTH],
      text: 'Utilizadores de unidades de refrigeração com smartphone podem iniciar sessão com o seu número de telefone e palavra-passe. Utilizadores que não têm smartphone não precisam de iniciar sessão: o operador pode realizar as operações em seu nome. Consumidores interessados em aceder ao marketplace podem iniciar sessão com o seu número de telefone e palavra-passe.',
    },
    {
      id: 11,
      title: 'Perdi a minha palavra-passe. O que devo fazer?',
      role: [ERoles.AUTH],
      text: 'Se perdeu a sua palavra-passe, pode recuperar a sua conta clicando em "Esqueci-me da palavra-passe" na página de início de sessão, introduzir o seu número de telefone, e receberá um SMS com um link para definir uma nova palavra-passe.',
    },
    {
      id: 12,
      title: 'Não recebi nenhum convite por SMS. O que devo fazer?',
      role: [ERoles.AUTH],
      text: 'Funcionários registados e operadores podem ser convidados a juntar-se à aplicação por um funcionário registado da mesma empresa. Se já foi convidado, mas não recebeu nenhum SMS, por favor contacte diretamente o funcionário registado. As causas mais comuns são: (i) Número de telefone incorreto (note que é necessário incluir o indicativo do país); (ii) Já aceitou um convite associado a esse número. Um número de telefone só pode ser utilizado para um único utilizador. Utilizadores de unidades de refrigeração com smartphone e consumidores podem juntar-se à aplicação sem convite. Utilizadores sem smartphone podem ser registados na aplicação pelos operadores.',
    },
    {
      id: 13,
      title: 'Como posso editar o meu perfil?',
      role: [ERoles.EMPLOYEE],
      text: 'Ao clicar em "Menu" -> "Detalhes da conta", pode ver o seu perfil e editar os seus "Dados pessoais" (nome próprio, apelido, número de telefone, e-mail e género). Em "Preferências de localização", pode alterar o idioma da aplicação. Em "Definições de vendedor", pode configurar os dados da sua conta bancária, criar cupões e tornar os seus dados de contacto públicos para os utilizadores do marketplace. Para alterar os dados da sua empresa, localizações e unidades de refrigeração, vá a "Menu" -> "Gestão" e selecione o item que deseja alterar.',
    },
    {
      id: 14,
      title: 'Como posso editar o meu perfil?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ao clicar em "Menu" -> "Detalhes da conta", pode ver o seu perfil e editar os seus "Dados pessoais" (nome próprio, apelido, número de telefone e género). Em "Preferências de localização", pode alterar o idioma da aplicação. Em "Definições de vendedor", pode configurar os dados da sua conta bancária, criar cupões e tornar os seus dados de contacto públicos para os utilizadores do marketplace.',
    },
    {
      id: 15,
      title: 'Como posso atribuir operadores a unidades de refrigeração?',
      role: [ERoles.EMPLOYEE],
      text: 'Existem três formas de associar um operador a uma unidade de refrigeração. Pode atribuir uma ou mais unidades de refrigeração a um operador no momento em que lhe envia o convite. Em alternativa, pode modificar as unidades de refrigeração associadas a um operador navegando até "Gestão" -> "Operadores", selecionando o operador e depois clicando em "Selecionar unidade de refrigeração". Por fim, ao criar uma unidade de refrigeração em "Gestão" -> "Unidades de refrigeração", também pode atribuir operadores a essa unidade. Não se esqueça de guardar as alterações antes de sair!',
    },
    {
      id: 16,
      title:
        'Um utilizador chega à unidade de refrigeração mas não tem telemóvel. Posso registá-lo na mesma?',
      role: [ERoles.OPERATOR],
      text: 'Sim, pode iniciar um check-in para essa pessoa utilizando o utilizador de unidade de refrigeração chamado "Utilizador sem telemóvel". Como várias pessoas podem usar esta conta para efetuar check-in, certifique-se de adicionar uma etiqueta com o nome nas caixas armazenadas, para identificar o proprietário de cada uma.',
    },
    {
      id: 17,
      title: 'Estou numa zona com fraca ligação à internet: ainda posso usar a aplicação?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'De momento, apenas a secção Centro de Conhecimento está disponível offline. As informações no Dashboard e no Marketplace podem continuar visíveis, mas poderão estar desatualizadas em caso de falta de ligação. Recomendamos que volte a verificar quando a ligação estiver estável.',
    },
    {
      id: 18,
      title: 'Como registo a minha empresa?',
      role: [ERoles.EMPLOYEE],
      text: 'Para registar a sua empresa, no ecrã de boas-vindas selecione "Registar empresa" e preencha as informações necessárias. Introduza uma palavra-passe, clique em "Registar" e está pronto a começar!',
    },
    {
      id: 19,
      title: 'Como posso registar uma nova localização para a minha empresa?',
      role: [ERoles.EMPLOYEE],
      text: 'Cada unidade de refrigeração precisa de ser criada numa localização (e podem ser criadas várias unidades de refrigeração para a mesma localização). Para adicionar uma nova localização à sua empresa, no menu selecione "Gestão" > "Localizações". Clique no botão "+" no canto superior direito para adicionar uma nova localização. Preencha as informações necessárias e clique em "Adicionar" para confirmar.',
    },
    {
      id: 20,
      title: 'Como posso registar uma nova unidade de refrigeração para a minha empresa?',
      role: [ERoles.EMPLOYEE],
      text: 'Para registar uma nova unidade de refrigeração para a sua empresa, precisa de ter pelo menos uma localização criada. Depois, no menu, selecione "Gestão" > "Unidades de refrigeração". Clique no botão "+" no canto superior direito para adicionar uma nova unidade. Preencha as informações necessárias e clique em "Adicionar" para confirmar.',
    },
    {
      id: 21,
      title:
        'Como posso convidar outros Funcionários Registados da minha empresa a registarem-se na aplicação?',
      role: [ERoles.EMPLOYEE],
      text: 'Para convidar outros Funcionários Registados da sua empresa, no menu selecione "Gestão" > "Funcionário Registado". Clique no botão "+" no canto superior direito para adicionar o número de telefone do funcionário que pretende convidar. Clique em "Convidar" para confirmar: o seu colega receberá um SMS com um link que o direciona diretamente para o ecrã de registo. Além disso, também receberá um e-mail com o link do convite. Por favor, reencaminhe esse e-mail para o operador, caso ele/ela não o tenha recebido por SMS.',
    },
    {
      id: 22,
      title: 'Como posso convidar os operadores da empresa a registarem-se na aplicação?',
      role: [ERoles.EMPLOYEE],
      text: 'Para enviar um convite a operadores das suas unidades de refrigeração, no menu selecione "Gestão" > "Operadores". Clique no botão "+" no canto superior direito para adicionar o número de telefone do operador que pretende convidar. Clique em "Convidar" para confirmar: o operador receberá uma mensagem com um link que o encaminha diretamente para o ecrã de registo. Além disso, também receberá um e-mail com o link do convite. Por favor, reencaminhe esse e-mail ao operador caso ele não o tenha recebido por SMS.',
    },
    {
      id: 23,
      title: 'Como monitorizar a temperatura de uma unidade de refrigeração?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Para monitorizar a temperatura de uma unidade de refrigeração específica, clique em "Mais" no canto inferior direito da barra de navegação, selecione "Unidades de refrigeração" e depois "Condições ambientais". No menu suspenso, selecione a unidade de refrigeração em questão. Este painel mostra um gráfico com a evolução da temperatura registada. Pode clicar num ponto do gráfico para ver o seu valor e o respetivo momento. Se a unidade estiver equipada com sensores conectados à aplicação, poderá consultar a temperatura real em tempo real. Caso contrário, o gráfico mostrará as temperaturas introduzidas manualmente pelo operador da unidade na aplicação. Para consultar a temperatura de outra unidade de refrigeração, basta selecioná-la no menu no topo da página.',
    },
    {
      id: 24,
      title: 'Como monitorizar a ocupação de uma unidade de refrigeração?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Para monitorizar a ocupação de uma unidade de refrigeração específica, clique em "Mais" no canto inferior direito da barra de navegação, selecione "Unidades de refrigeração", aceda a "Planeador" e escolha a unidade desejada no menu suspenso. Irá ver a ocupação atual (na parte superior) e a ocupação prevista para os próximos 7 dias (na parte inferior). As informações sobre a ocupação futura baseiam-se no número de dias de armazenamento indicado por cada utilizador durante o registo. Tenha em atenção que esta previsão é apenas uma estimativa e pode não ser exata.',
    },
    {
      id: 25,
      title: 'Como posso ver quais produtos estão armazenados numa unidade?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Clique no ícone "Dashboard" na parte inferior do ecrã e selecione a unidade de refrigeração pretendida no menu suspenso para ver a lista de todos os produtos atualmente armazenados nessa unidade.',
    },
    {
      id: 26,
      title: 'Como posso ver os check-ins e check-outs de uma unidade de refrigeração?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Para consultar o histórico de movimentos de uma unidade de refrigeração, clique em "Mais" no canto inferior direito da barra de navegação e selecione "Histórico". Os check-ins (ícones com uma caixa verde), as check-outs (ícones com uma caixa laranja) e as operações no marketplace (ícones com um cesto azul) são apresentados com os detalhes das transações. Se estiver à procura de uma transação específica, pode usar a função de pesquisa para a encontrar!',
    },
    {
      id: 28,
      title: 'Quais são as principais funções do operador na aplicação?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'O operador pode registar novos utilizadores de unidade de refrigeração, realizar check-ins, monitorizar os produtos armazenados e a ocupação das unidades, efetuar check-outs e verificar a temperatura da unidade de refrigeração. Também pode ajudar os utilizadores a vender caixas e definir um preço de venda.',
    },
    {
      id: 29,
      title: 'Como posso registar novos utilizadores de unidade de refrigeração?',
      role: [ERoles.OPERATOR],
      text: 'Para registar um novo utilizador de unidade de refrigeração, aceda ao menu "Gestão" > "Utilizadores de unidades de refrigeração". Clique em "Mais" no canto superior direito e escolha se pretende adicionar um utilizador que já se tenha registado com um código, ou introduzir manualmente os seus dados. Um utilizador de unidade de refrigeração com smartphone já está registado na aplicação Coldtivate e possui um código único, disponível em "Menu" -> "Detalhes da conta" -> "Informações pessoais" -> "Código de importação do utilizador". Se o utilizador não tiver smartphone ou ainda não estiver registado, pode adicioná-lo manualmente introduzindo o nome, sexo e número de telefone. Se não tiver um número pessoal, pode usar o número de um familiar ou amigo. Note que um número de telefone só pode ser utilizado uma vez. Clique em “Registar alterações” para confirmar. Para concluir o registo, deverá responder a um breve questionário com algumas perguntas ao utilizador. Pode também completá-lo mais tarde através de "Gestão" -> "Utilizadores de unidades de refrigeração" -> "Questionário ao utilizador".',
    },
    {
      id: 30,
      title:
        'O utilizador de unidade de refrigeração não tem tempo para responder ao questionário durante o registo. O que devo fazer?',
      role: [ERoles.OPERATOR],
      text: 'Pode saltar o questionário clicando em "Completar mais tarde". Nesse caso, ser-lhe-á pedido que complete o questionário na primeira vez que fizer o check-in desse utilizador. É recomendável dedicar algum tempo a responder ao questionário com o utilizador, pois isso permite oferecer uma experiência mais personalizada dentro da aplicação Coldtivate.',
    },
    {
      id: 31,
      title: 'Como posso iniciar um check-in?',
      role: [ERoles.OPERATOR],
      text: 'Para iniciar um check-in, aceda ao Dashboard, clique no botão "Gestor de Atividades" no canto inferior direito e depois clique no botão verde.',
    },
    {
      id: 32,
      title: 'Como posso iniciar um check-out?',
      role: [ERoles.OPERATOR],
      text: 'Existem duas formas de iniciar um check-out, ambas a partir do Dashboard. Clique no botão "Gestor de Atividades" no canto inferior direito e depois no botão vermelho. Em alternativa, pode selecionar diretamente o utilizador (e a unidade de refrigeração) para iniciar a saída e remover as caixas associadas. Também pode clicar em "Ver detalhes" de um artigo listado no Dashboard (certifique-se de que está na unidade correta) e depois em "Retirar". Neste último caso, apenas poderá remover as caixas associadas a esse artigo.',
    },
    {
      id: 33,
      title:
        'Tenho sensores de temperatura na unidade de refrigeração. Podem ser ligados ao Coldtivate?',
      role: [ERoles.EMPLOYEE],
      text: 'Para ligar um sensor a uma unidade de refrigeração, é necessário que o sensor tenha uma API configurada. A API deve utilizar um nome de utilizador e uma palavra-passe enviados através de um pedido POST com o Content-Type: application/json. A resposta deve incluir um accessToken, que será usado num segundo pedido POST. Este segundo pedido deve incluir no URL o identificador da unidade, o tipo de valor (temperatura, humidade) e o token no cabeçalho com a chave Authorization. A resposta deverá conter a última temperatura registada na unidade, no formato {date: dateTimeStamp, value: numérico}. A temperatura deve estar em graus Celsius. Atualmente, suportamos as APIs dos sensores Ecozen, UbiBot, Figorr e Victron Energy. Se tiver outro tipo de sensores que gostaria de integrar com o Coldtivate, por favor contacte-nos através do e-mail app@yourvcca.org.',
    },
    {
      id: 34,
      title: 'Como posso definir a temperatura da unidade de refrigeração?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Para definir a temperatura da unidade de refrigeração, siga o procedimento definido pela sua empresa. A aplicação pode ser usada para monitorizar, mas não para atualizar, a temperatura da unidade de refrigeração. No entanto, se a aplicação não estiver ligada a sensores, é importante atualizar manualmente a temperatura definida na app. Pode fazê-lo clicando em "Inserir temperatura" dentro do painel "Mais" -> "Unidades de refrigeração" > "Condições ambientais". Atualizar a temperatura neste local permite visualizar a evolução da temperatura na aplicação e obter previsões precisas sobre os dias restantes de conservação do produto armazenado. Se a aplicação estiver ligada a sensores, a opção de alterar a temperatura é desativada, pois a app extrai automaticamente esta informação diretamente dos sensores.',
    },
    {
      id: 35,
      title:
        'Como contactar um utilizador de unidade de refrigeração para o inquérito pós-armazenamento?',
      role: [ERoles.OPERATOR],
      text: 'Na aba "Mais" -> "Histórico" pode ver a lista dos check-outs mais recentes. Deve contactar cada utilizador de unidade de refrigeração que fez check-out para preencher o inquérito pós-armazenamento, acessível clicando nos três pontos junto ao check-out e selecionando "Preencher inquérito de mercado". Ao clicar em "Ver detalhes", pode verificar qual foi o produto armazenado e o número de telefone do utilizador, caso queira contactá-lo por chamada. Em alternativa, pode esperar até que o utilizador volte à unidade para armazenar outras culturas. Um ponto vermelho identifica os check-outs no Histórico para os quais o inquérito de mercado ainda não foi preenchido. Será lembrado sobre os check-outs que requerem a sua atenção no painel de notificações, podendo clicar na notificação para abrir o inquérito.',
    },
    {
      id: 36,
      title: 'O que é o Centro de Conhecimento?',
      role: [ERoles.AUTH],
      text: 'O Centro de Conhecimento é uma página acessível clicando no Menu no canto superior esquerdo. Contém informações úteis sobre as melhores práticas de armazenamento para diferentes produtos, incluindo temperatura ideal e tempo aproximado de conservação sob essa temperatura.',
    },
    {
      id: 37,
      title: 'Como posso ler as informações de um item no Dashboard?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Cada item no Dashboard mostra um conjunto de caixas do mesmo tipo de cultura que foram registadas no mesmo check-in. O número de dias no topo indica os dias restantes previstos até ao momento de recolha. Abaixo, vê o tipo de cultura e o ID do check-in. O número junto ao símbolo da caixa representa o número de caixas registadas. Ao lado, vê a taxa de refrigeração e o número de dias que as caixas já estiveram armazenadas. O número junto ao ícone do cartão no lado direito indica quantas caixas estão listadas como "à venda" no marketplace. No fundo de cada item, vê o nome do proprietário das caixas e os dados de contacto.',
    },
    {
      id: 38,
      title: 'O que é o tempo de recolha?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'O tempo de recolha é o número de dias sugerido para que o utilizador de unidade de refrigeração recolha o produto armazenado. Após esse período, o produto começa a perder o seu valor de mercado. Um tempo de recolha igual a zero indica que o utilizador deve vir recolher o artigo imediatamente e tem até 2 dias para o vender no marketplace. Esta informação está visível no Dashboard e na vista detalhada de cada item armazenado.',
    },
    {
      id: 39,
      title: 'Como é calculado o tempo de recolha? Quais são os fatores que o influenciam?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Legumes e frutas frescos são produtos perecíveis e a forma como perdem frescura após a colheita depende principalmente da temperatura. O tempo de recolha é calculado com base na temperatura da unidade de refrigeração correspondente e na qualidade inicial do produto no momento em que foi entregue. Os parâmetros usados nesse cálculo são específicos de cada cultura. Pode consultar o Centro de Conhecimento para perceber como a perecibilidade varia entre diferentes tipos de produtos.',
    },
    {
      id: 40,
      title: 'O tempo de recolha é 0 dias mas o produto ainda parece bom. Porquê?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'O tempo de recolha é um valor previsto. Por isso, é possível que um utilizador de unidade de refrigeração faça check-out e ainda consiga vender bem um produto armazenado com tempo de recolha igual a 0 dias. No entanto, esteja atento ao facto de que algumas perdas de qualidade não são visíveis a olho nu, e é uma boa prática seguir a indicação do tempo de recolha sempre que possível. A previsão é especialmente precisa se a aplicação estiver ligada a sensores de temperatura. Caso ainda não os tenha instalados, recomendamos que o faça nas suas unidades de refrigeração. Consulte as perguntas sobre sensores de temperatura para mais informações sobre a configuração.',
    },
    {
      id: 41,
      title: 'O tempo de recolha é superior a 0 dias mas o produto está quase estragado. Porquê?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'O tempo de recolha é um valor previsto. Assim, podem ocorrer casos raros em que o produto se estrague mesmo quando o tempo de recolha é superior a 0. Como a deterioração da qualidade de produtos frescos depende principalmente da temperatura, os dados de temperatura tornam a previsão mais precisa. Por exemplo, o problema pode surgir se não houver sensores ligados à aplicação e o operador tiver introduzido uma temperatura incorreta na unidade. Caso ainda não tenha sensores de temperatura, recomendamos que os instale nas suas unidades de refrigeração. Consulte as perguntas sobre sensores de temperatura para mais informações sobre a configuração.',
    },
    {
      id: 42,
      title:
        'A ocupação da unidade para um dos próximos dias aparece a vermelho (menos de 20%). O que significa? Devo preocupar-me?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'A ocupação aparece a vermelho quando mais de 80% da capacidade da unidade de refrigeração está a ser utilizada. A informação sobre a ocupação futura baseia-se no número de dias que cada utilizador declara como planeado no momento do check-in. Tenha em atenção que esta informação é apenas uma estimativa e pode não ser precisa. Assim, a ocupação a vermelho é apenas um sinal de que a unidade está a ficar cheia. Não é motivo de alarme, mas pode ser útil tomar medidas. Por exemplo, pode contactar os utilizadores cujos produtos armazenados têm menor tempo de recolha e aconselhá-los a fazer check-out em breve. Pode ver uma lista ordenada dos artigos mais urgentes para check-out no ‘Dashboard’, ao ordenar por tempo de recolha.',
    },
    {
      id: 43,
      title:
        'Um utilizador está a trazer um produto que não está na lista. Posso fazer check-in na mesma?',
      role: [ERoles.OPERATOR],
      text: 'Sim, neste caso pode iniciar um check-in selecionando "Outro" na lista de produtos. Em "Informações adicionais", também pode escrever o nome do produto, o que o ajudará a encontrá-lo novamente mais tarde.',
    },
    {
      id: 44,
      title: 'No Dashboard, cada item tem uma barra colorida. O que representa a cor da barra?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'A cor representa os dias restantes até ao tempo de recolha. Verá a barra a vermelho quando faltam menos de 2 dias, a amarelo quando faltam menos de 7 dias, e a verde quando há mais de 7 dias restantes. Estes valores são específicos para cada artigo armazenado e são recalculados várias vezes por dia com base na temperatura da unidade de refrigeração. Quando não há modelo disponível para o cálculo, a barra aparece a cinzento.',
    },
    {
      id: 45,
      title: 'Concluí o check-in com sucesso mas ainda não vejo os itens no Dashboard. Porquê?',
      role: [ERoles.OPERATOR],
      text: 'O Dashboard pode demorar alguns momentos a atualizar. Verifique também se está a consultar a unidade de refrigeração correta. Se o problema persistir, por favor comunique-o para app@yourvcca.org.',
    },
    {
      id: 46,
      title: 'Concluí o check-out com sucesso mas ainda vejo os itens no Dashboard. Porquê?',
      role: [ERoles.OPERATOR],
      text: 'O Dashboard pode demorar alguns momentos a atualizar. Verifique também se os itens que fez check-out foram os corretos e se está a visualizar a unidade de refrigeração certa. Se o problema persistir, por favor comunique-o para app@yourvcca.org.',
    },
    {
      id: 47,
      title: 'Como posso verificar se o sensor de temperatura está a funcionar corretamente?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'Depois de um Funcionário Registado ativar a ligação do sensor a uma determinada unidade de refrigeração, o botão de inserção manual de temperatura no painel "Mais" -> "Unidades de refrigeração" > "Condições ambientais" ficará desativado. Os dados do sensor são atualizados a cada 6 horas, por isso, se o sensor estiver a funcionar corretamente, verá o gráfico da temperatura com novos pontos várias vezes por dia. Quando um sensor não envia dados há mais de 12 horas, é enviada uma notificação aos operadores da unidade e aos funcionários registados.',
    },
    {
      id: 48,
      title: 'Recebi uma notificação de que o sensor não está a funcionar. O que devo fazer?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'A notificação é enviada após mais de 12 horas sem receção de dados do sensor, e significa que a temperatura definida no painel "Unidades de refrigeração" > "Condições ambientais" está agora a ser usada. A aplicação tentará reconectar ao sensor de hora a hora, por isso recomendamos aguardar algumas horas, no caso de ser um problema de conectividade. Se não houver novos dados do sensor durante várias horas ou dias, o problema pode estar no próprio equipamento, por exemplo, o sensor pode ter ficado sem bateria.',
    },
    {
      id: 49,
      title: 'Como pode ser calculado o tempo de recolha se não houver sensores?',
      role: [ERoles.EMPLOYEE],
      text: 'Quando não há sensores ligados à aplicação, o modelo para calcular o tempo de recolha baseia-se na temperatura definida pelo Operador. É por isso que o Operador é solicitado a introduzir uma nova temperatura definida em cada novo check-in e check-out. Para que o modelo seja preciso, é essencial que a temperatura esteja atualizada. Por favor, instrua os operadores da sua unidade de refrigeração sobre este passo importante.',
    },
    {
      id: 50,
      title: 'Sempre que inicio um check-in, aparece um alerta de temperatura. Porquê?',
      role: [ERoles.OPERATOR],
      text: 'Este alerta serve como lembrete para que informe a aplicação sobre a temperatura correta definida na unidade de refrigeração, caso não existam sensores instalados (ou se não estiverem a funcionar corretamente). Deve verificar se o valor indicado no alerta corresponde ao que aparece no painel de controlo da unidade. Se não for o caso, deve atualizar a temperatura. Caso contrário, pode confirmar e continuar com o check-in. Ter uma temperatura definida atualizada é muito importante para que o modelo que calcula o tempo de recolha funcione corretamente.',
    },
    {
      id: 51,
      title: 'Sempre que concluo um check-out, aparece um alerta de temperatura. Porquê?',
      role: [ERoles.OPERATOR],
      text: 'A temperatura de uma unidade de refrigeração deve ser ajustada consoante os produtos armazenados, pois diferentes produtos têm temperaturas ótimas distintas (pode ver um resumo no Centro de Conhecimento). O alerta que aparece após a conclusão do check-out mostra um resumo dos produtos que ainda estão na unidade e informa sobre a temperatura ideal para cada um deles. Assim, pode tomar uma decisão informada sobre se a temperatura da unidade deve ser alterada. Também pode encontrar esta informação em "Mais" -> "Unidades de refrigeração" -> "Informações das caixas".',
    },
    {
      id: 52,
      title:
        'Por que tenho de pedir a um utilizador de unidade de refrigeração para preencher um questionário antes de fazer check-in da primeira caixa?',
      role: [ERoles.OPERATOR],
      text: 'A equipa responsável pela aplicação está a recolher algumas informações básicas sobre os utilizadores de unidade de refrigeração quando começam a usar a unidade pela primeira vez, como dados de base que serão comparados com os dados recolhidos pela app. O único objetivo é melhorar o design da aplicação e a utilização das unidades de refrigeração.',
    },
    {
      id: 53,
      title:
        'Por que tenho de perguntar aos utilizadores o preço de venda de cada artigo armazenado?',
      role: [ERoles.OPERATOR],
      text: 'Ser-lhe-á pedido que contacte um utilizador que tenha feito recentemente check-out de um produto e que pergunte onde e por quanto o vendeu. Esta informação ajuda a equipa de desenvolvimento da aplicação a validar e melhorar a precisão das previsões de preços de mercado fornecidas pela app.',
    },
    {
      id: 54,
      title: 'Não entendo algumas partes da aplicação. Com quem devo falar?',
      role: [ERoles.EMPLOYEE],
      text: 'Certifique-se de consultar o tutorial e a secção de Perguntas Frequentes (FAQ), pois contêm informações úteis que podem esclarecer as suas dúvidas. Se quiser contactar a equipa de apoio da aplicação, envie um email para app@yourvcca.org.',
    },
    {
      id: 56,
      title: 'Encontrei um erro na aplicação. Com quem devo falar?',
      role: [ERoles.EMPLOYEE],
      text: 'Certifique-se de que tem instalada a versão mais recente da aplicação. Se o problema persistir, por favor notifique a equipa de apoio enviando um email para app@yourvcca.org ou preenchendo o formulário de feedback: https://forms.gle/ceohKHT2QCcE3rFs5 .',
    },
    {
      id: 57,
      title: 'Algo não está a funcionar corretamente na aplicação. Com quem devo falar?',
      role: [ERoles.OPERATOR],
      text: 'Certifique-se de que tem instalada a versão mais recente da aplicação. Se o problema persistir, por favor contacte o Funcionário Registado a quem reporta e / ou notifique a equipa de apoio enviando um email para app@yourvcca.org ou preenchendo o formulário de feedback: https://forms.gle/2gKVzZjkJSPqEAan9 .',
    },
    {
      id: 58,
      title:
        'Quero partilhar feedback sobre a minha experiência com a aplicação. Com quem devo falar?',
      role: [ERoles.EMPLOYEE],
      text: 'A equipa de apoio agradece muito o seu feedback sobre a experiência de utilização da aplicação. Por favor envie um email para app@yourvcca.org ou preencha o formulário: https://forms.gle/ceohKHT2QCcE3rFs5 .',
    },
    {
      id: 60,
      title: 'Que preços são apresentados ao clicar no ícone "Preços das culturas"?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Nesta aba pode ver previsões de preços de mercado, quer em formato de gráfico, quer em tabela. A página Tendência de Preços permite visualizar o último mês de dados e a previsão para os 14 dias seguintes para um mercado e cultura específicos (na Índia) ou uma previsão mensal por estado (na Nigéria). A página Ranking de Preços permite ver todas as previsões de preços de mercado ordenadas do mais alto para o mais baixo, com possibilidade de filtrar por data, estado, distrito e mercado (na Índia).',
    },
    {
      id: 61,
      title: 'Porque é que alguns estados e mercados não aparecem na secção "Preços das culturas"?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Devido à disponibilidade dos dados, o modelo foi implementado apenas para algumas culturas em estados selecionados da Índia e da Nigéria. A aba Preços das Culturas apenas lista mercados, culturas e estados para os quais existe uma previsão disponível.',
    },
    {
      id: 62,
      title: 'Como são calculados os futuros preços de mercado?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Um modelo de aprendizagem automática é treinado com dados históricos de preços de mercado e outros dados como taxa de câmbio e preço dos combustíveis, para fazer previsões dos preços de mercado futuros.',
    },
    {
      id: 66,
      title: 'Não tenho tempo para responder ao questionário durante o registo. O que devo fazer?',
      role: [ERoles.COOLING_USER],
      text: 'Pode ignorar as perguntas do questionário clicando em "Completar mais tarde". Irá encontrar o questionário na secção Detalhes da Conta e pode completá-lo a qualquer momento. No entanto, recomenda-se que responda com atenção ao iniciar a utilização da unidade, para ter uma experiência mais personalizada com a aplicação Coldtivate.',
    },
    {
      id: 67,
      title:
        'Estou interessado em armazenar as minhas colheitas em unidades de refrigeração. Como posso encontrá-las?',
      role: [ERoles.COOLING_USER],
      text: 'Para encontrar unidades de refrigeração perto de si, vá a "Mais" no canto inferior direito da barra de navegação, selecione "Unidades de refrigeração" e depois "Mapa". Aqui pode procurar unidades próximas e levar as suas caixas para armazenar. O operador da unidade pode ajudá-lo a compreender como funciona a câmara, como será feita a cobrança e quais os benefícios da refrigeração.',
    },
    {
      id: 68,
      title: 'Como posso ligar os sensores da unidade à aplicação?',
      role: [ERoles.OPERATOR],
      text: 'Se existirem sensores de temperatura na unidade que possam ser ligados à aplicação Coldtivate, por favor comunique com o seu responsável. Apenas utilizadores com o perfil de Funcionário Registado podem associar sensores a unidades de refrigeração criadas no Coldtivate.',
    },
    {
      id: 69,
      title: 'O que é o inquérito de mercado pós-armazenamento e porque devo preenchê-lo?',
      role: [ERoles.COOLING_USER],
      text: 'O inquérito de mercado pode ser acedido clicando nos três pontos ao lado de cada check-out na aba "Mais" -> "Histórico" e selecionando "Preencher inquérito de mercado". O inquérito é muito curto e pede informações sobre o preço de venda do produto que armazenou anteriormente na unidade, bem como a quantidade que se estragou. Esta informação será tratada como confidencial e usada exclusivamente pela equipa do Coldtivate para avaliar o impacto da utilização de armazenamento refrigerado. Um ponto vermelho irá identificar os check-outs para os quais o inquérito ainda não foi preenchido. Será lembrado dos check-outs que requerem a sua atenção no painel de notificações e pode clicar na notificação para abrir o inquérito. Também pode aceder aos inquéritos por preencher na aba "Análises" e depois clicar em "Impacto".',
    },
    {
      id: 70,
      title: 'O tempo de recolha é superior a 0 dias mas o produto está quase estragado. Porquê?',
      role: [ERoles.COOLING_USER],
      text: 'O tempo de recolha é um valor previsto. Assim, podem ocorrer casos raros em que o produto se estraga mesmo quando o tempo de recolha é superior a 0. Como a deterioração da qualidade de produtos frescos depende principalmente da temperatura, os dados de temperatura tornam a previsão mais precisa. Por exemplo, o problema pode surgir se não houver sensores ligados à aplicação e o operador não tiver atualizado regularmente a temperatura da unidade na app. Por favor informe o operador da unidade caso isto aconteça.',
    },
    {
      id: 71,
      title: 'Porque tenho de preencher um questionário ao registar-me na aplicação?',
      role: [ERoles.COOLING_USER],
      text: 'A equipa responsável pela aplicação está a recolher algumas informações básicas sobre os utilizadores de unidades de refrigeração quando começam a usar a unidade pela primeira vez, como dados de base que serão comparados com os dados recolhidos pela app. O único objetivo é melhorar o design da aplicação e a utilização das câmaras frigoríficas.',
    },
    {
      id: 73,
      title: 'Não entendo algumas partes da aplicação. Com quem devo falar?',
      role: [ERoles.COOLING_USER],
      text: 'Certifique-se de consultar o tutorial e a secção de Perguntas Frequentes (FAQ), pois contêm informações úteis que podem esclarecer as suas dúvidas. Se a sua questão continuar sem resposta, por favor contacte o operador da unidade de refrigeração ou escreva para app@yourvcca.org',
    },
    {
      id: 74,
      title: 'Algo não está a funcionar corretamente na aplicação. Com quem devo falar?',
      role: [ERoles.COOLING_USER],
      text: 'Certifique-se de que tem instalada a versão mais recente da aplicação. Se o problema persistir, por favor contacte o operador da unidade de refrigeração e / ou notifique a equipa de apoio enviando um email para app@yourvcca.org.',
    },
    {
      id: 75,
      title: 'Quero eliminar a minha conta. O que devo fazer?',
      role: [ERoles.EMPLOYEE],
      text: 'Para eliminar a sua conta, aceda a "Menu" -> "Detalhes da conta" e clique em Eliminar. Tenha cuidado, esta ação não pode ser revertida! Se for o último Funcionário Registado da empresa, esta ação irá eliminar a empresa. Se houver check-ins pendentes, não poderá eliminar a sua conta até que todas as caixas tenham sido retiradas na aplicação por um dos seus operadores.',
    },
    {
      id: 76,
      title: 'Quero eliminar a minha conta. O que devo fazer?',
      role: [ERoles.OPERATOR],
      text: 'Para eliminar a sua conta, aceda a "Menu" -> "Detalhes da conta" e clique em Eliminar. Tenha cuidado, esta ação não pode ser revertida! Se for o último Operador atribuído a uma das unidades com check-ins ativos, não poderá eliminar a sua conta até que um Funcionário Registado atribua outro operador à unidade ou todas as caixas tenham sido retiradas na aplicação.',
    },
    {
      id: 77,
      title: 'Quero eliminar a minha conta. O que devo fazer?',
      role: [ERoles.COOLING_USER],
      text: 'Para eliminar a sua conta, aceda a "Menu" -> "Detalhes da conta" e clique em Eliminar. Tenha cuidado, esta ação não pode ser revertida! Se tiver check-ins ativos em alguma unidade, não poderá eliminar a conta até que todas as caixas tenham sido retiradas. Certifique-se de que recolheu as suas caixas na unidade! Caso ache que há caixas pendentes na aplicação que já retirou, por favor fale com o operador da unidade para resolver a situação.',
    },
    {
      id: 78,
      title: 'Como posso eliminar uma unidade de refrigeração ou uma localização?',
      role: [ERoles.EMPLOYEE],
      text: 'Pode eliminar unidades de refrigeração e localizações acedendo a "Menu" -> "Gestão" -> "Unidades de refrigeração" / "Localizações" e clicando em Eliminar. Só poderá fazê-lo se não houver check-ins pendentes nas unidades. Caso contrário, por favor contacte os operadores para concluírem os check-outs antes de tentar eliminar as unidades e localizações.',
    },
    {
      id: 79,
      title: 'Como posso eliminar outro funcionário registado ou operador da minha empresa?',
      role: [ERoles.EMPLOYEE],
      text: 'Não é permitido eliminar outros utilizadores da aplicação. No entanto, pode desatribuir operadores das suas unidades acedendo a "Menu" -> "Gestão" -> "Operadores". Se ainda assim quiser remover totalmente o utilizador para que ele não tenha acesso à sua empresa, por favor envie um email para app@yourvcca.org e explique o motivo.',
    },
    {
      id: 80,
      title: 'Como posso eliminar um utilizador de refrigeração da lista?',
      role: [ERoles.OPERATOR],
      text: 'Para eliminar um utilizador de refrigeração da lista, vá a "Gestão" -> "Utilizadores de refrigeração", clique no nome do utilizador e depois no botão "Eliminar". Atenção: apenas utilizadores sem check-ins pendentes podem ser eliminados! Se houver check-ins pendentes, contacte o utilizador para recolher o produto. Esta ação não pode ser revertida! Se o utilizador tiver um smartphone, esta operação irá removê-lo da sua lista, mas ele continuará a poder usar o Coldtivate. Se o utilizador não tiver smartphone, esta operação elimina a conta e liberta o número de telefone associado.',
    },
    {
      id: 81,
      title: 'Onde posso verificar se os operadores usaram a aplicação recentemente?',
      role: [ERoles.EMPLOYEE],
      text: 'Para verificar a última vez que os operadores e outros funcionários registados iniciaram sessão na aplicação, vá a "Menu" -> "Gestão" -> "Operadores" / "Funcionários Registados". A data e hora que aparecem ao lado do nome correspondem ao último login.',
    },
    {
      id: 82,
      title:
        'Onde posso monitorizar a receita gerada por cada unidade e outras estatísticas de utilização?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Pode ir a "Menu" -> "Gestão" -> "Análise de Receitas", selecionar as unidades de refrigeração e o intervalo de tempo de interesse, e verá a receita total associada aos check-outs dessas unidades. Também pode filtrar por utilizador de refrigeração, método de pagamento e tempo. Para visualizar estatísticas resumidas dos seus check-ins por unidade (como número de utilizadores, número total de caixas, etc), vá a "Menu" -> "Gestão" -> "Análise de Utilização". Também aqui pode filtrar por data e unidade de refrigeração. Em ambas as páginas, as informações podem ser descarregadas como ficheiros Excel. Na aba "Análises", pode encontrar um dashboard com informação sobre utilizadores, receitas, utilização e impacto. Por fim, para monitorizar o número total de caixas, peso e temperaturas ideais das culturas atualmente armazenadas, vá a "Mais" -> "Unidades de refrigeração" -> "Informações das caixas".',
    },
    {
      id: 83,
      title:
        'Como posso saber quem é a pessoa de contacto da unidade onde tenho produtos armazenados?',
      role: [ERoles.COOLING_USER],
      text: 'Ao clicar num item no dashboard, pode ver o nome e o número de contacto do operador que fez o check-in por si. Pode copiar o número para a área de transferência e contactar o operador por telefone ou SMS.',
    },
    {
      id: 84,
      title: 'Recebi uma notificação. O que devo fazer?',
      role: [ERoles.COOLING_USER],
      text: 'Pode receber diferentes tipos de notificações: primeiro, a aplicação pode informá-lo de que algumas das caixas que armazenou estão prestes a estragar-se. Recomendamos que recolha as caixas da unidade o mais rápido possível. Outra notificação que pode receber serve para lembrar que deve completar o inquérito de mercado pós-armazenamento ou o inquérito de base. Pode clicar na notificação para aceder aos inquéritos. A informação recolhida é muito valiosa para a equipa do Coldtivate monitorizar os benefícios de usar unidades de refrigeração em comparação com o armazenamento ao ar livre. Se tiver caixas listadas como "à venda" no marketplace, também receberá notificações quando forem vendidas ou se o operador atualizar o preço de venda. Se não tiver solicitado a alteração do preço, fale imediatamente com o operador.',
    },
    {
      id: 85,
      title: 'O que é apresentado no mapa de unidades de refrigeração?',
      role: [ERoles.COOLING_USER],
      text: 'No mapa pode visualizar a sua localização (será pedido que autorize o Coldtivate a aceder à sua localização), a localização das unidades de refrigeração à sua volta e algumas informações sobre essas unidades (monocultura ou multicultura, empresa, preços). Ao dirigir-se à unidade, pode obter mais informações com o operador sobre o funcionamento e a possibilidade de armazenar os seus produtos.',
    },
    {
      id: 86,
      title:
        'Quero partilhar feedback sobre a minha experiência com a aplicação. Com quem devo falar?',
      role: [ERoles.OPERATOR],
      text: 'A equipa de apoio da aplicação agradece muito o seu feedback sobre a experiência de utilização, por favor envie um email para app@yourvcca.org ou envie o seu comentário através do formulário: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 87,
      title:
        'Quero partilhar feedback sobre a minha experiência com a aplicação. Com quem devo falar?',
      role: [ERoles.COOLING_USER],
      text: 'A equipa de apoio da aplicação agradece muito o seu feedback sobre a experiência de utilização, por favor envie um email para app@yourvcca.org.',
    },
    {
      id: 88,
      title:
        'Um operador está a pedir-me um código para me adicionar à lista de utilizadores de refrigeração da empresa. Onde posso encontrar esse código?',
      role: [ERoles.COOLING_USER],
      text: 'Quando se registou no Coldtivate, recebeu um identificador único em forma de código. Este código pode ser utilizado por um operador para o adicionar à lista de utilizadores de refrigeração da empresa, o que é necessário para que os operadores façam check-in das suas caixas. O código pode ser encontrado em "Menu" -> "Detalhes da conta" -> "Dados pessoais" -> Código de importação do utilizador de refrigeração.',
    },
    {
      id: 89,
      title: 'Como posso mudar o idioma da aplicação?',
      role: [ERoles.AUTH],
      text: 'Para mudar o idioma da aplicação, pode clicar no menu suspenso que aparece na parte inferior da página inicial ou, depois de iniciar sessão no seu perfil, aceder a "Menu" -> "Detalhes da conta" -> "Preferências de localização".',
    },
    {
      id: 90,
      title:
        'O meu tipo de sensor de temperatura é suportado pelo Coldtivate (Ecozen, UbiBot, Figorr, Victron Energy). Como posso configurar os sensores?',
      role: [ERoles.EMPLOYEE],
      text: 'Para ligar um sensor a uma unidade de refrigeração, vá a "Menu" -> "Gestão" -> "Unidades de refrigeração", selecione a unidade para a qual pretende configurar o sensor e ative a opção "Sensor disponível". Pode seguir as instruções específicas para cada tipo de sensor suportado e fazer a autenticação. Lembre-se de clicar em "Guardar" no final da página para que as alterações sejam salvas. As leituras de temperatura dos sensores devem aparecer nas próximas 6 horas em "Mais" -> "Unidades de refrigeração" -> "Condições ambientais".',
    },
    {
      id: 91,
      title:
        'Qual é a diferença entre as vistas "Empresa", "Agregado" e "Comparação" na aba Análises?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'A aba Análises na barra de navegação fornece estatísticas resumidas de todas as câmaras frigoríficas da empresa. Na vista "Empresa", vê os dados sobre utilizadores, utilização e impacto de todas as unidades de refrigeração desde que começou a usar o Coldtivate. Ao clicar em "Agregado", pode configurar quais as unidades e o período de tempo de interesse. Os dados exibidos sobre utilizadores, utilização e impacto são agregados nas unidades selecionadas e no intervalo de tempo escolhido. Se quiser comparar entre unidades, pode usar a vista "Comparação". Aqui, os dados são apresentados em tabelas, onde cada unidade tem uma linha com os dados referentes ao período escolhido. Pode ordenar os dados e mudar as unidades e o período a qualquer momento.',
    },
    {
      id: 92,
      title: 'Como são calculados os dados exibidos na aba Análises?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'O objetivo da aba Análises é oferecer uma visão abrangente do que está a acontecer nas câmaras frigoríficas. Os dados de utilizadores e utilização são calculados com base nas informações de check-in e check-out registadas no Coldtivate. Assim, pode perceber quantos utilizadores e operações foram realizados, bem como a receita ou ocupação média de cada câmara. Já os dados da secção de impacto são baseados em inquéritos que os utilizadores de refrigeração são convidados a preencher no registo (antes de começarem a usar a refrigeração) e regularmente após cada check-out. Estes dados são essenciais para estimar a evolução das perdas pós-colheita e da receita dos utilizadores ao longo do tempo. Por fim, a estimativa de CO2 compara as emissões associadas ao uso de refrigeração com as emissões previstas que a mesma cultura causaria se fosse armazenada sem refrigeração.',
    },
    {
      id: 93,
      title: 'Como são calculados os dados exibidos na aba Análises?',
      role: [ERoles.COOLING_USER],
      text: 'O objetivo da aba Análises é oferecer-lhe uma visão completa do impacto da refrigeração nas suas culturas. Os dados apresentados em "Caixas" são calculados com base nas informações de check-in e check-out registadas no Coldtivate. Assim, pode ver quanto armazenou de cada cultura e o tempo médio de armazenamento. Os dados da secção "Impacto" baseiam-se em inquéritos que lhe são pedidos no momento do registo (antes de começar a usar refrigeração) e regularmente ao fazer check-out de produtos armazenados. Estes dados são cruciais para estimar a evolução das perdas pós-colheita e da sua receita ao longo do tempo. Um lembrete para preencher os inquéritos é exibido no topo da página e incentivamos que os preencha sempre que possível. Em ambas as secções, pode usar o botão "Configurar" no canto superior direito para selecionar câmaras ou períodos de tempo específicos. Se nada for selecionado, verá todos os dados disponíveis desde que começou a usar o Coldtivate.',
    },
    {
      id: 94,
      title: 'Inicio sessão mas não consigo ver a funcionalidade de marketplace. Porquê?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Se o marketplace for suportado no seu país, verá um ícone "Marketplace" na barra de navegação inferior. Se não o vê, significa que esta funcionalidade não está disponível no seu país. Neste momento, o marketplace está apenas disponível para utilizadores sediados na Nigéria. Se é um Funcionário Registado e tem interesse em testar o marketplace no seu país, por favor contacte-nos através de app@yourvcca.org.',
    },
    {
      id: 95,
      title: 'Qual é o papel de uma empresa de refrigeração no marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Uma empresa de refrigeração e os seus colaboradores podem decidir o nível de envolvimento no marketplace. Como a funcionalidade depende do registo de caixas com check-in na aplicação Coldtivate, o marketplace só funciona se o operador registar regularmente os check-ins e check-outs na aplicação. Para os produtos comprados através do marketplace, a empresa de refrigeração recebe a taxa de refrigeração como parte da transação digital. Por isso, é fundamental que um Funcionário Registado defina os dados bancários da empresa: para isso, aceda a "Menu" -> "Gestão" -> "Definições de vendedor (Empresa)" -> "Opções de pagamento". Além disso, as empresas de refrigeração podem optar por comprar produtos aos agricultores (atuando como compradores) e revendê-los no marketplace (atuando como vendedores). Ambas as transações podem ser feitas na plataforma Coldtivate. Note que tanto os Operadores como os Funcionários Registados têm a opção de comprar para si (como indivíduos) ou em nome da empresa que representam.',
    },
    {
      id: 96,
      title: 'Qual é o papel de um operador de câmara fria no marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Os operadores de câmaras frias no marketplace têm três papéis principais. 1) Ajudam utilizadores de refrigeração sem smartphone a configurar a conta bancária (para que possam receber pagamentos digitais), listar as suas caixas como "à venda" e definir o preço. 2) São responsáveis por manter os produtos na câmara organizados, seguindo o princípio de que todo o conteúdo de uma caixa pertence a um único utilizador: quando parte do conteúdo de uma caixa é comprado (e passa a pertencer a outro dono), o operador recebe uma notificação para mover o produto comprado para uma nova caixa. Se a caixa inteira for comprada, nenhuma ação é necessária. 3) Os operadores de câmara fria são responsáveis por todas as operações de check-out, incluindo as resultantes de vendas no marketplace: quando um comprador (ou representante de entrega) chega à câmara para levantar a compra, o operador deve realizar o check-out da caixa correspondente no Coldtivate.',
    },
    {
      id: 97,
      title: 'Como são cobradas as taxas de refrigeração no marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Quando uma caixa é comprada no marketplace, a taxa de refrigeração até esse dia é deduzida do valor pago pelo comprador e transferida para a empresa de refrigeração. Assim, o vendedor não precisa de pagar a taxa diretamente, pois esta já foi tratada na transação digital. Por isso, é essencial que tanto o vendedor como a empresa de refrigeração tenham uma conta bancária configurada no Coldtivate. Por exemplo, se uma caixa for vendida por 20 USD e o vendedor tiver uma dívida de 3 USD em taxas de refrigeração, dos 20 USD pagos, 17 USD são transferidos para a conta do vendedor e 3 USD para a da empresa. Se o comprador levantar o produto no mesmo dia, não há nova taxa de refrigeração (porque o dia já está pago pelo vendedor). No entanto, se decidir manter o produto armazenado, a taxa normal aplica-se e será calculada consoante o número de dias adicionais até ao levantamento. O operador da câmara é responsável por cobrar essas taxas no momento do check-out. No caso de entrega, aplica-se a mesma lógica.',
    },
    {
      id: 98,
      title: 'Como posso começar a vender produtos no marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Para que as suas caixas fiquem disponíveis para venda, são necessárias duas ações. 1) Configurar uma conta bancária onde os pagamentos serão depositados. Se tiver smartphone, pode fazê-lo em "Menu" -> "Detalhes da conta" -> "Opções de pagamento". Se não tiver smartphone, o operador pode configurar a conta bancária no seu interface: "Gestão" -> "Utilizadores de refrigeração" -> "Detalhes de pagamento". Como todos os pagamentos no marketplace são digitais, é obrigatório fornecer uma conta bancária válida antes de listar qualquer caixa como "à venda". 2) Se tiver smartphone, para qualquer conjunto de caixas com check-in feito, pode clicar no símbolo ">" à direita do item no dashboard, aceder a "Peso da caixa e listagem no marketplace", selecionar quais as caixas a colocar "à venda" e definir o preço por kg. Os consumidores verão estas caixas e poderão comprá-las pelo valor indicado. Receberá uma notificação sempre que uma compra for efetuada. Se não tiver smartphone, o operador pode listar caixas "à venda" durante o check-in ou mais tarde, seguindo os mesmos passos. Receberá um SMS caso o operador atualize a listagem ou o preço depois do check-in.',
    },
    {
      id: 99,
      title: 'Os compradores podem ver os meus dados de contacto?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Pode decidir se os clientes interessados em comprar os seus produtos devem poder ver os seus dados de contacto. Isto pode ser útil em caso de negociação de preço ou encomendas recorrentes de produtos que ainda não foram armazenados na unidade de refrigeração (e, por isso, não são visíveis para o comprador). Pode atualizar esta definição a qualquer momento em "Menu" -> "Detalhes da conta" -> "Partilha de contactos".',
    },
    {
      id: 100,
      title: 'Gostaria de oferecer um desconto a um comprador. Como posso fazê-lo?',
      role: [ERoles.EMPLOYEE],
      text: 'Em "Menu" -> "Detalhes da conta" -> "Cupões de desconto", pode criar cupões com um código e uma percentagem de desconto. Estes cupões são válidos para produtos que vende como indivíduo. Para definir cupões válidos para produtos da empresa, aceda a "Menu" -> "Gestão" -> "Cupões de desconto" dentro de "Definições de vendedor (Empresa)". Pode partilhar o código do cupão com o cliente, e ele pode resgatá-lo no ecrã de pagamento. Os cupões permanecem válidos até que os revogue. Se quiser oferecer um desconto a todos os potenciais compradores, pode baixar o preço de venda visível no marketplace.',
    },
    {
      id: 101,
      title: 'Gostaria de oferecer um desconto a um comprador. Como posso fazê-lo?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Em "Menu" -> "Detalhes da conta" -> "Cupões de desconto", pode criar cupões com um código e uma percentagem de desconto. Pode partilhar o código do cupão com o cliente, e ele pode resgatá-lo no ecrã de pagamento. Os cupões permanecem válidos até que os revogue. Se quiser oferecer um desconto a todos os potenciais compradores, pode baixar o preço de venda visível no marketplace.',
    },
    {
      id: 102,
      title:
        'Como é que os operadores de câmaras frias me podem ajudar a comercializar as minhas culturas?',
      role: [ERoles.COOLING_USER],
      text: 'Os operadores de câmara fria são o seu ponto de contacto para tudo o que está relacionado com o armazenamento de produtos nas câmaras frias, e também o podem ajudar a vender a sua produção mesmo que não tenha acesso a um smartphone. A partir do seu interface, podem configurar os seus dados bancários, onde receberá os rendimentos da venda de produtos. No momento do check-in, podem ajudar a listar as caixas como "à venda", o que as torna visíveis no marketplace, e definir o preço de venda (por kg) para cada produto. Se mudar de ideias, pode sempre pedir para adicionar ou remover caixas do marketplace, listando-as ou retirando-as como "à venda". Em algumas câmaras frias, os operadores ou os seus colaboradores também são responsáveis por comprar diretamente aos agricultores e revender a retalhistas. Seja agricultor ou comerciante interessado nesta opção, ou retalhista interessado em comprar em grandes quantidades a partir da câmara fria, contacte a empresa de refrigeração para explorar esta oportunidade.',
    },
    {
      id: 103,
      title: 'O que significa a opção "Comprar em nome da empresa" que vejo no marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Operadores e Funcionários Registados podem vender e comprar produtos no marketplace tanto para si próprios, como indivíduos, como em nome da empresa que representam. Esta opção permite que todas as transações sejam feitas a partir da conta bancária da empresa e não através de contas bancárias individuais. Quando um Operador ou Funcionário Registado compra "em nome da empresa", a empresa paga o valor devido ao vendedor e torna-se a proprietária das caixas. Se essas caixas forem listadas para venda no marketplace, são mostradas como pertencentes à empresa de refrigeração, e o valor da venda é transferido para a conta bancária da empresa. Quando um Operador ou Funcionário Registado compra produtos para si próprio, paga o valor devido ao vendedor a partir dos seus dados bancários pessoais e torna-se pessoalmente proprietário das caixas. Se forem armazenadas na unidade de refrigeração, serão listadas em nome do Operador ou Funcionário Registado e, se forem colocadas à venda no marketplace, também aparecerão como pertencentes ao mesmo.',
    },
    {
      id: 104,
      title: 'Quais são as taxas que aparecem no marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'O preço de venda de cada item exibido no marketplace é definido diretamente pelo vendedor e depende de quantos kg são comprados. Para além desse valor, o marketplace aplica duas taxas: a Taxa de Marketplace, que é uma taxa de 3.5% cobrada pela equipa do Coldtivate para manter a aplicação funcional, e a Taxa de Pagamento, que corresponde à taxa aplicada pelo sistema de pagamento digital (PayStack na Nigéria) para processar a transação.',
    },
    {
      id: 105,
      title:
        'Sou comprador e estou interessado em adquirir produtos das câmaras frias, mas não vejo nada no marketplace. Porquê?',
      role: [ERoles.COOLING_USER],
      text: 'Se navegar até ao separador do Marketplace mas não conseguir ver nenhum produto, isso pode dever-se a filtros que aplicou na pesquisa (como localização, intervalo de preços ou tipo de cultura de interesse), ou pode ser porque nenhum item está disponível para venda na sua área. Caso conheça uma câmara fria próxima, recomendamos que pergunte ao operador da câmara se algum utilizador de refrigeração está interessado em vender produtos através da funcionalidade do marketplace e solicite que esses itens sejam listados na aplicação.',
    },
    {
      id: 106,
      title: 'Oferecem serviços de entrega?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'O marketplace não oferece serviços de entrega neste momento, mas facilita a ligação com soluções logísticas que podem entregar os produtos aos compradores. Como Funcionário Registado, tem a opção de adicionar contactos de entrega em "Menu" -> "Gestão" -> "Definições do vendedor (Empresa)" -> "Contactos de entrega". Estes serão mostrados a todos os compradores que adquiram produtos das suas câmaras frias no momento do pagamento. Se for comprador, é aconselhado a entrar em contacto com estes contactos para organizar a entrega. Por favor note que, se o produto for recolhido no mesmo dia da compra, não se aplica taxa de refrigeração, mas se mantiver as culturas em armazenamento, será aplicada uma taxa diária. Certifique-se de discutir isto com o contacto de entrega com quem está a negociar.',
    },
    {
      id: 107,
      title:
        'Recebi uma notificação na aplicação a dizer que "O produto precisa de ser redistribuído". O que significa?',
      role: [ERoles.OPERATOR],
      text: 'Devido ao procedimento de check-in na câmara fria, o conteúdo de uma caixa pertence a um único agricultor ou comerciante. No entanto, no marketplace, um comprador pode adquirir apenas alguns kg de uma caixa pertencente a um vendedor, e essa quantidade comprada deve ser movida para uma caixa separada. Esta notificação informa que uma compra foi concluída, e ao clicar nela pode visualizar de que caixa o produto deve ser retirado. Manter as caixas organizadas é essencial para garantir que os produtos não são retirados por engano e que as taxas de refrigeração são corretamente cobradas. Recomendamos utilizar a funcionalidade "ID da caixa" no check-in para identificar as caixas físicas na aplicação Coldtivate e acompanhar mais facilmente quais necessitam da sua atenção com base na notificação.',
    },
    {
      id: 108,
      title: 'Quanta quantidade de produto posso comprar no marketplace?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Para cada item exibido no marketplace, pode comprar a caixa inteira ou qualquer quantidade de quilogramas contidos na caixa. A quantidade mínima que pode ser comprada é 1 kg.',
    },
    {
      id: 109,
      title: 'Comprei alguns produtos e gostaria de revendê-los. Como faço isso?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Quando compra produtos no marketplace, torna-se o proprietário da quantidade adquirida. No "Dashboard", verá um novo item que indica o que tem armazenado na unidade de refrigeração. Se quiser colocá-lo à venda, pode clicar no símbolo ">" à direita do item no dashboard, navegar até "Peso da caixa e listagem no marketplace", selecionar quais caixas deseja colocar "à venda" e o preço por kg. Os consumidores no marketplace poderão ver essas caixas e comprá-las pelo valor indicado. Note que, para colocar caixas à venda, é necessário ter a conta bancária configurada. Siga as instruções para adicionar os seus dados bancários, ou vá a "Menu" -> "Detalhes da conta" -> "Opções de pagamento".',
    },
    {
      id: 110,
      title: 'Saí do processo de pagamento do marketplace. Como posso finalizar a minha compra?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Quando inicia uma compra clicando em "Pagar" no Carrinho de Compras, será redirecionado para o fornecedor de pagamentos (PayStack na Nigéria). Se, por qualquer motivo, abandonar o processo, a sua encomenda será marcada como "Pagamento pendente". Pode encontrar a sua encomenda no separador "As Minhas Encomendas" na página do marketplace. Pode clicar no item para finalizar o pagamento. Tem 30 minutos para concluir o pagamento, após os quais a encomenda será considerada "Cancelada" e o montante ficará disponível para outros compradores.',
    },
    {
      id: 111,
      title: 'Não consigo fazer check-out de algumas culturas. Porque está isto a acontecer?',
      role: [ERoles.OPERATOR],
      text: 'Se está a tentar fazer check-out de algumas caixas que estão listadas no marketplace e não consegue, isto deve-se provavelmente ao facto de fazerem parte de uma encomenda com pagamento pendente. Isto significa que um comprador adicionou essas caixas ao carrinho de compras e iniciou o processo de pagamento. O comprador tem 30 minutos para concluir o pagamento, após os quais a encomenda será cancelada. Depois dos 30 minutos, poderá fazer o check-out da caixa.',
    },
  ],
  [APP_LOCALES.FRENCH]: [
    {
      id: 1,
      title: "Pourquoi devrais-je utiliser l'application ?",
      role: [ERoles.AUTH],
      text: ' L"application est conçue pour accompagner les fournisseurs de chambres froides dans leurs opérations quotidiennes, les agriculteurs qui les utilisent et les consommateurs souhaitant acheter des produits stockés en chambres froides. Elle propose un inventaire numérique, un suivi à distance et un modèle de durée de conservation pour chaque caisse stockée, ainsi qu"une place de marché mettant en relation acheteurs et vendeurs. Elle inclut également un centre de connaissances, qui fournit des recommandations spécifiques à chaque produit sur la température et la durée de conservation optimales.',
    },
    {
      id: 2,
      title: "Qui peut utiliser l'application ?",
      role: [ERoles.AUTH],
      text: 'L"application est destinée aux entreprises de stockage frigorifique, aux agriculteurs et aux négociants intéressés par l"utilisation de chambres froides, ainsi qu"aux acheteurs potentiels du monde entier. Trois rôles utilisateur sont définis dans l"application : (i) Employé enregistré : membre de l"équipe de direction du fournisseur de chambres froides. La personne responsable de l"installation et de la gestion de la chambre est chargée de superviser les activités des opérateurs sur le terrain, sans être physiquement présente sur place. Par exemple : PDG, directeur financier, etc. (ii) Opérateur : employé physiquement présent dans la chambre froide et gérant les opérations d"enregistrement et de départ. Cette personne est en contact direct avec les utilisateurs de la chambre froide et rend compte à un employé enregistré de l"entreprise. (iii) Utilisateurs ou consommateurs de la chambre froide : utilisateurs de la chambre froide (agriculteurs, négociants, détaillants, etc.) ou consommateurs (particuliers, détaillants, grossistes). Ce rôle s"adresse à toute personne souhaitant s"inscrire à l"application sans être liée à une entreprise de refroidissement. Les utilisateurs de la chambre froide disposant d"un smartphone peuvent se connecter à l"application en tant qu"utilisateurs. S"ils n"en ont pas, les opérateurs effectuent les opérations de refroidissement pour eux.',
    },
    {
      id: 3,
      title: "Comment puis-je m'inscrire en tant qu'employé enregistré ?",
      role: [ERoles.AUTH],
      text: 'Si vous êtes le premier employé de votre entreprise à s"inscrire, cliquez sur le bouton « S"inscrire en tant qu"entreprise » et suivez les étapes pour vous inscrire et vous inscrire (informations personnelles et mot de passe inclus). Une fois inscrit, vous pourrez vous connecter en tant qu"employé inscrit dans l"application et envoyer une invitation par SMS aux autres employés inscrits pour qu"ils rejoignent votre entreprise. Une fois l"entreprise créée, tous les employés inscrits seront invités par SMS. Sinon, ils ne seront pas connectés à la même entreprise.',
    },
    {
      id: 4,
      title: "Comment puis-je m'inscrire en tant qu'opérateur ?",
      role: [ERoles.AUTH],
      text: 'Pour vous inscrire, vous devez être invité par un employé enregistré. Vous recevrez un SMS avec un lien d"activation, à partir duquel vous pourrez configurer vos informations personnelles et votre mot de passe.',
    },
    {
      id: 5,
      title:
        "Comment puis-je m'inscrire en tant qu'utilisateur ou consommateur de refroidissement ?",
      role: [ERoles.AUTH],
      text: 'Les utilisateurs de climatisation équipés de smartphones et les consommateurs peuvent s"inscrire en cliquant sur « S"inscrire comme utilisateur ou consommateur » sur la page d"accueil et en indiquant leurs informations personnelles et leur mot de passe. Les utilisateurs ne disposant pas de smartphone peuvent être ajoutés à l"application par les opérateurs. Cette opération est nécessaire pour lancer l"enregistrement de ces utilisateurs. Les utilisateurs doivent fournir un numéro de téléphone que l"opérateur utilisera pour les contacter en cas de besoin. Aucun mot de passe n"est requis dans ce cas.',
    },
    {
      id: 6,
      title: "Je n'arrive pas à finaliser mon inscription. Que dois-je faire ?",
      role: [ERoles.AUTH],
      text: 'Pour terminer l"inscription, veuillez vous assurer que les conditions suivantes sont remplies : (i) Vous saisissez un numéro de téléphone avec le bon indicatif pays (par exemple +91 pour l"Inde) ; (ii) Le numéro de téléphone que vous avez fourni n"a pas été utilisé pour enregistrer un autre utilisateur ; (iii) Le mot de passe que vous saisissez remplit toutes les conditions demandées ; (iv) Les mots de passe que vous saisissez sont les mêmes - vous pouvez cliquer sur le symbole de l"œil pour révéler les mots de passe et vérifier qu"ils sont égaux.',
    },
    {
      id: 7,
      title:
        "Je n'ai pas de téléphone, mais je souhaite utiliser l'application. Que dois-je faire ?",
      role: [ERoles.AUTH],
      text: 'Si vous êtes un employé, un opérateur ou un consommateur enregistré, vous devez fournir un numéro de téléphone valide pour vous inscrire. Un smartphone est nécessaire pour utiliser correctement l"application. Si vous utilisez un système de climatisation et que vous n"avez pas de téléphone, nous vous conseillons également de fournir un numéro de téléphone valide afin que l"opérateur puisse vous contacter en cas de besoin. Vous pouvez également indiquer le numéro de téléphone d"un proche ou d"un ami si vous n"en avez pas. Si ce n"est pas possible, l"opérateur peut tout de même stocker les produits dans la chambre en sélectionnant « Utilisateur sans téléphone » comme utilisateur de la climatisation lors de l"enregistrement.',
    },
    {
      id: 8,
      title: "Quels détails sont nécessaires pour se connecter en tant qu'employé enregistré ?",
      role: [ERoles.AUTH],
      text: 'Les employés enregistrés peuvent se connecter avec leur e-mail ou numéro de téléphone, ainsi que leur mot de passe.',
    },
    {
      id: 9,
      title: "Quels détails sont nécessaires pour se connecter en tant qu'opérateur ?",
      role: [ERoles.AUTH],
      text: 'Les opérateurs peuvent se connecter avec leur numéro de téléphone et leur mot de passe.',
    },
    {
      id: 10,
      title:
        "Quels détails sont nécessaires pour se connecter en tant qu'utilisateur ou consommateur de refroidissement ?",
      role: [ERoles.AUTH],
      text: 'Les utilisateurs de Cooling disposant d"un smartphone peuvent se connecter avec leur numéro de téléphone et leur mot de passe. Les utilisateurs sans smartphone n"ont pas besoin de se connecter : l"opérateur effectue les opérations à leur place. Les consommateurs souhaitant accéder à la place de marché peuvent se connecter avec leur numéro de téléphone et leur mot de passe.',
    },
    {
      id: 11,
      title: "Je n'ai reçu aucune invitation par SMS. Que dois-je faire ?",
      role: [ERoles.AUTH],
      text: 'Si vous avez perdu votre mot de passe, vous pouvez restaurer votre compte en cliquant sur "Mot de passe oublié" à la connexion, en entrant votre numéro de téléphone, et vous recevrez un SMS avec un lien pour définir un nouveau mot de passe.',
    },
    {
      id: 12,
      title: "J'ai perdu mon mot de passe. Que faire ?",
      role: [ERoles.AUTH],
      text: 'Si vous avez perdu votre mot de passe, vous pouvez restaurer votre compte en cliquant sur « Mot de passe oublié » lors de la connexion, entrez votre numéro de téléphone et vous recevrez un SMS avec un lien pour définir un nouveau mot de passe.',
    },
    {
      id: 13,
      title: "Qu'est-ce que le Knowledge Hub ?",
      role: [ERoles.EMPLOYEE],
      text: 'Le Centre de connaissances est une page accessible en cliquant sur le menu en haut à gauche. Il contient des informations utiles sur les bonnes pratiques de stockage pour différents produits, notamment la température optimale et la durée approximative de stockage à cette température.',
    },
    {
      id: 14,
      title: 'Comment puis-je modifier mon profil ?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'En cliquant sur « Menu » -> « Détails du compte », vous pouvez consulter votre profil et modifier vos « Informations personnelles » (nom, prénom, numéro de téléphone, adresse e-mail et sexe). Sous « Préférences de localisation », vous pouvez modifier la langue de l"application. Sous « Paramètres du vendeur », vous pouvez configurer vos coordonnées bancaires, créer des coupons et rendre vos coordonnées publiques pour les utilisateurs de la marketplace. Pour modifier les informations relatives à votre entreprise, vos emplacements et vos unités de refroidissement, accédez à « Menu » -> « Gestion », puis sélectionnez l"élément de menu souhaité.',
    },
    {
      id: 15,
      title: 'Comment puis-je modifier mon profil ?',
      role: [ERoles.EMPLOYEE],
      text: 'Il y a trois façons de lier un opérateur à une unité de refroidissement. Vous pouvez attribuer une (ou plusieurs) unité(s) de refroidissement à un opérateur lorsque vous lui envoyez l"invitation. Sinon, vous pouvez modifier les unités de refroidissement associées à un opérateur donné en naviguant vers "Gestion" -> "Opérateurs", en sélectionnant l"opérateur, puis en cliquant sur "Sélectionner une unité de refroidissement". Enfin, lorsque vous créez une unité de refroidissement dans "Gestion" -> "Unités de refroidissement", vous pouvez également attribuer des opérateurs à celle-ci. N"oubliez pas d"enregistrer vos modifications avant de quitter !',
    },
    {
      id: 16,
      title: 'Comment puis-je affecter des opérateurs aux unités de refroidissement ?',
      role: [ERoles.OPERATOR],
      text: 'Oui, vous pouvez commencer un enregistrement pour cette personne en utilisant l"utilisateur de refroidissement nommé "Utilisateur sans téléphone". Comme plusieurs personnes peuvent utiliser ce compte pour l"enregistrement, veillez à ajouter une étiquette au nom sur les caisses dans la chambre pour identifier le propriétaire de chaque caisse.',
    },
    {
      id: 17,
      title:
        "Un utilisateur de climatisation arrive à la chambre froide, mais n'a pas de téléphone. Puis-je quand même l'enregistrer ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Oui, vous pouvez lancer un enregistrement pour cette personne en utilisant l"utilisateur de climatisation « Utilisateur sans téléphone ». Étant donné que plusieurs personnes peuvent utiliser ce compte pour l"enregistrement, assurez-vous d"ajouter une étiquette nominative sur les caisses de la pièce afin d"identifier le propriétaire de chaque caisse.',
    },
    {
      id: 18,
      title: 'Comment enregistrer mon entreprise ?',
      role: [ERoles.EMPLOYEE],
      text: 'Pour enregistrer votre entreprise, sur l"écran d"accueil, sélectionnez "S"inscrire en tant qu"entreprise" et remplissez les informations requises. Entrez un mot de passe, puis cliquez sur "S"inscrire" et vous êtes prêt à partir !',
    },
    {
      id: 19,
      title: 'Comment enregistrer un nouvel emplacement pour mon entreprise ?',
      role: [ERoles.EMPLOYEE],
      text: 'Chaque unité de refroidissement doit être créée à un emplacement (et plusieurs unités de refroidissement peuvent être créées pour le même emplacement). Pour ajouter un nouvel emplacement pour votre entreprise, dans le menu sélectionnez "Gestion" > "Emplacements". Cliquez sur le "+" dans le coin supérieur droit pour ajouter un nouvel emplacement. Remplissez les informations requises. Cliquez sur "ajouter" pour confirmer.',
    },
    {
      id: 20,
      title: 'Comment enregistrer une nouvelle unité de refroidissement pour mon entreprise ?',
      role: [ERoles.EMPLOYEE],
      text: 'Pour enregistrer une nouvelle unité de refroidissement pour votre entreprise, vous devez avoir au moins un emplacement créé. Ensuite, dans le menu, sélectionnez "Gestion" > "Unités de refroidissement". Cliquez sur le "+" dans le coin supérieur droit pour ajouter une nouvelle unité de refroidissement. Remplissez les informations requises. Cliquez sur "ajouter" pour confirmer.',
    },
    {
      id: 21,
      title:
        "Comment inviter d'autres employés inscrits de mon entreprise à s'inscrire à l'application ?",
      role: [ERoles.EMPLOYEE],
      text: 'Pour inviter d"autres employés enregistrés de votre entreprise, dans le menu sélectionnez "Gestion" > "Fournisseur de services". Cliquez sur le "+" dans le coin supérieur droit pour ajouter le numéro de téléphone de l"employé que vous souhaitez inviter. Cliquez sur "Inviter" pour confirmer : votre collègue recevra un SMS avec un lien qui le/la guidera directement vers l"écran d"inscription. De plus, vous recevrez également un email avec le lien d"invitation. Merci de le transférer à l"opérateur au cas où il/elle ne l"aurait pas reçu par SMS.',
    },
    {
      id: 22,
      title:
        "Comment inviter les opérateurs d'entreposage frigorifique à s'inscrire à l'application ?",
      role: [ERoles.EMPLOYEE],
      text: 'Pour envoyer une invitation aux opérateurs pour vos unités de refroidissement, dans le menu sélectionnez "Gestion" > "Opérateurs". Cliquez sur le "+" dans le coin supérieur droit pour ajouter le numéro de téléphone de l"opérateur que vous souhaitez inviter. Cliquez sur "Inviter" pour confirmer : l"opérateur recevra un message avec un lien qui le/la guidera directement vers l"écran d"inscription. De plus, vous recevrez également un email avec le lien d"invitation. Merci de le transférer à l"opérateur au cas où il/elle ne l"aurait pas reçu par SMS.',
    },
    {
      id: 23,
      title: "Comment surveiller la température d'un groupe de refroidissement ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Pour surveiller la température d"un climatiseur spécifique, cliquez sur « Plus » en bas à droite de la barre de navigation, sélectionnez « Unités de climatisation », puis « Conditions ambiantes » et sélectionnez le climatiseur concerné dans le menu déroulant. Ce panneau affiche un graphique affichant l"évolution de la température au fil du temps. Cliquez sur un point de donnée pour afficher sa valeur et son horodatage. Si la pièce est équipée de capteurs connectés à l"application, vous pourrez y consulter la température réelle. Sinon, le graphique affichera les températures réglées manuellement par l"opérateur de la pièce dans l"application. Pour consulter la température d"un autre climatiseur, sélectionnez-le dans le menu déroulant en haut de la page.',
    },
    {
      id: 24,
      title: "Comment surveiller l'occupation d'une unité de refroidissement ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Pour gérer l"occupation d"une unité de refroidissement spécifique, cliquez sur « Plus » en bas à droite de la barre de navigation, sélectionnez « Unités de refroidissement », accédez à « Planificateur » et sélectionnez l"unité de refroidissement souhaitée dans le menu déroulant. Vous y trouverez l"occupation actuelle (en haut) et l"occupation prévue pour les 7 prochains jours (en bas). Les informations sur l"occupation future sont basées sur le nombre de jours de stockage déclarés par chaque utilisateur lors de l"enregistrement. Veuillez noter qu"il ne s"agit que d"une estimation et qu"elle peut être inexacte.',
    },
    {
      id: 25,
      title: 'Comment puis-je voir quels objets sont stockés dans une pièce ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Cliquez sur l"icône "Tableau de bord" en bas de l"écran et sélectionnez l"unité de refroidissement d"intérêt dans le menu déroulant pour voir la liste de tous les articles stockés dans une unité de refroidissement.',
    },
    {
      id: 26,
      title:
        "Comment puis-je voir les enregistrements et les départs passés d'une unité de refroidissement ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Pour consulter l"historique des mouvements d"une unité de refroidissement, cliquez sur « Plus » en bas à droite de la barre de navigation, puis sélectionnez « Historique ». Les enregistrements (icônes avec une caisse verte), les départs (icônes avec une caisse orange) et les opérations sur la place de marché (icônes avec un panier bleu) avec le détail des transactions s"affichent. Si une transaction spécifique vous intéresse, la fonction de recherche peut vous aider à la retrouver !',
    },
    {
      id: 28,
      title:
        "Quelles sont les principales tâches que l'opérateur peut effectuer dans l'application ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'L"opérateur peut enregistrer de nouveaux utilisateurs de climatisation, effectuer des contrôles d"entrée, surveiller les articles stockés et l"occupation des locaux, effectuer des contrôles de sortie et surveiller la température de l"unité de climatisation dont il a la charge. Il peut également aider les utilisateurs à mettre en vente des caisses et à fixer un prix de vente.',
    },
    {
      id: 29,
      title: 'Comment puis-je enregistrer de nouveaux utilisateurs de refroidissement ?',
      role: [ERoles.OPERATOR],
      text: 'Pour enregistrer un nouvel utilisateur de climatisation, accédez au menu « Gestion » > « Utilisateurs de climatisation ». Cliquez sur le « + » en haut à droite et choisissez d"ajouter un utilisateur déjà enregistré avec un code ou d"ajouter ses informations. Un utilisateur de climatisation possédant un smartphone et déjà inscrit à Coldtivate dispose d"un code unique, accessible sous « Menu » -> « Détails du compte » -> « Informations personnelles » -> « Code d"importation d"utilisateur de climatisation ». Si l"utilisateur n"a pas de smartphone ou n"est pas encore inscrit, vous pouvez l"ajouter en indiquant son nom, son sexe et son numéro de téléphone. Si l"utilisateur n"a pas de numéro personnel, vous pouvez utiliser le numéro d"une autre personne (amis, famille, etc.). Veuillez noter qu"un numéro de téléphone ne peut être utilisé qu"une seule fois. Cliquez sur « Enregistrer les modifications » pour confirmer. Pour finaliser l"inscription, vous devez répondre à un court questionnaire en posant quelques questions à l"utilisateur de climatisation. L"enquête peut également être complétée ultérieurement en accédant à « Gestion » -> « Utilisateurs de refroidissement » -> « Enquête auprès des utilisateurs de refroidissement ».',
    },
    {
      id: 30,
      title:
        "L'utilisateur du système de refroidissement n'a pas le temps de répondre aux questions du sondage lors de son inscription. Que dois-je faire ?",
      role: [ERoles.OPERATOR],
      text: 'Vous pouvez passer les questions de l’enquête en cliquant sur "Compléter plus tard". Dans ce cas, vous serez invité à compléter l’enquête lors de la première création d’un enregistrement pour cet utilisateur de refroidissement. Il est recommandé de prendre le temps de répondre aux questions de l’enquête de manière approfondie : de cette façon, l’utilisateur peut bénéficier d’une expérience plus personnalisée avec l’application Coldtivate !',
    },
    {
      id: 31,
      title:
        "Un opérateur me demande un code pour m'ajouter à la liste des utilisateurs de climatisation de l'entreprise. Où puis-je trouver ce code ?",
      role: [ERoles.OPERATOR],
      text: 'Pour initier un enregistrement, accédez au tableau de bord et cliquez sur le bouton Gestionnaire d’activités en bas à droite, puis cliquez sur le bouton vert.',
    },
    {
      id: 32,
      title:
        "Je n'ai pas le temps de répondre aux questions du sondage lors de l'inscription. Que dois-je faire ?",
      role: [ERoles.OPERATOR],
      text: 'Il y a deux façons d"initier un départ, toutes deux commençant à la page du tableau de bord. Vous pouvez cliquer sur le bouton Gestionnaire d’activités en bas à droite, puis cliquer sur le bouton rouge. De cette manière, vous pouvez sélectionner quel utilisateur de refroidissement (et dans quelle unité de refroidissement) vous souhaitez commencer le départ, et vous pouvez retirer ses caisses de plusieurs enregistrements. Alternativement, vous pouvez cliquer sur "Voir les détails" pour un élément que vous voyez dans le tableau de bord (assurez-vous d"être dans la bonne unité de refroidissement), puis cliquer sur "Départ". Dans ce cas, vous ne pouvez retirer que les caisses de cet article de stockage.',
    },
    {
      id: 33,
      title: 'Je souhaite stocker mes récoltes en chambre froide. Comment puis-je les trouver ?',
      role: [ERoles.EMPLOYEE],
      text: 'Pour trouver des chambres froides près de chez vous, accédez à « Plus » en bas à droite de la barre de navigation, sélectionnez « Unités de réfrigération » et « Carte ». Vous pourrez alors rechercher des chambres froides à proximité, puis y déposer vos caisses. L"exploitant de la chambre froide pourra vous expliquer son fonctionnement, les modalités de facturation et les avantages de l"entreposage frigorifique.',
    },
    {
      id: 34,
      title: 'Comment puis-je initier un enregistrement ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Pour lancer un enregistrement, accédez au tableau de bord et cliquez sur le bouton Gestionnaire d"activités en bas à droite, puis cliquez sur le bouton vert.',
    },
    {
      id: 35,
      title: 'Comment puis-je lancer un paiement ?',
      role: [ERoles.OPERATOR],
      text: 'Il existe deux façons de lancer une sortie, toutes deux à partir du tableau de bord. Cliquez sur le bouton « Gestionnaire d"activités » en bas à droite, puis sur le bouton rouge. Vous pouvez ainsi sélectionner l"utilisateur (et l"unité de refroidissement) pour lequel vous souhaitez démarrer la sortie et retirer ses caisses de plusieurs entrées. Vous pouvez également cliquer sur « Voir les détails » pour un article affiché dans le tableau de bord (assurez-vous qu"il se trouve dans la bonne unité de refroidissement), puis cliquer sur « Retirer ». Dans ce cas, vous ne pouvez retirer que les caisses de cet article.',
    },
    {
      id: 36,
      title:
        " J'ai des capteurs de température dans la chambre froide. Peuvent-ils être connectés à Coldtivate ?",
      role: [ERoles.AUTH],
      text: 'Le Hub de Connaissance est une page accessible en cliquant sur le Menu en haut à gauche. Il contient des informations utiles sur les meilleures pratiques de stockage pour différents produits, y compris la température optimale et le temps de stockage approximatif à cette température.',
    },
    {
      id: 37,
      title: "Comment connecter les capteurs de la pièce avec l'application ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Si des capteurs de température dans la pièce peuvent être connectés à l"application Coldtivate, veuillez contacter votre responsable. Seuls les utilisateurs disposant du rôle d"employé enregistré peuvent associer des capteurs aux unités de refroidissement créées dans Coldtivate.',
    },
    {
      id: 38,
      title: "Comment puis-je régler la température de l'unité de refroidissement ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Le temps de collecte est le nombre de jours suggéré pour que l’utilisateur de refroidissement récupère une marchandise. Ensuite, la marchandise commencera à perdre sa commercialisation. Un temps de collecte égal à zéro indique que l’utilisateur doit venir récupérer immédiatement l’article en stockage et a jusqu’à 2 jours pour le vendre sur le marché. Il peut être vu dans le tableau de bord (en haut à droite) et dans la vue détaillée de chaque article de stockage.',
    },
    {
      id: 39,
      title:
        "Comment contacter un utilisateur de refroidissement pour l'étude de marché après stockage ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Les légumes et fruits frais sont périssables, et leur perte de fraîcheur après la récolte dépend en grande partie de la température. Le temps de retrait est donc calculé en fonction de la température de l"unité de refroidissement correspondante et de la qualité initiale du produit lorsqu"il est amené à l"unité de refroidissement. Les paramètres utilisés dans ce calcul sont uniques à chaque denrée. Vous pouvez obtenir des informations sur la manière dont la périssabilité diffère entre différentes denrées dans le Knowledge Hub.',
    },
    {
      id: 40,
      title: "Qu'est-ce que l'étude de marché après stockage et pourquoi dois-je la remplir ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'L"étude de marché est accessible en cliquant sur les trois points à côté de chaque passage en caisse dans l"onglet « Plus » -> « Historique », puis en sélectionnant « Remplir l"étude de marché ». Très courte, cette enquête demande des informations sur le prix de vente des produits que vous avez précédemment stockés dans la chambre froide, ainsi que sur leur avarie. Ces informations seront traitées de manière confidentielle et seront utilisées exclusivement par l"équipe Coldtivate pour évaluer l"impact de l"utilisation du stockage à froid. Un point rouge identifiera les passages en caisse pour lesquels l"étude de marché n"a pas encore été réalisée. Un rappel vous sera envoyé dans le panneau de notification pour les passages nécessitant votre attention. Cliquez sur la notification pour ouvrir l"enquête. Vous pouvez également accéder aux enquêtes à remplir dans l"onglet « Analyses », puis cliquer sur « Impact ».',
    },
    {
      id: 41,
      title: "Comment lire les informations d'un élément dans le tableau de bord ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Chaque élément du tableau de bord affiche un ensemble de caisses du même type de culture, enregistrées ensemble. Le nombre de jours indiqué en haut indique le nombre de jours restants jusqu"au moment du retrait. En dessous, vous trouverez le type de culture et l"identifiant d"enregistrement. Le nombre à côté du symbole de la caisse indique le nombre de caisses enregistrées. À côté, vous trouverez les frais de refroidissement et le nombre de jours de stockage des caisses. Le nombre à côté de la carte à droite indique le nombre de caisses en vente sur la place de marché. En bas de chaque article, vous trouverez le nom du propriétaire et ses coordonnées.',
    },
    {
      id: 42,
      title: "Quelle est l'heure de récupération ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'L"occupation est affichée en rouge lorsque plus de 80 % de la capacité de l"unité de refroidissement est utilisée. Les informations sur l"occupation future sont basées sur le nombre de jours que chaque utilisateur déclare comme jours prévus en stockage au moment de l"enregistrement. Attention, il s"agit juste d"une estimation et elle peut être inexacte. Ainsi, l"occupation rouge de la pièce est juste un signe que la pièce est en train de se remplir. Vous n"avez pas besoin de vous inquiéter, mais vous pouvez agir en conséquence. Par exemple, envisagez de contacter les utilisateurs de refroidissement dont la denrée en stockage a le temps de retrait le plus court pour leur conseiller de retirer bientôt. Vous pouvez voir une liste classée des articles les plus urgents à retirer sous ‘Tableau de bord’ lorsque vous triez par temps de retrait.',
    },
    {
      id: 43,
      title: 'Comment est calculé le délai de prise en charge ? Quels facteurs influencent-ils ?',
      role: [ERoles.OPERATOR],
      text: 'Les fruits et légumes frais sont périssables, et la perte de fraîcheur après la récolte dépend en grande partie de la température. Le délai de ramassage est donc calculé en fonction de la température de l"unité de refroidissement correspondante et de la qualité initiale du produit à son arrivée dans l"unité. Les paramètres utilisés dans ce calcul sont propres à chaque produit. Vous trouverez des informations sur les différences de périssabilité entre les différents produits dans le Centre de connaissances.',
    },
    {
      id: 44,
      title:
        'Le délai de ramassage est de 0 jour, mais les produits sont toujours en bon état. Pourquoi ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'La couleur représente les jours restants avant le temps de retrait. Vous verrez la barre en rouge lorsque le temps de retrait est inférieur à 2 jours, en jaune lorsqu"il est inférieur à 7 jours, et en vert lorsqu"il est supérieur à 7 jours. Ces valeurs sont spécifiques à chaque article de stockage et sont recalculées plusieurs fois par jour en fonction de la température dans l"unité de refroidissement. Lorsque aucun modèle de calcul n"est disponible, la couleur de la barre sera grise.',
    },
    {
      id: 45,
      title:
        'Le délai de ramassage est de plus de 0 jour, mais les produits sont presque périmés. Pourquoi ?',
      role: [ERoles.OPERATOR],
      text: 'Le tableau de bord peut prendre un moment pour se mettre à jour. Veuillez également vérifier que vous regardez dans la bonne unité de refroidissement. Si le problème persiste, veuillez le signaler à app@yourvcca.org.',
    },
    {
      id: 46,
      title:
        'Le délai de ramassage est de plus de 0 jour, mais les produits sont presque périmés. Pourquoi ?',
      role: [ERoles.OPERATOR],
      text: 'Le tableau de bord peut prendre un moment pour se mettre à jour. Veuillez également vérifier que les articles que vous avez retirés étaient les bons et que vous regardez dans la bonne unité de refroidissement. Si le problème persiste, veuillez le signaler à app@yourvcca.org.',
    },
    {
      id: 47,
      title:
        "Le taux d'occupation des chambres pour l'un des prochains jours est rouge (moins de 20 %). Sur quoi est-ce basé ? Dois-je m'inquiéter ?",
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'Le taux d"occupation est affiché en rouge lorsque plus de 80 % de la capacité de l"unité de refroidissement est utilisée. Les informations sur le taux d"occupation futur sont basées sur le nombre de jours de stockage prévus par chaque utilisateur lors de l"enregistrement. Attention, il ne s"agit que d"une estimation et celle-ci peut être inexacte. Par conséquent, le taux d"occupation rouge d"une chambre indique simplement que la chambre est bientôt pleine. Ne vous inquiétez pas, vous pouvez agir en conséquence. Par exemple, vous pouvez contacter les utilisateurs de climatisation dont le stock est le plus rapidement disponible pour les conseiller de partir rapidement. Vous pouvez consulter la liste des articles les plus urgents à retirer dans le « Tableau de bord » lorsque vous classez par heure de retrait.',
    },
    {
      id: 48,
      title:
        "Un utilisateur du système de climatisation apporte dans la pièce un produit qui ne figure pas sur la liste. Puis-je quand même l'enregistrer ?",
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'La notification est envoyée après n"avoir pas reçu de données du capteur pendant plus de 12 heures, et cela signifie que la température définie dans le panneau ‘Unités de refroidissement’ > ‘Conditions de la pièce’ est désormais utilisée. L"application essaiera de se reconnecter au capteur toutes les heures, donc nous vous conseillons d"attendre quelques heures si cela est un problème de connectivité. S"il n"y a pas de nouvelles données de capteur pendant plusieurs heures ou jours, le problème pourrait être du côté du matériel, par exemple, le capteur pourrait être à court de batterie.',
    },
    {
      id: 49,
      title:
        'Dans le tableau de bord, chaque élément est représenté par une barre colorée. Que représente cette couleur ?',
      role: [ERoles.EMPLOYEE],
      text: 'Lorsque aucun capteur n"est connecté à l"application, le modèle pour calculer le temps de retrait repose sur la température définie par l"Opérateur. C"est aussi la raison pour laquelle l"Opérateur est invité à saisir une nouvelle température définie à chaque nouvel enregistrement et retrait. Pour que le modèle soit précis, il est crucial que la température soit à jour. Veuillez instruire les opérateurs de votre unité de refroidissement à ce sujet important.',
    },
    {
      id: 50,
      title:
        "J'ai terminé un enregistrement, mais je ne vois pas encore les éléments dans le tableau de bord. Pourquoi ?",
      role: [ERoles.OPERATOR],
      text: 'L"alerte apparaît lorsque la température définie pour l"unité de refroidissement est en dehors de la plage de température recommandée pour le produit que vous enregistrez. Veuillez vérifier la température actuelle de la pièce et ajuster la température définie si nécessaire. Si vous avez besoin d"aide, n"hésitez pas à contacter l"équipe de support.',
    },
    {
      id: 51,
      title:
        "J'ai terminé une commande, mais je vois toujours les articles dans le tableau de bord. Pourquoi ?",
      role: [ERoles.OPERATOR],
      text: 'La mise à jour du tableau de bord peut prendre un certain temps. Veuillez également vérifier que les éléments que vous avez vérifiés sont les bons et que vous recherchez le bon appareil de refroidissement. Si le problème persiste, veuillez le signaler à app@yourvcca.org.',
    },
    {
      id: 52,
      title: 'Comment puis-je vérifier que le capteur de température fonctionne correctement ?',
      role: [ERoles.OPERATOR],
      text: 'L"équipe de développement de l"application collecte des informations de base sur les utilisateurs de refroidissement lorsqu"ils commencent à utiliser la pièce, comme données de référence qui seront comparées aux données acquises par l"application. L"objectif est d"améliorer la conception de l"application et l"utilisation de la chambre froide.',
    },
    {
      id: 53,
      title:
        "J'ai reçu une notification indiquant que le capteur ne fonctionne pas. Que dois-je faire ?",
      role: [ERoles.OPERATOR],
      text: 'Vous serez invité à contacter un utilisateur de refroidissement qui a récemment effectué un check-out de produits de la pièce et à demander où et à quel prix il/elle a vendu l"article stocké dans la pièce. Cette information aidera l"équipe de développement de l"application à valider et améliorer l"exactitude des prévisions de prix du marché fournies.',
    },
    {
      id: 54,
      title: "Comment calculer le temps de prise en charge s'il n'y a pas de capteurs ?",
      role: [ERoles.EMPLOYEE],
      text: 'Assurez-vous de consulter le tutoriel et la section FAQ, car ils contiennent des informations utiles sur l"application qui peuvent aider à clarifier vos questions. Si vous souhaitez contacter l"équipe de support de l"application, veuillez envoyer un e-mail à app@yourvcca.org.',
    },
    {
      id: 55,
      title:
        'À chaque fois que je lance un enregistrement, je reçois une alerte de température. Pourquoi ?',
      role: [ERoles.OPERATOR],
      text: 'Assurez-vous de consulter le tutoriel et la section FAQ, car ils contiennent des informations utiles sur l"application qui peuvent aider à clarifier vos questions. Si votre question reste sans réponse, veuillez contacter l"employé enregistré à qui vous faites rapport.',
    },
    {
      id: 56,
      title:
        'À chaque fois que je finalise un paiement, je reçois une alerte de température. Pourquoi ?',
      role: [ERoles.EMPLOYEE],
      text: 'Veuillez vous assurer que vous avez la dernière version de l"application installée. Si le problème persiste, veuillez notifier l"équipe de support de l"application en envoyant un e-mail à app@yourvcca.org ou en remplissant le formulaire de retour : https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 57,
      title:
        'Pourquoi dois-je demander à un utilisateur de climatisation de remplir un questionnaire avant de pouvoir enregistrer la première caisse ?',
      role: [ERoles.OPERATOR],
      text: 'Veuillez vous assurer que vous avez la dernière version de l"application installée. Si le problème persiste, veuillez contacter l"employé enregistré à qui vous faites rapport et/ou notifier l"équipe de support de l"application en envoyant un e-mail à app@yourvcca.org ou en remplissant le formulaire de retour : https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 58,
      title:
        "Pourquoi dois-je remplir un questionnaire lors de mon inscription sur l'application ?",
      role: [ERoles.EMPLOYEE],
      text: 'L"équipe de support de l"application aimerait connaître votre expérience avec cette application et accueille vos retours, veuillez envoyer un e-mail à app@yourvcca.org ou soumettre votre avis via le formulaire : https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 60,
      title:
        'Pourquoi dois-je demander aux utilisateurs de systèmes de refroidissement le prix de vente de chaque élément de stockage ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Dans cet onglet, vous pouvez voir les prévisions de prix du marché soit sous forme de graphique, soit sous forme de tableau. La page Tendances des Prix permet de visualiser les données du mois dernier et les prévisions sur 14 jours pour un marché et une marchandise spécifiques (en Inde) ou une prévision mensuelle par État (au Nigéria). La page Classement des Prix permet de visualiser toutes les prévisions de prix du marché classées de la plus élevée à la plus basse, avec la possibilité de filtrer par date, État, district et marché (en Inde).',
    },
    {
      id: 61,
      title: "Je ne comprends pas certaines parties de l'application. Qui dois-je contacter ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'N"oubliez pas de consulter le tutoriel et la FAQ, car ils contiennent des informations utiles sur l"application qui pourront répondre à vos questions. Pour contacter l"équipe d"assistance de l"application, veuillez envoyer un e-mail à app@yourvcca.org.',
    },
    {
      id: 62,
      title: "Je ne comprends pas certaines parties de l'application. Qui dois-je contacter ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Un modèle d"apprentissage automatique est formé sur les données historiques des prix du marché et d"autres données telles que le taux de conversion de la devise et le prix de l"essence, pour faire des prévisions des prix futurs du marché.',
    },
    {
      id: 66,
      title: "Je ne comprends pas certaines parties de l'application. Qui dois-je contacter ?",
      role: [ERoles.COOLING_USER],
      text: 'Vous pouvez passer les questions de l’enquête en cliquant sur "Compléter plus tard". Vous trouverez l’enquête dans les Détails de votre compte et pouvez la compléter à tout moment. Cependant, il est recommandé de prendre le temps de répondre aux questions de l’enquête de manière approfondie lorsque vous commencez à utiliser la pièce : ainsi, vous bénéficierez d’une expérience plus personnalisée avec l’application Coldtivate !',
    },
    {
      id: 67,
      title: "J'ai trouvé un bug dans l'application. Qui dois-je contacter ?",
      role: [ERoles.COOLING_USER],
      text: 'Veuillez vous assurer que vous disposez de la dernière version de l"application. Si le problème persiste, veuillez contacter l"équipe d"assistance de l"application par e-mail à app@yourvcca.org ou en remplissant le formulaire de commentaires : https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 68,
      title:
        "Quelque chose ne fonctionne pas correctement dans l'application. Qui dois-je contacter ?",
      role: [ERoles.OPERATOR],
      text: 'S’il y a des capteurs de température dans la pièce qui peuvent être connectés à l’application Coldtivate, veuillez communiquer avec votre responsable. Seul un utilisateur avec un rôle d’employé enregistré peut lier les capteurs aux unités de refroidissement créées dans Coldtivate.',
    },
    {
      id: 69,
      title:
        "Quelque chose ne fonctionne pas correctement dans l'application. Qui dois-je contacter ?",
      role: [ERoles.COOLING_USER],
      text: 'Veuillez vous assurer que la dernière version de l"application est installée. Si le problème persiste, veuillez contacter l"exploitant de la chambre froide et/ou informer l"équipe d"assistance de l"application en envoyant un e-mail à app@yourvcca.org.',
    },
    {
      id: 70,
      title:
        "Je souhaite donner mon avis sur mon expérience avec l'application. Qui dois-je contacter ?",
      role: [ERoles.COOLING_USER],
      text: 'Le temps de retrait est une valeur prédite. Ainsi, il peut arriver dans de rares cas que les produits se gâtent alors que le temps de retrait est supérieur à 0. Comme la détérioration de la qualité des produits frais dépend largement de la température, les données de température aident à rendre la prédiction plus précise. Par exemple, le problème peut survenir lorsque les capteurs de température ne sont pas liés à l"application et que l"opérateur n"a pas régulièrement mis à jour la température de la pièce dans l"application. Veuillez notifier l"opérateur de la pièce si cela se produit.',
    },
    {
      id: 71,
      title:
        "Je souhaite donner mon avis sur mon expérience avec l'application. Qui dois-je contacter ?",
      role: [ERoles.COOLING_USER],
      text: 'L"équipe de développement de l"application collecte des informations de base sur les utilisateurs de refroidissement lorsqu"ils commencent à utiliser la pièce, comme données de référence qui seront comparées aux données acquises par l"application. L"objectif est d"améliorer la conception de l"application et l"utilisation de la chambre froide.',
    },
    {
      id: 73,
      title:
        "Je souhaite donner mon avis sur mon expérience avec l'application. Qui dois-je contacter ?",
      role: [ERoles.COOLING_USER],
      text: 'Assurez-vous de consulter le tutoriel et la section FAQ, car ils contiennent des informations utiles sur l"application qui peuvent aider à clarifier vos questions. Si votre question reste sans réponse, veuillez contacter l"opérateur de la chambre froide ou écrire à app@yourvcca.org.',
    },
    {
      id: 74,
      title:
        "Je suis dans une zone où la connexion Internet est faible : puis-je quand même utiliser l'application ?",
      role: [ERoles.COOLING_USER],
      text: 'Veuillez vous assurer que vous avez la dernière version de l"application installée. Si le problème persiste, veuillez contacter l"opérateur de la chambre froide et/ou notifier l"équipe de support de l"application en envoyant un e-mail à app@yourvcca.org.',
    },
    {
      id: 75,
      title: "Quels prix sont affichés lorsque vous cliquez sur l'icône « Prix des cultures » ?",
      role: [ERoles.EMPLOYEE],
      text: 'Pour supprimer votre compte, vous pouvez accéder à "Menu" -> "Détails du compte", puis cliquer sur Supprimer. Veuillez faire attention, cette action ne peut pas être annulée ! Si vous êtes le dernier employé enregistré de l"entreprise, cette action supprimera l"entreprise. S"il y a des enregistrements en attente, vous ne pourrez pas supprimer votre compte tant que toutes les caisses n"ont pas été enregistrées dans l"application par l"un de vos opérateurs.',
    },
    {
      id: 76,
      title:
        'Pourquoi certains États et marchés manquent-ils dans la section « Prix des récoltes » ?',
      role: [ERoles.OPERATOR],
      text: 'Pour supprimer votre compte, vous pouvez accéder à "Menu" -> "Détails du compte", puis cliquer sur Supprimer. Veuillez faire attention, cette action ne peut pas être annulée ! Si vous êtes le dernier opérateur assigné à l"une des chambres où il y a des enregistrements ouverts, vous ne pouvez pas supprimer votre compte tant qu"un employé enregistré n"a pas assigné un autre opérateur à la chambre, ou tant que toutes les caisses n"ont pas été enregistrées dans l"application.',
    },
    {
      id: 77,
      title: 'Comment sont calculés les prix futurs du marché ?',
      role: [ERoles.COOLING_USER],
      text: 'Pour supprimer votre compte, vous pouvez accéder à "Menu" -> "Détails du compte", puis cliquer sur Supprimer. Veuillez faire attention, cette action ne peut pas être annulée ! Si vous avez des enregistrements ouverts dans l"une des chambres, vous ne pouvez pas supprimer votre compte tant que toutes les caisses n"ont pas été enregistrées dans les chambres. Veuillez vous assurer de récupérer vos caisses dans la chambre ! Si vous pensez qu"il y a des caisses en attente dans l"application que vous avez déjà retirées, veuillez communiquer avec l"opérateur de la chambre pour résoudre le problème.',
    },
    {
      id: 78,
      title: 'Je souhaite supprimer mon compte. Que dois-je faire ?',
      role: [ERoles.EMPLOYEE],
      text: 'Vous pouvez supprimer des unités de refroidissement et des emplacements en accédant à "Menu" -> "Gestion" -> "Unités de Refroidissement" / "Emplacements" et en cliquant sur Supprimer. Vous ne pourrez le faire que s"il n"y a pas d"enregistrements en attente dans les chambres. Sinon, veuillez communiquer avec les opérateurs pour terminer les enregistrements avant de tenter de supprimer les chambres et les emplacements.',
    },
    {
      id: 79,
      title: 'Je souhaite supprimer mon compte. Que dois-je faire ?',
      role: [ERoles.EMPLOYEE],
      text: 'Vous n"êtes pas autorisé à supprimer d"autres utilisateurs de l"application. Cependant, vous pouvez désassigner des opérateurs de vos chambres en accédant à "Menu" -> "Gestion" -> "Opérateurs". Si vous souhaitez néanmoins supprimer entièrement l"utilisateur afin qu"il n"ait plus accès à votre entreprise, veuillez envoyer un e-mail à app@yourvcca.org et expliquer pourquoi cela est nécessaire.',
    },
    {
      id: 80,
      title: 'Je souhaite supprimer mon compte. Que dois-je faire ?',
      role: [ERoles.OPERATOR],
      text: 'Pour supprimer un utilisateur de refroidissement de la liste, accédez à "Gestion" -> "Utilisateurs de Refroidissement", cliquez sur le nom de l"utilisateur de refroidissement puis sur le bouton "Supprimer". Veuillez noter que seuls les utilisateurs sans enregistrements en attente peuvent être supprimés ! S"il y a des enregistrements en attente, veuillez contacter l"utilisateur pour qu"il récupère la production. Notez que cette action ne peut pas être annulée ! Si l"utilisateur a un smartphone, cette opération le retirera de votre liste, mais l"utilisateur pourra toujours utiliser Coldtivate. Si l"utilisateur n"a pas de smartphone, cette opération supprimera son compte et libérera le numéro de téléphone associé.',
    },
    {
      id: 81,
      title: 'Comment puis-je supprimer une unité de refroidissement ou un emplacement ?',
      role: [ERoles.EMPLOYEE],
      text: 'Pour vérifier la dernière fois que les opérateurs et autres employés enregistrés se sont connectés à l"application, vous pouvez accéder à "Menu" -> "Gestion" -> "Opérateur" / "Fournisseur de services". La date et l"heure que vous voyez à côté du nom sont la date et l"heure de la dernière connexion.',
    },
    {
      id: 82,
      title:
        'Comment puis-je supprimer un autre employé enregistré ou un opérateur de mon entreprise ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Vous n"êtes pas autorisé à supprimer d"autres utilisateurs de l"application. Cependant, vous pouvez retirer des opérateurs de vos salles en accédant à « Menu » -> « Gestion » -> « Opérateurs ». Si vous souhaitez néanmoins supprimer définitivement l"utilisateur afin qu"il n"ait plus accès à votre entreprise, veuillez envoyer un e-mail à app@yourvcca.org et expliquer pourquoi.',
    },
    {
      id: 83,
      title: 'Comment puis-je supprimer un utilisateur de refroidissement de la liste ?',
      role: [ERoles.COOLING_USER],
      text: 'En cliquant sur un article dans le tableau de bord, vous pouvez voir le nom et le numéro de contact de l"opérateur qui a effectué l"enregistrement pour vous. Vous pouvez copier le numéro dans le presse-papiers et contacter l"opérateur par téléphone ou SMS.',
    },
    {
      id: 84,
      title: "Où puis-je vérifier si les opérateurs ont récemment utilisé l'application ?",
      role: [ERoles.COOLING_USER],
      text: 'Pour vérifier la dernière connexion des opérateurs et autres employés inscrits à l"application, accédez à « Menu » -> « Gestion » -> « Opérateur » / « Employé inscrit ». La date et l"heure indiquées à côté du nom correspondent à la dernière connexion.',
    },
    {
      id: 85,
      title:
        "Où puis-je surveiller les revenus générés par chaque salle et d'autres statistiques d'utilisation ?",
      role: [ERoles.COOLING_USER],
      text: 'Accédez à « Menu » -> « Gestion » -> « Analyse des revenus », sélectionnez les unités de refroidissement et l"intervalle de temps souhaité. Vous verrez alors le revenu total associé aux sorties de ces salles. Vous pouvez également filtrer par utilisateur, mode de paiement et heure. Pour visualiser les statistiques récapitulatives de vos entrées par salle (nombre d"utilisateurs, nombre total de caisses, etc.), accédez à « Menu » -> « Gestion » -> « Analyse d"utilisation ». Vous pouvez également filtrer par date et par unité de refroidissement. Les informations sont téléchargeables au format Excel sur les deux pages. L"onglet « Analyse » propose un tableau de bord contenant des informations sur les utilisateurs, les revenus, l"utilisation et l"impact. Enfin, pour suivre le nombre total de caisses, leur poids et les températures optimales pour les cultures actuellement présentes dans la salle, accédez à « Plus » -> « Unités de refroidissement » -> « Informations sur les caisses ».',
    },
    {
      id: 86,
      title:
        'Comment puis-je savoir qui est la personne à contacter pour une unité de refroidissement où mes produits sont stockés ?',
      role: [ERoles.OPERATOR],
      text: 'L"équipe de support de l"application aimerait connaître votre expérience avec cette application et accueille vos retours, veuillez envoyer un e-mail à app@yourvcca.org ou soumettre votre avis via le formulaire : https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 87,
      title: "J'ai reçu une notification. Que dois-je faire ?",
      role: [ERoles.COOLING_USER],
      text: 'L"équipe de support de l"application aimerait connaître votre expérience avec cette application et accueille vos retours, veuillez envoyer un e-mail à app@yourvcca.org.',
    },
    {
      id: 88,
      title: 'Que montre la carte des unités de refroidissement ?',
      role: [ERoles.COOLING_USER],
      text: 'Sur la carte, vous pouvez visualiser votre position (l"autorisation d"accès à Coldtivate vous sera demandée), l"emplacement des unités de refroidissement autour de vous et certaines informations les concernant (produit unique ou multiple, entreprise, prix). En vous rendant dans la chambre froide, vous pourrez obtenir des informations complémentaires auprès de l"exploitant sur le fonctionnement de l"unité et les possibilités de stockage.',
    },
    {
      id: 89,
      title: " Comment puis-je changer la langue de l'application ?",
      role: [ERoles.AUTH],
      text: ' Pour changer la langue de l"application, vous pouvez cliquer sur le menu déroulant que vous voyez en bas de la page d"accueil ou, une fois connecté à votre profil, accéder au « Menu » -> « Détails du compte » -> « Préférences de localisation ».',
    },
    {
      id: 90,
      title:
        'Mon type de capteur de température est compatible avec Coldtivate (Ecozen, UbiBot, Figorr, Victron Energy). Comment configurer les capteurs ?',
      role: [ERoles.EMPLOYEE],
      text: 'Pour connecter un capteur à un climatiseur, accédez à « Menu » -> « Gestion » -> « Unités de refroidissement », sélectionnez l"unité pour laquelle le capteur doit être configuré, puis activez « Capteur disponible ». Suivez les instructions pour chaque type de capteur pris en charge et authentifiez-vous. N"oubliez pas de cliquer sur « Enregistrer » en bas de la page pour que les modifications soient prises en compte. Vous devriez voir les relevés de température de vos capteurs dans les 6 heures suivantes sous « Plus » -> « Unités de refroidissement » -> « Conditions ambiantes ».',
    },
    {
      id: 91,
      title:
        " Quelle est la différence entre les vues « Entreprise », « Agrégée » et « Comparaison » dans l'onglet Analyses ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'L"onglet « Analyses » de la barre de navigation fournit des statistiques récapitulatives pour toutes les chambres froides de l"entreprise. La vue « Entreprise » affiche les données relatives aux utilisateurs, à l"utilisation et à l"impact de toutes les unités de refroidissement depuis votre première utilisation de Coldtivate. En cliquant sur « Agrégé », vous êtes invité à configurer les unités de refroidissement et la période qui vous intéressent. Les données affichées concernant les utilisateurs, l"utilisation et l"impact sont agrégées pour les unités de refroidissement sélectionnées sur la période choisie. Pour comparer les unités, utilisez l"onglet « Comparaison ». Les données sont alors présentées sous forme de tableaux, où sont présentées les données de chaque unité de refroidissement sur la période choisie. Vous pouvez trier les données et modifier les unités de refroidissement et la période à tout moment.',
    },
    {
      id: 92,
      title: 'Comment les données affichées dans l’onglet Analytics sont-elles calculées ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'L"onglet « Analyses » a pour objectif d"offrir une vue d"ensemble de l"activité des chambres froides. Les données d"utilisation et d"utilisation sont calculées à partir des entrées et sorties enregistrées dans Coldtivate. Vous pouvez ainsi comprendre le nombre d"utilisateurs et d"opérations effectuées, ainsi que le chiffre d"affaires ou le taux d"occupation moyen de chaque chambre froide. Les données de la section « Impact », quant à elles, sont basées sur des enquêtes que les utilisateurs de la chambre froide sont invités à remplir lors de leur inscription (c"est-à-dire avant de commencer à utiliser la chambre froide) et régulièrement lors de la sortie des produits de la chambre froide. Ces données sont essentielles pour estimer l"évolution des pertes post-récolte et des revenus des utilisateurs liés à l"utilisation de la chambre froide. Enfin, l"estimation du CO₂ compare les émissions liées au refroidissement des récoltes stockées en chambre froide aux émissions prévues que la même récolte aurait générées si elle avait été stockée sans réfrigération.',
    },
    {
      id: 93,
      title: 'Comment les données affichées dans l’onglet Analytics sont-elles calculées ?',
      role: [ERoles.COOLING_USER],
      text: 'L"onglet « Analyses » a pour objectif de vous offrir une vue d"ensemble de l"impact du refroidissement sur vos cultures. Les données affichées sous « Caisses » sont calculées à partir des informations d"entrée et de sortie enregistrées dans Coldtivate. Vous pouvez ainsi connaître la quantité stockée, la récolte et la durée moyenne de stockage. Les données de la section « Impact » sont basées sur des questionnaires que vous devez remplir lors de votre inscription (c"est-à-dire avant de commencer à utiliser la chambre froide) et régulièrement lors de la sortie des produits de la chambre froide. Ces données sont essentielles pour estimer l"évolution des pertes et des revenus post-récolte liés à l"utilisation du refroidissement. Un rappel vous invitant à remplir ces questionnaires est affiché en haut de la page, et nous vous encourageons à les remplir dès que possible. Dans les deux sections, vous pouvez utiliser le bouton « Configurer » en haut à droite pour sélectionner des chambres froides spécifiques ou une période. Si rien n"est sélectionné, vous verrez toutes les données disponibles depuis que vous avez commencé à utiliser Coldtivate.',
    },
    {
      id: 94,
      title: 'Je me connecte, mais je ne vois pas la fonctionnalité Marketplace. Pourquoi ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Si la place de marché est prise en charge dans votre pays, vous verrez une icône « Place de marché » dans la barre de navigation inférieure. Si vous ne la voyez pas, cela signifie que cette fonctionnalité n"est pas prise en charge dans votre pays. Pour le moment, la place de marché est réservée aux utilisateurs basés au Nigéria. Si vous êtes un employé inscrit et souhaitez tester la place de marché dans votre pays, veuillez nous contacter à l"adresse app@yourvcca.org.',
    },
    {
      id: 95,
      title: ' Quel est le rôle d’une entreprise de refroidissement sur le marché ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Une entreprise de réfrigération et ses employés peuvent décider de leur niveau d"implication sur la place de marché. Comme cette fonctionnalité repose sur l"enregistrement des caisses dans l"application Coldtivate, une place de marché ne peut fonctionner que si l"exploitant de la chambre froide enregistre régulièrement les entrées et les sorties dans l"application. Pour les produits achetés via la place de marché, l"entreprise de réfrigération perçoit les frais de réfrigération dans le cadre de la transaction numérique. Il est donc crucial qu"un employé inscrit définisse les coordonnées bancaires de l"entreprise : pour ce faire, accédez à « Menu » -> « Gestion » -> « Paramètres du vendeur (entreprise) » -> « Options de paiement ». De plus, les entreprises de réfrigération peuvent décider d"acheter des produits aux agriculteurs (en tant qu"acheteur) et de les revendre sur la place de marché (en tant que vendeur). Les deux transactions peuvent être effectuées via la place de marché Coldtivate. Notez que les opérateurs et les employés inscrits ont le choix d"acheter pour eux-mêmes (à titre individuel) ou pour le compte de l"entreprise qu"ils représentent.',
    },
    {
      id: 96,
      title: 'Quel est le rôle d’un opérateur de chambre froide sur le marché ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: ' Les opérateurs de chambres froides sur la place de marché ont trois rôles principaux. 1) Ils aident les utilisateurs de chambres froides sans smartphone à créer leur compte bancaire (afin de pouvoir recevoir des paiements numériques), à lister leurs caisses « à vendre » et à leur prix. 2) Ils sont responsables de l"organisation des produits dans la chambre froide, selon le principe selon lequel tous les produits contenus dans une caisse appartiennent à un seul utilisateur : lorsqu"une partie des produits d"une caisse est achetée (et appartient donc à un autre propriétaire), l"opérateur reçoit une notification lui demandant de déplacer les produits achetés dans une caisse séparée. Si une caisse entière est achetée, aucune action n"est requise. 3) Les opérateurs de chambres froides sont responsables de toutes les opérations de paiement, y compris celles résultant de la place de marché : lorsqu"un acheteur (ou un livreur) arrive à la chambre froide pour récupérer les produits achetés, l"opérateur doit encaisser cette caisse auprès de Coldtivate.',
    },
    {
      id: 97,
      title: 'Comment les frais de refroidissement sont-ils collectés sur le marché ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lors de l"achat de caisses sur la place de marché, les frais de refroidissement en vigueur jusqu"à ce jour sont déduits du prix payé par l"acheteur et transférés à l"entreprise de réfrigération. Ainsi, le vendeur n"a pas à régler ces frais, car ils sont déjà réglés lors de la transaction numérique. Il est donc essentiel que le vendeur et l"entreprise de réfrigération disposent d"un compte bancaire sur Coldtivate. Par exemple, si une caisse est achetée 20 USD et que le vendeur doit 3 USD de frais de refroidissement, sur les 20 USD payés par l"acheteur, 17 USD seront virés sur son compte bancaire et 3 USD sur celui de l"entreprise de réfrigération. Si l"acheteur vient récupérer les produits le jour même de l"achat, aucun autre frais de refroidissement n"est dû (car les frais journaliers sont déjà réglés par le vendeur). En revanche, si l"acheteur décide de conserver les produits en chambre froide, les frais de refroidissement standard s"appliquent et le prix sera calculé en fonction du nombre de jours de conservation des produits en chambre froide jusqu"à leur retrait par l"acheteur. L"exploitant de la chambre froide est responsable de la perception de ces frais de refroidissement lors du passage en caisse. Notez que la même logique s"applique en cas de livraison.',
    },
    {
      id: 98,
      title: 'Comment puis-je commencer à vendre des produits sur le marché ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Pour que vos caisses soient disponibles à la vente, vous devez effectuer deux actions. 1) Créez un compte bancaire sur lequel les revenus seront déposés. Si vous avez un smartphone, accédez à « Menu » -> « Détails du compte » -> « Options de paiement ». Si vous n"avez pas de smartphone, l"opérateur peut configurer les comptes bancaires depuis son interface (« Gestion » -> « Utilisateurs en cours de refroidissement » -> « Détails de paiement ». Veuillez noter que tous les paiements étant effectués numériquement sur la place de marché, vous devez fournir un compte bancaire valide avant de mettre quoi que ce soit en vente. 2) Si vous avez un smartphone, pour chaque lot de caisses enregistré, cliquez sur le signe « > » à droite de chaque élément du tableau de bord, accédez à « Poids des caisses et liste de la place de marché », définissez les caisses à mettre en vente et le prix au kg. Les consommateurs sur la place de marché pourront consulter ces caisses et les acheter au montant indiqué. Vous recevrez une notification dès qu"un achat sera finalisé. Si vous n"avez pas de smartphone, l"opérateur de la chambre froide pourra mettre des caisses en vente lors de votre enregistrement, ou après, en suivant les mêmes étapes. Vous recevrez un SMS si l"opérateur met à jour vos caisses ou leur prix après l"enregistrement.',
    },
    {
      id: 99,
      title: 'Les acheteurs peuvent-ils voir mes coordonnées ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' Vous pouvez décider vous-même si les clients intéressés par vos produits doivent avoir accès à vos coordonnées. Cela peut être utile en cas de négociation de prix ou de commandes récurrentes de produits non encore stockés en chambre froide (et donc invisibles pour l"acheteur). Vous pouvez modifier vos paramètres à tout moment dans « Menu » -> « Détails du compte » -> « Partage des contacts ».',
    },
    {
      id: 100,
      title: ' Je souhaite offrir une remise à un acheteur. Comment faire ?',
      role: [ERoles.EMPLOYEE],
      text: 'Sous « Menu » -> « Détails du compte » -> « Coupons de réduction », vous pouvez créer des coupons avec un code et un pourcentage de réduction. Ces coupons sont valables pour les produits que vous vendez (individuellement). Pour définir des coupons valables pour les produits appartenant à l"entreprise, accédez à « Menu » -> « Gestion » -> « Coupons de réduction » sous « Paramètres du vendeur (Entreprise) ». Vous pouvez partager le code avec le client, qui peut l"utiliser sur l"écran de paiement. Les codes restent valables jusqu"à leur révocation. Si vous souhaitez offrir une réduction à tous les acheteurs potentiels, vous pouvez baisser le prix de vente affiché sur la place de marché.',
    },
    {
      id: 101,
      title: ' Je souhaite offrir une remise à un acheteur. Comment faire ?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Sous « Menu » -> « Détails du compte » -> « Coupons de réduction », vous pouvez créer des coupons avec un code et un pourcentage de réduction. Vous pouvez partager le code avec le client, qui pourra l"utiliser sur l"écran de paiement. Les codes restent valables jusqu"à leur révocation. Si vous souhaitez offrir une réduction à tous les acheteurs potentiels, vous pouvez baisser le prix de vente affiché sur la place de marché.',
    },
    {
      id: 102,
      title:
        ' Comment les exploitants de chambres froides peuvent-ils m’aider à commercialiser mes récoltes ?',
      role: [ERoles.COOLING_USER],
      text: 'Les opérateurs de chambres froides sont votre interlocuteur pour tout ce qui concerne le stockage des produits en chambres froides et peuvent également vous aider à commercialiser vos récoltes, même sans smartphone. Depuis leur interface, ils peuvent configurer vos coordonnées bancaires, où vous percevrez les revenus de la vente de vos produits. Lors de votre enregistrement, ils peuvent vous aider à mettre vos caisses en vente, ce qui les rend visibles sur la place de marché, et à fixer le prix de vente (au kg) de chaque produit. Si vous changez d"avis, vous pouvez toujours demander à ajouter ou supprimer des caisses de la place de marché en les ajoutant ou en les supprimant. Dans certaines chambres froides, les opérateurs ou leurs collaborateurs sont également chargés d"acheter les produits directement auprès des agriculteurs et de les vendre aux détaillants. Que vous soyez agriculteur, commerçant ou détaillant intéressé par cette option, veuillez contacter l"entreprise de réfrigération pour explorer cette opportunité.',
    },
    {
      id: 103,
      title:
        "Quelle est l'option « Acheter au nom de l'entreprise » que je vois sur la place de marché ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Les opérateurs et les employés inscrits peuvent vendre et acheter des produits sur la place de marché, que ce soit pour eux-mêmes, à titre individuel ou au nom de l"entreprise qu"ils représentent. Cette option permet d"effectuer toutes les transactions depuis et vers le compte bancaire de l"entreprise, et non via les comptes bancaires individuels. Lorsqu"un opérateur ou un employé inscrit achète des produits « pour le compte d"une entreprise », celle-ci verse le montant dû au vendeur et devient propriétaire des caisses. Si ces caisses sont mises en vente sur la place de marché, elles sont présentées comme appartenant à l"entreprise de réfrigération, et les frais de vente sont versés sur le compte bancaire de l"entreprise. Lorsqu"un opérateur ou un employé inscrit achète des produits pour lui-même, il paie le montant dû au vendeur à partir de ses coordonnées bancaires personnelles et devient propriétaire des caisses. Si les caisses sont stockées dans l"unité de réfrigération, elles seront répertoriées au nom de l"opérateur ou de l"employé inscrit ; si elles sont mises en vente sur la place de marché, elles seront également présentées comme appartenant à l"opérateur ou à l"employé inscrit.',
    },
    {
      id: 104,
      title: 'Quels sont les frais affichés sur la place de marché ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' Le prix de vente de chaque article affiché sur la place de marché est fixé directement par le vendeur et dépend du nombre de kilos achetés. À ce montant s"ajoutent deux frais : les frais de place de marché, qui correspondent à une commission de transaction de 3,5 %, prélevée par l"équipe Coldtivate pour l"hébergement et le maintien de l"application. Les frais de paiement, quant à eux, sont facturés par le système de paiement numérique (PayStack au Nigeria) pour traiter la transaction.',
    },
    {
      id: 105,
      title:
        'Je souhaite acheter des produits frais en chambre froide, mais je ne trouve rien sur le marché. Pourquoi ?',
      role: [ERoles.COOLING_USER],
      text: 'Si vous accédez à l"onglet Place de marché mais que vous ne trouvez aucun produit, cela peut être dû aux filtres que vous avez appliqués à la recherche (comme la localisation, la fourchette de prix ou la culture souhaitée), ou au fait qu"aucun article n"est disponible à la vente à proximité. Si vous connaissez une chambre froide à proximité, nous vous recommandons de demander à l"exploitant si un utilisateur de la chambre froide souhaite vendre des produits via la place de marché et de demander que ces articles soient répertoriés dans l"application.',
    },
    {
      id: 106,
      title: 'Offrez-vous des services de livraison ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'La place de marché ne propose pas encore de services de livraison, mais facilite la mise en relation avec des solutions logistiques capables de livrer les produits aux acheteurs. En tant qu"employé inscrit, vous avez la possibilité d"ajouter des contacts de livraison sous « Menu » -> « Gestion » -> « Paramètres du vendeur (entreprise) » -> « Contacts de livraison ». Ces informations sont visibles pour tous les acheteurs achetant des produits dans vos chambres froides lors du paiement. Si vous êtes acheteur, nous vous encourageons à les contacter pour organiser votre livraison. Veuillez noter que si les produits sont retirés le jour même de l"achat, aucuns frais de refroidissement ne s"appliquent. En revanche, si vous stockez les récoltes, des frais de refroidissement quotidiens sont dus. Assurez-vous d"en discuter avec le contact de livraison avec lequel vous négociez.',
    },
    {
      id: 107,
      title:
        " J'ai reçu une notification dans l'application indiquant que « Les produits doivent être redistribués ». Qu'est-ce que c'est ?",
      role: [ERoles.OPERATOR],
      text: 'En raison de la procédure d"enregistrement en chambre froide, le contenu d"une caisse appartient à un seul agriculteur ou commerçant. Comme sur la place de marché, un acheteur peut acheter quelques kilos d"une caisse appartenant à un vendeur, la quantité achetée doit être transférée dans une caisse séparée. Cette notification vous informe qu"un achat a été finalisé et, en cliquant dessus, vous pouvez visualiser dans quelle caisse les produits doivent être prélevés. L"organisation des caisses est essentielle pour éviter les erreurs d"enregistrement et pour que les frais de refroidissement soient correctement perçus. Nous vous recommandons d"utiliser la fonctionnalité « ID de caisse » lors de l"enregistrement pour étiqueter les caisses dans Coldtivate avec des caisses physiques et ainsi identifier plus facilement les caisses nécessitant votre attention grâce à la notification.',
    },
    {
      id: 108,
      title: ' Quelle quantité de produits puis-je acheter sur le marché ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' Pour chaque article présenté sur la place de marché, vous pouvez acheter la caisse entière ou le nombre de kilos qu"elle contient. La quantité minimale autorisée est de 1 kg.',
    },
    {
      id: 109,
      title: "J'ai acheté des produits et je souhaite les revendre. Comment faire ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lorsque vous achetez des produits sur la place de marché, vous devenez propriétaire de la quantité achetée. Dans le tableau de bord, une nouvelle entrée indique ce que vous avez stocké en chambre froide. Pour vendre vos produits, cliquez sur le signe « > » à droite du tableau de bord, accédez à « Poids des caisses et liste de la place de marché », puis indiquez les caisses à vendre et le prix au kg. Les consommateurs sur la place de marché pourront consulter ces caisses et acheter au montant indiqué. Veuillez noter que pour mettre des caisses en vente, votre compte bancaire doit être configuré. Suivez les instructions pour ajouter vos coordonnées bancaires ou accédez à « Menu » -> « Détails du compte » -> « Options de paiement ».',
    },
    {
      id: 110,
      title:
        " J'ai quitté le processus de paiement sur la place de marché. Comment finaliser mon achat ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lorsque vous effectuez un achat en cliquant sur « Payer » dans votre panier, vous êtes redirigé vers le fournisseur de paiement (PayStack au Nigeria). Si, pour une raison quelconque, vous abandonnez le processus, votre commande sera marquée comme « Paiement en attente ». Vous trouverez votre commande dans l"onglet « Mes commandes » de la page Marketplace. Cliquez sur l"article pour finaliser le paiement. Vous disposez de 30 minutes pour finaliser le paiement, après quoi la commande est considérée comme « Annulée » et le montant est libéré pour d"autres acheteurs.',
    },
    {
      id: 111,
      title: " Je n'arrive pas à extraire certaines cultures. Pourquoi ?",
      role: [ERoles.OPERATOR],
      text: 'Si vous essayez de commander des caisses en vente sur la place de marché et que vous n"y parvenez pas, cela est probablement dû au fait qu"elles font partie d"une commande en attente de paiement. Cela signifie qu"un acheteur les a ajoutées à son panier et a lancé un processus d"achat. L"acheteur dispose de 30 minutes pour finaliser le paiement, après quoi la commande sera annulée. Passé ce délai, vous pourrez commander la caisse.',
    },
  ],
  [APP_LOCALES.GUJARATI]: [
    {
      id: 1,
      title: 'મારે એપનો ઉપયોગ શા માટે કરવો જોઈએ?',
      role: [ERoles.AUTH],
      text: ' આ એપ્લિકેશન કોલ્ડ રૂમ પ્રદાતાઓને કોલ્ડ રૂમમાં તેમના રોજિંદા કાર્યોમાં, કોલ્ડ રૂમનો ઉપયોગ કરતા ખેડૂતો અને કોલ્ડ રૂમમાં સંગ્રહિત પાક ખરીદવામાં રસ ધરાવતા ગ્રાહકોને ટેકો આપવા માટે બનાવવામાં આવી છે. એપ્લિકેશનમાં દરેક સંગ્રહિત ક્રેટ માટે ડિજિટલ ઇન્વેન્ટરી, રિમોટ મોનિટરિંગ અને શેલ્ફ-લાઇફ મોડેલ અને ખરીદદારો અને વેચાણકર્તાઓને જોડવા માટે એક બજાર છે. તેમાં નોલેજ હબનો પણ સમાવેશ થાય છે, જે શ્રેષ્ઠ સ્ટોરેજ તાપમાન અને સ્ટોરેજ લાઇફ પર કોમોડિટી-વિશિષ્ટ ભલામણો પ્રદાન કરે છે.',
    },
    {
      id: 2,
      title: 'એપનો ઉપયોગ કોણ કરી શકે છે?',
      role: [ERoles.AUTH],
      text: 'આ એપનો ઉપયોગ કોલ્ડ સ્ટોરેજ કંપનીઓ, ખેડૂતો અને કોલ્ડ સ્ટોરેજનો ઉપયોગ કરવામાં રસ ધરાવતા વેપારીઓ અને વિશ્વભરના સંભવિત ખરીદદારો દ્વારા કરી શકાય છે. સમગ્ર એપમાં, ત્રણ વપરાશકર્તા ભૂમિકાઓ છે: (i) રજિસ્ટર્ડ કર્મચારી: કોલ્ડ રૂમ પ્રદાતા વ્યવસ્થાપન ટીમનો ભાગ. રૂમ સેટ કરવા અને તેનું સંચાલન કરવા માટે જવાબદાર વ્યક્તિ, સ્થાન પર ભૌતિક રીતે હાજર રહ્યા વિના, જમીન પર ઓપરેટરોની પ્રવૃત્તિઓ પર નજર રાખવાનો હવાલો સંભાળે છે. ઉદાહરણ તરીકે: કંપનીના CEO, CFO, વગેરે. (ii) ઓપરેટર: કોલ્ડ રૂમમાં ભૌતિક રીતે હાજર રહેતો કર્મચારી અને તેના ચેક-ઇન, ચેક-આઉટ કામગીરીનું સંચાલન કરે છે. આ વ્યક્તિ કોલ્ડ રૂમ વપરાશકર્તાઓ સાથે સીધા સંપર્કમાં હોય છે, અને કંપનીના રજિસ્ટર્ડ કર્મચારીને રિપોર્ટ કરે છે. (iii) કૂલિંગ વપરાશકર્તાઓ અથવા ગ્રાહક: કોલ્ડ રૂમ વપરાશકર્તાઓ (ખેડૂતો, વેપારીઓ, છૂટક વિક્રેતા, વગેરે હોઈ શકે છે) અથવા ગ્રાહક (વ્યક્તિગત, છૂટક વિક્રેતા, જથ્થાબંધ વેપારી). આ ભૂમિકા કોઈપણ વ્યક્તિ માટે છે જે કૂલિંગ કંપની સાથે જોડાયેલા વિના એપ્લિકેશનમાં નોંધણી કરાવવા માંગે છે. સ્માર્ટફોન ધરાવતા કૂલિંગ વપરાશકર્તાઓ એપ્લિકેશનમાં વપરાશકર્તાઓ તરીકે લોગ ઇન કરી શકે છે. જો તેમની પાસે સ્માર્ટફોન ન હોય, તો ઓપરેટરો તેમના વતી કૂલિંગ વપરાશકર્તાઓની કામગીરી કરે છે.',
    },
    {
      id: 3,
      title: 'હું રજિસ્ટર્ડ કર્મચારી તરીકે કેવી રીતે નોંધણી કરાવી શકું?',
      role: [ERoles.AUTH],
      text: 'જો તમે તમારી કંપનીમાંથી સાઇન અપ કરનારા પહેલા કર્મચારી છો, તો તમે "કંપની તરીકે સાઇન અપ કરો" બટન પર ક્લિક કરી શકો છો અને તમારી કંપની અને તમારી જાતને (વ્યક્તિગત વિગતો અને પાસવર્ડ સહિત) રજીસ્ટર કરવા માટે પગલાંઓ અનુસરો. એકવાર તમે સફળતાપૂર્વક સાઇન અપ કરી લો, પછી તમે એપ્લિકેશનમાં રજિસ્ટર્ડ કર્મચારી તરીકે લોગ ઇન કરી શકો છો અને અન્ય રજિસ્ટર્ડ કર્મચારીઓને તમારી કંપનીમાં જોડાવા માટે SMS આમંત્રણ મોકલી શકો છો. એકવાર કંપની બની જાય, પછી બધા રજિસ્ટર્ડ કર્મચારીઓને SMS દ્વારા આમંત્રિત કરવા જોઈએ. નહિંતર, તેઓ એક જ કંપની સાથે જોડાયેલા રહેશે નહીં.',
    },
    {
      id: 4,
      title: 'હું ઓપરેટર તરીકે કેવી રીતે નોંધણી કરાવી શકું?',
      role: [ERoles.AUTH],
      text: 'સાઇન અપ કરવા માટે, તમારું આમંત્રણ નોંધાયેલ કર્મચારી દ્વારા આપવું પડશે. તમને એક એસએમએસ પ્રાપ્ત થશે જેમાં એક સક્રિયકરણ લિંક હશે, જ્યાંથી તમે તમારી વ્યક્તિગત વિગતો અને પાસવર્ડ સેટ કરી શકો છો.',
    },
    {
      id: 5,
      title: 'હું કૂલિંગ વપરાશકર્તા અથવા ગ્રાહક તરીકે કેવી રીતે નોંધણી કરાવી શકું?',
      role: [ERoles.AUTH],
      text: 'સ્માર્ટફોન ધરાવતા કુલિંગ વપરાશકર્તાઓ અને ગ્રાહકો હોમપેજ પર "કૂલિંગ વપરાશકર્તા અથવા ગ્રાહક તરીકે સાઇન અપ કરો" પર ક્લિક કરીને નોંધણી કરાવી શકે છે અને તેમની વ્યક્તિગત વિગતો અને પાસવર્ડ પ્રદાન કરી શકે છે. જે કુલિંગ વપરાશકર્તાઓ પાસે સ્માર્ટફોન નથી તેમને ઓપરેટરો દ્વારા એપ્લિકેશનમાં ઉમેરી શકાય છે. આ કામગીરી તે કુલિંગ વપરાશકર્તાઓ માટે ચેક-ઇન શરૂ કરવા માટે જરૂરી છે. કુલિંગ વપરાશકર્તાઓએ એક ફોન નંબર પ્રદાન કરવાની જરૂર છે, જેનો ઉપયોગ ઓપરેટર જરૂર પડ્યે કુલિંગ વપરાશકર્તાઓનો સંપર્ક કરવા માટે કરશે. આ કિસ્સામાં કોઈ પાસવર્ડની જરૂર નથી.',
    },
    {
      id: 6,
      title: 'હું વપરાશકર્તા તરીકે નોંધણી પૂર્ણ કરી શકતો નથી. મારે શું કરવું જોઈએ?',
      role: [ERoles.AUTH],
      text: 'નોંધણી પૂર્ણ કરવા માટે, કૃપા કરીને ખાતરી કરો કે નીચેની શરતો પૂર્ણ થાય છે: (i) તમે સાચા દેશ કોડ સાથે ફોન નંબર દાખલ કરી રહ્યા છો (દા.ત. ભારત માટે +91); (ii) તમે આપેલો ફોન નંબર અન્ય કોઈ વપરાશકર્તાની નોંધણી કરવા માટે ઉપયોગમાં લેવાયો નથી; (iii) તમે જે પાસવર્ડ દાખલ કરી રહ્યા છો તે બધી વિનંતી કરેલી શરતોને પૂર્ણ કરે છે; (iv) તમે જે પાસવર્ડ દાખલ કરી રહ્યા છો તે સમાન છે - તમે પાસવર્ડ્સ જોવા માટે આંખના ચિહ્ન પર ક્લિક કરી શકો છો અને ખાતરી કરી શકો છો કે તે સમાન છે.',
    },
    {
      id: 7,
      title: 'મારી પાસે ફોન નથી પણ હું એપ વાપરવા માંગુ છું. મારે શું કરવું જોઈએ?',
      role: [ERoles.AUTH],
      text: 'જો તમે રજિસ્ટર્ડ કર્મચારી, ઓપરેટર અથવા ગ્રાહક છો, તો તમારે સાઇન અપ કરવા માટે માન્ય ફોન નંબર આપવો પડશે. એપનો યોગ્ય રીતે ઉપયોગ કરવા માટે સ્માર્ટફોનની જરૂર છે. જો તમે કૂલિંગ યુઝર છો અને તમારી પાસે ફોન નથી, તો અમે તમને એક માન્ય ફોન નંબર આપવાની પણ સલાહ આપીએ છીએ, જેથી જરૂર પડ્યે ઓપરેટર તમારો સંપર્ક કરી શકે. જો તમારી પાસે તમારો પોતાનો ફોન ન હોય તો તમે પરિવારના સભ્ય અથવા મિત્રનો ફોન નંબર આપી શકો છો. જો આ શક્ય ન હોય, તો ઓપરેટર ચેક-ઇન સમયે કૂલિંગ યુઝર તરીકે "ફોન વિનાનો વપરાશકર્તા" પસંદ કરીને રૂમમાં ઉત્પાદનનો સંગ્રહ કરી શકે છે.',
    },
    {
      id: 8,
      title: 'રજિસ્ટર્ડ કર્મચારી તરીકે લોગ ઇન કરવા માટે કઈ વિગતોની જરૂર છે?',
      role: [ERoles.AUTH],
      text: 'નોંધાયેલા કર્મચારી ઇમેઇલ અથવા ફોન નંબર અને તેમનું પાસવર્ડ સાથે લોગિન કરી શકે છે.',
    },
    {
      id: 9,
      title: 'ઓપરેટર તરીકે લોગ ઇન કરવા માટે કઈ વિગતોની જરૂર છે?',
      role: [ERoles.AUTH],
      text: 'ઓપરેટર પોતાના ફોન નંબર અને પાસવર્ડ સાથે લોગિન કરી શકે છે.',
    },
    {
      id: 10,
      title: 'કુલિંગ વપરાશકર્તા અથવા ગ્રાહક તરીકે લોગ ઇન કરવા માટે કઈ વિગતોની જરૂર છે?',
      role: [ERoles.AUTH],
      text: 'સ્માર્ટફોન ધરાવતા કૂલિંગ વપરાશકર્તાઓ તેમના ફોન નંબર અને પાસવર્ડથી લોગ ઇન કરી શકે છે. જે કૂલિંગ વપરાશકર્તાઓ પાસે સ્માર્ટફોન નથી તેમને લોગ ઇન કરવાની જરૂર નથી: ઓપરેટર તેમના વતી કામગીરી કરી શકે છે. માર્કેટપ્લેસ જોવામાં રસ ધરાવતા ગ્રાહકો તેમના ફોન નંબર અને પાસવર્ડથી લોગ ઇન કરી શકે છે.',
    },
    {
      id: 11,
      title: 'મને SMS દ્વારા કોઈ આમંત્રણ મળ્યું નથી. મારે શું કરવું જોઈએ?',
      role: [ERoles.AUTH],
      text: 'જો તમે તમારું પાસવર્ડ ખોવાઈ ગયું છે, તો લોગિન સમયે "પાસવર્ડ ભૂલી ગયા છો" પર ક્લિક કરો, તમારું ફોન નંબર દાખલ કરો, અને તમે નવા પાસવર્ડને સેટ કરવા માટે એક SMS સાથે લિંક મેળવો છો.',
    },
    {
      id: 12,
      title: 'મારો પાસવર્ડ ખોવાઈ ગયો છે. મારે શું કરવું જોઈએ?',
      role: [ERoles.AUTH],
      text: 'જો તમે તમારો પાસવર્ડ ખોવાઈ ગયા છો, તો તમે સાઇન ઇન કરતી વખતે "પાસવર્ડ ભૂલી ગયા છો" પર ક્લિક કરીને તમારું એકાઉન્ટ પુનઃસ્થાપિત કરી શકો છો, તમારો ફોન નંબર દાખલ કરો, અને તમને નવો પાસવર્ડ સેટ કરવા માટે એક લિંક સાથેનો SMS પ્રાપ્ત થશે.',
    },
    {
      id: 13,
      title: 'નોલેજ હબ શું છે?',
      role: [ERoles.EMPLOYEE],
      text: 'નોલેજ હબ એક એવું પેજ છે જેના પર ઉપર ડાબી બાજુના મેનુ પર ક્લિક કરીને પહોંચી શકાય છે. તેમાં વિવિધ ચીજવસ્તુઓ માટે શ્રેષ્ઠ સંગ્રહ પદ્ધતિઓ વિશે ઉપયોગી માહિતી શામેલ છે, જેમાં શ્રેષ્ઠ તાપમાન અને આ તાપમાન હેઠળ અંદાજિત સંગ્રહ સમયનો સમાવેશ થાય છે.',
    },
    {
      id: 14,
      title: 'હું મારી પ્રોફાઇલ કેવી રીતે સંપાદિત કરી શકું?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: '"મેનુ" -> "એકાઉન્ટ વિગતો" પર ક્લિક કરીને, તમે તમારી પ્રોફાઇલ જોઈ શકો છો અને તમારી "વ્યક્તિગત વિગતો" (પ્રથમ અને છેલ્લું નામ, ફોન નંબર, ઇમેઇલ અને લિંગ) સંપાદિત કરી શકો છો. "સ્થાનિકીકરણ પસંદગીઓ" હેઠળ, તમે એપ્લિકેશન ભાષા બદલી શકો છો. "વેચાણકર્તા સેટિંગ્સ" હેઠળ, તમે તમારા બેંક ખાતાની વિગતો સેટ કરી શકો છો, કૂપન્સ બનાવી શકો છો અને માર્કેટપ્લેસ વપરાશકર્તાઓ માટે તમારી સંપર્ક વિગતો સાર્વજનિક કરી શકો છો. તમારી કંપની, સ્થાનો અને કૂલિંગ યુનિટ્સની વિગતો બદલવા માટે, "મેનુ" -> "મેનેજમેન્ટ" પર નેવિગેટ કરો, અને પછી તમે જે મેનૂ આઇટમ બદલવા માંગો છો તે પસંદ કરો.',
    },
    {
      id: 15,
      title: 'હું મારી પ્રોફાઇલ કેવી રીતે સંપાદિત કરી શકું?',
      role: [ERoles.EMPLOYEE],
      text: 'ઓપરેટરને કૂલિંગ યુનિટ્સ સાથે લિંક કરવા માટે ત્રણ રીતો છે. તમે તેને આમંત્રણ મોકલતી વખતે એક (અથવા વધુ) કૂલિંગ યુનિટ્સ ઓપરેટરને અસાઇન કરી શકો છો. બીજું, તમે "મેનેજમેન્ટ" -> "ઓપરેટર્સ" પર જઇને, ઓપરેટરને પસંદ કરીને અને પછી "કૂલિંગ યુનિટ પસંદ કરો" પર ક્લિક કરીને આપી શકશો. છેલ્લે, "મેનેજમેન્ટ" -> "કૂલિંગ યુનિટ્સ" માં કૂલિંગ યુનિટ બનાવતી વખતે, તમે તેમાં ઓપરેટર્સને પણ અસાઇન કરી શકો છો. બહાર નીકળી જવા પહેલા તમારા ફેરફારો સहेજવું યાદ રાખો!',
    },
    {
      id: 16,
      title: 'હું ઓપરેટરોને કુલિંગ યુનિટ્સ કેવી રીતે સોંપી શકું?',
      role: [ERoles.OPERATOR],
      text: 'હા, તમે "ફોન વિહિન વપરાશકર્તા" નામના કૂલિંગ યુઝરનો ઉપયોગ કરીને આ વ્યક્તિ માટે ચેક-ઇન શરૂ કરી શકો છો. ઘણા લોકો આ એકાઉન્ટનો ઉપયોગ કરી શકે છે, તેથી દરેક ક્રેટના માલિકને ઓળખવા માટે ક્રેટ્સ પર નામની ટેગ લગાવવાનું ખાતરી કરો.',
    },
    {
      id: 17,
      title:
        'એક કૂલિંગ યુઝર કોલ્ડ રૂમમાં આવે છે પણ તેની પાસે ફોન નથી. શું હું હજુ પણ તેને રજીસ્ટર કરાવી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'હા, તમે "ફોન વગરનો વપરાશકર્તા" નામના કૂલિંગ વપરાશકર્તાનો ઉપયોગ કરીને તે વ્યક્તિ માટે ચેક ઇન શરૂ કરી શકો છો. ઘણા લોકો ચેક ઇન માટે આ એકાઉન્ટનો ઉપયોગ કરી શકે છે, તેથી દરેક ક્રેટના માલિકને ઓળખવા માટે રૂમમાં ક્રેટ પર નામ ટેગ ઉમેરવાની ખાતરી કરો.',
    },
    {
      id: 18,
      title: 'હું મારી કંપની કેવી રીતે રજીસ્ટર કરી શકું?',
      role: [ERoles.EMPLOYEE],
      text: 'તમારી કંપનીને રજીસ્ટર કરવા માટે, સ્વાગત સ્ક્રીન પર "કંપની તરીકે સાઇન અપ" પસંદ કરો અને જરૂરી માહિતી ભરો. પાસવર્ડ દાખલ કરો પછી "સાઇન અપ" પર ક્લિક કરો અને તમે તૈયાર છો!',
    },
    {
      id: 19,
      title: 'મારી કંપની માટે નવું સ્થાન કેવી રીતે રજીસ્ટર કરવું?',
      role: [ERoles.EMPLOYEE],
      text: 'પ્રત્યેક કૂલિંગ યુનિટને એક સ્થાન પર બનાવવું જરૂરી છે (અને એક જ સ્થાન માટે અનેક કૂલિંગ યુનિટ્સ બનાવવામાં આવી શકે છે). તમારી કંપની માટે નવી જગ્યાને ઉમેરવા માટે, મેનુમાં "મેનેજમેન્ટ" > "સ્થાનો" પસંદ કરો. નવી જગ્યાને ઉમેરવા માટે ઉપરના જમણું ખૂણાની "+" પર ક્લિક કરો. જરૂરી માહિતી ભરો. પુષ્ટિ કરવા માટે "ઉમેરો" પર ક્લિક કરો.',
    },
    {
      id: 20,
      title: 'મારી કંપની માટે નવા કૂલિંગ યુનિટની નોંધણી કેવી રીતે કરાવવી?',
      role: [ERoles.EMPLOYEE],
      text: 'તમારી કંપની માટે નવી કૂલિંગ યુનિટ રજીસ્ટર કરવા માટે, તમારે ઓછામાં ઓછું એક સ્થાન બનાવવું જરૂરી છે. પછી, મેનુમાં "મેનેજમેન્ટ" > "કૂલિંગ યુનિટ્સ" પસંદ કરો. નવી કૂલિંગ યુનિટ ઉમેરવા માટે ઉપરના જમણું ખૂણાની "+" પર ક્લિક કરો. જરૂરી માહિતી ભરો. પુષ્ટિ કરવા માટે "ઉમેરો" પર ક્લિક કરો.',
    },
    {
      id: 21,
      title:
        'મારી કંપનીના અન્ય રજિસ્ટર્ડ કર્મચારીઓને એપ્લિકેશન માટે નોંધણી કરાવવા માટે હું કેવી રીતે આમંત્રિત કરી શકું?',
      role: [ERoles.EMPLOYEE],
      text: 'તમારી કંપનીના અન્ય રજીસ્ટર કરેલા કર્મચારીઓને આમંત્રિત કરવા માટે, મેનુમાં "મેનેજમેન્ટ" > "ସେବା ପ୍ରଦାନକାରୀ" પસંદ કરો. આમંત્રિત કરવા માગતા કર્મચારીઓના ફોન નંબરને ઉમેરવા માટે ઉપરના જમણું ખૂણાની "+" પર ક્લિક કરો. પુષ્ટિ કરવા માટે "આમંત્રણ" પર ક્લિક કરો: તમારા સહકર્મી આસાની સાથે એક SMS પામશે જેમાં એક લિંક છે જે તેમને સીધી રીતે સાઇન અપ સ્ક્રીન તરફ લાવે છે. ઉપરાંત, તમને આમંત્રણ લિંક સાથે એક ઈમેઇલ પણ મળશે. કૃપા કરીને આ ઓપરેટરને ફોરવર્ડ કરો જો તેઓએ SMS દ્વારા ન પામ્યું હોય.',
    },
    {
      id: 22,
      title:
        'કોલ્ડ સ્ટોરેજ ઓપરેટરોને એપ્લિકેશન માટે નોંધણી કરાવવા માટે હું કેવી રીતે આમંત્રિત કરી શકું?',
      role: [ERoles.EMPLOYEE],
      text: 'તમારા કૂલિંગ યુનિટ્સ માટે ઓપરેટર્સને આમંત્રણ મોકલવા માટે, મેનુમાં "મેનેજમેન્ટ" > "ઓપરેટર્સ" પસંદ કરો. આમંત્રિત કરવા માગતા ઓપરેટરનો ફોન નંબર ઉમેરવા માટે ઉપરના જમણું ખૂણાની "+" પર ક્લિક કરો. પુષ્ટિ કરવા માટે "આમંત્રણ" પર ક્લિક કરો: ઓપરેટરને એક સંદેશ મળશે જેમાં એક લિંક છે જે તેમને સીધી રીતે સાઇન અપ સ્ક્રીન તરફ લાવે છે. ઉપરાંત, તમને આમંત્રણ લિંક સાથે એક ઈમેઇલ પણ મળશે. કૃપા કરીને આ ઓપરેટરને ફોરવર્ડ કરો જો તેઓએ SMS દ્વારા ન પામ્યું હોય.',
    },
    {
      id: 23,
      title: 'કૂલિંગ યુનિટનું તાપમાન કેવી રીતે મોનિટર કરવું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ચોક્કસ કૂલિંગ યુનિટના તાપમાનનું નિરીક્ષણ કરવા માટે, નેવિગેશન બારના નીચેના જમણા ખૂણામાં "વધુ" પર ક્લિક કરો, "કૂલિંગ યુનિટ્સ" પસંદ કરો, "રૂમની સ્થિતિ" પર નેવિગેટ કરો અને ડ્રોપડાઉનમાંથી રુચિનું કૂલિંગ યુનિટ પસંદ કરો. આ પેનલમાં, તમને સમય જતાં તાપમાન સાથેનો ગ્રાફ દેખાશે - તમે તાપમાન મૂલ્ય અને ટાઇમસ્ટેમ્પ જોવા માટે ડેટાપોઇન્ટ પર ક્લિક કરી શકો છો. જો રૂમમાં સેન્સર એપ્લિકેશન સાથે જોડાયેલા હોય, તો તમે અહીં વાસ્તવિક રૂમનું તાપમાન જોઈ શકશો. નહિંતર, ગ્રાફ રૂમ ઓપરેટરે એપ્લિકેશનમાં મેન્યુઅલી સેટ કરેલ તાપમાન બતાવશે. બીજા કૂલિંગ યુનિટનું તાપમાન તપાસવા માટે, તમે તેને પૃષ્ઠની ટોચ પરના ડ્રોપડાઉનમાંથી પસંદ કરી શકો છો.',
    },
    {
      id: 24,
      title: 'કૂલિંગ યુનિટની ક્ષમતાનું હું કેવી રીતે નિરીક્ષણ કરી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ચોક્કસ કૂલિંગ યુનિટના ઓક્યુપન્સીનું સંચાલન કરવા માટે, નેવિગેશન બારના નીચેના જમણા ખૂણામાં "વધુ" પર ક્લિક કરો, "કૂલિંગ યુનિટ્સ" પસંદ કરો, "પ્લાનર" પર નેવિગેટ કરો અને ડ્રોપડાઉનમાંથી રુચિનું કૂલિંગ યુનિટ પસંદ કરો. અહીં તમે વર્તમાન ઓક્યુપન્સી (ઉપર) અને આગામી 7 દિવસ (નીચે) માટે અનુમાનિત ઓક્યુપન્સી જોઈ શકો છો. ભવિષ્યના ઓક્યુપન્સી વિશેની માહિતી ચેક-ઇન સમયે દરેક વપરાશકર્તા દ્વારા સ્ટોરેજમાં આયોજિત દિવસો તરીકે જાહેર કરાયેલા દિવસોની સંખ્યા પર આધારિત છે. ધ્યાન રાખો કે આ ફક્ત એક અંદાજ છે અને અચોક્કસ હોઈ શકે છે.',
    },
    {
      id: 25,
      title: 'રૂમમાં કઈ વસ્તુઓ સંગ્રહિત છે તે હું કેવી રીતે જોઈ શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'સ્ક્રીનના તળિયા પર "ડેશબોર્ડ" આઇકન પર ક્લિક કરો અને ડ્રોપડાઉનમાંથી રસપ્રદ કૂલિંગ યુનિટ પસંદ કરો જેથી કરીને તમે કૂલિંગ યુનિટમાં સ્ટોર કરેલા તમામ આઇટમ્સની સૂચિ જોઈ શકો.',
    },
    {
      id: 26,
      title: 'કૂલિંગ યુનિટના પાછલા ચેક-ઇન અને ચેક-આઉટ્સ હું કેવી રીતે જોઈ શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'કૂલિંગ યુનિટની ભૂતકાળની ગતિવિધિઓ જોવા માટે, નેવિગેશન બારના નીચેના જમણા ખૂણામાં "વધુ" પર ક્લિક કરો અને "ઇતિહાસ" પસંદ કરો: ભૂતકાળના ચેક-ઇન (લીલા ક્રેટવાળા ચિહ્નો), ચેક-આઉટ (નારંગી ક્રેટવાળા ચિહ્નો), અને માર્કેટપ્લેસ કામગીરી (વાદળી કાર્ટવાળા ચિહ્નો) વ્યવહારની વિગતો સાથે પ્રદર્શિત થાય છે. જો કોઈ ચોક્કસ વ્યવહાર રસપ્રદ હોય તો શોધ કાર્ય તમને તે શોધવામાં મદદ કરી શકે છે!',
    },
    {
      id: 28,
      title: 'એપમાં ઓપરેટર કયા મુખ્ય કાર્યો કરી શકે છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ઓપરેટર આ કરી શકે છે: નવા કૂલિંગ યુઝર્સની નોંધણી, ચેક-ઇન શરૂ કરવા, સ્ટોરેજમાં વસ્તુઓ અને રૂમ ઓક્યુપન્સીનું નિરીક્ષણ, ચેક-આઉટ શરૂ કરવા અને તે જે કૂલિંગ યુનિટ માટે જવાબદાર છે તેના તાપમાનનું નિરીક્ષણ. ઓપરેટર કૂલિંગ યુઝર્સને વેચાણ માટે કેટલાક ક્રેટ્સની યાદી બનાવવામાં અને વેચાણ કિંમત નક્કી કરવામાં પણ મદદ કરી શકે છે.',
    },
    {
      id: 29,
      title: 'હું નવા કુલિંગ યુઝર્સની નોંધણી કેવી રીતે કરાવી શકું?',
      role: [ERoles.OPERATOR],
      text: 'નવા કૂલિંગ યુઝરને રજીસ્ટર કરવા માટે, મેનુમાં "મેનેજમેન્ટ" > "કૂલિંગ યુઝર્સ" પર નેવિગેટ કરો. ઉપર જમણા ખૂણામાં "+" પર ક્લિક કરો અને કોડ સાથે પહેલાથી જ નોંધાયેલ યુઝરને ઉમેરવું કે યુઝર વિગતો ઉમેરવી તે પસંદ કરો. જે કૂલિંગ યુઝર પાસે સ્માર્ટફોન છે અને કોલ્ડટીવેટમાં પહેલાથી જ રજીસ્ટર થયેલ છે તેની પાસે એક અનોખો કોડ છે, જે તે/તેણી "મેનુ" -> "એકાઉન્ટ વિગતો" -> "વ્યક્તિગત વિગતો" -> કૂલિંગ યુઝર ઇમ્પોર્ટ કોડ હેઠળ શોધી શકે છે. જો યુઝર પાસે સ્માર્ટફોન નથી, અથવા હજુ સુધી રજીસ્ટર થયેલ નથી, તો તમે નામ, લિંગ અને ટેલિફોન નંબર ઉમેરીને યુઝર ઉમેરી શકો છો. જો યુઝર પાસે પોતાનો નંબર નથી, તો બીજી વ્યક્તિ (દા.ત. મિત્રો, સંબંધીઓ) નો નંબર વાપરી શકાય છે, પરંતુ કૃપા કરીને યાદ રાખો કે એક ફોન નંબર ફક્ત એક જ વાર વાપરી શકાય છે. પુષ્ટિ કરવા માટે "ફેરફારો સાચવો" પર ક્લિક કરો. રજીસ્ટ્રેશન પૂર્ણ કરવા માટે, તમારે કૂલિંગ યુઝરને થોડા પ્રશ્નો પૂછીને એક નાનો સર્વે ભરવાની જરૂર છે. સર્વેક્ષણ પછીના સમયે "મેનેજમેન્ટ" -> "કૂલિંગ યુઝર્સ" -> "કૂલિંગ યુઝર સર્વે" પર નેવિગેટ કરીને પણ પૂર્ણ કરી શકાય છે.',
    },
    {
      id: 30,
      title:
        'કુલિંગ યુઝર પાસે નોંધણી સમયે સર્વેના પ્રશ્નોના જવાબ આપવા માટે સમય નથી. મારે શું કરવું જોઈએ?',
      role: [ERoles.OPERATOR],
      text: 'તમે "બાદમાં પૂર્ણ કરો" ક્લિક કરીને સર્વેના પ્રશ્નોને છોડી શકો છો. આ ઘટનામાં, જ્યારે તમે આ કૂલિંગ યુઝર માટે પહેલું ચેક-ઇન બનાવતા સમયે સર્વે પૂર્ણ કરવાનો નિર્દેશ આપવામાં આવશે. સર્વેના પ્રશ્નોને પદ્ધતિપૂર્વક જવાબ આપવાની સલાહ આપવામાં આવે છે: આ રીતે, યુઝરને Coldtivate એપ્લિકેશન સાથે વધુ વ્યક્તિગત અનુભવ મળી શકે છે!',
    },
    {
      id: 31,
      title:
        'એક ઓપરેટર મને કંપનીના કુલિંગ યુઝર્સની યાદીમાં ઉમેરવા માટે કોડ માંગે છે. મને કોડ ક્યાંથી મળશે?',
      role: [ERoles.OPERATOR],
      text: 'ચેક-ઇન આરંભ કરવા માટે, ડેશબોર્ડ પર જાઓ અને નીચેની બાજુએ કેક્શન મેનેજર બટન પર ક્લિક કરો, પછી લીલાં બટન પર ક્લિક કરો.',
    },
    {
      id: 32,
      title:
        'સાઇન અપ કરતી વખતે સર્વેના પ્રશ્નોના જવાબ આપવા માટે મારી પાસે સમય નથી. મારે શું કરવું જોઈએ?',
      role: [ERoles.OPERATOR],
      text: 'ચેક-આઉટ આરંભ કરવા માટે બે રીતો છે, બંને ડેશબોર્ડ પેજથી શરૂ થાય છે. તમે ક્રીયા મેનેજર બટન પર ક્લિક કરી શકો છો અને પછી લાલ બટન પર ક્લિક કરી શકો છો. આ રીતે, તમે કયા કૂલિંગ યુઝર (અને કયા કૂલિંગ યુનિટ) માટે ચેક-આઉટ શરૂ કરવું છે તે પસંદ કરી શકો છો અને તેનાં કિસ્સાઓને એકથી વધુ ચેક-ઇનમાંથી ચેક-આઉટ કરી શકો છો. વૈકલ્પિક રીતે, તમે ડેશબોર્ડમાં જોતા કોઈ વસ્તુ માટે "વિશેષતાઓ જુઓ" પર ક્લિક કરી શકો છો (સચોટ કૂલિંગ યુનિટમાં હોવું ખાતરી કરો), અને "ચેક-આઉટ" પર ક્લિક કરો. આ સ્થિતિમાં, તમે ફક્ત આ સ્ટોરેજ વસ્તુમાંથી કિસ્સાઓને ચેક-આઉટ કરી શકો છો.',
    },
    {
      id: 33,
      title: 'મને મારા પાકને ઠંડા રૂમમાં સંગ્રહિત કરવામાં રસ છે. હું તેમને કેવી રીતે શોધી શકું?',
      role: [ERoles.EMPLOYEE],
      text: 'તમારી નજીક કોલ્ડ રૂમ શોધવા માટે, નેવિગેશન બારના નીચેના જમણા ખૂણામાં "વધુ" પર નેવિગેટ કરો, "કૂલિંગ યુનિટ્સ" અને "નકશો" પસંદ કરો. અહીં તમે નજીકના કોલ્ડ રૂમ શોધી શકો છો, અને પછી તમારા ક્રેટ્સ રૂમમાં લાવી શકો છો. કોલ્ડ રૂમ ઓપરેટર તમને રૂમ કેવી રીતે કાર્ય કરે છે, તમારી પાસેથી કેવી રીતે ચાર્જ લેવામાં આવશે અને કોલ્ડ સ્ટોરેજનો ઉપયોગ કરવાના ફાયદા શું છે તે સમજવામાં મદદ કરી શકે છે.',
    },
    {
      id: 34,
      title: 'હું ચેક ઇન કેવી રીતે શરૂ કરી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ચેક-ઇન શરૂ કરવા માટે, ડેશબોર્ડ પર જાઓ અને નીચે જમણી બાજુએ એક્ટિવિટી મેનેજર બટન પર ક્લિક કરો, અને પછી લીલા બટન પર ક્લિક કરો.',
    },
    {
      id: 35,
      title: 'હું ચેક આઉટ કેવી રીતે શરૂ કરી શકું?',
      role: [ERoles.OPERATOR],
      text: 'ચેક આઉટ શરૂ કરવાની બે રીતો છે, બંને ડેશબોર્ડ પેજથી શરૂ થાય છે. તમે નીચે જમણી બાજુએ એક્ટિવિટી મેનેજર બટન પર ક્લિક કરી શકો છો, અને પછી લાલ બટન પર ક્લિક કરી શકો છો. આ રીતે, તમે કયા કૂલિંગ યુઝર (અને કયા કૂલિંગ યુનિટમાં) માટે ચેક આઉટ શરૂ કરવા માંગો છો તે પસંદ કરી શકો છો, અને બહુવિધ ચેક ઇનમાંથી તેના ક્રેટ્સ ચકાસી શકો છો. વૈકલ્પિક રીતે, તમે ડેશબોર્ડમાં દેખાતી વસ્તુ માટે "વિગતો જુઓ" પર ક્લિક કરી શકો છો (ખાતરી કરો કે યોગ્ય કૂલિંગ યુનિટમાં છે), અને "ચેક આઉટ" પર ક્લિક કરી શકો છો. આ કિસ્સામાં, તમે ફક્ત તે સ્ટોરેજ આઇટમમાંથી ક્રેટ્સ ચેક-આઉટ કરી શકો છો.',
    },
    {
      id: 36,
      title:
        ' મારી પાસે કોલ્ડ રૂમમાં તાપમાન સેન્સર છે. શું તેમને કોલ્ડટીવેટ સાથે કનેક્ટ કરી શકાય છે?',
      role: [ERoles.AUTH],
      text: 'જ્ઞાન હબ એ એક પેજ છે જેને ટોચે ડાબી બાજુએ મેનૂ પર ક્લિક કરીને પહોંચી શકાય છે. તેમાં વિવિધ વિસરની શ્રેષ્ઠ સંગ્રહ પદ્ધતિઓ વિશે ઉપયોગી માહિતી છે, જેમાં આ તાપમાન હેઠળ શ્રેષ્ઠ તાપમાન અને અંદાજીત સંગ્રહ સમય પણ સમાવેશ થાય છે.',
    },
    {
      id: 37,
      title: 'રૂમમાં રહેલા સેન્સરને એપ વડે કેવી રીતે કનેક્ટ કરવું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'જો રૂમમાં તાપમાન સેન્સર હોય જે કોલ્ડટીવેટ એપ્લિકેશન સાથે કનેક્ટ થઈ શકે, તો કૃપા કરીને તમારા જવાબદાર સાથે વાતચીત કરો. ફક્ત નોંધાયેલ કર્મચારીની ભૂમિકા ધરાવતો વપરાશકર્તા જ કોલ્ડટીવેટમાં બનાવેલા કૂલિંગ યુનિટ સાથે સેન્સરને લિંક કરી શકે છે.',
    },
    {
      id: 38,
      title: 'હું કૂલિંગ યુનિટનું તાપમાન કેવી રીતે સેટ કરી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'પિકઅપ સમય એ હુકમિત દિવસોની સંખ્યા છે કે જેથી કૂલિંગ યુઝર માલને પિક અપ કરે. ત્યારબાદ, મલ માર્કેટેબિલિટી ગુમાવવાનું શરૂ કરશે. શૂન્ય પિકઅપ સમય એ સૂચવે છે કે યુઝર તરત જ સ્ટોરેજમાં વસ્તુ ઉપાડવા માટે આવે છે અને બજારમાં વેચવા માટે 2 દિવસ સુધીનો સમય છે. આ ડેશબોર્ડ (ઉપર જમણે) અને દરેક સ્ટોરેજ વસ્તુ માટે વિસ્તૃત દૃશ્યમાં જોઈ શકાય છે.',
    },
    {
      id: 39,
      title: 'આફ્ટર-સ્ટોરેજ માર્કેટ સર્વે માટે કૂલિંગ યુઝરનો સંપર્ક કેવી રીતે કરવો?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'તાજા શાકભાજી અને ફળો નાશપીડિત છે, અને કાપણી પછી તેઓ કેટલી ફ્રેશનેસ ગુમાવે છે તે મોટા ભાગે તાપમાન પર આધાર રાખે છે. તેથી, ઉઠાવવાનો સમય તે સંબંધિત ઠંડક યંત્રના તાપમાન અને ઉત્પાદનના આરંભિક ગુણવત્તા પર આધાર રાખીને ગણવામાં આવે છે જ્યારે તે ઠંડક યંત્રમાં લાવવામાં આવે છે. આ ગણતરીમાં ઉપયોગમાં લેવાતા પેરામીટરો દરેક માલ માટે અનન્ય છે. વિવિધ માલની નાશપીડિતતા કેવી રીતે ભિન્ન છે તે વિશે વધુ જાણકારી માટે તમે Knowledge Hub જોઈ શકો છો.',
    },
    {
      id: 40,
      title: 'આફ્ટર-સ્ટોરેજ માર્કેટ સર્વે શું છે અને મારે તે શા માટે ભરવું જોઈએ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: '"વધુ" -> "ઇતિહાસ" ટેબમાં દરેક ચેક આઉટની બાજુમાં આવેલા ત્રણ બિંદુઓ પર ક્લિક કરીને અને "બજાર સર્વે ભરો" પસંદ કરીને બજાર સર્વેક્ષણ ઍક્સેસ કરી શકાય છે. આ સર્વેક્ષણ ખૂબ જ ટૂંકું છે અને તમે રૂમમાં અગાઉ સંગ્રહિત કરેલા ઉત્પાદનના વેચાણ ભાવ તેમજ તેમાંથી કેટલું બગડ્યું તે વિશે માહિતી પૂછે છે. આ માહિતીને ગુપ્ત રાખવામાં આવશે અને કોલ્ડટીવેટ ટીમ દ્વારા કોલ્ડ સ્ટોરેજના ઉપયોગની અસરનું મૂલ્યાંકન કરવા માટે તેનો ઉપયોગ કરવામાં આવશે. લાલ ટપકું એવા ચેક આઉટ્સને ઓળખશે જેના માટે બજાર સર્વેક્ષણ હજુ સુધી પૂર્ણ થયું નથી. સૂચના પેનલમાં તમને તમારા ધ્યાનની જરૂર હોય તેવા ચેક આઉટ્સ વિશે યાદ અપાવવામાં આવશે અને સર્વેક્ષણ ખોલવા માટે સૂચના પર ક્લિક કરી શકો છો. તમે "એનાલિટિક્સ" ટેબમાં ભરવા માટે જરૂરી સર્વેક્ષણો પણ ઍક્સેસ કરી શકો છો, અને પછી "ઇમ્પેક્ટ" પર ક્લિક કરી શકો છો.',
    },
    {
      id: 41,
      title: 'ડેશબોર્ડમાં એક વસ્તુની માહિતી હું કેવી રીતે વાંચી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ડેશબોર્ડમાં દરેક વસ્તુ એક જ પાક પ્રકારના ક્રેટ્સનો સમૂહ દર્શાવે છે જે એકસાથે ચેક-ઇન કરવામાં આવ્યા છે. ટોચ પરના દિવસોની સંખ્યા એ ઉપાડવાના સમય સુધીના બાકીના દિવસોની આગાહી કરે છે. નીચે, તમે પાકનો પ્રકાર અને ચેક-ઇન ID જુઓ છો. ક્રેટ પ્રતીકની બાજુમાં આવેલો નંબર ચેક-ઇન કરેલા ક્રેટ્સની સંખ્યા છે. તેની બાજુમાં, તમે કૂલિંગ ફી અને ક્રેટ્સ સ્ટોરેજમાં કેટલા દિવસો માટે રાખવામાં આવ્યા છે તે જુઓ છો. જમણી બાજુના કાર્ડની બાજુમાં આવેલો નંબર ઓળખે છે કે બજારમાં "વેચાણ માટે" તરીકે કેટલા ક્રેટ્સ સૂચિબદ્ધ છે. દરેક વસ્તુના તળિયે, તમે ક્રેટ્સના માલિક અને સંપર્ક વિગતો જુઓ છો.',
    },
    {
      id: 42,
      title: 'ઉપાડવાનો સમય કેટલો છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'વ્યાખ્યા લાલમાં દર્શાવવામાં આવે છે જ્યારે ઠંડક યંત્રની ક્ષમતામાંથી 80% થી વધુ ઉપયોગ થાય છે. ભવિષ્યની વાસ્તવિકતાની માહિતી તે સંખ્યાને આધારે છે જે દરેક વપરાશકર્તા ચેક-ઇન સમયે સંગ્રહ માટે યોજાયેલ દિવસ તરીકે જાહેર કરે છે. કૃપા કરીને સાવચેત રહો કે આ માત્ર અનુમાન છે અને ચોક્કસ ન હોઈ શકે. તેથી, લાલ રૂમની વાસ્તવિકતા માત્ર એ સંકેત છે કે રૂમ ભરાઇ રહ્યો છે. તમારે ચિંતિત થવાની જરૂર નથી પરંતુ તમે અનુકૂળ રીતે ક્રિયાવાન હોઈ શકો છો. ઉદાહરણ તરીકે, તમારું સૂચન છે કે થોડું સમય પહેલા ચેકઆઉટ માટે ટૂંકા સમય સાથેના માલ સાથે ઠંડક વપરાશકર્તાઓને સંપર્ક કરવાનું વિચારવું. તમે ‘ડેશબોર્ડ’ હેઠળ ‘ઉઠાવવાના સમય’ દ્વારા ઓર્ડર કરીને વધુ તાત્કાલિક વસ્તુઓની સૂચિ જોઈ શકો છો.',
    },
    {
      id: 43,
      title: 'ઉપાડવાનો સમય કેવી રીતે ગણવામાં આવે છે? તે કયા પરિબળોથી પ્રભાવિત થાય છે?',
      role: [ERoles.OPERATOR],
      text: 'તાજા શાકભાજી અને ફળો નાશવંત હોય છે, અને લણણી પછી તેઓ કેવી રીતે તાજગી ગુમાવે છે તે મોટાભાગે તાપમાન પર આધારિત છે. તેથી, ઉપાડવાનો સમય સંબંધિત ઠંડક એકમના તાપમાન અને જ્યારે તે ઠંડક એકમમાં લાવવામાં આવે છે ત્યારે ઉત્પાદનની પ્રારંભિક ગુણવત્તાના આધારે ગણવામાં આવે છે. આ ગણતરીમાં ઉપયોગમાં લેવાતા પરિમાણો દરેક કોમોડિટી માટે અનન્ય છે. નોલેજ હબમાં તમે વિવિધ કોમોડિટીઝમાં નાશવંતતા કેવી રીતે અલગ પડે છે તેના પર થોડી સમજ મેળવી શકો છો.',
    },
    {
      id: 44,
      title: 'ઉપાડવાનો સમય 0 દિવસ છે છતાં ઉત્પાદન હજુ પણ સારું દેખાઈ રહ્યું છે. શા માટે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'રંગ તે ઉઠાવવાનો સમય પહેલાં બાકીના દિવસોને દર્શાવે છે. તમે જો 2 દિવસથી ઓછું હોય ત્યારે બારને લાલમાં, 7 દિવસથી ઓછું હોય ત્યારે પીળામાં, અને 7 દિવસથી વધુ હોય ત્યારે હરીયળમાં જુઓ. આ મૂલ્ય દરેક સંગ્રહ આઇટમ માટે વિશિષ્ટ છે અને દિવસમાં ઘણી વખત તાપમાનના આધારે પુનઃગણવામાં આવે છે. જો ગણતરી માટે કોઈ મોડેલ ઉપલબ્ધ ન હોય, તો બારનો રંગ ગ્રે હશે.',
    },
    {
      id: 45,
      title: 'કાપણીનો સમય 0 દિવસથી વધુ છે પણ પાક લગભગ બગડી ગયો છે. શા માટે?',
      role: [ERoles.OPERATOR],
      text: 'ડેશબોર્ડને અપડેટ થવામાં થોડું સમય લાગી શકે છે. કૃપા કરીને ખાતરી કરો કે તમે યોગ્ય ઠંડક યંત્રમાં જોઈ રહ્યાં છો. જો તમે સમસ્યા જોતા રહો છો, તો કૃપા કરીને app@yourvcca.org પર રિપોર્ટ કરો.',
    },
    {
      id: 46,
      title: 'કાપણીનો સમય 0 દિવસથી વધુ છે પણ પાક લગભગ બગડી ગયો છે. શા માટે?',
      role: [ERoles.OPERATOR],
      text: 'ડેશબોર્ડને અપડેટ થવામાં થોડું સમય લાગી શકે છે. કૃપા કરીને ખાતરી કરો કે તમે ચેકઆઉટ કરેલી વસ્તુઓ સાચી હતી અને તમે યોગ્ય ઠંડક યંત્રમાં જોઈ રહ્યા છો. જો તમે સમસ્યા જોતા રહો છો, તો કૃપા કરીને app@yourvcca.org પર રિપોર્ટ કરો.',
    },
    {
      id: 47,
      title:
        'આગામી એક દિવસ માટે રૂમ ઓક્યુપન્સી લાલ રંગની હશે (૨૦% થી ઓછી). આ શેના આધારે છે? શું મારે ચિંતા કરવી જોઈએ?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'જ્યારે કુલિંગ યુનિટની ક્ષમતાના 80% થી વધુ ઉપયોગ થાય છે ત્યારે ઓક્યુપન્સી લાલ રંગમાં બતાવવામાં આવે છે. ભવિષ્યની ઓક્યુપન્સી વિશેની માહિતી ચેક-ઇન સમયે દરેક વપરાશકર્તા દ્વારા સ્ટોરેજમાં આયોજિત દિવસો તરીકે જાહેર કરાયેલા દિવસોની સંખ્યા પર આધારિત છે. ધ્યાન રાખો કે આ ફક્ત એક અંદાજ છે અને તે અચોક્કસ હોઈ શકે છે. આમ, લાલ રૂમ ઓક્યુપન્સી ફક્ત એક સંકેત છે કે રૂમ ભરાઈ રહ્યો છે. તમારે ચિંતા કરવાની જરૂર નથી પરંતુ તે મુજબ પગલાં લઈ શકો છો. ઉદાહરણ તરીકે, જેમના સ્ટોરેજમાં માલ સંગ્રહિત છે તેમને ટૂંક સમયમાં ચેકઆઉટ કરવાની સલાહ આપવા માટે કૂલિંગ વપરાશકર્તાઓનો સંપર્ક કરવાનું વિચારો. જ્યારે તમે સમયસર ઓર્ડર કરો છો ત્યારે તમે "ડેશબોર્ડ" હેઠળ ચેકઆઉટ કરવા માટે સૌથી તાત્કાલિક વસ્તુઓની ઓર્ડર કરેલી સૂચિ જોઈ શકો છો.',
    },
    {
      id: 48,
      title:
        'એક કૂલિંગ યુઝર રૂમમાં એવી વસ્તુ લાવી રહ્યો છે જે યાદીમાં નથી. શું હું હજુ પણ તે ચેક કરી શકું છું?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'આ નોટિફિકેશન 12 કલાકથી વધુ સમય માટે સેન્સરથી ડેટા પ્રાપ્ત ન થતાં મોકલવામાં આવે છે, અને તે અર્થ આપે છે કે હવે "ઠંડક યંત્ર" > "રૂમની સ્થિતિ" પેનલમાં સેટ કરેલું તાપમાન ઉપયોગમાં આવી રહ્યું છે. એપ્લિકેશન દરેક 1 કલાકે સેન્સર સાથે ફરીથી જોડાવા માટે પ્રયાસ કરશે, તેથી આ કનેક્ટિવિટી સમસ્યા હોય તો થોડા કલાકો માટે રાહ જુઓ. જો ઘણા કલાકો અથવા દિવસો માટે નવા સેન્સર ડેટા ઉપલબ્ધ નથી, તો સમસ્યા હાર્ડવેર તરફથી હોઈ શકે છે, ઉદાહરણ તરીકે, સેન્સર બેટરી ખતમ થઈ ગઈ હોઈ શકે છે.',
    },
    {
      id: 49,
      title: 'ડેશબોર્ડમાં, દરેક વસ્તુ પર એક રંગીન બાર હોય છે. બારનો રંગ શું દર્શાવે છે?',
      role: [ERoles.EMPLOYEE],
      text: 'જ્યારે એપ સાથે કોઈ સેન્સર કનેક્ટેડ નથી, ત્યારે ઉઠાવવાનો સમય ગણવાવ માટેનું મોડેલ ઓપરેટર દ્વારા સેટ કરાયેલા તાપમાન પર આધાર રાખે છે. આ એ કારણ છે કે ઓપરેટર દરેક નવા ચેક ઇન અને ચેક આઉટ સમયે નવી સેટ તાપમાન દાખલ કરવા માટે કહેવામાં આવે છે. મોડેલ સાચું રહેવા માટે, તાપમાન અપ-ટુ-ડેટ હોવું અત્યંત મહત્વપૂર્ણ છે. કૃપા કરીને તમારા ઠંડક યંત્રમાં ઓપરેટરોને આ મહત્વપૂર્ણ પગલાની બાબતે સૂચના આપો.',
    },
    {
      id: 50,
      title:
        'મેં સફળતાપૂર્વક ચેક ઇન પૂર્ણ કર્યું છે પણ હજુ સુધી ડેશબોર્ડમાં વસ્તુઓ દેખાતી નથી. શા માટે?',
      role: [ERoles.OPERATOR],
      text: 'આ પોપઅપ તમને યાદ અપાવવા માટે છે કે તમે એપ્લિકેશનને ઠંડક રૂમનો સঠিক સેટ તાપમાન જાણ કરવા માટે સૂચિત કરો કે જો સેન્સરની કોઈ જગ્યા ન હોય (અથવા તે યોગ્ય રીતે કાર્યરત નથી). કૃપા કરીને તપાસો કે પોપઅપમાં દર્શાવેલું મૂલ્ય તે જ છે જે તમે રૂમમાં કંટ્રોલ પેનલ પર વાંચી શકો છો. જો તે નહીં હોય, તો તમારે તાપમાન અપડેટ કરવું જોઈએ. અન્યથા, તમે પુષ્ટિ કરી શકો છો અને ચેક ઇનને આગળ વધારી શકો છો. ઉઠાવવાનો સમય ગણતરી માટે તાપમાન અપડેટ કરવું ખૂબ જ મહત્વપૂર્ણ છે.',
    },
    {
      id: 51,
      title:
        'મેં સફળતાપૂર્વક ચેક આઉટ પૂર્ણ કર્યું છે પણ હજુ પણ ડેશબોર્ડમાં વસ્તુઓ જોઈ શકું છું. શા માટે?',
      role: [ERoles.OPERATOR],
      text: 'ડેશબોર્ડ અપડેટ થવામાં થોડો સમય લાગી શકે છે. કૃપા કરીને ખાતરી કરો કે તમે જે વસ્તુઓ ચેક-આઉટ કરી છે તે સાચી હતી અને તમે યોગ્ય કૂલિંગ યુનિટમાં શોધી રહ્યા છો. જો તમને સમસ્યા જોવા મળે છે, તો કૃપા કરીને app@yourvcca.org પર તેની જાણ કરો.',
    },
    {
      id: 52,
      title: 'તાપમાન સેન્સર બરાબર કામ કરી રહ્યું છે કે નહીં તે હું કેવી રીતે ચકાસી શકું?',
      role: [ERoles.OPERATOR],
      text: 'એપ્લિકેશન વિકસાવતી ટીમ ખંડના મુખ્ય તથ્યના રૂપમાં ઉપયોગ કરવાના સમયે શીતલન વપરાશકર્તાઓ વિશે કેટલીક મૂળભૂત માહિતી સંકળાવે છે જે એપ્લિકેશન દ્વારા પ્રાપ્ત કરેલી માહિતી સાથે તુલના કરવામાં આવશે. એકમાત્ર ઉદ્દેશ એ છે કે એપ્લિકેશન ડિઝાઇન અને ઠંડા કક્ષાનો ઉપયોગ સુધારવો.',
    },
    {
      id: 53,
      title: 'મને સૂચના મળી કે સેન્સર કામ કરી રહ્યું નથી. મારે શું કરવું જોઈએ?',
      role: [ERoles.OPERATOR],
      text: 'તમે તાજેતરમાં ખંડમાંથી કેટલાક ઉત્પાદનોને ચેક-આઉટ કરેલા શીતલન વપરાશકર્તાને સંપર્ક કરવા માટે પૂછવામાં આવશે અને ખંડમાં સ્ટોર કરાયેલા આઇટમના વેચાણ માટે ક્યાં અને કયા ભાવમાં વેચાઈ ગયું તે વિશે પૂછવા માટે. આ માહિતી એપ્લિકેશન વિકસાવતી ટીમને બજાર ભાવની આગાહીનું સાચાપણું સુચિત કરવા અને સુધારવા માટે મદદ કરશે.',
    },
    {
      id: 54,
      title: 'જો સેન્સર ન હોય તો ઉપાડવાનો સમય કેવી રીતે ગણી શકાય?',
      role: [ERoles.EMPLOYEE],
      text: 'ટ્યુટોરીયલ અને FAQ વિભાગ તપાસવા ખાતરી કરો, કારણ કે તેમાં એપ્લિકેશન વિશેની ઉપયોગી માહિતી છે જે તમારું પ્રશ્ન સ્પષ્ટ કરવામાં મદદ કરી શકે છે. જો તમે એપ્લિકેશન સપોર્ટ ટીમ સાથે સંપર્ક કરવા માંગતા હો, તો કૃપા કરીને app@yourvcca.org પર ઇમેઇલ મોકલો.',
    },
    {
      id: 55,
      title:
        'દર વખતે જ્યારે હું ચેક-ઇન શરૂ કરું છું, ત્યારે મને તાપમાન ચેતવણી પોપઅપ મળે છે. શા માટે?',
      role: [ERoles.OPERATOR],
      text: 'ટ્યુટોરીયલ અને FAQ વિભાગ તપાસવા ખાતરી કરો, કારણ કે તેમાં એપ્લિકેશન વિશેની ઉપયોગી માહિતી છે જે તમારું પ્રશ્ન સ્પષ્ટ કરવામાં મદદ કરી શકે છે. જો તમારું પ્રશ્ન હજુ પણ સમાધાન ન થાય, તો કૃપા કરીને નોંધણી કરેલા કર્મચારી સાથે સંપર્ક કરો જેમણે તમે રિપોર્ટ કરી રહ્યા છો.',
    },
    {
      id: 56,
      title:
        'દર વખતે જ્યારે હું ચેક-આઉટ પૂર્ણ કરું છું, ત્યારે મને તાપમાન ચેતવણી પોપઅપ મળે છે. શા માટે?',
      role: [ERoles.EMPLOYEE],
      text: 'કૃપા કરીને ખાતરી કરો કે તમારી પાસે એપ્લિકેશનનો તાજેતરનો સંસ્કરણ સ્થાપિત છે. જો સમસ્યા યથાવત રહે છે, તો કૃપા કરીને એપ્લિકેશન સપોર્ટ ટીમને સૂચના આપવા માટે app@yourvcca.org પર ઇમેઇલ મોકલો અથવા પ્રતિસાદ ફોર્મ ભરો: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 57,
      title: 'કૂલિંગ યુઝરને પહેલા ક્રેટમાં ચેક ઇન કરતા પહેલા પ્રશ્નાવલી ભરવાનું કેમ કહેવું જોઈએ?',
      role: [ERoles.OPERATOR],
      text: 'કૃપા કરીને ખાતરી કરો કે તમારી પાસે એપ્લિકેશનનો તાજેતરનો સંસ્કરણ સ્થાપિત છે. જો સમસ્યા યથાવત રહે છે, તો કૃપા કરીને નોંધણી કરેલા કર્મચારી સાથે સંપર્ક કરો જેમણે તમે રિપોર્ટ કરી રહ્યા છો અને / અથવા એપ્લિકેશન સપોર્ટ ટીમને સૂચના આપવા માટે app@yourvcca.org પર ઇમેઇલ મોકલો અથવા પ્રતિસાદ ફોર્મ ભરો: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 58,
      title: 'એપ્લિકેશન પર નોંધણી કરાવતી વખતે મારે પ્રશ્નાવલી શા માટે ભરવાની જરૂર છે?',
      role: [ERoles.EMPLOYEE],
      text: 'એપ્લિકેશન સપોર્ટ ટીમ તમારું એપ્લિકેશનનો અનુભવ સાંભળવા માટે ઉત્સુક છે અને તમારું પ્રતિસાદ સ્વાગત કરે છે, કૃપા કરીને app@yourvcca.org પર ઇમેઇલ મોકલો અથવા પ્રતિસાદ ફોર્મ મોકલો: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 60,
      title:
        'દરેક સ્ટોરેજ વસ્તુની વેચાણ કિંમત વિશે મારે કૂલિંગ વપરાશકર્તાઓને શા માટે પૂછવાની જરૂર છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'આ ટૅબમાં, તમે બજાર ભાવના પૂર્વાનુમાનને અથવા તો ગ્રાફ સ્વરૂપમાં કે ટેબલ સ્વરૂપમાં જોઈ શકો છો. ભાવની ટેન્ડ પૃષ્ઠ છેલ્લા મહિના的数据 અને વિશિષ્ટ બજાર અને માલ માટે 14-દિવસના પૂર્વાનુમાનને (ભારતમાં) અથવા રાજ્યના આધારે માસિક પૂર્વાનુમાનને (નાઇજેરિયામાં) દૃશ્યમાન કરે છે. ભાવ રેંકિંગ પૃષ્ઠ તમામ બજારના ભાવના પૂર્વાનુમાનને શ્રેષ્ઠથી નીચા સુધી દર્શાવે છે, અને તારીખ, રાજ્ય, જીલ્લો અને બજાર (ભારતમાં) દ્વારા ફિલ્ટર કરવાની શક્યતા સાથે.',
    },
    {
      id: 61,
      title: 'મને એપના કેટલાક ભાગો સમજાતા નથી. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ટ્યુટોરીયલ અને FAQ વિભાગ તપાસવાનું ભૂલશો નહીં, કારણ કે તેમાં એપ્લિકેશન વિશે ઉપયોગી માહિતી છે જે તમારા પ્રશ્નોને સ્પષ્ટ કરવામાં મદદ કરી શકે છે. જો તમે એપ્લિકેશન સપોર્ટ ટીમનો સંપર્ક કરવા માંગતા હો, તો કૃપા કરીને app@yourvcca.org પર ઇમેઇલ મોકલો.',
    },
    {
      id: 62,
      title: 'મને એપના કેટલાક ભાગો સમજાતા નથી. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ભવિષ્યના બજાર ભાવના પૂર્વાનુમાન બનાવવા માટે એ historiques bazaar na bhav ane anya data jevu ke currency conversion rate ane petrol price, par adharit machine learning model ne training aapvama aave chhe.',
    },
    {
      id: 66,
      title: 'મને એપના કેટલાક ભાગો સમજાતા નથી. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.COOLING_USER],
      text: 'તમે "બાદમાં પૂર્ણ કરો" ક્લિક કરીને સર્વેના પ્રશ્નોને છોડી શકો છો. સર્વે તમારા ખાતાની વિગતોનો ભાગ છે અને તમે તે કોઈપણ સમયે પૂર્ણ કરી શકો છો. જો કે, જ્યારે તમે રૂમનો ઉપયોગ શરૂ કરો ત્યારે સર્વેના પ્રશ્નોના જવાબને સંપૂર્ણ રીતે આપવા માટે સમય લેવાની સલાહ આપવામાં આવે છે: આ રીતે તમે Coldtivate એપ્લિકેશન સાથે વધુ વ્યક્તિગત અનુભવ મેળવી શકો છો!',
    },
    {
      id: 67,
      title: 'મને એપમાં એક બગ મળ્યો. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.COOLING_USER],
      text: 'કૃપા કરીને ખાતરી કરો કે તમારી પાસે એપ્લિકેશનનું નવીનતમ સંસ્કરણ ઇન્સ્ટોલ કરેલું છે. જો સમસ્યા ચાલુ રહે, તો કૃપા કરીને app@yourvcca.org પર ઇમેઇલ મોકલીને અથવા પ્રતિસાદ ફોર્મ ભરીને એપ્લિકેશન સપોર્ટ ટીમને જાણ કરો: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 68,
      title: 'એપ્લિકેશનમાં કંઈક યોગ્ય રીતે કામ કરી રહ્યું નથી. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.OPERATOR],
      text: 'જો રૂમમાં તાપમાન સેન્સર્સ છે જે Coldtivate એપ સાથે જોડાઈ શકે છે, તો કૃપા કરીને તમારી જવાબદાર વ્યક્તિ સાથે વાત કરો. Coldtivate માં બનાવેલા કૂલિંગ યુનિટ્સ સાથે સેન્સર્સને લિંક કરવા માટે ફક્ત રજિસ્ટર થયેલ કર્મચારી ભૂમિકા ધરાવતી વ્યક્તિ જ સક્ષમ છે.',
    },
    {
      id: 69,
      title: 'એપ્લિકેશનમાં કંઈક યોગ્ય રીતે કામ કરી રહ્યું નથી. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.COOLING_USER],
      text: 'કૃપા કરીને ખાતરી કરો કે તમારી પાસે એપ્લિકેશનનું નવીનતમ સંસ્કરણ ઇન્સ્ટોલ કરેલું છે. જો સમસ્યા ચાલુ રહે, તો કૃપા કરીને કોલ્ડ રૂમના ઓપરેટરનો સંપર્ક કરો અને/અથવા app@yourvcca.org પર ઇમેઇલ મોકલીને એપ્લિકેશન સપોર્ટ ટીમને જાણ કરો.',
    },
    {
      id: 70,
      title:
        'હું એપ્લિકેશન સાથેના મારા અનુભવ વિશે પ્રતિસાદ આપવા માંગુ છું. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.COOLING_USER],
      text: 'ઉઠાવવાનો સમય અનુમાનિત મૂલ્ય છે. તેથી, દુ rare ખંડ થઈ શકે છે, જ્યાં ઉત્પાદન spoiled જાય છે જ્યારે ઉઠાવવાનો સમય 0 થી વધુ હોય છે. કારણ કે તાજા ઉત્પાદનની ગુણવત્તા નાશ મુખ્યત્વે તાપમાન પર આધાર રાખે છે, તાપમાનના ડેટા અનુમાનને વધુ ચોક્કસ બનાવવામાં મદદ કરે છે. ઉદાહરણ તરીકે, સમસ્યા ત્યારે ઊભી થઈ શકે છે જ્યારે એપ સાથે જોડાયેલા તાપમાન સેન્સર નથી, અને ઓપરેટર નિયમિત રીતે એપમાં રૂમનું તાપમાન અપડેટ નથી કર્યું. જો એવું થાય છે તો કૃપા કરીને રૂમના ઓપરેટરને જાણાવો.',
    },
    {
      id: 71,
      title:
        'હું એપ્લિકેશન સાથેના મારા અનુભવ વિશે પ્રતિસાદ આપવા માંગુ છું. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.COOLING_USER],
      text: 'એપ્લિકેશન વિકસાવતી ટીમ ખંડના મુખ્ય તથ્યના રૂપમાં ઉપયોગ કરવાના સમયે શીતલન વપરાશકર્તાઓ વિશે કેટલીક મૂળભૂત માહિતી સંકળાવે છે જે એપ્લિકેશન દ્વારા પ્રાપ્ત કરેલી માહિતી સાથે તુલના કરવામાં આવશે. એકમાત્ર ઉદ્દેશ એ છે કે એપ્લિકેશન ડિઝાઇન અને ઠંડા કક્ષાનો ઉપયોગ સુધારવો.',
    },
    {
      id: 73,
      title:
        'હું એપ્લિકેશન સાથેના મારા અનુભવ વિશે પ્રતિસાદ આપવા માંગુ છું. મારે કોનો સંપર્ક કરવો જોઈએ?',
      role: [ERoles.COOLING_USER],
      text: 'ટ્યુટોરીયલ અને FAQ વિભાગ તપાસવા ખાતરી કરો, કારણ કે તેમાં એપ્લિકેશન વિશેની ઉપયોગી માહિતી છે જે તમારું પ્રશ્ન સ્પષ્ટ કરવામાં મદદ કરી શકે છે. જો તમારું પ્રશ્ન હજુ પણ સમાધાન ન થાય, તો કૃપા કરીને ઠંડા ખંડના ઓપરેટર સાથે સંપર્ક કરો અથવા app@yourvcca.org પર ઇમેઇલ મોકલો.',
    },
    {
      id: 74,
      title:
        'હું એવા વિસ્તારમાં છું જ્યાં ઇન્ટરનેટ કનેક્શન ઓછું છે: શું હું હજી પણ એપ્લિકેશનનો ઉપયોગ કરી શકું છું?',
      role: [ERoles.COOLING_USER],
      text: 'કૃપા કરીને ખાતરી કરો કે તમારી પાસે એપ્લિકેશનનો તાજેતરનો સંસ્કરણ સ્થાપિત છે. જો સમસ્યા યથાવત રહે છે, તો કૃપા કરીને ઠંડા ખંડના ઓપરેટર સાથે સંપર્ક કરો અને / અથવા એપ્લિકેશન સપોર્ટ ટીમને સૂચના આપવા માટે app@yourvcca.org પર ઇમેઇલ મોકલો.',
    },
    {
      id: 75,
      title: "'પાકના ભાવ' ચિહ્ન પર ક્લિક કરવાથી કયા ભાવ પ્રદર્શિત થાય છે?",
      role: [ERoles.EMPLOYEE],
      text: 'તમારો એકાઉન્ટ ડિલીટ કરવા માટે, તમે "મેનૂ" -> "એકાઉન્ટ વિગતો" પર જઇ શકો છો અને ડિલીટ પર ક્લિક કરી શકો છો. કૃપા કરીને ધ્યાન રાખો, આ ક્રિયા રદ કરી શકાતી નથી! જો તમે કંપનીના છેલ્લાં નોંધાયેલા કર્મચારી છો, તો આ ક્રિયા કંપનીને ડિલીટ કરશે. જો કોઈ પેન્ડિંગ ચેક-ઇન છે, તો તમામ કીટાંએ એક એપ્લિકેશન દ્વારા ચેક-આઉટ કર્યા પછી તમારા એકાઉન્ટને ડિલીટ કરી શકાતું નથી.',
    },
    {
      id: 76,
      title: "'પાક ભાવ' વિભાગમાં કેટલાક રાજ્યો અને બજારો કેમ ગાયબ છે?",
      role: [ERoles.OPERATOR],
      text: 'તમારો એકાઉન્ટ ડિલીટ કરવા માટે, તમે "મેનૂ" -> "એકાઉન્ટ વિગતો" પર જઇ શકો છો અને ડિલીટ પર ક્લિક કરી શકો છો. કૃપા કરીને ધ્યાન રાખો, આ ક્રિયા રદ કરી શકાતી નથી! જો તમે ખુલ્લા ચેક-ઇન્સ સાથે કોઈની પસંદગી છે, તો તમારા એકાઉન્ટને ડિલીટ કરવું શક્ય નથી જ્યાં સુધી એક નોંધાયેલ કર્મચારી અન્ય ઓપરેટરને રૂમમાં સુવિધા આપે છે અથવા બધા કીટા એપ્લિકેશનમાં ચેક-આઉટ થયેલ છે.',
    },
    {
      id: 77,
      title: 'ભવિષ્યના બજાર ભાવોની ગણતરી કેવી રીતે કરવામાં આવે છે?',
      role: [ERoles.COOLING_USER],
      text: 'તમારો એકાઉન્ટ ડિલીટ કરવા માટે, તમે "મેનૂ" -> "એકાઉન્ટ વિગતો" પર જઇ શકો છો અને ડિલીટ પર ક્લિક કરી શકો છો. કૃપા કરીને ધ્યાન રાખો, આ ક્રિયા રદ કરી શકાતી નથી! જો તમે કોઈ પણ રૂમમાં ખુલ્લા ચેક-ઇન્સ રાખ્યા છે, તો તમે તમારું એકાઉન્ટ ડિલીટ કરી શકતા નથી ત્યાં સુધી તમામ કીટા રૂમમાંથી ચેક-આઉટ કરવામાં આવ્યાં નથી. કૃપા કરીને તમારા કીટા રૂમમાં મેળવો! જો તમને લાગે છે કે એપ્લિકેશનમાં પેન્ડિંગ કીટા છે કે જે તમે પહેલેથી જ દૂર કર્યા છે, તો કૃપા કરીને રૂમના ઓપરેટર સાથે વાતચીત કરો.',
    },
    {
      id: 78,
      title: 'હું મારું એકાઉન્ટ ડિલીટ કરવા માંગુ છું. મારે શું કરવું જોઈએ?',
      role: [ERoles.EMPLOYEE],
      text: 'તમામ પેન્ડિંગ ચેક-ઇન્સ વિના તમે "મેનૂ" -> "મેનેજમેન્ટ" -> "કૂલિંગ યુનિટ્સ" / "સ્થાનો" પર જઈને અને ડિલીટ પર ક્લિક કરીને ઠંડક યુનિટ્સ અને સ્થાનને દૂર કરી શકો છો. અન્યથા, તમારા રૂમને અને સ્થાને ડિલીટ કરવાનો પ્રયાસ કરવાનો પહેલાં ઓપરેટર સાથે વાતચીત કરો.',
    },
    {
      id: 79,
      title: 'હું મારું એકાઉન્ટ ડિલીટ કરવા માંગુ છું. મારે શું કરવું જોઈએ?',
      role: [ERoles.EMPLOYEE],
      text: 'અન્ય યુઝર્સને એપ્લિકેશનમાંથી દૂર કરવાની પરવાનગી નથી. પરંતુ, તમે "મેનૂ" -> "મેનેજમેન્ટ" -> "ઓપરેટર્સ" પર જઈને તમારા રૂમમાંથી ઓપરેટર્સને અનસાઇન કરી શકો છો. જો તમને તે માટે કટોકટી રીતે હટાવવું છે, તો તમે એપ્લિકેશનની તરફથી વધુ માટે ઈમેલ લખી શકો છો.',
    },
    {
      id: 80,
      title: 'હું મારું એકાઉન્ટ ડિલીટ કરવા માંગુ છું. મારે શું કરવું જોઈએ?',
      role: [ERoles.OPERATOR],
      text: 'કૂલિંગ યુઝરને યાદીમાંથી દૂર કરવા માટે, "મેનેજમેન્ટ" -> "કૂલિંગ યુઝર્સ" પર જાઓ, કૂલિંગ યુઝરના નામ પર ક્લિક કરો અને પછી "ડિલીટ" બટન પર ક્લિક કરો. કૃપા કરીને નોંધો કે ફક્ત તે યુઝર્સને દૂર કરી શકાય છે જે પાસે પેન્ડિંગ ચેક-ઇન્સ નથી! જો પેન્ડિંગ ચેક-ઇન્સ હોય, તો કૃપા કરીને યુઝરને ઉત્પાદન લેવા માટે સંપર્ક કરો. નોંધો કે આ ક્રિયા રદ કરી શકાતી નથી! જો યુઝર પાસે સ્માર્ટફોન છે, તો આ ઑપરેશન તેને તમારી યાદીમાંથી દૂર કરશે, પરંતુ યુઝર હજુ પણ Coldtivate નો ઉપયોગ કરી શકે છે. જો યુઝર પાસે સ્માર્ટફોન નથી, તો આ ઑપરેશન તેનો ખاتا દૂર કરશે અને સંબંધિત ફોન નંબરને મુક્ત કરશે.',
    },
    {
      id: 81,
      title: 'હું કૂલિંગ યુનિટ અથવા સ્થાન કેવી રીતે ડિલીટ કરી શકું?',
      role: [ERoles.EMPLOYEE],
      text: 'ઓપરેટર્સ અને અન્ય નોંધાયેલા કર્મચારીઓએ છેલ્લે ક્યારે એપ્લિકેશનમાં લોગિન કર્યું છે તે તપાસવા માટે, તમે "મેનૂ" -> "મેનેજમેન્ટ" -> "ଓପରେଟର" / "ସେବା ପ୍ରଦାନକାରୀ" પર જઈ શકો છો. નામની બાજુમાં જે તારીખ અને સમય જુઓ છો તે છેલ્લે લોગિન થયેલ તારીખ અને સમય છે.',
    },
    {
      id: 82,
      title: 'હું મારી કંપનીમાંથી બીજા રજિસ્ટર્ડ કર્મચારી અથવા ઓપરેટરને કેવી રીતે કાઢી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'તમને એપ્લિકેશનમાંથી અન્ય વપરાશકર્તાઓને કાઢી નાખવાની મંજૂરી નથી. જો કે, તમે "મેનુ" -> "મેનેજમેન્ટ" -> "ઓપરેટર્સ" પર નેવિગેટ કરીને તમારા રૂમમાંથી ઓપરેટરોને અનએસાઇન કરી શકો છો. જો તમે હજુ પણ વપરાશકર્તાને સંપૂર્ણપણે દૂર કરવા માંગતા હો જેથી તેમને તમારી કંપનીની ઍક્સેસ ન મળે, તો કૃપા કરીને app@yourvcca.org પર ઇમેઇલ લખો અને સમજાવો કે આ શા માટે જરૂરી છે.',
    },
    {
      id: 83,
      title: 'હું યાદીમાંથી કૂલિંગ યુઝરને કેવી રીતે ડિલીટ કરી શકું?',
      role: [ERoles.COOLING_USER],
      text: 'ડેશબોર્ડમાં એક આઈટમ પર ક્લિક કરીને, તમે તમારું ચેક-ઇન કર્યું તે ઓપરેટરનું નામ અને સંપર્ક નંબર જોઈ શકો છો. તમે નંબરને ક્લિપબોર્ડ પર નકલ કરી શકો છો અને ઓપરેટરને ફોન અથવા એસએમએસ દ્વારા સંપર્ક કરી શકો છો.',
    },
    {
      id: 84,
      title:
        'ઓપરેટરોએ તાજેતરમાં એપ્લિકેશનનો ઉપયોગ કર્યો છે કે નહીં તેનું હું ક્યાં નિરીક્ષણ કરી શકું?',
      role: [ERoles.COOLING_USER],
      text: 'ઓપરેટરો અને અન્ય નોંધાયેલા કર્મચારીઓએ એપમાં છેલ્લે ક્યારે લોગ ઇન કર્યું છે તે તપાસવા માટે, તમે "મેનુ" -> "મેનેજમેન્ટ" -> "ઓપરેટર" / "રજિસ્ટર્ડ કર્મચારી" પર જઈ શકો છો. નામની બાજુમાં તમે જે તારીખ અને સમય જુઓ છો તે છેલ્લી લોગિન તારીખ અને સમય છે.',
    },
    {
      id: 85,
      title: 'દરેક રૂમ દ્વારા થતી આવક અને અન્ય ઉપયોગના આંકડા હું ક્યાંથી મોનિટર કરી શકું?',
      role: [ERoles.COOLING_USER],
      text: 'તમે "મેનુ" -> "મેનેજમેન્ટ" -> "રેવન્યુ એનાલિસિસ" પર નેવિગેટ કરી શકો છો, કૂલિંગ યુનિટ્સ અને રુચિનો સમય અંતરાલ પસંદ કરી શકો છો, અને તમને આ રૂમમાંથી ચેક-આઉટ સાથે સંકળાયેલ કુલ આવક દેખાશે. તમે કૂલિંગ યુઝર, ચુકવણી પદ્ધતિ અને સમય દ્વારા પણ ફિલ્ટર કરી શકો છો. તમારા રૂમ દીઠ ચેક-ઇન્સના સારાંશ આંકડા (વપરાશકર્તાઓની સંખ્યા, ક્રેટ્સની કુલ સંખ્યા, વગેરે) ની કલ્પના કરવા માટે, તમે "મેનુ" -> "મેનેજમેન્ટ" -> "વપરાશ વિશ્લેષણ" પર નેવિગેટ કરી શકો છો. અહીં તમે તારીખ અને કૂલિંગ યુનિટ દ્વારા પણ ફિલ્ટર કરી શકો છો. બંને પૃષ્ઠોમાં, માહિતી એક્સેલ ફાઇલો તરીકે ડાઉનલોડ કરી શકાય છે. "એનાલિસિસ" ટેબમાં, તમે વપરાશકર્તાઓ, આવક, ઉપયોગ અને અસર વિશેની માહિતી સાથે વધુ ડેશબોર્ડ શોધી શકો છો. છેલ્લે, રૂમમાં હાલમાં પાક માટે ક્રેટ્સની કુલ સંખ્યા, વજન અને શ્રેષ્ઠ તાપમાનનું નિરીક્ષણ કરવા માટે, તમે "વધુ" -> "કૂલિંગ યુનિટ્સ" -> "ક્રેટ્સ માહિતી" પર નેવિગેટ કરી શકો છો.',
    },
    {
      id: 86,
      title:
        'મારા ઉત્પાદનનો સંગ્રહ જ્યાં થાય છે તે કુલિંગ યુનિટનો સંપર્ક વ્યક્તિ કોણ છે તે હું કેવી રીતે શોધી શકું?',
      role: [ERoles.OPERATOR],
      text: 'એપ્લિકેશન સપોર્ટ ટીમ તમારું એપ્લિકેશનનો અનુભવ સાંભળવા માટે ઉત્સુક છે અને તમારું પ્રતિસાદ સ્વાગત કરે છે, કૃપા કરીને app@yourvcca.org પર ઇમેઇલ મોકલો અથવા પ્રતિસાદ ફોર્મ મોકલો: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 87,
      title: 'મને એક સૂચના મળી છે. મારે શું કરવું જોઈએ?',
      role: [ERoles.COOLING_USER],
      text: 'એપ્લિકેશન સપોર્ટ ટીમ તમારું એપ્લિકેશનનો અનુભવ સાંભળવા માટે ઉત્સુક છે અને તમારું પ્રતિસાદ સ્વાગત કરે છે, કૃપા કરીને app@yourvcca.org પર ઇમેઇલ મોકલો.',
    },
    {
      id: 88,
      title: 'કુલિંગ યુનિટ્સના નકશા પર શું દર્શાવવામાં આવ્યું છે?',
      role: [ERoles.COOLING_USER],
      text: 'નકશા પર તમે તમારા સ્થાનની કલ્પના કરી શકો છો (કોલ્ડટીવેટને તમારા સ્થાનને ઍક્સેસ કરવા માટે પરવાનગી માંગવામાં આવશે), તમારી આસપાસના કુલિંગ યુનિટ્સનું સ્થાન અને યુનિટ્સ વિશે કેટલીક માહિતી (સિંગલ અથવા મલ્ટિકોમોડિટી, કંપની, કિંમત). કોલ્ડ રૂમમાં જઈને, તમે કોલ્ડ રૂમ ઓપરેટર પાસેથી યુનિટના સંચાલન અને સ્ટોરેજ માટેની તક વિશે વધુ માહિતી મેળવી શકો છો.',
    },
    {
      id: 89,
      title: ' હું એપ્લિકેશનની ભાષા કેવી રીતે બદલી શકું?',
      role: [ERoles.AUTH],
      text: ' એપ્લિકેશન ભાષા બદલવા માટે, તમે હોમપેજના તળિયે દેખાતા ડ્રોપડાઉન પર ક્લિક કરી શકો છો, અથવા, એકવાર તમે તમારી પ્રોફાઇલમાં લોગ ઇન થઈ જાઓ, પછી "મેનુ" -> "એકાઉન્ટ વિગતો" -> "સ્થાનિકીકરણ પસંદગીઓ" પર નેવિગેટ કરો.',
    },
    {
      id: 90,
      title:
        'મારા તાપમાન સેન્સર પ્રકારને કોલ્ડટીવેટ (ઇકોઝેન, યુબીબોટ, ફિગોર, વિક્ટ્રોન એનર્જી) દ્વારા સપોર્ટ કરવામાં આવે છે. હું સેન્સર કેવી રીતે સેટ કરી શકું?',
      role: [ERoles.EMPLOYEE],
      text: 'સેન્સરને કૂલિંગ યુનિટ સાથે કનેક્ટ કરવા માટે, તમે "મેનુ" -> "મેનેજમેન્ટ" -> "કૂલિંગ યુનિટ્સ" પર નેવિગેટ કરી શકો છો, તે યુનિટ પસંદ કરી શકો છો જેના માટે સેન્સર સેટ કરવું જોઈએ, અને પછી "સેન્સર ઉપલબ્ધ" ટૉગલ કરી શકો છો. તમે દરેક સપોર્ટેડ સેન્સર પ્રકાર માટે સૂચનાઓનું પાલન કરી શકો છો અને પ્રમાણિત કરી શકો છો. ફેરફારો સાચવવા માટે પૃષ્ઠના તળિયે "સેવ" ઘડિયાળ યાદ રાખો. આગામી 6 કલાકમાં તમને "વધુ" -> "કૂલિંગ યુનિટ્સ" -> "રૂમની સ્થિતિ" હેઠળ તમારા સેન્સરમાંથી તાપમાન રીડિંગ્સ દેખાશે.',
    },
    {
      id: 91,
      title: " એનાલિટિક્સ ટેબમાં 'કંપની', 'એગ્રીગેટેડ' અને 'કમ્પેરિશન' વ્યૂ વચ્ચે શું તફાવત છે?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'નેવિગેશન બારમાં Analytics ટેબ કંપનીના તમામ કોલ્ડ રૂમ માટે સારાંશ આંકડા પ્રદાન કરે છે. "કંપની" વ્યૂમાં, તમે કોલ્ડટીવેટનો ઉપયોગ શરૂ કરો છો ત્યારથી બધા કૂલિંગ યુનિટ્સ માટે વપરાશકર્તાઓ, ઉપયોગ અને અસર પરનો ડેટા જુઓ છો. "એગ્રીગેટેડ" પર ક્લિક કરીને, તમને કયા કૂલિંગ યુનિટ્સ અને સમયગાળામાં રુચિ છે તે ગોઠવવા માટે સંકેત આપવામાં આવે છે. વપરાશકર્તાઓ, ઉપયોગ અને અસર માટે પ્રદર્શિત ડેટા પસંદ કરેલા સમયગાળામાં પસંદ કરેલા કૂલિંગ યુનિટ્સમાં એકત્રિત કરવામાં આવે છે. જો તમે એકમો વચ્ચે સરખામણી કરવા માંગતા હો, તો તમે "તુલના" ટેબનો ઉપયોગ કરી શકો છો. અહીં, ડેટા કોષ્ટકોમાં પ્રદર્શિત થાય છે, જ્યાં પસંદ કરેલા સમયગાળામાં દરેક કૂલિંગ યુનિટનો ડેટા પ્રદર્શિત થાય છે. તમે ડેટાને સૉર્ટ કરી શકો છો અને કૂલિંગ યુનિટ્સ અને સમયગાળાને ગમે ત્યારે બદલી શકો છો.',
    },
    {
      id: 92,
      title: 'એનાલિટિક્સ ટેબમાં પ્રદર્શિત ડેટાની ગણતરી કેવી રીતે કરવામાં આવે છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'એનાલિટિક્સ ટેબનો ધ્યેય કોલ્ડટીવેટમાં શું થઈ રહ્યું છે તેનો વ્યાપક દૃષ્ટિકોણ પ્રદાન કરવાનો છે. કોલ્ડટીવેટમાં નોંધાયેલ ચેક-ઇન અને ચેક-આઉટ માહિતીમાંથી વપરાશકર્તા અને ઉપયોગ ડેટાની ગણતરી કરવામાં આવે છે. આમ તમે સમજી શકો છો કે કેટલા વપરાશકર્તાઓ અને કામગીરી કરવામાં આવે છે, અને દરેક કોલ્ડ રૂમની આવક અથવા સરેરાશ કબજો કેટલો છે. બીજી બાજુ, અસર વિભાગનો ડેટા સર્વેક્ષણો પર આધારિત છે જે કૂલિંગ વપરાશકર્તાઓને નોંધણી કરાવતી વખતે (એટલે \\u200b\\u200bકે તેઓ કોલ્ડ સ્ટોરેજનો ઉપયોગ શરૂ કરતા પહેલા) અને નિયમિતપણે કોલ્ડ રૂમમાંથી ઉત્પાદન ચેક-આઉટ કરતી વખતે ભરવાનું કહેવામાં આવે છે. આ ડેટા કાપણી પછીના નુકસાન અને કૂલિંગનો ઉપયોગ કરતી વખતે વપરાશકર્તાઓની આવકના ઉત્ક્રાંતિનો અંદાજ કાઢવા માટે મહત્વપૂર્ણ છે. અંતે, CO2 અંદાજ કોલ્ડ રૂમમાં સંગ્રહિત પાકને ઠંડુ કરવાથી સંકળાયેલ ઉત્સર્જનની તુલના રેફ્રિજરેશન વિના સંગ્રહિત કરવામાં આવતા અનુમાનિત ઉત્સર્જન સાથે કરે છે.',
    },
    {
      id: 93,
      title: 'એનાલિટિક્સ ટેબમાં પ્રદર્શિત ડેટાની ગણતરી કેવી રીતે કરવામાં આવે છે?',
      role: [ERoles.COOLING_USER],
      text: 'એનાલિટિક્સ ટેબનો ધ્યેય તમને તમારા પાક પર ઠંડકની અસરનો વ્યાપક દૃષ્ટિકોણ આપવાનો છે. "ક્રેટ્સ" હેઠળ પ્રદર્શિત ડેટા કોલ્ડટીવેટમાં રેકોર્ડ કરાયેલ ચેક-ઇન અને ચેક-આઉટ માહિતીમાંથી ગણતરી કરવામાં આવે છે. આમ તમે જાણી શકો છો કે તમે કયા પાકનો કેટલો સંગ્રહ કર્યો અને સરેરાશ સંગ્રહ સમય. "અસર" વિભાગનો ડેટા સર્વેક્ષણો પર આધારિત છે જે તમને નોંધણી કરતી વખતે (દા.ત. કોલ્ડ સ્ટોરેજનો ઉપયોગ શરૂ કરતા પહેલા) ભરવાનું કહેવામાં આવે છે અને નિયમિતપણે કોલ્ડ રૂમમાંથી ઉત્પાદન ચેક-આઉટ કરતી વખતે ભરવાનું કહેવામાં આવે છે. આ ડેટા કાપણી પછીના નુકસાન અને કૂલિંગનો ઉપયોગ કરતી વખતે આવકના ઉત્ક્રાંતિનો અંદાજ કાઢવા માટે મહત્વપૂર્ણ છે. સર્વેક્ષણો ભરવા માટે એક રીમાઇન્ડર પૃષ્ઠની ટોચ પર બતાવવામાં આવ્યું છે, અને અમે તમને શક્ય હોય ત્યારે તેમને ભરવા માટે પ્રોત્સાહિત કરીએ છીએ. બંને વિભાગમાં, તમે ચોક્કસ કોલ્ડટીવેટ રૂમ અથવા સમય અવધિ પસંદ કરવા માટે ઉપર જમણી બાજુએ "કન્ફિગર" બટનનો ઉપયોગ કરી શકો છો. જો કંઈ પસંદ ન કરવામાં આવે, તો તમે કોલ્ડટીવેટનો ઉપયોગ શરૂ કર્યા પછી ઉપલબ્ધ તમામ ડેટા જોશો.',
    },
    {
      id: 94,
      title: 'હું લોગ ઇન કરું છું પણ મને માર્કેટપ્લેસની કાર્યક્ષમતા દેખાતી નથી. શા માટે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'જો તમારા દેશમાં માર્કેટપ્લેસ સપોર્ટેડ છે, તો તમને નીચેના નેવિગેશન બારમાં "માર્કેટપ્લેસ" આઇકન દેખાશે. જો તમે તે જોઈ શકતા નથી, તો તેનો અર્થ એ છે કે આ કાર્યક્ષમતા તમારા દેશમાં સપોર્ટેડ નથી. હાલમાં, માર્કેટપ્લેસ ફક્ત નાઇજીરીયા સ્થિત વપરાશકર્તાઓ માટે જ ઉપલબ્ધ છે. જો તમે રજિસ્ટર્ડ કર્મચારી છો અને તમારા દેશમાં માર્કેટપ્લેસને પાઇલોટ કરવામાં રસ ધરાવો છો, તો કૃપા કરીને app@yourvcca.org પર અમારો સંપર્ક કરો.',
    },
    {
      id: 95,
      title: ' બજારમાં કુલિંગ કંપનીની ભૂમિકા શું છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'કૂલિંગ કંપની અને તેના કર્મચારીઓ બજારમાં તેમની સંડોવણીનું સ્તર નક્કી કરી શકે છે. કાર્યક્ષમતા કોલ્ડટીવેટ એપ્લિકેશનમાં ચેક-ઇન કરાયેલા ક્રેટ્સ પર આધાર રાખે છે, તેથી માર્કેટપ્લેસ ફક્ત ત્યારે જ કાર્ય કરી શકે છે જો કોલ્ડ રૂમ ઓપરેટર નિયમિતપણે એપ્લિકેશનમાં ચેક-ઇન અને ચેક-આઉટ કામગીરીની નોંધણી કરે. માર્કેટપ્લેસ દ્વારા ખરીદેલા ઉત્પાદન માટે, કૂલિંગ કંપની ડિજિટલ વ્યવહારના ભાગ રૂપે કૂલિંગ ફી પ્રાપ્ત કરી રહી છે. તેથી, નોંધાયેલ કર્મચારી કંપનીના બેંક ખાતાની વિગતો સેટ કરે તે મહત્વપૂર્ણ છે: આમ કરવા માટે, તમારે "મેનુ" -> "મેનેજમેન્ટ" -> "વેચનાર સેટિંગ્સ (કંપની)" -> "ચુકવણી વિકલ્પો" પર નેવિગેટ કરવું જોઈએ. વધુમાં, કૂલિંગ કંપનીઓ ખેડૂતો પાસેથી ઉત્પાદન ખરીદવાનું (ખરીદનારની ભૂમિકા ભજવીને) અને પછી બજારમાં તે પાકને ફરીથી વેચવાનું (વેચનારની ભૂમિકા ભજવીને) નક્કી કરી શકે છે. બંને વ્યવહારો કોલ્ડટીવેટ માર્કેટપ્લેસ દ્વારા કરી શકાય છે. નોંધ કરો કે ઓપરેટરો અને નોંધાયેલ કર્મચારીઓ બંને પાસે પોતાના માટે (વ્યક્તિગત રીતે) અથવા તેઓ જે કંપનીનું પ્રતિનિધિત્વ કરે છે તેના વતી ખરીદવાનો વિકલ્પ છે.',
    },
    {
      id: 96,
      title: 'બજારમાં કોલ્ડ રૂમ ઓપરેટરની ભૂમિકા શું છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: ' બજારમાં કોલ્ડ રૂમ ઓપરેટરોની ત્રણ મુખ્ય ભૂમિકાઓ છે. ૧) તેઓ સ્માર્ટફોન વગરના કૂલિંગ યુઝર્સને તેમનું બેંક એકાઉન્ટ સેટ કરવામાં મદદ કરે છે (જેથી તેઓ ડિજિટલ પેમેન્ટ મેળવી શકે), તેમના ક્રેટ્સ "વેચાણ માટે" અને તેમની કિંમતની યાદી બનાવે છે. ૨) તેઓ કોલ્ડ રૂમમાં ઉત્પાદનને વ્યવસ્થિત રાખવા માટે જવાબદાર છે, આ સિદ્ધાંતને અનુસરીને કે ક્રેટમાં રહેલી બધી પેદાશો એક જ વપરાશકર્તાની છે: જ્યારે ક્રેટમાં રહેલી કેટલીક પેદાશો ખરીદવામાં આવે છે (અને આમ અલગ માલિકની હોય છે), ત્યારે ઓપરેટરને ખરીદેલી પેદાશોને અલગ ક્રેટમાં ખસેડવાની સૂચના મળે છે. જો આખું ક્રેટ ખરીદવામાં આવે છે, તો કોઈ કાર્યવાહી કરવાની જરૂર નથી. ૩) કોલ્ડ રૂમ ઓપરેટરો તમામ ચેક-આઉટ કામગીરી માટે જવાબદાર છે, જેમાં બજારમાંથી થતી કામગીરીનો સમાવેશ થાય છે: જ્યારે ખરીદનાર (અથવા ડિલિવરી પ્રતિનિધિ) ખરીદેલી પેદાશો લેવા માટે કોલ્ડ રૂમમાં આવે છે, ત્યારે ઓપરેટરે કોલ્ડટીવેટમાંથી તે ક્રેટનું ચેક-આઉટ કરવું જોઈએ.',
    },
    {
      id: 97,
      title: 'બજારમાં કુલિંગ ફી કેવી રીતે વસૂલવામાં આવે છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'જ્યારે બજારમાંથી ક્રેટ્સ ખરીદવામાં આવે છે, ત્યારે તે દિવસ સુધીનો કુલિંગ ફી ખરીદનાર દ્વારા ચૂકવવામાં આવતી કિંમતમાંથી કાપીને કુલિંગ કંપનીને ટ્રાન્સફર કરવામાં આવે છે. આ રીતે, વેચનારને કુલિંગ ફી ચૂકવવાની જરૂર નથી, કારણ કે આ ડિજિટલ ટ્રાન્ઝેક્શનમાં પહેલાથી જ થઈ ગયું છે. આ કારણોસર, તે ખૂબ જ મહત્વપૂર્ણ છે કે વેચનાર અને કુલિંગ કંપનીઓ બંને પાસે કોલ્ડટીવેટમાં બેંક ખાતું હોય. ઉદાહરણ તરીકે, જો ક્રેટ 20 USD માં ખરીદવામાં આવે છે, અને વેચનારને 3 USD કૂલિંગ ફી ચૂકવવાની હોય છે, તો ખરીદનાર દ્વારા ચૂકવવામાં આવેલા 20 USD માંથી 17 USD વેચનારના બેંક ખાતામાં ટ્રાન્સફર કરવામાં આવશે, અને 3 USD કૂલિંગ કંપનીના બેંક ખાતામાં ટ્રાન્સફર કરવામાં આવશે. જો ખરીદનાર ખરીદીના દિવસે જ ઉત્પાદન લેવા આવે છે, તો અન્ય કોઈ કુલિંગ ફી ચૂકવવાની રહેતી નથી (કારણ કે દૈનિક ફી વેચનાર દ્વારા પહેલાથી જ ચૂકવવામાં આવે છે). જો કે, જો ખરીદનાર ઉત્પાદનને સ્ટોરેજમાં રાખવાનું નક્કી કરે છે, તો પ્રમાણભૂત કુલિંગ ફી લાગુ પડે છે, અને ખરીદનાર તેને ઉપાડે ત્યાં સુધી કોલ્ડ રૂમમાં કેટલા દિવસો સુધી ઉત્પાદન રાખવામાં આવ્યું છે તેના આધારે કિંમતની ગણતરી કરવામાં આવશે. ચેક-આઉટ સમયે આ કુલિંગ ફી વસૂલવા માટે કોલ્ડ રૂમ ઓપરેટર જવાબદાર છે. નોંધ કરો કે ડિલિવરીના કિસ્સામાં પણ આ જ તર્ક લાગુ પડે છે.',
    },
    {
      id: 98,
      title: 'બજારમાં ઉત્પાદન વેચવાનું હું કેવી રીતે શરૂ કરી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'તમારા ક્રેટ્સ વેચાણ માટે ઉપલબ્ધ થાય તે માટે, તમારે બે ક્રિયાઓ કરવાની જરૂર છે. 1) એક બેંક ખાતું સેટ કરો, જ્યાં આવક જમા થવાની છે. જો તમારી પાસે સ્માર્ટફોન છે, તો તમે "મેનુ" -> "એકાઉન્ટ વિગતો" -> "ચુકવણી વિકલ્પો" પર નેવિગેટ કરીને તે કરી શકો છો. જો તમારી પાસે સ્માર્ટફોન નથી, તો ઓપરેટર તેના/તેણીના ઇન્ટરફેસ ("મેનેજમેન્ટ" -> "કૂલિંગ યુઝર્સ" -> "ચુકવણી વિગતો") માંથી બેંક ખાતા સેટ કરી શકે છે. કૃપા કરીને નોંધ કરો કે બધી ચુકવણીઓ બજારમાં ડિજિટલ રીતે કરવામાં આવે છે, તેથી તમારે કંઈપણ "વેચાણ માટે" સૂચિબદ્ધ થાય તે પહેલાં એક માન્ય બેંક ખાતું પ્રદાન કરવું પડશે. 2) જો તમારી પાસે સ્માર્ટફોન છે, તો કોઈપણ ચેક-ઇન કરેલા ક્રેટ્સના સેટ માટે, તમે દરેક ડેશબોર્ડ આઇટમની જમણી બાજુએ ">" ચિહ્ન પર ક્લિક કરી શકો છો, "ક્રેટ વજન અને માર્કેટપ્લેસ સૂચિ" પર નેવિગેટ કરી શકો છો, તમે કયા ક્રેટ્સ "વેચાણ માટે" સેટ કરવા માંગો છો અને પ્રતિ કિલો કિંમત સેટ કરી શકો છો. બજારમાં ગ્રાહકો આ ક્રેટ્સ જોઈ શકશે અને દર્શાવેલ રકમ પર ખરીદી શકશે. ખરીદી પૂર્ણ થાય ત્યારે તમને સૂચના પ્રાપ્ત થશે. જો તમારી પાસે સ્માર્ટફોન ન હોય, તો કોલ્ડ રૂમ ઓપરેટર ચેક-ઇન કરતી વખતે અથવા પછી, તે જ પગલાંઓનું પાલન કરીને ક્રેટ્સને "વેચાણ માટે" સેટ કરી શકે છે. જો ઓપરેટર ચેક-ઇન પછી તમારા લિસ્ટેડ ક્રેટ્સ અથવા કિંમત અપડેટ કરશે તો તમને એક SMS પ્રાપ્ત થશે.',
    },
    {
      id: 99,
      title: 'શું ખરીદદારો મારી સંપર્ક વિગતો જોઈ શકે છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' તમે જાતે નક્કી કરી શકો છો કે તમારા ઉત્પાદનો ખરીદવામાં રસ ધરાવતા ગ્રાહકો તમારી સંપર્ક વિગતો જોઈ શકશે કે નહીં. કિંમતની વાટાઘાટો અથવા કોલ્ડ રૂમમાં સંગ્રહિત ન હોય તેવા ઉત્પાદનો માટે વારંવાર ઓર્ડર આપવાના કિસ્સામાં આ ઉપયોગી થઈ શકે છે (અને તેથી ખરીદનાર માટે દૃશ્યમાન નથી). તમે "મેનુ" -> "એકાઉન્ટ વિગતો" -> "સંપર્કો શેરિંગ" હેઠળ ગમે ત્યારે તમારી સેટિંગ્સ અપડેટ કરી શકો છો.',
    },
    {
      id: 100,
      title: ' હું ખરીદનારને ડિસ્કાઉન્ટ આપવા માંગુ છું. હું તે કેવી રીતે કરી શકું?',
      role: [ERoles.EMPLOYEE],
      text: '"મેનુ" -> "એકાઉન્ટ વિગતો" -> "ડિસ્કાઉન્ટ કૂપન્સ" હેઠળ, તમે એવા કૂપન્સ બનાવી શકો છો જેમાં કોડ અને ટકાવારી ડિસ્કાઉન્ટ હોય. આ એવા કૂપન્સ છે જે તમે વેચો છો તે ઉત્પાદન માટે માન્ય છે (વ્યક્તિગત તરીકે). કંપની દ્વારા ઉત્પાદિત માટે માન્ય કૂપન્સ સેટ કરવા માટે, તમે "વિક્રેતા સેટિંગ્સ (કંપની)" હેઠળ "મેનુ" -> "મેનેજમેન્ટ" -> "ડિસ્કાઉન્ટ કૂપન્સ" પર નેવિગેટ કરી શકો છો. તમે ગ્રાહક સાથે કૂપન કોડ શેર કરી શકો છો, અને તે ચુકવણી સ્ક્રીનમાં કોડ રિડીમ કરી શકે છે. કૂપન કોડ્સ જ્યાં સુધી તમે તેમને રદ ન કરો ત્યાં સુધી માન્ય રહે છે. જો તમે બધા સંભવિત ખરીદદારોને ડિસ્કાઉન્ટ ઓફર કરવા માંગતા હો, તો તમે બજારમાં દેખાતી વેચાણ કિંમત ઘટાડી શકો છો.',
    },
    {
      id: 101,
      title: ' હું ખરીદનારને ડિસ્કાઉન્ટ આપવા માંગુ છું. હું તે કેવી રીતે કરી શકું?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: '"મેનુ" -> "એકાઉન્ટ વિગતો" -> "ડિસ્કાઉન્ટ કૂપન્સ" હેઠળ, તમે એવા કૂપન્સ બનાવી શકો છો જેમાં કોડ અને ટકાવારી ડિસ્કાઉન્ટ હોય. તમે ગ્રાહક સાથે કૂપન કોડ શેર કરી શકો છો, અને તે ચુકવણી સ્ક્રીનમાં કોડ રિડીમ કરી શકે છે. કૂપન કોડ્સ જ્યાં સુધી તમે તેમને રદ ન કરો ત્યાં સુધી માન્ય રહે છે. જો તમે બધા સંભવિત ખરીદદારોને ડિસ્કાઉન્ટ ઓફર કરવા માંગતા હો, તો તમે બજારમાં દેખાતી વેચાણ કિંમત ઘટાડી શકો છો.',
    },
    {
      id: 102,
      title: ' કોલ્ડ રૂમ સંચાલકો મારા પાકનું વ્યાપારીકરણ કરવામાં મને કેવી રીતે મદદ કરી શકે?',
      role: [ERoles.COOLING_USER],
      text: 'કોલ્ડ રૂમ ઓપરેટરો કોલ્ડ રૂમમાં ઉત્પાદન સંગ્રહિત કરવા સંબંધિત કોઈપણ બાબત માટે તમારા સંપર્ક બિંદુ છે, અને જો તમારી પાસે સ્માર્ટફોનની ઍક્સેસ ન હોય તો પણ તમારા પાકનું માર્કેટિંગ કરવામાં તમારી મદદ કરી શકે છે. તેમના ઇન્ટરફેસથી, તેઓ તમારા બેંક ખાતાની વિગતો સેટ કરી શકે છે, જ્યાં તમને ઉત્પાદનના વેચાણમાંથી આવક પ્રાપ્ત થશે. ચેક-ઇન કરતી વખતે, તેઓ તમને ક્રેટ્સને "વેચાણ માટે" સૂચિબદ્ધ કરવામાં મદદ કરી શકે છે, જે તેમને બજારમાં દૃશ્યમાન બનાવે છે, અને દરેક ઉત્પાદન માટે વેચાણ કિંમત (પ્રતિ કિલો) સેટ કરે છે. જો તમે તમારો વિચાર બદલો છો, તો તમે હંમેશા બજારમાંથી ક્રેટ્સને "વેચાણ માટે" તરીકે સૂચિબદ્ધ અથવા ડિલિસ્ટ કરીને ઉમેરવા અથવા દૂર કરવા માટે કહી શકો છો. કેટલાક કોલ્ડ રૂમમાં, ઓપરેટરો અથવા તેમના સહયોગીઓ ખેડૂતો પાસેથી સીધા ઉત્પાદન ખરીદવા અને છૂટક વેપારીઓને વેચવા માટે પણ જવાબદાર હોય છે. ભલે તમે આ વિકલ્પમાં રસ ધરાવતા ખેડૂત હો કે વેપારી, અથવા કોલ્ડ રૂમમાંથી જથ્થાબંધ ખરીદી કરવામાં રસ ધરાવતા રિટેલર હો, કૃપા કરીને આ તક શોધવા માટે કૂલિંગ કંપનીનો સંપર્ક કરો.',
    },
    {
      id: 103,
      title: "બજારમાં મને 'કંપની વતી ખરીદો' વિકલ્પ કયો દેખાય છે?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ઓપરેટરો અને નોંધાયેલા કર્મચારીઓ બજારમાં પોતાના માટે, વ્યક્તિગત રીતે અથવા તેઓ જે કંપનીનું પ્રતિનિધિત્વ કરે છે તેના વતી ઉત્પાદન વેચી અને ખરીદી શકે છે. આ વિકલ્પ બધા વ્યવહારો કંપનીના બેંક ખાતામાંથી અને કંપનીના બેંક ખાતામાં કરવાની મંજૂરી આપે છે, અને વ્યક્તિગત બેંક ખાતાઓ દ્વારા નહીં. જ્યારે કોઈ ઓપરેટર અથવા નોંધાયેલા કર્મચારી "કંપની વતી" ઉત્પાદન ખરીદે છે, ત્યારે કંપની વેચનારને બાકી રકમ ચૂકવે છે, અને ક્રેટ્સનો માલિક બને છે. જો તે ક્રેટ્સ બજારમાં વેચાણ માટે સૂચિબદ્ધ હોય, તો તે કૂલિંગ કંપનીની માલિકીનું બતાવવામાં આવે છે, અને વેચાણ ફી કંપનીના બેંક ખાતામાં મોકલવામાં આવે છે. જ્યારે કોઈ ઓપરેટર અથવા નોંધાયેલા કર્મચારી પોતાના માટે ઉત્પાદન ખરીદે છે, ત્યારે તેઓ વેચનારને તેમના વ્યક્તિગત બેંક ખાતાની વિગતોમાંથી બાકી રકમ ચૂકવશે અને વ્યક્તિગત રીતે ક્રેટ્સના માલિક બનશે. જો તેઓ કૂલિંગ યુનિટમાં સંગ્રહિત હોય, તો તેઓ ઓપરેટર અથવા નોંધાયેલા કર્મચારીઓના નામ હેઠળ સૂચિબદ્ધ થશે અને જો તેઓ બજારમાં વેચાણ માટે સૂચિબદ્ધ હોય, તો તેઓ ઓપરેટર અથવા નોંધાયેલા કર્મચારીની માલિકીનું પણ બતાવવામાં આવશે.',
    },
    {
      id: 104,
      title: 'બજારમાં કેટલી ફી બતાવવામાં આવે છે?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' બજારમાં પ્રદર્શિત થતી દરેક વસ્તુની વેચાણ કિંમત સીધી વેચનાર દ્વારા નક્કી કરવામાં આવે છે અને તે કેટલા કિલો ખરીદવામાં આવે છે તેના પર આધાર રાખે છે. તે રકમ ઉપરાંત, બજારમાં બે ફીનો સમાવેશ થાય છે: માર્કેટપ્લેસ ફી એ 3.5% ટ્રાન્ઝેક્શન ફી છે જે કોલ્ડટીવેટ ટીમ દ્વારા એપ્લિકેશનને હોસ્ટ કરવા અને કાર્યરત રાખવા માટે એકત્રિત કરવામાં આવે છે. ચુકવણી ફી એ ફી છે જે ડિજિટલ ચુકવણી સિસ્ટમ (નાઇજીરીયામાં પેસ્ટેક) વ્યવહારની પ્રક્રિયા કરવા માટે વસૂલ કરે છે.',
    },
    {
      id: 105,
      title:
        'હું એક ખરીદદાર છું જે કોલ્ડ રૂમમાંથી ઉત્પાદનો ખરીદવામાં રસ ધરાવે છે, પણ મને બજારમાં કંઈ દેખાતું નથી. શા માટે?',
      role: [ERoles.COOLING_USER],
      text: 'જો તમે માર્કેટપ્લેસ ટેબ પર જાઓ છો પણ તમને કોઈ ઉત્પાદન દેખાતું નથી, તો આ તમે શોધમાં લાગુ કરેલા ફિલ્ટર્સ (જેમ કે સ્થાન, કિંમત શ્રેણી, અથવા રુચિનો પાક) ને કારણે હોઈ શકે છે, અથવા તે એટલા માટે હોઈ શકે છે કારણ કે તમારી નજીકમાં કોઈ વસ્તુ વેચાણ માટે ઉપલબ્ધ નથી. જો તમને નજીકમાં કોઈ કોલ્ડ રૂમ ખબર હોય, તો અમે ભલામણ કરીએ છીએ કે તમે કોલ્ડ રૂમ ઓપરેટરને પૂછો કે શું કોઈ કૂલિંગ વપરાશકર્તા માર્કેટપ્લેસ કાર્યક્ષમતા દ્વારા ઉત્પાદન વેચવામાં રસ ધરાવે છે અને તે વસ્તુઓને એપ્લિકેશનમાં સૂચિબદ્ધ કરવા માટે કહો.',
    },
    {
      id: 106,
      title: 'શું તમે ડિલિવરી સેવાઓ પ્રદાન કરો છો?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'આ માર્કેટપ્લેસ હાલમાં ડિલિવરી સેવાઓ પ્રદાન કરતું નથી, પરંતુ ખરીદદારોને ઉત્પાદન પહોંચાડવા માટે લોજિસ્ટિક્સ સોલ્યુશન્સ સાથે જોડાણની સુવિધા આપે છે. રજિસ્ટર્ડ કર્મચારી તરીકે, તમારી પાસે "મેનુ" -> "મેનેજમેન્ટ" -> "વેચાણકર્તા સેટિંગ્સ (કંપની)" -> "ડિલિવરી સંપર્કો" હેઠળ ડિલિવરી સંપર્કો ઉમેરવાનો વિકલ્પ છે. તે તમારા કોલ્ડ રૂમમાંથી ચુકવણી પર ઉત્પાદન ખરીદતા બધા ખરીદદારોને પ્રદર્શિત થાય છે. જો તમે ખરીદનાર છો, તો તમને તમારી ડિલિવરી ગોઠવવા માટે તેમનો સંપર્ક કરવા માટે પ્રોત્સાહિત કરવામાં આવે છે. કૃપા કરીને નોંધ કરો કે જો ઉત્પાદન ખરીદીના દિવસે જ ઉપાડવામાં આવે છે, તો કોઈ ઠંડક ફી લાગુ પડતી નથી, પરંતુ જો તમે પાકને સ્ટોરેજમાં રાખો છો, તો દૈનિક ઠંડક ફી ચૂકવવી પડશે. તમે જે ડિલિવરી સંપર્ક સાથે વાટાઘાટો કરી રહ્યા છો તેની સાથે આ અંગે ચર્ચા કરવાનું ભૂલશો નહીં.',
    },
    {
      id: 107,
      title:
        " મને એપમાં એક સૂચના મળી જેમાં કહેવામાં આવ્યું હતું કે 'ઉત્પાદનનું ફરીથી વિતરણ કરવાની જરૂર છે'. તે શું છે?",
      role: [ERoles.OPERATOR],
      text: 'કોલ્ડ રૂમમાં ચેક-ઇન પ્રક્રિયાને કારણે, એક ક્રેટની સામગ્રી એક જ ખેડૂત અથવા વેપારીની હોય છે. બજારમાં, ખરીદનાર વેચનારના ક્રેટમાંથી અમુક કિલો ખરીદી શકે છે, તેથી ખરીદેલી રકમ અલગ ક્રેટમાં ખસેડવી જોઈએ. આ સૂચના તમને જાણ કરે છે કે ખરીદી પૂર્ણ થઈ ગઈ છે, અને તેના પર ક્લિક કરીને તમે કલ્પના કરી શકો છો કે કયા ક્રેટમાંથી ઉત્પાદન લેવું જોઈએ. ક્રેટને વ્યવસ્થિત રાખવું એ ખાતરી કરવા માટે મહત્વપૂર્ણ છે કે પાક ભૂલથી ચેક-આઉટ ન થાય અને ઠંડક ફી યોગ્ય રીતે એકત્રિત કરવામાં આવે. કોલ્ડટીવેટમાં ક્રેટને ભૌતિક ક્રેટ સાથે ટેગ કરવા અને સૂચનાના આધારે કયા ક્રેટને તમારા ધ્યાનની જરૂર છે તે વધુ સરળતાથી ટ્રેક કરવા માટે અમે ચેક-ઇન સમયે "ક્રેટ ID" કાર્યક્ષમતાનો ઉપયોગ કરવાની ભલામણ કરીએ છીએ.',
    },
    {
      id: 108,
      title: ' બજારમાંથી હું કેટલું ઉત્પાદન ખરીદી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' બજારમાં પ્રદર્શિત થતી દરેક વસ્તુ માટે, તમે સંપૂર્ણ ક્રેટ અથવા ક્રેટમાં રહેલા કોઈપણ કિલોગ્રામ ખરીદી શકો છો. ખરીદી શકાય તેવી ઓછામાં ઓછી રકમ 1 કિલો છે.',
    },
    {
      id: 109,
      title:
        'મેં કેટલીક પેદાશો ખરીદી છે અને તેને ફરીથી વેચવા માંગુ છું. હું તે કેવી રીતે કરી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'જ્યારે તમે બજારમાંથી કોઈ ઉત્પાદન ખરીદો છો, ત્યારે તમે ખરીદેલી રકમના માલિક બનો છો. "ડેશબોર્ડ" માં, તમને એક નવી એન્ટ્રી દેખાશે જે દર્શાવે છે કે તમે કોલ્ડ રૂમમાં શું સંગ્રહિત કર્યું છે. જો તમે તેને વેચાણ માટે વેચવા માંગતા હો, તો તમે ડેશબોર્ડ આઇટમની જમણી બાજુએ ">" ચિહ્ન પર ક્લિક કરી શકો છો, "ક્રેટ વજન અને માર્કેટપ્લેસ સૂચિ" પર નેવિગેટ કરી શકો છો, તમે કયા ક્રેટ્સ "વેચાણ માટે" સેટ કરવા માંગો છો અને પ્રતિ કિલો કિંમત સેટ કરી શકો છો. બજારમાં ગ્રાહકો આ ક્રેટ્સ જોઈ શકશે અને દર્શાવેલ રકમ પર ખરીદી શકશે. કૃપા કરીને નોંધ લો કે વેચાણ માટે ક્રેટ્સ સેટ કરવા માટે, તમારું બેંક એકાઉન્ટ સેટ કરવાની જરૂર છે. તમારા બેંક એકાઉન્ટની વિગતો ઉમેરવા માટે સૂચનાઓનું પાલન કરો, અથવા "મેનુ" -> "એકાઉન્ટ વિગતો" -> "ચુકવણી વિકલ્પો" પર નેવિગેટ કરો.',
    },
    {
      id: 110,
      title:
        ' હું માર્કેટપ્લેસ ચુકવણી પ્રક્રિયામાંથી બહાર નીકળી ગયો છું. હું મારી ખરીદી કેવી રીતે પૂર્ણ કરી શકું?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'જ્યારે તમે શોપિંગ કાર્ટમાં "પે" પર ક્લિક કરીને ખરીદી શરૂ કરો છો, ત્યારે તમને ચુકવણી પ્રદાતા (નાઇજીરીયામાં પેસ્ટેક) પર રીડાયરેક્ટ કરવામાં આવે છે. જો, કોઈપણ કારણોસર, તમે પ્રક્રિયા છોડી દો છો, તો તમારા ઓર્ડરને "પેમેન્ટ પેન્ડિંગ" તરીકે ચિહ્નિત કરવામાં આવશે. તમે માર્કેટપ્લેસ પેજમાં "મારા ઓર્ડર્સ" ટેબ હેઠળ તમારો ઓર્ડર શોધી શકો છો. ચુકવણીને અંતિમ સ્વરૂપ આપવા માટે તમે આઇટમ પર ક્લિક કરી શકો છો. ચુકવણી પૂર્ણ કરવા માટે તમારી પાસે 30 મિનિટ છે, ત્યારબાદ ઓર્ડર "રદ" ગણવામાં આવે છે અને અન્ય ખરીદદારો તેને ખરીદી શકે તે માટે રકમ મુક્ત કરવામાં આવે છે.',
    },
    {
      id: 111,
      title: ' હું કેટલાક પાકોને ચકાસી શકતો નથી. આવું કેમ થઈ રહ્યું છે?',
      role: [ERoles.OPERATOR],
      text: 'જો તમે બજારમાં સૂચિબદ્ધ કેટલાક ક્રેટ્સ ચેક-આઉટ કરવાનો પ્રયાસ કરી રહ્યા છો, અને તેમને ચેક કરવામાં અસમર્થ છો, તો આ કદાચ એટલા માટે છે કારણ કે તે પેન્ડિંગ પેમેન્ટ ઓર્ડરનો ભાગ છે. આનો અર્થ એ છે કે ખરીદકે તેમને શોપિંગ કાર્ટમાં ઉમેર્યા છે અને ખરીદી પ્રક્રિયા શરૂ કરી છે. ખરીદનાર પાસે ચુકવણી પૂર્ણ કરવા માટે 30 મિનિટ છે, જે પછી ઓર્ડર રદ કરવામાં આવશે. 30 મિનિટ પસાર થયા પછી, તમે ક્રેટ ચેક-આઉટ કરી શકશો.',
    },
  ],
  [APP_LOCALES.HINDI]: [
    {
      id: 1,
      title: 'मुझे ऐप का उपयोग क्यों करना चाहिए?',
      role: [ERoles.AUTH],
      text: 'ऐप को कोल्ड रूम प्रदाताओं को कोल्ड रूम में उनके दैनिक कार्यों में सहायता करने के लिए डिज़ाइन किया गया है, कोल्ड रूम का उपयोग करने वाले किसान और कोल्ड रूम में संग्रहीत फसल खरीदने में रुचि रखने वाले उपभोक्ता। ऐप में डिजिटल इन्वेंट्री, प्रत्येक संग्रहीत क्रेट के लिए रिमोट मॉनिटरिंग और शेल्फ-लाइफ मॉडल और खरीदारों और विक्रेताओं को जोड़ने के लिए एक बाज़ार है। इसमें नॉलेज हब भी शामिल है, जो इष्टतम भंडारण तापमान और भंडारण जीवन पर वस्तु-विशिष्ट सिफारिशें प्रदान करता है।',
    },
    {
      id: 2,
      title: 'ऐप का उपयोग कौन कर सकता है?',
      role: [ERoles.AUTH],
      text: 'ऐप का इस्तेमाल कोल्ड स्टोरेज कंपनियों, किसानों और कोल्ड स्टोरेज का इस्तेमाल करने में रुचि रखने वाले व्यापारियों और दुनिया भर के संभावित खरीदारों द्वारा किया जा सकता है। पूरे ऐप में, तीन उपयोगकर्ता भूमिकाएँ हैं: (i) पंजीकृत कर्मचारी: कोल्ड रूम प्रदाता प्रबंधन टीम का हिस्सा। एक व्यक्ति जो कमरे की स्थापना और प्रबंधन के लिए जिम्मेदार है, वह स्थान पर शारीरिक रूप से मौजूद हुए बिना, जमीन पर ऑपरेटरों की गतिविधियों की देखरेख करने का प्रभारी होता है। उदाहरण के लिए: एक कंपनी के सीईओ, सीएफओ, आदि। (ii) ऑपरेटर: एक कर्मचारी जो कोल्ड रूम में शारीरिक रूप से मौजूद होता है और इसके चेक-इन, चेक-आउट संचालन का प्रबंधन करता है। यह व्यक्ति कोल्ड रूम उपयोगकर्ताओं के सीधे संपर्क में होता है, और कंपनी के पंजीकृत कर्मचारी को रिपोर्ट करता है। (iii) कूलिंग उपयोगकर्ता या उपभोक्ता: कोल्ड रूम उपयोगकर्ता (किसान, व्यापारी, खुदरा विक्रेता, आदि हो सकते हैं)',
    },
    {
      id: 3,
      title: 'मैं पंजीकृत कर्मचारी के रूप में कैसे नामांकन कर सकता हूँ?',
      role: [ERoles.AUTH],
      text: 'यदि आप अपनी कंपनी से साइन अप करने वाले पहले कर्मचारी हैं, तो आप "कंपनी के रूप में साइन अप करें" बटन पर क्लिक कर सकते हैं और अपनी कंपनी और खुद को पंजीकृत करने के लिए चरणों का पालन कर सकते हैं (व्यक्तिगत विवरण और पासवर्ड सहित)। एक बार जब आप सफलतापूर्वक साइन अप कर लेते हैं, तो आप ऐप में पंजीकृत कर्मचारी के रूप में लॉग इन कर सकते हैं और अन्य पंजीकृत कर्मचारियों को अपनी कंपनी में शामिल होने के लिए एक एसएमएस आमंत्रण भेज सकते हैं। एक बार कंपनी बन जाने के बाद, सभी पंजीकृत कर्मचारियों को एसएमएस द्वारा आमंत्रित किया जाना चाहिए। अन्यथा, वे एक ही कंपनी से जुड़े नहीं रहेंगे।',
    },
    {
      id: 4,
      title:
        "यदि आप अपनी कंपनी से साइन अप करने वाले पहले कर्मचारी हैं, तो आप 'कंपनी के रूप में साइन अप करें' बटन पर क्लिक कर सकते हैं और अपनी कंपनी और खुद को पंजीकृत करने के लिए चरणों का पालन कर सकते हैं (व्यक्तिगत विवरण और पासवर्ड सहित)। एक बार जब आप सफलतापूर्वक साइन अप कर लेते हैं, तो आप ऐप में पंजीकृत कर्मचारी के रूप में लॉग इन कर सकते हैं और अन्य पंजीकृत कर्मचारियों को अपनी कंपनी में शामिल होने के लिए एक एसएमएस आमंत्रण भेज सकते हैं। एक बार कंपनी बन जाने के बाद, सभी पंजीकृत कर्मचारियों को एसएमएस द्वारा आमंत्रित किया जाना चाहिए। अन्यथा, वे एक ही कंपनी से जुड़े नहीं रहेंगे।मैं ऑपरेटर के रूप में कैसे पंजीकरण कर सकता हूं?",
      role: [ERoles.AUTH],
      text: 'साइन अप करने के लिए,आपको एक पंजीकृत कर्मचारी द्वारा आमंत्रित किया जाना चाहिए। आपको एक सक्रियण लिंक के साथ एक एसएमएस प्राप्त होगा,जहां से आप अपना व्यक्तिगत विवरण और पासवर्ड निर्धारित कर सकते हैं।',
    },
    {
      id: 5,
      title:
        'साइन अप करने के लिए, आपको किसी पंजीकृत कर्मचारी द्वारा आमंत्रित किया जाना चाहिए। आपको एक एक्टिवेशन लिंक के साथ एक एसएमएस प्राप्त होगा, जहाँ से आप अपना व्यक्तिगत विवरण और पासवर्ड सेट कर सकते हैं।मैं कूलिंग उपयोगकर्ता या उपभोक्ता के रूप में कैसे पंजीकरण कर सकता हूं?',
      role: [ERoles.AUTH],
      text: 'स्मार्टफोन वाले कूलिंग उपयोगकर्ता और उपभोक्ता होमपेज पर "साइन अप एज़ ए कूलिंग उपयोगकर्ता या उपभोक्ता" पर क्लिक करके और अपना व्यक्तिगत विवरण और पासवर्ड प्रदान करके पंजीकरण कर सकते हैं। कूलिंग उपयोगकर्ता जिनके पास स्मार्टफोन नहीं है, उन्हें ऑपरेटर द्वारा ऐप में जोड़ा जा सकता है। कूलिंग उपयोगकर्ताओं के लिए चेक-इन आरंभ करने के लिए यह ऑपरेशन आवश्यक है। कूलिंग उपयोगकर्ताओं को एक फ़ोन नंबर प्रदान करना होगा, जिसका उपयोग ऑपरेटर आवश्यकता पड़ने पर कूलिंग उपयोगकर्ताओं से संपर्क करने के लिए करेगा। इस मामले में पासवर्ड की आवश्यकता नहीं है।',
    },
    {
      id: 6,
      title: 'मैं उपयोगकर्ता के रूप में पंजीकरण पूरा नहीं कर पा रहा हूँ। मुझे क्या करना चाहिए?',
      role: [ERoles.AUTH],
      text: 'पंजीकरण पूरा करने के लिए, कृपया सुनिश्चित करें कि निम्नलिखित शर्तें पूरी होती हैं: (i) आप सही देश कोड वाला फ़ोन नंबर दर्ज कर रहे हैं (जैसे भारत के लिए +91); (ii) आपके द्वारा प्रदान किया गया फ़ोन नंबर किसी अन्य उपयोगकर्ता को पंजीकृत करने के लिए उपयोग नहीं किया गया है; (iii) आप जो पासवर्ड दर्ज कर रहे हैं वह सभी अनुरोधित शर्तों को पूरा करता है; (iv) आप जो पासवर्ड दर्ज कर रहे हैं वे समान हैं - आप पासवर्ड देखने के लिए आंख के प्रतीक पर क्लिक कर सकते हैं और जांच सकते हैं कि वे समान हैं।',
    },
    {
      id: 7,
      title:
        'पंजीकरण पूरा करने के लिए, कृपया सुनिश्चित करें कि निम्नलिखित शर्तें पूरी होती हैं: (i) आप सही देश कोड वाला फ़ोन नंबर दर्ज कर रहे हैं (जैसे भारत के लिए +91); (ii) आपके द्वारा प्रदान किया गया फ़ोन नंबर किसी अन्य उपयोगकर्ता को पंजीकृत करने के लिए उपयोग नहीं किया गया है; (iii) आप जो पासवर्ड दर्ज कर रहे हैं वह सभी अनुरोधित शर्तों को पूरा करता है; (iv) आप जो पासवर्ड दर्ज कर रहे हैं वे समान हैं - आप पासवर्ड देखने के लिए आंख के प्रतीक पर क्लिक कर सकते हैं और जांच सकते हैं कि वे समान हैं।मेरे पास फ़ोन नहीं है लेकिन मैं ऐप का इस्तेमाल करना चाहता हूँ। मुझे क्या करना चाहिए?',
      role: [ERoles.AUTH],
      text: 'यदि आप पंजीकृत कर्मचारी, ऑपरेटर या उपभोक्ता हैं, तो आपको साइन अप करने के लिए एक वैध फ़ोन नंबर प्रदान करना होगा। ऐप का सही तरीके से उपयोग करने के लिए स्मार्टफ़ोन की आवश्यकता होती है। यदि आप कूलिंग उपयोगकर्ता हैं और आपके पास फ़ोन नहीं है, तो हम आपको एक वैध फ़ोन नंबर प्रदान करने की भी सलाह देते हैं, ताकि ज़रूरत पड़ने पर ऑपरेटर आपसे संपर्क कर सके। यदि आपके पास अपना फ़ोन नंबर नहीं है, तो आप अपने परिवार के किसी सदस्य या मित्र का फ़ोन नंबर दे सकते हैं। यदि यह संभव नहीं है, तो ऑपरेटर चेक-इन के समय कूलिंग उपयोगकर्ता के रूप में "फ़ोन रहित उपयोगकर्ता" का चयन करके कमरे में उत्पाद संग्रहीत कर सकता है।',
    },
    {
      id: 8,
      title:
        "यदि आप पंजीकृत कर्मचारी, ऑपरेटर या उपभोक्ता हैं, तो आपको साइन अप करने के लिए एक वैध फ़ोन नंबर प्रदान करना होगा। ऐप का सही तरीके से उपयोग करने के लिए स्मार्टफ़ोन की आवश्यकता होती है। यदि आप कूलिंग उपयोगकर्ता हैं और आपके पास फ़ोन नहीं है, तो हम आपको एक वैध फ़ोन नंबर प्रदान करने की भी सलाह देते हैं, ताकि ज़रूरत पड़ने पर ऑपरेटर आपसे संपर्क कर सके। यदि आपके पास अपना फ़ोन नंबर नहीं है, तो आप अपने परिवार के किसी सदस्य या मित्र का फ़ोन नंबर दे सकते हैं। यदि यह संभव नहीं है, तो ऑपरेटर चेक-इन के समय कूलिंग उपयोगकर्ता के रूप में 'फ़ोन रहित उपयोगकर्ता' का चयन करके कमरे में उत्पाद संग्रहीत कर सकता है।पंजीकृत कर्मचारी के रूप में लॉग इन करने के लिए कौन से विवरण आवश्यक हैं?",
      role: [ERoles.AUTH],
      text: 'पंजीकृत कर्मचारी ईमेल या फोन नंबर और उनके पासवर्ड से लॉग इन कर सकते हैं।',
    },
    {
      id: 9,
      title:
        'पंजीकृत कर्मचारी ईमेल या फोन नंबर और अपने पासवर्ड से लॉग इन कर सकते हैं।ऑपरेटर के रूप में लॉग इन करने के लिए कौन से विवरण आवश्यक हैं?',
      role: [ERoles.AUTH],
      text: 'परिचालक अपने फोन नंबर और पासवर्ड से लॉग इन कर सकते हैं।',
    },
    {
      id: 10,
      title:
        'ऑपरेटर अपने फोन नंबर और पासवर्ड से लॉग इन कर सकते हैं।कूलिंग उपयोगकर्ता या उपभोक्ता के रूप में लॉग इन करने के लिए कौन से विवरण आवश्यक हैं?',
      role: [ERoles.AUTH],
      text: 'स्मार्टफोन वाले कूलिंग उपयोगकर्ता अपने फ़ोन नंबर और पासवर्ड से लॉग इन कर सकते हैं। जिन कूलिंग उपयोगकर्ताओं के पास स्मार्टफोन नहीं है, उन्हें लॉग इन करने की ज़रूरत नहीं है: ऑपरेटर उनकी ओर से संचालन कर सकता है। मार्केटप्लेस देखने में रुचि रखने वाले उपभोक्ता अपने फ़ोन नंबर और पासवर्ड से लॉग इन कर सकते हैं।',
    },
    {
      id: 11,
      title: 'मुझे एसएमएस के माध्यम से कोई आमंत्रण प्राप्त नहीं हुआ है। मुझे क्या करना चाहिए?',
      role: [ERoles.AUTH],
      text: 'यदि आपने अपना पासवर्ड खो दिया है, तो आप साइन इन करते समय "पासवर्ड भूल गए" पर क्लिक करके अपना खाता पुनर्स्थापित कर सकते हैं, अपना फ़ोन नंबर दर्ज करें, और आपको एक नया पासवर्ड सेट करने के लिए एक लिंक के साथ एक एसएमएस प्राप्त होगा।',
    },
    {
      id: 12,
      title:
        'पंजीकृत कर्मचारियों और ऑपरेटरों को उसी कंपनी के पंजीकृत कर्मचारी द्वारा ऐप में शामिल होने के लिए आमंत्रित किया जा सकता है। यदि पंजीकृत कर्मचारी ने आपको आमंत्रित किया है, लेकिन आपको कोई एसएमएस नहीं मिला है, तो कृपया सीधे पंजीकृत कर्मचारी से संपर्क करें। सामान्य कारण हैं: (i) गलत नंबर टाइप किया गया (ध्यान दें कि देश का कॉलिंग कोड आवश्यक है); (ii) आपने पहले ही उस नंबर से जुड़ा निमंत्रण स्वीकार कर लिया है। एक फ़ोन नंबर का उपयोग केवल एक उपयोगकर्ता के लिए किया जा सकता है। स्मार्टफोन वाले कूलिंग उपयोगकर्ता और उपभोक्ता बिना आमंत्रण के ऐप में शामिल हो सकते हैं। बिना स्मार्टफोन वाले कूलिंग उपयोगकर्ता ऑपरेटरों द्वारा ऐप में पंजीकृत किए जा सकते हैं।मैंने अपना पासवर्ड खो दिया है। मुझे क्या करना चाहिए?',
      role: [ERoles.AUTH],
      text: 'यदि आपने अपना पासवर्ड खो दिया है, तो आप साइन इन करते समय "पासवर्ड भूल गए" पर क्लिक करके अपना खाता पुनः स्थापित कर सकते हैं, अपना फोन नंबर दर्ज करें, और आपको नया पासवर्ड सेट करने के लिए एक लिंक के साथ एक एसएमएस प्राप्त होगा।',
    },
    {
      id: 13,
      title:
        "यदि आपने अपना पासवर्ड खो दिया है, तो आप साइन इन करते समय 'पासवर्ड भूल गए' पर क्लिक करके अपना खाता पुनः स्थापित कर सकते हैं, अपना फोन नंबर दर्ज करें, और आपको नया पासवर्ड सेट करने के लिए एक लिंक के साथ एक एसएमएस प्राप्त होगा।ज्ञान केन्द्र क्या है?",
      role: [ERoles.EMPLOYEE],
      text: 'नॉलेज हब एक ऐसा पेज है जिस तक आप ऊपर बाईं ओर मेनू पर क्लिक करके पहुँच सकते हैं। इसमें विभिन्न वस्तुओं के लिए सर्वोत्तम भंडारण पद्धतियों के बारे में उपयोगी जानकारी है, जिसमें इष्टतम तापमान और इस तापमान के तहत अनुमानित भंडारण समय शामिल है।',
    },
    {
      id: 14,
      title: 'मैं अपनी प्रोफ़ाइल कैसे संपादित कर सकता हूँ?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'मेनू" -> "खाता विवरण" पर क्लिक करके, आप अपनी प्रोफ़ाइल देख सकते हैं और अपने "व्यक्तिगत विवरण" (पहला और अंतिम नाम, फ़ोन नंबर, ईमेल और लिंग) को संपादित कर सकते हैं। "स्थानीयकरण प्राथमिकताएँ" के अंतर्गत, आप ऐप की भाषा बदल सकते हैं। "विक्रेता सेटिंग" के अंतर्गत, आप अपने बैंक खाते का विवरण सेट कर सकते हैं, कूपन बना सकते हैं और मार्केटप्लेस उपयोगकर्ताओं के लिए अपने संपर्क विवरण सार्वजनिक कर सकते हैं। अपनी कंपनी, स्थानों और कूलिंग इकाइयों का विवरण बदलने के लिए, "मेनू" -> "प्रबंधन" पर जाएँ और फिर वह मेनू आइटम चुनें जिसे आप बदलना चाहते हैं।',
    },
    {
      id: 15,
      title:
        "'मेनू' -> 'खाता विवरण' पर क्लिक करके, आप अपनी प्रोफ़ाइल देख सकते हैं और अपने 'व्यक्तिगत विवरण' (पहला और अंतिम नाम, फ़ोन नंबर, ईमेल और लिंग) को संपादित कर सकते हैं। 'स्थानीयकरण प्राथमिकताएँ' के अंतर्गत, आप ऐप की भाषा बदल सकते हैं। 'विक्रेता सेटिंग' के अंतर्गत, आप अपने बैंक खाते का विवरण सेट कर सकते हैं, कूपन बना सकते हैं और मार्केटप्लेस उपयोगकर्ताओं के लिए अपने संपर्क विवरण सार्वजनिक कर सकते हैं। अपनी कंपनी, स्थानों और कूलिंग इकाइयों का विवरण बदलने के लिए, 'मेनू' -> 'प्रबंधन' पर जाएँ और फिर वह मेनू आइटम चुनें जिसे आप बदलना चाहते हैं।मैं अपनी प्रोफ़ाइल कैसे संपादित कर सकता हूँ?",
      role: [ERoles.EMPLOYEE],
      text: 'एक परिचालक को शीतलन इकाई से जोड़ने के तीन तरीके हैं। जब आप किसी ऑपरेटर को आमंत्रण भेज रहे हों तो आप उसे एक कूलिंग यूनिट (या एक से अधिक) नियुक्त कर सकते हैं। अन्यथा, आप किसी दिए गए ऑपरेटर से जुड़ी कूलिंग इकाइयों को "प्रबंधन" -> "ऑपरेटर" पर नेविगेट करके, ऑपरेटर का चयन करके और फिर "कूलिंग यूनिट का चयन करें" पर क्लिक करके संशोधित कर सकते हैं। अंत में, "मैनेजमेंट" -> "कूलिंग यूनिट्स" में कूलिंग यूनिट बनाते समय, आप इसे ऑपरेटरों को भी असाइन कर सकते हैं। बाहर निकलने से पहले अपने परिवर्तनों को सहेजना याद रखें!',
    },
    {
      id: 16,
      title:
        "'मेनू' -> 'खाता विवरण' पर क्लिक करके, आप अपनी प्रोफ़ाइल देख सकते हैं और अपने 'व्यक्तिगत विवरण' (पहला और अंतिम नाम, फ़ोन नंबर और लिंग) को संपादित कर सकते हैं। 'स्थानीयकरण प्राथमिकताएँ' के अंतर्गत, आप ऐप की भाषा बदल सकते हैं। 'विक्रेता सेटिंग' के अंतर्गत, आप अपने बैंक खाते का विवरण सेट कर सकते हैं, कूपन बना सकते हैं और मार्केटप्लेस उपयोगकर्ताओं के लिए अपने संपर्क विवरण सार्वजनिक कर सकते हैं।मैं शीतलन इकाइयों को ऑपरेटर कैसे नियुक्त कर सकता हूँ?",
      role: [ERoles.OPERATOR],
      text: 'हां, आप "एक फोन के बिना उपयोगकर्ता" नाम के कूलिंग उपयोगकर्ता का इस्तेमाल करके उस व्यक्ति के लिए चेक इन शुरू कर सकते हैं। क्यूं की कई लोग चेक इन के लिए इस खाते का उपयोग कर सकते हैं, इसलिए प्रत्येक टोकरे के मालिक की पहचान करने के लिए कमरे के क्रेट में एक नाम टैग जोड़ना सुनिश्चित करें।',
    },
    {
      id: 17,
      title:
        "ऑपरेटर को कूलिंग यूनिट से जोड़ने के तीन तरीके हैं। जब आप किसी ऑपरेटर को आमंत्रण भेज रहे हों, तो आप उसे कूलिंग यूनिट (या एक से ज़्यादा) असाइन कर सकते हैं। अन्यथा, आप 'प्रबंधन' -> 'ऑपरेटर' पर जाकर, ऑपरेटर का चयन करके और फिर 'कूलिंग यूनिट चुनें' पर क्लिक करके किसी दिए गए ऑपरेटर से जुड़ी कूलिंग यूनिट को संशोधित कर सकते हैं। अंत में, 'प्रबंधन' -> 'कूलिंग यूनिट' में कूलिंग यूनिट बनाते समय, आप उसे ऑपरेटर भी असाइन कर सकते हैं। बाहर निकलने से पहले अपने बदलावों को सहेजना न भूलें!एक कूलिंग यूजर कोल्ड रूम में आता है लेकिन उसके पास फोन नहीं है। क्या मैं फिर भी उसका पंजीकरण कर सकता हूँ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'हां, आप "बिना फोन वाला यूजर" नाम के कूलिंग यूजर का इस्तेमाल करके उस व्यक्ति के लिए चेक इन शुरू कर सकते हैं। चूंकि कई लोग चेक इन के लिए इस अकाउंट का इस्तेमाल कर सकते हैं, इसलिए कमरे में मौजूद क्रेट पर नाम टैग लगाना न भूलें ताकि हर क्रेट के मालिक की पहचान हो सके।',
    },
    {
      id: 18,
      title:
        "हां, आप 'बिना फोन वाला यूजर' नाम के कूलिंग यूजर का इस्तेमाल करके उस व्यक्ति के लिए चेक इन शुरू कर सकते हैं। चूंकि कई लोग चेक इन के लिए इस अकाउंट का इस्तेमाल कर सकते हैं, इसलिए कमरे में मौजूद क्रेट पर नाम टैग लगाना न भूलें ताकि हर क्रेट के मालिक की पहचान हो सके।मैं अपनी कंपनी का पंजीकरण कैसे कराऊं?",
      role: [ERoles.EMPLOYEE],
      text: 'अपनी कंपनी को पंजीकृत करने के लिए, स्वागत स्क्रीन पर "कंपनी के रूप में साइन अप करें" चुनें और आवश्यक जानकारी भरें। एक पासवर्ड दर्ज करें फिर "साइन अप" पर क्लिक करें और अब आप अगले चरण के लिए तैयार हैं!',
    },
    {
      id: 19,
      title:
        "अपनी कंपनी को पंजीकृत करने के लिए, स्वागत स्क्रीन पर 'कंपनी के रूप में साइन अप करें' चुनें और आवश्यक जानकारी भरें। पासवर्ड डालें और फिर 'साइन अप' पर क्लिक करें और आप जाने के लिए तैयार हैं!मैं अपनी कंपनी के लिए नया स्थान कैसे पंजीकृत कराऊं?",
      role: [ERoles.EMPLOYEE],
      text: 'प्रत्येक कूलिंग इकाई को एक स्थान पर बनाने की आवश्यकता होती है (और एक ही स्थान के लिए कई कूलिंग इकाइयाँ बनाई जा सकती हैं)। अपनी कंपनी के लिए एक नया स्थान जोड़ने के लिए, मेनू में "प्रबंधन" > "स्थान" चुनें। नया स्थान जोड़ने के लिए ऊपरी दाएं कोने पर "+" पर क्लिक करें। आवश्यक जानकारी भरें। पुष्टि करने के लिए "जोड़ें" पर क्लिक करें।',
    },
    {
      id: 20,
      title:
        "प्रत्येक कूलिंग यूनिट को एक स्थान पर बनाया जाना चाहिए (और एक ही स्थान के लिए कई कूलिंग यूनिट बनाई जा सकती हैं)। अपनी कंपनी के लिए एक नया स्थान जोड़ने के लिए, मेनू में 'प्रबंधन' > 'स्थान' चुनें। नया स्थान जोड़ने के लिए ऊपरी दाएँ कोने पर '+' पर क्लिक करें। आवश्यक जानकारी भरें। पुष्टि करने के लिए 'जोड़ें' पर क्लिक करें।मैं अपनी कंपनी के लिए नई कूलिंग यूनिट कैसे पंजीकृत कराऊं?",
      role: [ERoles.EMPLOYEE],
      text: 'अपनी कंपनी के लिए एक नई कूलिंग इकाई पंजीकृत करने के लिए, आपको कम से कम एक स्थान बनाना होगा। फिर, मेनू में "प्रबंधन" > "कूलिंग इकाइयाँ" चुनें। नई कूलिंग इकाई जोड़ने के लिए ऊपरी दाएं कोने पर "+" पर क्लिक करें। आवश्यक जानकारी भरें। पुष्टि करने के लिए "जोड़ें" पर क्लिक करें।',
    },
    {
      id: 21,
      title:
        "अपनी कंपनी के लिए एक नई कूलिंग यूनिट पंजीकृत करने के लिए, आपको कम से कम एक स्थान बनाना होगा। फिर, मेनू में 'प्रबंधन' > 'कूलिंग यूनिट' चुनें। नई कूलिंग यूनिट जोड़ने के लिए ऊपरी दाएँ कोने पर '+' पर क्लिक करें। आवश्यक जानकारी भरें। पुष्टि करने के लिए 'जोड़ें' पर क्लिक करें।मैं अपनी कंपनी के अन्य पंजीकृत कर्मचारियों को ऐप पर पंजीकरण के लिए कैसे आमंत्रित करूं?",
      role: [ERoles.EMPLOYEE],
      text: 'अपनी कंपनी के लिए अन्य पंजीकृत कर्मचारियों को आमंत्रित करने के लिए, मेनू में "प्रबंधन" > "पंजीकृत कर्मचारी" चुनें । जिस कर्मचारी को आप आमंत्रित करना चाहते हैं उसका मोबाइल नंबर जोड़ने के लिए ऊपरी दाएं कोने पर "+" पर क्लिक करें। पुष्टि करने के लिए "आमंत्रित करें" पर क्लिक करें: आपके सहकर्मी को एक लिंक के साथ एक एसएमएस प्राप्त होगा जो उसे सीधे साइन अप स्क्रीन पर ले जाएगा।',
    },
    {
      id: 22,
      title:
        "अपनी कंपनी के लिए अन्य पंजीकृत कर्मचारियों को आमंत्रित करने के लिए, मेनू में 'प्रबंधन' > 'पंजीकृत कर्मचारी' चुनें। जिस कर्मचारी को आप आमंत्रित करना चाहते हैं उसका टेलीफोन नंबर जोड़ने के लिए ऊपरी दाएँ कोने पर '+' पर क्लिक करें। पुष्टि करने के लिए 'आमंत्रित करें' पर क्लिक करें: आपके सहकर्मी को एक लिंक के साथ एक एसएमएस प्राप्त होगा जो उसे सीधे साइन अप स्क्रीन पर ले जाएगा। इसके अलावा, आपको आमंत्रण लिंक के साथ एक ईमेल भी प्राप्त होगा। यदि ऑपरेटर को यह एसएमएस के माध्यम से प्राप्त नहीं हुआ है तो कृपया इसे आगे भेजें।मैं कोल्ड स्टोरेज संचालकों को ऐप पर पंजीकरण के लिए कैसे आमंत्रित करूं?",
      role: [ERoles.EMPLOYEE],
      text: 'अपनी कूलिंग इकाइयों के लिए परिचालक को आमंत्रण भेजने के लिए, मेनू में "प्रबंधन" > "परिचालकर" चुनें । जिस परिचालक को आप आमंत्रित करना चाहते हैं उसका टेलीफोन नंबर जोड़ने के लिए ऊपरी दाएं कोने पर "+" पर क्लिक करें। पुष्टि करने के लिए "आमंत्रित करें" पर क्लिक करें: ऑपरेटर को एक लिंक के साथ एक संदेश प्राप्त होगा जो उसे सीधे साइन अप स्क्रीन पर ले जाएगा।',
    },
    {
      id: 23,
      title:
        "अपने कूलिंग यूनिट के लिए ऑपरेटरों को आमंत्रण भेजने के लिए, मेनू में 'प्रबंधन' > 'ऑपरेटर' चुनें। जिस ऑपरेटर को आप आमंत्रित करना चाहते हैं उसका टेलीफ़ोन नंबर जोड़ने के लिए ऊपरी दाएँ कोने पर '+' पर क्लिक करें। पुष्टि करने के लिए 'आमंत्रित करें' पर क्लिक करें: ऑपरेटर को एक लिंक के साथ एक संदेश प्राप्त होगा जो उसे सीधे साइन अप स्क्रीन पर ले जाएगा। इसके अलावा, आपको आमंत्रण लिंक के साथ एक ईमेल भी प्राप्त होगा। यदि ऑपरेटर को यह एसएमएस के माध्यम से प्राप्त नहीं हुआ है तो कृपया इसे ऑपरेटर को अग्रेषित करें।मैं शीतलन इकाई के तापमान की निगरानी कैसे करूँ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'किसी खास कूलिंग यूनिट के तापमान पर नज़र रखने के लिए, नेविगेशन बार के निचले दाएँ कोने में "अधिक" पर क्लिक करें, "कूलिंग यूनिट" चुनें, "कमरे की स्थिति" पर जाएँ और ड्रॉपडाउन से अपनी पसंद की कूलिंग यूनिट चुनें। इस पैनल में, आपको समय के साथ तापमान के साथ एक ग्राफ़ दिखाई देगा - आप तापमान मान और टाइमस्टैम्प देखने के लिए डेटापॉइंट पर क्लिक कर सकते हैं। अगर कमरे में ऐप से जुड़े सेंसर हैं, तो आप यहाँ कमरे का वास्तविक तापमान देख पाएँगे। अन्यथा, ग्राफ़ में वह तापमान दिखाया जाएगा जिसे रूम ऑपरेटर ने ऐप के भीतर मैन्युअल रूप से सेट किया है। किसी दूसरी कूलिंग यूनिट का तापमान जाँचने के लिए, आप उसे पेज के शीर्ष पर मौजूद ड्रॉपडाउन से चुन सकते हैं।',
    },
    {
      id: 24,
      title:
        "किसी खास कूलिंग यूनिट के तापमान पर नज़र रखने के लिए, नेविगेशन बार के निचले दाएँ कोने में 'अधिक' पर क्लिक करें, 'कूलिंग यूनिट' चुनें, 'कमरे की स्थिति' पर जाएँ और ड्रॉपडाउन से अपनी पसंद की कूलिंग यूनिट चुनें। इस पैनल में, आपको समय के साथ तापमान के साथ एक ग्राफ़ दिखाई देगा - आप तापमान मान और टाइमस्टैम्प देखने के लिए डेटापॉइंट पर क्लिक कर सकते हैं। अगर कमरे में ऐप से जुड़े सेंसर हैं, तो आप यहाँ कमरे का वास्तविक तापमान देख पाएँगे। अन्यथा, ग्राफ़ में वह तापमान दिखाया जाएगा जिसे रूम ऑपरेटर ने ऐप के भीतर मैन्युअल रूप से सेट किया है। किसी दूसरी कूलिंग यूनिट का तापमान जाँचने के लिए, आप उसे पेज के शीर्ष पर मौजूद ड्रॉपडाउन से चुन सकते हैं।मैं शीतलन इकाई के अधिभोग की निगरानी कैसे करूँ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'किसी विशिष्ट कूलिंग यूनिट के ऑक्यूपेंसी को मैनेज करने के लिए नेविगेशन बार के निचले दाएं कोने में "अधिक" पर क्लिक करें, "कूलिंग यूनिट" चुनें, "प्लानर" पर जाएँ, और ड्रॉपडाउन से अपनी पसंद की कूलिंग यूनिट चुनें। यहाँ आप वर्तमान ऑक्यूपेंसी (ऊपर) और अगले 7 दिनों के लिए अनुमानित ऑक्यूपेंसी (नीचे) देख सकते हैं। भविष्य में ऑक्यूपेंसी के बारे में जानकारी प्रत्येक उपयोगकर्ता द्वारा चेक-इन के समय स्टोरेज में नियोजित दिनों की संख्या के आधार पर दी जाती है। सावधान रहें कि यह केवल एक अनुमान है और गलत हो सकता है।',
    },
    {
      id: 25,
      title:
        "किसी विशिष्ट कूलिंग यूनिट के ऑक्यूपेंसी को मैनेज करने के लिए नेविगेशन बार के निचले दाएं कोने में 'अधिक' पर क्लिक करें, 'कूलिंग यूनिट' चुनें, 'प्लानर' पर जाएँ, और ड्रॉपडाउन से अपनी पसंद की कूलिंग यूनिट चुनें। यहाँ आप वर्तमान ऑक्यूपेंसी (ऊपर) और अगले 7 दिनों के लिए अनुमानित ऑक्यूपेंसी (नीचे) देख सकते हैं। भविष्य में ऑक्यूपेंसी के बारे में जानकारी प्रत्येक उपयोगकर्ता द्वारा चेक-इन के समय स्टोरेज में नियोजित दिनों की संख्या के आधार पर दी जाती है। सावधान रहें कि यह केवल एक अनुमान है और गलत हो सकता है।मैं कैसे देख सकता हूँ कि किसी कमरे में कौन सी वस्तुएँ संग्रहित हैं?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'स्क्रीन के नीचे "डैशबोर्ड" आइकन पर क्लिक करें और कूलिंग यूनिट में सभी संग्रहीत वस्तुओं की सूची देखने के लिए ड्रॉपडाउन से ब्याज की शीतलन इकाई का चयन करें।',
    },
    {
      id: 26,
      title:
        "स्क्रीन के नीचे 'डैशबोर्ड' आइकन पर क्लिक करें और ड्रॉपडाउन से इच्छित शीतलन इकाई का चयन करें, जिससे शीतलन इकाई में संग्रहीत सभी वस्तुओं की सूची देखी जा सके।मैं कूलिंग यूनिट के पिछले चेक-इन और चेक-आउट कैसे देख सकता हूँ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'कूलिंग यूनिट की पिछली गतिविधियों को देखने के लिए नेविगेशन बार के निचले दाएं कोने में "अधिक" पर क्लिक करें, और "इतिहास" चुनें: पिछले चेक-इन (हरे रंग की टोकरी वाले आइकन), चेक-आउट (नारंगी टोकरी वाले आइकन), और मार्केटप्लेस संचालन (नीले रंग की टोकरी वाले आइकन) लेन-देन विवरण के साथ प्रदर्शित किए जाते हैं। यदि कोई विशिष्ट लेन-देन दिलचस्प है तो खोज फ़ंक्शन आपको इसे खोजने में सहायता कर सकता है!',
    },
    {
      id: 28,
      title:
        "कूलिंग यूनिट की पिछली गतिविधियों को देखने के लिए नेविगेशन बार के निचले दाएं कोने में 'अधिक' पर क्लिक करें, और 'इतिहास' चुनें: पिछले चेक-इन (हरे रंग की टोकरी वाले आइकन), चेक-आउट (नारंगी टोकरी वाले आइकन), और मार्केटप्लेस संचालन (नीले रंग की टोकरी वाले आइकन) लेन-देन विवरण के साथ प्रदर्शित किए जाते हैं। यदि कोई विशिष्ट लेन-देन दिलचस्प है तो खोज फ़ंक्शन आपको इसे खोजने में सहायता कर सकता है!ऐप में ऑपरेटर कौन से मुख्य कार्य कर सकता है?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ऑपरेटर ये कर सकता है: नए कूलिंग उपयोगकर्ताओं को पंजीकृत करना, चेक-इन शुरू करना, स्टोरेज और कमरे में मौजूद वस्तुओं की निगरानी करना, चेक-आउट शुरू करना और उस कूलिंग यूनिट के तापमान की निगरानी करना जिसके लिए वह जिम्मेदार है। ऑपरेटर कूलिंग उपयोगकर्ताओं को बिक्री के लिए कुछ क्रेट सूचीबद्ध करने और बिक्री मूल्य निर्धारित करने में भी सहायता कर सकता है।',
    },
    {
      id: 29,
      title:
        'ऑपरेटर ये कर सकता है: नए कूलिंग उपयोगकर्ताओं को पंजीकृत करना, चेक-इन शुरू करना, स्टोरेज और कमरे में मौजूद वस्तुओं की निगरानी करना, चेक-आउट शुरू करना और उस कूलिंग यूनिट के तापमान की निगरानी करना जिसके लिए वह जिम्मेदार है। ऑपरेटर कूलिंग उपयोगकर्ताओं को बिक्री के लिए कुछ क्रेट सूचीबद्ध करने और बिक्री मूल्य निर्धारित करने में भी सहायता कर सकता है।मैं नये कूलिंग उपयोगकर्ताओं को कैसे पंजीकृत कर सकता हूं?',
      role: [ERoles.OPERATOR],
      text: 'एक नया कूलिंग यूजर रजिस्टर करने के लिए, मेनू में "मैनेजमेंट" > "कूलिंग यूजर" पर जाएँ। ऊपरी दाएँ कोने पर "+" पर क्लिक करें और चुनें कि कोड के साथ पहले से रजिस्टर्ड यूजर को जोड़ना है या यूजर की जानकारी जोड़नी है। एक कूलिंग यूजर जिसके पास स्मार्टफोन है और जो पहले से ही कोल्डटिवेट में रजिस्टर है, उसके पास एक यूनिक कोड होता है, जिसे वह "मेनू" -> "अकाउंट डिटेल्स" -> "पर्सनल डिटेल्स" -> कूलिंग यूजर इंपोर्ट कोड के अंतर्गत पा सकता है। अगर यूजर के पास कोई स्मार्टफोन नहीं है, या वह अभी तक रजिस्टर्ड नहीं है, तो आप नाम, लिंग और टेलीफोन नंबर जोड़कर यूजर को जोड़ सकते हैं। अगर यूजर के पास अपना नंबर नहीं है, तो किसी दूसरे व्यक्ति (जैसे दोस्त, रिश्तेदार) का नंबर इस्तेमाल किया जा सकता है, लेकिन कृपया याद रखें कि एक फोन नंबर का इस्तेमाल केवल एक बार ही किया जा सकता है। पुष्टि करने के लिए "परिवर्तन सहेजें" पर क्लिक करें। रजिस्ट्रेशन पूरा करने के लिए, आपको कूलिंग यूजर से कुछ सवाल पूछकर एक छोटा सा सर्वे भरना होगा। सर्वेक्षण को बाद में "प्रबंधन" -> "कूलिंग उपयोगकर्ता" -> "कूलिंग उपयोगकर्ता सर्वेक्षण" पर जाकर भी पूरा किया जा सकता है।',
    },
    {
      id: 30,
      title:
        "एक नया कूलिंग यूजर रजिस्टर करने के लिए, मेनू में 'मैनेजमेंट' > 'कूलिंग यूजर' पर जाएँ। ऊपरी दाएँ कोने पर '+' पर क्लिक करें और चुनें कि कोड के साथ पहले से रजिस्टर्ड यूजर को जोड़ना है या यूजर की जानकारी जोड़नी है। एक कूलिंग यूजर जिसके पास स्मार्टफोन है और जो पहले से ही कोल्डटिवेट में रजिस्टर है, उसके पास एक यूनिक कोड होता है, जिसे वह 'मेनू' -> 'अकाउंट डिटेल्स' -> 'पर्सनल डिटेल्स' -> कूलिंग यूजर इंपोर्ट कोड के अंतर्गत पा सकता है। अगर यूजर के पास कोई स्मार्टफोन नहीं है, या वह अभी तक रजिस्टर्ड नहीं है, तो आप नाम, लिंग और टेलीफोन नंबर जोड़कर यूजर को जोड़ सकते हैं। अगर यूजर के पास अपना नंबर नहीं है, तो किसी दूसरे व्यक्ति (जैसे दोस्त, रिश्तेदार) का नंबर इस्तेमाल किया जा सकता है, लेकिन कृपया याद रखें कि एक फोन नंबर का इस्तेमाल केवल एक बार ही किया जा सकता है। पुष्टि करने के लिए 'परिवर्तन सहेजें' पर क्लिक करें। रजिस्ट्रेशन पूरा करने के लिए, आपको कूलिंग यूजर से कुछ सवाल पूछकर एक छोटा सा सर्वे भरना होगा। सर्वेक्षण को बाद में 'प्रबंधन' -> 'कूलिंग उपयोगकर्ता' -> 'कूलिंग उपयोगकर्ता सर्वेक्षण' पर जाकर भी पूरा किया जा सकता है।कूलिंग यूजर के पास रजिस्ट्रेशन के समय सर्वे के सवालों का जवाब देने का समय नहीं है। मुझे क्या करना चाहिए?",
      role: [ERoles.OPERATOR],
      text: 'आप "बाद में पूर्ण करें" पर क्लिक करके सर्वेक्षण प्रश्नों को छोड़ सकते हैं। इस मामले में, जब आप पहली बार उस कूलिंग उपयोगकर्ता के लिए चेक इन बना रहे हैं, तो आपको सर्वेक्षण पूरा करने के लिए प्रेरित किया जाएगा। समय निकालकर सर्वेक्षण के सवालों का अच्छी तरह से जवाब देने की सलाह दी जाती है: इस तरह से उपयोगकर्ता कोल्डटीवेट ऐप के साथ अधिक अनुकूल अनुभव प्राप्त कर सकता है!',
    },
    {
      id: 31,
      title:
        "आप 'बाद में पूरा करें' पर क्लिक करके सर्वेक्षण प्रश्नों को छोड़ सकते हैं। इस मामले में, जब आप पहली बार उस कूलिंग उपयोगकर्ता के लिए चेक इन बना रहे होंगे, तो आपको सर्वेक्षण पूरा करने के लिए कहा जाएगा। समय निकालकर सर्वेक्षण प्रश्नों का पूरी तरह से उत्तर देने की सलाह दी जाती है: इस तरह उपयोगकर्ता कोल्डटिवेट ऐप के साथ अधिक अनुकूलित अनुभव प्राप्त कर सकता है!एक ऑपरेटर मुझसे कंपनी की कूलिंग उपयोगकर्ताओं की सूची में मुझे जोड़ने के लिए एक कोड मांग रहा है। मैं कोड कहां पा सकता हूं?",
      role: [ERoles.OPERATOR],
      text: 'चेक-इन आरंभ करने के लिए, डैशबोर्ड पर नेविगेट करें और नीचे दाईं ओर स्थित गतिविधि प्रबंधक बटन पर क्लिक करें, और फिर हरे बटन पर क्लिक करें।',
    },
    {
      id: 32,
      title:
        "जब आपने कोल्डटिवेट में साइन अप किया था, तो आपको एक कोड के रूप में एक अद्वितीय पहचानकर्ता प्राप्त हुआ था। इस कोड का उपयोग ऑपरेटर द्वारा आपको कंपनी की कूलिंग उपयोगकर्ताओं की सूची में जोड़ने के लिए किया जा सकता है, जिसकी आवश्यकता ऑपरेटरों को आपके क्रेट को चेक-इन करने के लिए होती है। कोड 'मेनू' -> 'खाता विवरण' -> 'व्यक्तिगत विवरण' -> कूलिंग उपयोगकर्ता आयात कोड के अंतर्गत पाया जा सकता है।मेरे पास साइन अप के समय सर्वेक्षण के सवालों का जवाब देने के लिए समय नहीं है। मुझे क्या करना चाहिए?",
      role: [ERoles.OPERATOR],
      text: 'चेक आउट शुरू करने के दो तरीके हैं, दोनों ही डैशबोर्ड पेज से शुरू हो रहे हैं। आप नीचे दाईं ओर स्थित गतिविधि प्रबंधक बटन पर क्लिक कर सकते हैं और फिर लाल बटन पर क्लिक कर सकते हैं। इस तरह, आप चुन सकते हैं कि आप किस कूलिंग उपयोगकर्ता (और किस कूलिंग यूनिट में) के लिए चेक आउट शुरू करना चाहते हैं, और कई चेक इन से उसके क्रेट देख सकते हैं। वैकल्पिक रूप से, आप डैशबोर्ड में दिखाई देने वाले आइटम के लिए "विवरण देखें" पर क्लिक कर सकते हैं (सुनिश्चित करें कि वह सही कूलिंग यूनिट में है), और "चेक आउट" पर क्लिक करें। इस मामले में, आप केवल उस स्टोरेज आइटम से क्रेट चेक-आउट कर सकते हैं।',
    },
    {
      id: 33,
      title:
        "आप 'बाद में पूरा करें' पर क्लिक करके सर्वेक्षण प्रश्नों को छोड़ सकते हैं। आपको सर्वेक्षण आपके खाते के विवरण के भाग के रूप में मिलेगा और आप इसे कभी भी पूरा कर सकते हैं। हालाँकि, जब आप कमरे का उपयोग करना शुरू करते हैं तो सर्वेक्षण प्रश्नों का अच्छी तरह से उत्तर देने के लिए समय निकालना अनुशंसित है: इस तरह से आप कोल्डटिवेट ऐप के साथ अधिक अनुकूलित अनुभव प्राप्त कर सकते हैं!मैं अपनी फसलों को ठंडे कमरों में संग्रहीत करने में रुचि रखता हूं। मैं उन्हें कैसे ढूंढ सकता हूं?",
      role: [ERoles.EMPLOYEE],
      text: 'अपने आस-पास के कोल्ड रूम खोजने के लिए, नेविगेशन बार के निचले दाएँ कोने में "अधिक" पर जाएँ, "कूलिंग यूनिट" और "मैप" चुनें। यहाँ आप आस-पास के कोल्ड रूम खोज सकते हैं, और फिर अपने क्रेट को कमरे में ला सकते हैं। कोल्ड रूम ऑपरेटर आपको यह समझने में मदद कर सकता है कि कमरा कैसे काम करता है, आपसे कैसे शुल्क लिया जाएगा, और कोल्ड स्टोरेज का उपयोग करने के क्या लाभ हैं।',
    },
    {
      id: 34,
      title: 'मैं चेक-इन कैसे आरंभ कर सकता हूँ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'चेक-इन आरंभ करने के लिए, डैशबोर्ड पर जाएं और नीचे दाईं ओर स्थित गतिविधि प्रबंधक बटन पर क्लिक करें, और फिर हरे बटन पर क्लिक करें।',
    },
    {
      id: 35,
      title: 'मैं चेक आउट कैसे आरंभ कर सकता हूँ?',
      role: [ERoles.OPERATOR],
      text: 'चेक आउट शुरू करने के दो तरीके हैं, दोनों ही डैशबोर्ड पेज से शुरू होते हैं। आप नीचे दाईं ओर एक्टिविटी मैनेजर बटन पर क्लिक कर सकते हैं, और फिर लाल बटन पर क्लिक कर सकते हैं। इस तरह, आप चुन सकते हैं कि आप किस कूलिंग यूजर (और किस कूलिंग यूनिट में) के लिए चेक आउट शुरू करना चाहते हैं, और कई चेक इन से उसके क्रेट चेक आउट कर सकते हैं। वैकल्पिक रूप से, आप डैशबोर्ड में दिखाई देने वाले आइटम के लिए "विवरण देखें" पर क्लिक कर सकते हैं (सुनिश्चित करें कि वह सही कूलिंग यूनिट में हो), और "चेक आउट" पर क्लिक करें। इस मामले में, आप केवल उस स्टोरेज आइटम से क्रेट चेक-आउट कर सकते हैं।',
    },
    {
      id: 36,
      title:
        ' मेरे पास ठंडे कमरे में तापमान सेंसर हैं। क्या उन्हें कोल्ड्टीवेट से जोड़ा जा सकता है?',
      role: [ERoles.AUTH],
      text: 'स्टोरेज मैनेजर" के "इतिहास" टैब में आप नवीनतम चेक-आउट की सूची देख सकते हैं। आपको बाजार सर्वेक्षण को भरने के लिए चेक आउट करने वाले प्रत्येक कूलिंग उपयोगकर्ता से संपर्क करना चाहिए, जिसे चेक आउट के आगे तीन बिंदुओं पर क्लिक करके और "बाजार सर्वेक्षण में भरें" का चयन करके पहुँचा जा सकता है। "विवरण देखें" पर क्लिक करके, आप जांच सकते हैं कि कौन सी वस्तु भंडारण में थी और यदि आप उससे फोन पर संपर्क करना चाहते हैं तो उपयोगकर्ता का फोन नंबर। अन्यथा, आप तब तक प्रतीक्षा कर सकते हैं जब तक उपयोगकर्ता अगली बार अन्य उत्पादों को स्टोर करने के लिए ठंडे कमरे में नहीं आता। एक लाल बिंदु इतिहास सूची में चेक आउट की पहचान करेगा जिसके लिए बाजार सर्वेक्षण अभी तक पूरा नहीं हुआ है। चेक आउट की तारीख के 2 दिन बाद अधिसूचना पैनल में आपको उन चेक आउट के बारे में याद दिलाया जाएगा जिन पर आपको ध्यान देने की आवश्यकता है।',
    },
    {
      id: 37,
      title: 'मैं कमरे में लगे सेंसर को ऐप से कैसे कनेक्ट करूं?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'अगर कमरे में तापमान सेंसर हैं जिन्हें कोल्डटिवेट ऐप से जोड़ा जा सकता है, तो कृपया अपने जिम्मेदार व्यक्ति से बात करें। केवल पंजीकृत कर्मचारी भूमिका वाला उपयोगकर्ता ही कोल्डटिवेट में बनाए गए कूलिंग यूनिट से सेंसर को लिंक कर सकता है।',
    },
    {
      id: 38,
      title:
        'अगर कमरे में तापमान सेंसर हैं जिन्हें कोल्डटिवेट ऐप से जोड़ा जा सकता है, तो कृपया अपने जिम्मेदार व्यक्ति से बात करें। केवल पंजीकृत कर्मचारी भूमिका वाला उपयोगकर्ता ही कोल्डटिवेट में बनाए गए कूलिंग यूनिट से सेंसर को लिंक कर सकता है।मैं शीतलन इकाई का तापमान कैसे निर्धारित कर सकता हूँ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'कूलिंग यूजर के लिए वस्तु लेने के लिए बचे हुए दिनों की संख्या का समय सुझाया गया है। बाद में, वस्तु अपनी मार्केटिंग क्षमता खोना शुरू कर देगी। शून्य के बराबर लेने का समय इंगित करता है कि उपयोगकर्ता को तुरंत भंडारण में आइटम एकत्र करने के लिए आना चाहिए और इसे बाजार में बेचने के लिए 2 दिनों तक का समय है। इसे डैशबोर्ड (ऊपरी दाएं) और प्रत्येक स्टोरेज आइटम के विस्तृत दृश्य में देखा जा सकता है।',
    },
    {
      id: 39,
      title:
        "कूलिंग यूनिट का तापमान सेट करने के लिए, कृपया अपनी कंपनी द्वारा निर्धारित प्रक्रिया का पालन करें। ऐप का उपयोग ठंडे कमरे में तापमान की निगरानी करने के लिए किया जा सकता है, लेकिन उसे अपडेट करने के लिए नहीं। हालाँकि, अगर ऐप सेंसर से जुड़ा नहीं है, तो यह महत्वपूर्ण है कि आप ऐप में सेट तापमान को अपडेट करें। आप 'अधिक' -> 'कूलिंग यूनिट' > 'कमरे की स्थिति' पैनल के अंदर 'तापमान दर्ज करें' पर क्लिक करके ऐसा कर सकते हैं। यहाँ तापमान को अपडेट करने से आप ऐप में तापमान के विकास को देख सकते हैं और भंडारण में वस्तु के बचे हुए दिनों के बारे में सटीक पूर्वानुमान लगा सकते हैं। अगर ऐप सेंसर से जुड़ा है, तो ऐप में तापमान बदलने का विकल्प अक्षम है, क्योंकि ऐप समय-समय पर सीधे सेंसर से यह जानकारी निकालता है।भंडारण के बाद बाजार सर्वेक्षण के लिए कूलिंग उपयोगकर्ता से कैसे संपर्क करें?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ताजी सब्जियां और फल खराब हो जाते हैं और कटाई के बाद वे अपनी ताजगी कैसे खो देते हैं यह काफी हद तक तापमान पर आधारित होता है। इसलिए, लेने का समय की गणना संबंधित कूलिंग इकाई के तापमान और कूलिंग इकाई में लाए जाने पर उत्पाद की प्रारंभिक गुणवत्ता के आधार पर की जाती है। इस गणना में प्रयुक्त मापदंडों प्रत्येक वस्तु के लिए अद्वितीय हैं। ज्ञान केंद्र में आप इस बारे में कुछ अंतर्दृष्टि प्राप्त कर सकते हैं कि विभिन्न वस्तुओं के बीच खराब होने की क्षमता कैसे भिन्न होती है।',
    },
    {
      id: 40,
      title: 'भंडारण-पश्चात बाजार सर्वेक्षण क्या है और मुझे इसे क्यों भरना चाहिए?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'अधिक" -> "इतिहास" टैब में प्रत्येक चेक आउट के बगल में तीन बिंदुओं पर क्लिक करके और "बाजार सर्वेक्षण भरें" का चयन करके बाजार सर्वेक्षण तक पहुँचा जा सकता है। सर्वेक्षण बहुत छोटा है और इसमें आपके द्वारा पहले कमरे में संग्रहीत उत्पादों की बिक्री मूल्य के बारे में जानकारी मांगी जाती है, साथ ही यह भी पूछा जाता है कि उनमें से कितना खराब हो गया। इस जानकारी को गोपनीय माना जाएगा और इसका उपयोग केवल कोल्ड स्टोरेज के उपयोग के प्रभाव का मूल्यांकन करने के लिए कोल्ड्टीवेट टीम द्वारा किया जाएगा। एक लाल बिंदु उन चेक आउट की पहचान करेगा जिनके लिए बाजार सर्वेक्षण अभी तक पूरा नहीं हुआ है। आपको अधिसूचना पैनल में उन चेक आउट के बारे में याद दिलाया जाएगा जिन पर आपको ध्यान देने की आवश्यकता है और सर्वेक्षण खोलने के लिए अधिसूचना पर क्लिक कर सकते हैं। आप "एनालिटिक्स" टैब में उन सर्वेक्षणों तक भी पहुँच सकते हैं जिन्हें आपको भरना है, और फिर "प्रभाव" पर क्लिक करें।',
    },
    {
      id: 41,
      title: 'मैं डैशबोर्ड में किसी एक आइटम की जानकारी कैसे पढ़ सकता हूँ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'डैशबोर्ड में प्रत्येक आइटम एक ही फसल प्रकार के क्रेटों का एक सेट प्रदर्शित करता है जिन्हें एक साथ चेक-इन किया गया है। शीर्ष पर दिनों की संख्या पिक-अप के समय तक अनुमानित शेष दिन हैं। नीचे, आप फसल का प्रकार और चेक-इन आईडी देखते हैं। क्रेट प्रतीक के बगल में संख्या चेक-इन किए गए क्रेटों की संख्या है। इसके आगे, आप कूलिंग शुल्क और क्रेटों को स्टोरेज में रखे गए दिनों की संख्या देखते हैं। दाईं ओर कार्ड के बगल में संख्या यह पहचानती है कि बाज़ार में कितने क्रेट "बिक्री के लिए" सूचीबद्ध हैं। प्रत्येक आइटम के नीचे, आप क्रेट के मालिक और संपर्क विवरण देखते हैं।',
    },
    {
      id: 42,
      title:
        "डैशबोर्ड में प्रत्येक आइटम एक ही फसल प्रकार के क्रेटों का एक सेट प्रदर्शित करता है जिन्हें एक साथ चेक-इन किया गया है। शीर्ष पर दिनों की संख्या पिक-अप के समय तक अनुमानित शेष दिन हैं। नीचे, आप फसल का प्रकार और चेक-इन आईडी देखते हैं। क्रेट प्रतीक के बगल में संख्या चेक-इन किए गए क्रेटों की संख्या है। इसके आगे, आप कूलिंग शुल्क और क्रेटों को स्टोरेज में रखे गए दिनों की संख्या देखते हैं। दाईं ओर कार्ड के बगल में संख्या यह पहचानती है कि बाज़ार में कितने क्रेट 'बिक्री के लिए' सूचीबद्ध हैं। प्रत्येक आइटम के नीचे, आप क्रेट के मालिक और संपर्क विवरण देखते हैं।उठाने का समय क्या है?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'जब शीतलन इकाई की क्षमता का 80% से अधिक उपयोग किया जाता है, तो अधिभोग को लाल रंग में दिखाया जाता है। भावी अधिभोग के बारे में जानकारी उन दिनों की संख्या पर आधारित होती है, जब प्रत्येक उपयोगकर्ता चेक-इन के समय भंडारण में नियोजित दिनों के रूप में घोषित करता है। सावधान रहें कि यह केवल एक अनुमान है और गलत भी हो सकता है। जैसे, लाल कमरे का अधिभोग सिर्फ एक संकेत है कि कमरा भर रहा है। आपको चिंता करने की जरूरत नहीं है लेकिन आप अपने हिसाब से कार्रवाई कर सकते हैं। उदाहरण के लिए, उन कूलिंग उपयोगकर्ताओं से संपर्क करने पर विचार करें, जिनके पास भंडारण में सामान लेने के लिए सबसे कम समय है, ताकि उन्हें जल्द ही चेक आउट करने की सलाह दी जा सके। जब आप लेने के लिए समय के अनुसार ऑर्डर करते हैं तो आप "डैशबोर्ड" के तहत चेक आउट करने के लिए सबसे जरूरी वस्तुओं की एक ऑर्डर की गई सूची देख सकते हैं।',
    },
    {
      id: 43,
      title: 'उठाने का समय कैसे निर्धारित किया जाता है? यह किन कारकों से प्रभावित होता है?',
      role: [ERoles.OPERATOR],
      text: 'ताजी सब्जियाँ और फल जल्दी खराब हो जाते हैं, और कटाई के बाद वे अपनी ताज़गी कैसे खो देते हैं, यह काफी हद तक तापमान पर निर्भर करता है। इसलिए, उन्हें उठाने का समय संबंधित कूलिंग यूनिट के तापमान और कूलिंग यूनिट में लाए जाने पर उत्पाद की शुरुआती गुणवत्ता के आधार पर गणना की जाती है। इस गणना में इस्तेमाल किए जाने वाले पैरामीटर प्रत्येक वस्तु के लिए अद्वितीय हैं। नॉलेज हब में आप विभिन्न वस्तुओं के बीच खराब होने की दर के बारे में कुछ जानकारी प्राप्त कर सकते हैं।',
    },
    {
      id: 44,
      title:
        'ताजी सब्जियाँ और फल जल्दी खराब हो जाते हैं, और कटाई के बाद वे अपनी ताज़गी कैसे खो देते हैं, यह काफी हद तक तापमान पर निर्भर करता है। इसलिए, उन्हें उठाने का समय संबंधित कूलिंग यूनिट के तापमान और कूलिंग यूनिट में लाए जाने पर उत्पाद की शुरुआती गुणवत्ता के आधार पर गणना की जाती है। इस गणना में इस्तेमाल किए जाने वाले पैरामीटर प्रत्येक वस्तु के लिए अद्वितीय हैं। नॉलेज हब में आप विभिन्न वस्तुओं के बीच खराब होने की दर के बारे में कुछ जानकारी प्राप्त कर सकते हैं।फसल लेने का समय 0 दिन है लेकिन उपज अभी भी अच्छी दिख रही है। क्यों?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'रंग लेने के समय से पहले शेष दिनों का प्रतिनिधित्व करता है। आप बार को 2 दिनों से कम समय में लाल रंग में, 7 दिनों से कम समय में पीले रंग में और 7 दिनों से अधिक समय में हरे रंग में देखेंगे। ये मान प्रत्येक भंडारण वस्तु के लिए विशिष्ट हैं और कूलिंग इकाई में तापमान के आधार पर प्रति दिन कई बार पुनर्गणना की जाती है। जब गणना के लिए कोई मॉडल उपलब्ध नहीं है, तो बार का रंग ग्रे होगा।',
    },
    {
      id: 45,
      title:
        'पिक अप करने का समय अनुमानित मूल्य है। इस प्रकार, यह संभव है कि एक कूलिंग उपयोगकर्ता चेकआउट कर सकता है और फिर भी 0 दिनों के बराबर पिक अप करने के समय के साथ एक स्टोरेज आइटम को अच्छी तरह से बेचने में कामयाब हो सकता है। हालाँकि, ध्यान रखें कि कुछ गुणवत्ता हानि मानव आँखों के लिए अदृश्य है, और जितना संभव हो उतना पिक अप करने के समय द्वारा दिए गए संकेत का पालन करना अभी भी एक अच्छा अभ्यास है। यदि ऐप तापमान सेंसर से जुड़ा हुआ है, तो पिक अप करने का समय पूर्वानुमान विशेष रूप से सटीक है। यदि आपके पास वे नहीं हैं, तो हम आपको उन्हें अपनी कूलिंग इकाइयों में स्थापित करने की सलाह देते हैं। सेटअप के बारे में अधिक जानकारी के लिए कृपया तापमान सेंसर पर प्रश्न देखें।फसल उठाने में 0 दिन से ज्यादा का समय लग जाता है लेकिन फसल लगभग खराब हो जाती है। क्यों?',
      role: [ERoles.OPERATOR],
      text: 'डैशबोर्ड को अपडेट होने में कुछ समय लग सकता है। कृपया यह भी सत्यापित करें कि आप सही कूलिंग इकाई देख रहे हैं। यदि आप अभी भी समस्या का सामना कर रहे हैं, तो कृपया इसकी रिपोर्ट app@yourvcca.org पर करें।',
    },
    {
      id: 46,
      title:
        'उठाने का समय एक अनुमानित मूल्य है। इस प्रकार, दुर्लभ मामले हो सकते हैं, जहां उपज खराब हो जाती है जबकि उठाने का समय 0 से अधिक होता है। चूंकि ताजा उपज की गुणवत्ता में गिरावट काफी हद तक तापमान पर निर्भर करती है, इसलिए तापमान डेटा पूर्वानुमान को अधिक सटीक बनाने में मदद करता है। उदाहरण के लिए, समस्या तब उत्पन्न हो सकती है जब ऐप से कोई तापमान सेंसर जुड़ा न हो, और ऑपरेटर ने कमरे में गलत तापमान सेट किया हो। यदि आपके पास तापमान सेंसर नहीं हैं, तो हम आपको उन्हें अपनी कूलिंग इकाइयों में स्थापित करने की सलाह देते हैं। सेटअप के बारे में अधिक जानकारी के लिए कृपया तापमान सेंसर पर प्रश्न देखें।फसल उठाने में 0 दिन से ज्यादा का समय लग जाता है लेकिन फसल लगभग खराब हो जाती है। क्यों?',
      role: [ERoles.OPERATOR],
      text: 'डैशबोर्ड को अपडेट होने में कुछ समय लग सकता है। कृपया यह भी सत्यापित करें कि आपके द्वारा चेक-आउट किए गए आइटम सही थे, और यह कि आप सही कूलिंग इकाई देख रहे हैं। यदि आप अभी भी समस्या का सामना कर रहे हैं, तो कृपया इसकी रिपोर्ट app@yourvcca.org पर करें।',
    },
    {
      id: 47,
      title:
        'उठाने का समय एक अनुमानित मान है। इस प्रकार, दुर्लभ मामले हो सकते हैं, जहां उपज खराब हो जाती है जबकि उठाने का समय 0 से अधिक होता है। चूंकि ताजा उपज की गुणवत्ता में गिरावट काफी हद तक तापमान पर निर्भर करती है, इसलिए तापमान डेटा पूर्वानुमान को अधिक सटीक बनाने में मदद करता है। उदाहरण के लिए, समस्या तब उत्पन्न हो सकती है जब ऐप से कोई तापमान सेंसर जुड़ा न हो, और ऑपरेटर ने ऐप में कमरे के तापमान को नियमित रूप से अपडेट न किया हो। ऐसा होने पर कृपया कमरे के ऑपरेटर को सूचित करें।अगले दिनों में से एक दिन के लिए कमरे में रहने वालों की संख्या लाल (20% से कम) है। यह किस आधार पर है? क्या मुझे चिंतित होना चाहिए?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'जब कूलिंग यूनिट की क्षमता का 80% से अधिक उपयोग किया जाता है, तो अधिभोग लाल रंग में दिखाया जाता है। भविष्य के अधिभोग के बारे में जानकारी प्रत्येक उपयोगकर्ता द्वारा चेक-इन के समय स्टोरेज में नियोजित दिनों की संख्या के आधार पर घोषित की जाती है। सावधान रहें कि यह केवल एक अनुमान है और गलत हो सकता है। इस प्रकार, लाल कमरे का अधिभोग केवल एक संकेत है कि कमरा भर रहा है। आपको चिंता करने की आवश्यकता नहीं है, लेकिन आप तदनुसार कार्रवाई कर सकते हैं। उदाहरण के लिए, कूलिंग उपयोगकर्ताओं से संपर्क करने पर विचार करें जिनके भंडारण में वस्तु को लेने के लिए सबसे कम समय है, ताकि उन्हें जल्द ही चेक आउट करने की सलाह दी जा सके। जब आप लेने के समय के अनुसार ऑर्डर करते हैं, तो आप "डैशबोर्ड" के अंतर्गत चेक आउट करने के लिए सबसे ज़रूरी वस्तुओं की एक क्रमबद्ध सूची देख सकते हैं।',
    },
    {
      id: 48,
      title:
        "जब कूलिंग यूनिट की क्षमता का 80% से अधिक उपयोग किया जाता है, तो अधिभोग लाल रंग में दिखाया जाता है। भविष्य के अधिभोग के बारे में जानकारी प्रत्येक उपयोगकर्ता द्वारा चेक-इन के समय स्टोरेज में नियोजित दिनों की संख्या के आधार पर घोषित की जाती है। सावधान रहें कि यह केवल एक अनुमान है और गलत हो सकता है। इस प्रकार, लाल कमरे का अधिभोग केवल एक संकेत है कि कमरा भर रहा है। आपको चिंता करने की आवश्यकता नहीं है, लेकिन आप तदनुसार कार्रवाई कर सकते हैं। उदाहरण के लिए, कूलिंग उपयोगकर्ताओं से संपर्क करने पर विचार करें, जिनके भंडारण में वस्तु को लेने के लिए सबसे कम समय है, ताकि उन्हें जल्द ही चेक आउट करने की सलाह दी जा सके। जब आप लेने के समय के अनुसार ऑर्डर करते हैं, तो आप 'डैशबोर्ड' के अंतर्गत चेक आउट करने के लिए सबसे ज़रूरी वस्तुओं की एक क्रमबद्ध सूची देख सकते हैं।कूलिंग यूजर कमरे में ऐसी वस्तु ला रहा है जो सूची में नहीं है। क्या मैं फिर भी उसे चेक इन कर सकता हूँ?",
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: '12 घंटे से अधिक समय तक सेंसर से डेटा प्राप्त नहीं करने के बाद अधिसूचना भेजी जाती है, और इसका मतलब है कि "कूलिंग यूनिट्स"> "रूम कंडीशंस" पैनल में सेट तापमान का अब उपयोग किया जा रहा है। ऐप हर 1 घंटे में सेंसर को फिर से कनेक्ट करने का प्रयास करेगा, इस प्रकार हम कुछ घंटों तक प्रतीक्षा करने की सलाह देते हैं यदि यह एक कनेक्टिविटी समस्या है। यदि कई घंटों या दिनों के लिए कोई नया सेंसर डेटा नहीं है, तो समस्या हार्डवेयर पक्ष में हो सकती है, उदाहरण के लिए, सेंसर की बैटरी समाप्त हो सकती है।',
    },
    {
      id: 49,
      title:
        "ज़रूर, इस मामले में आप कमोडिटी सूची से 'अन्य' का चयन करके जाँच शुरू कर सकते हैं। 'अतिरिक्त जानकारी' के अंतर्गत, आप कमोडिटी का नाम भी टाइप कर सकते हैं, जो आपको इसे फिर से खोजने में मदद करता है।डैशबोर्ड में, प्रत्येक आइटम के पास एक रंगीन पट्टी होती है। पट्टी का रंग क्या दर्शाता है?",
      role: [ERoles.EMPLOYEE],
      text: 'जब ऐप से कोई सेंसर कनेक्ट नहीं होता है, तो मॉडल लेने के लिए समय की गणना करने के लिए ऑपरेटर द्वारा निर्धारित तापमान पर निर्भर करता है। यही कारण है कि ऑपरेटर को प्रत्येक नए चेक इन और चेक आउट पर एक नया सेट तापमान इनपुट करने के लिए प्रेरित किया जाता है। मॉडल के सटीक होने के लिए, यह महत्वपूर्ण है कि तापमान अप-टू-डेट हो। कृपया इस महत्वपूर्ण कदम के बारे में अपनी कूलिंग इकाई के ऑपरेटरों को निर्देश दें।',
    },
    {
      id: 50,
      title:
        'रंग उठाने के समय से पहले बचे हुए दिनों को दर्शाता है। जब 2 दिन से कम समय होगा तो आपको बार लाल रंग में दिखाई देगा, 7 दिन से कम समय होने पर पीले रंग में और 7 दिन से अधिक समय होने पर हरे रंग में दिखाई देगा। ये मान प्रत्येक स्टोरेज आइटम के लिए विशिष्ट हैं और कूलिंग यूनिट में तापमान के आधार पर प्रतिदिन कई बार पुनर्गणना की जाती है। जब गणना के लिए कोई मॉडल उपलब्ध नहीं होता है, तो बार का रंग ग्रे होगा।मैंने सफलतापूर्वक चेक इन पूरा कर लिया है, लेकिन अभी भी डैशबोर्ड में आइटम नहीं देख पा रहा हूँ। क्यों?',
      role: [ERoles.OPERATOR],
      text: 'यदि कोई सेंसर नहीं है (या यदि वे ठीक से काम नहीं कर रहे हैं) तो यह पॉप अप आपके लिए कूलिंग रूम के सही सेट तापमान के बारे में ऐप को सूचित करने के लिए एक अनुस्मारक है। आपको जांचना चाहिए कि क्या पॉपअप में दर्शाया गया मान वही है जो आप कमरे के नियंत्रण कक्ष में पढ़ सकते हैं। यदि ऐसा नहीं है, तो आपको तापमान को अपडेट करना चाहिए। अन्यथा, आप चेक इन की पुष्टि कर सकते हैं और जारी रख सकते हैं। एक अद्यतन सेट तापमान होना मॉडल के लिए बहुत महत्वपूर्ण है जो गणना कर सके कितने दिनों मैं सामान निकलना है ।',
    },
    {
      id: 51,
      title:
        'डैशबोर्ड को अपडेट होने में कुछ समय लग सकता है। कृपया यह भी सत्यापित करें कि आप सही कूलिंग यूनिट देख रहे हैं। यदि आपको समस्या बार-बार दिखाई देती है, तो कृपया इसे app@yourvcca.org पर रिपोर्ट करें।मैंने सफलतापूर्वक चेक आउट पूरा कर लिया है लेकिन अभी भी डैशबोर्ड में आइटम देख पा रहा हूँ। क्यों?',
      role: [ERoles.OPERATOR],
      text: 'डैशबोर्ड को अपडेट होने में कुछ समय लग सकता है। कृपया यह भी सत्यापित करें कि आपने जो आइटम चेक-आउट किए हैं, वे सही हैं और आप सही कूलिंग यूनिट देख रहे हैं। यदि आपको समस्या दिखाई देती है, तो कृपया इसे app@yourvcca.org पर रिपोर्ट करें।',
    },
    {
      id: 52,
      title:
        'डैशबोर्ड को अपडेट होने में कुछ समय लग सकता है। कृपया यह भी सत्यापित करें कि आपने जो आइटम चेक-आउट किए हैं, वे सही हैं और आप सही कूलिंग यूनिट देख रहे हैं। यदि आपको समस्या दिखाई देती है, तो कृपया इसे app@yourvcca.org पर रिपोर्ट करें।मैं कैसे जांच सकता हूं कि तापमान सेंसर ठीक काम कर रहा है?',
      role: [ERoles.OPERATOR],
      text: 'ऐप को विकसित करने वाली टीम कूलिंग उपयोगकर्ताओं के बारे में कुछ बुनियादी जानकारी एकत्र कर रही है, जब वे पहली बार कमरे को बेसलाइन डेटा के रूप में उपयोग करना शुरू करते हैं, जिसकी तुलना ऐप द्वारा प्राप्त डेटा से की जाएगी। हमारा एकमात्र इरादा ऐप डिज़ाइन और ठंडे भंडारण के उपयोग में सुधार करना है।',
    },
    {
      id: 53,
      title:
        "पंजीकृत कर्मचारी द्वारा किसी दिए गए कूलिंग यूनिट से सेंसर कनेक्शन सक्षम करने के बाद, 'अधिक' -> 'कूलिंग यूनिट' > 'कमरे की स्थिति' पैनल में मैन्युअल तापमान इनपुट के लिए बटन ग्रे-आउट हो जाएगा। सेंसर डेटा हर 6 घंटे में प्राप्त किया जाता है, इसलिए यदि सेंसर ठीक से काम कर रहा है तो आपको प्रतिदिन कई बार नए बिंदुओं के साथ तापमान प्लॉट देखना चाहिए। जब कोई सेंसर 12 घंटे में डेटा नहीं भेजता है, तो कमरे के संचालकों और पंजीकृत कर्मचारियों को एक सूचना भेजी जाती है।मुझे सूचना मिली है कि सेंसर काम नहीं कर रहा है। मुझे क्या करना चाहिए?",
      role: [ERoles.OPERATOR],
      text: 'आपको एक कूलिंग उपयोगकर्ता से संपर्क करने के लिए कहा जाएगा, जिसने हाल ही में कमरे से कुछ उत्पाद की चेक आउट की है और यह पूछना है कि उन्होंने कमरे में संग्रहीत वस्तु को कहाँ और किस कीमत पर बेचा है। यह जानकारी प्रदान की गई बाजार कीमतों के पूर्वानुमानों की सटीकता को मान्य और सुधारने के लिए ऐप विकसित करने वाली टीम की मदद करेगी।',
    },
    {
      id: 54,
      title:
        "सेंसर से 12 घंटे से ज़्यादा समय तक डेटा न मिलने पर यह सूचना भेजी जाती है, और इसका मतलब है कि 'कूलिंग यूनिट' > 'कमरे की स्थिति' पैनल में सेट किया गया तापमान अब इस्तेमाल किया जा रहा है। ऐप हर 1 घंटे में सेंसर से फिर से जुड़ने की कोशिश करेगा, इसलिए अगर यह कनेक्टिविटी की समस्या है तो हम कुछ घंटे इंतज़ार करने की सलाह देते हैं। अगर कई घंटों या दिनों तक कोई नया सेंसर डेटा नहीं मिलता है, तो समस्या हार्डवेयर की तरफ़ हो सकती है, उदाहरण के लिए, सेंसर की बैटरी खत्म हो सकती है।यदि सेंसर ही नहीं हैं तो उठाने का समय कैसे गणना किया जा सकता है?",
      role: [ERoles.EMPLOYEE],
      text: 'ट्यूटोरियल और अक्सर पूछे जाने वाले प्रश्न अनुभाग की जाँच करना सुनिश्चित करें, क्योंकि उनमें ऐप के बारे में उपयोगी जानकारी होती है जो आपके प्रश्नों को स्पष्ट करने में मदद कर सकती है। अगर आप ऐप सपोर्ट टीम से संपर्क करना चाहते हैं, तो कृपया app@yourvcca.org पर एक ईमेल भेजें।',
    },
    {
      id: 55,
      title:
        'जब ऐप से कोई सेंसर कनेक्ट नहीं होता है, तो पिकअप के समय की गणना करने वाला मॉडल ऑपरेटर द्वारा निर्धारित तापमान पर निर्भर करता है। यही कारण है कि ऑपरेटर को हर नए चेक इन और चेक आउट पर एक नया सेट तापमान इनपुट करने के लिए कहा जाता है। मॉडल के सटीक होने के लिए, यह महत्वपूर्ण है कि तापमान अद्यतित हो। कृपया अपने कूलिंग यूनिट के ऑपरेटरों को इस महत्वपूर्ण चरण के बारे में निर्देश दें।हर बार जब मैं चेक-इन शुरू करता हूं, तो मुझे तापमान अलर्ट पॉपअप मिलता है। क्यों?',
      role: [ERoles.OPERATOR],
      text: 'ट्यूटोरियल और अक्सर पूछे जाने वाले प्रश्न अनुभाग की जाँच करना सुनिश्चित करें, क्योंकि उनमें ऐप के बारे में उपयोगी जानकारी होती है जो आपके प्रश्नों को स्पष्ट करने में मदद कर सकती है। यदि आपका प्रश्न अभी भी अनुत्तरित है, तो कृपया उस पंजीकृत कर्मचारी से संपर्क करें जिसे आप रिपोर्ट कर रहे हैं।',
    },
    {
      id: 56,
      title:
        'यह पॉप अप आपके लिए एक रिमाइंडर है कि आप कूलिंग रूम के सही सेट तापमान के बारे में ऐप को सूचित करें, अगर कोई सेंसर नहीं लगा है (या अगर वे ठीक से काम नहीं कर रहे हैं)। आपको यह जांचना चाहिए कि पॉपअप में दर्शाया गया मान वही है जो आप कमरे में कंट्रोल पैनल में पढ़ सकते हैं। अगर ऐसा नहीं है, तो आपको तापमान अपडेट करना चाहिए। अन्यथा, आप पुष्टि कर सकते हैं और चेक इन जारी रख सकते हैं। मॉडल के लिए अपडेट किया गया सेट तापमान होना बहुत महत्वपूर्ण है जो पिक अप करने के लिए समय की गणना सटीक करता है।हर बार जब मैं चेक-आउट पूरा करता हूं, तो मुझे तापमान अलर्ट पॉपअप मिलता है। क्यों?',
      role: [ERoles.EMPLOYEE],
      text: 'कृपया app@yourvcca.org पर एक ईमेल भेजकर ऐप सपोर्ट टीम को सूचित करें।',
    },
    {
      id: 57,
      title:
        "कूलिंग यूनिट का तापमान इस आधार पर सेट किया जाना चाहिए कि कौन सी वस्तुएँ भंडारण में हैं, क्योंकि अलग-अलग वस्तुओं का इष्टतम तापमान अलग-अलग होता है (आप नॉलेज हब में एक सिंहावलोकन देख सकते हैं)। चेक आउट पूरा होने के बाद दिखाई देने वाला पॉपअप कमरे में छोड़ी गई वस्तुओं का सारांश दिखाता है और आपको उनमें से प्रत्येक के लिए इष्टतम तापमान के बारे में सूचित करता है। इस तरह, आप इस बारे में एक सूचित निर्णय ले सकते हैं कि कमरे में तापमान बदला जाना चाहिए या नहीं। आप यह जानकारी 'अधिक' -> 'कूलिंग यूनिट' -> 'क्रेट जानकारी' पर जाकर भी पा सकते हैं।मुझे कूलिंग उपयोगकर्ता से प्रथम क्रेट में चेक-इन करने से पहले प्रश्नावली भरने के लिए क्यों कहना पड़ता है?",
      role: [ERoles.OPERATOR],
      text: 'कृपया उस पंजीकृत कर्मचारी से संपर्क करें जिसे आप रिपोर्ट कर रहे हैं और/या app@yourvcca.org पर एक ईमेल भेजकर ऐप सहायता टीम को सूचित करें।',
    },
    {
      id: 58,
      title:
        'ऐप विकसित करने वाली टीम कूलिंग उपयोगकर्ताओं के बारे में कुछ बुनियादी जानकारी एकत्र कर रही है, जब वे पहली बार कमरे का उपयोग करना शुरू करते हैं, तो बेसलाइन डेटा के रूप में जिसकी तुलना ऐप द्वारा प्राप्त डेटा से की जाएगी। इसका एकमात्र उद्देश्य ऐप डिज़ाइन और कोल्ड रूम उपयोग में सुधार करना है।ऐप पर पंजीकरण करते समय मुझे प्रश्नावली भरने की आवश्यकता क्यों है?',
      role: [ERoles.EMPLOYEE],
      text: 'ऐप सपोर्ट टीम इस ऐप का उपयोग करने के आपके अनुभव के बारे में सुनना पसंद करेगी और आपकी प्रतिक्रिया का स्वागत करती है, कृपया app@yourvcca.org पर एक ईमेल भेजें।',
    },
    {
      id: 60,
      title:
        'ऐप विकसित करने वाली टीम कूलिंग उपयोगकर्ताओं के बारे में कुछ बुनियादी जानकारी एकत्र कर रही है, जब वे पहली बार कमरे का उपयोग करना शुरू करते हैं, तो बेसलाइन डेटा के रूप में जिसकी तुलना ऐप द्वारा प्राप्त डेटा से की जाएगी। इसका एकमात्र उद्देश्य ऐप डिज़ाइन और कोल्ड रूम उपयोग में सुधार करना है।मुझे कूलिंग उपयोगकर्ताओं से प्रत्येक स्टोरेज आइटम के विक्रय मूल्य के बारे में पूछने की आवश्यकता क्यों है?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'आपको एक स्क्रीन पर ले जाया जाता है जहां आप बाजार मूल्य की भविष्यवाणी या तो प्लॉट या टेबल फॉर्मेट में देख सकते हैं। प्राइस ट्रेंड पेज पिछले महीने के डेटा और एक विशिष्ट बाजार और कमोडिटी के लिए 14 दिनों के पूर्वानुमान की कल्पना करने की अनुमति देता है। मूल्य रैंकिंग पृष्ठ उच्चतम से निम्नतम तक सभी बाजार मूल्य पूर्वानुमानों की कल्पना करने की अनुमति देता है, और राज्य, जिले, एक विशिष्ट बाजार और पूर्वानुमान विंडो द्वारा फ़िल्टर करने की संभावना के साथ।',
    },
    {
      id: 61,
      title:
        'आपको एक कूलिंग यूजर से संपर्क करने के लिए कहा जाएगा जिसने हाल ही में कमरे से कुछ उत्पाद चेक आउट किए हैं और यह पूछने के लिए कहा जाएगा कि उन्होंने कमरे में संग्रहीत आइटम को कहां और किस कीमत पर बेचा है। यह जानकारी ऐप विकसित करने वाली टीम को प्रदान किए गए बाजार मूल्य पूर्वानुमानों की सटीकता को सत्यापित करने और सुधारने में मदद करेगी।मुझे ऐप के कुछ हिस्से समझ में नहीं आ रहे हैं। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ट्यूटोरियल और FAQ सेक्शन को अवश्य देखें, क्योंकि उनमें ऐप के बारे में उपयोगी जानकारी है जो आपके प्रश्नों को स्पष्ट करने में मदद कर सकती है। यदि आप ऐप सहायता टीम से संपर्क करना चाहते हैं, तो कृपया app@yourvcca.org पर ईमेल भेजें।',
    },
    {
      id: 62,
      title:
        'ट्यूटोरियल और FAQ सेक्शन को अवश्य देखें, क्योंकि उनमें ऐप के बारे में उपयोगी जानकारी है जो आपके प्रश्नों को स्पष्ट करने में मदद कर सकती है। यदि आप ऐप सहायता टीम से संपर्क करना चाहते हैं, तो कृपया app@yourvcca.org पर ईमेल भेजें।मुझे ऐप के कुछ हिस्से समझ में नहीं आ रहे हैं। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'एक मशीन लर्निंग मॉडल को ऐतिहासिक बाजार मूल्य डेटा और अन्य डेटा जैसे मुद्रा रूपांतरण दर और पेट्रोल की कीमत पर प्रशिक्षित किया जाता है, ताकि भविष्य की बाजार कीमतों का पूर्वानुमान लगाया जा सके।',
    },
    {
      id: 66,
      title:
        'ट्यूटोरियल और FAQ सेक्शन को अवश्य देखें, क्योंकि उनमें ऐप के बारे में उपयोगी जानकारी है जो आपके प्रश्नों को स्पष्ट करने में मदद कर सकती है। यदि आपका प्रश्न अभी भी अनुत्तरित है, तो कृपया उस पंजीकृत कर्मचारी से संपर्क करें जिसे आप रिपोर्ट कर रहे हैं।मुझे ऐप के कुछ हिस्से समझ में नहीं आ रहे हैं। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.COOLING_USER],
      text: 'आप "बाद में पूर्ण करें" पर क्लिक करके सर्वेक्षण के प्रश्नों को छोड़ सकते हैं। आप सर्वेक्षण को अपने खाता विवरण के हिस्से के रूप में पाएंगे और इसे कभी भी पूरा कर सकते हैं। हालांकि, जब आप कमरे का उपयोग करना शुरू करते हैं तो सर्वेक्षण के सवालों का पूरी तरह से जवाब देने के लिए समय निकालने की सिफारिश की जाती है: इस तरह आप कोल्डिवेट ऐप के साथ अधिक अनुरूप अनुभव प्राप्त कर सकते हैं!',
    },
    {
      id: 67,
      title:
        'ट्यूटोरियल और FAQ सेक्शन को अवश्य देखें, क्योंकि उनमें ऐप के बारे में उपयोगी जानकारी है जो आपके प्रश्नों को स्पष्ट करने में मदद कर सकती है। यदि आपका प्रश्न अभी भी अनुत्तरित है, तो कृपया कोल्ड रूम के ऑपरेटर से संपर्क करें, या app@yourvcca.org पर लिखेंमुझे ऐप में एक बग मिला है। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.COOLING_USER],
      text: 'कृपया सुनिश्चित करें कि आपके पास ऐप का नवीनतम संस्करण इंस्टॉल है। यदि समस्या बनी रहती है, तो कृपया app@yourvcca.org पर ईमेल भेजकर या फ़ीडबैक फ़ॉर्म भरकर ऐप सहायता टीम को सूचित करें: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 68,
      title:
        'कृपया सुनिश्चित करें कि आपके पास ऐप का नवीनतम संस्करण इंस्टॉल है। यदि समस्या बनी रहती है, तो कृपया app@yourvcca.org पर ईमेल भेजकर या फ़ीडबैक फ़ॉर्म भरकर ऐप सहायता टीम को सूचित करें: https://forms.gle/ceohKHT2QCcE3rFs5.ऐप में कुछ ठीक से काम नहीं कर रहा है। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.OPERATOR],
      text: 'यदि कमरे में तापमान संवेदक हैं जो Coldtivate ऐप से जुड़े हो सकते हैं, तो कृपया अपने जिम्मेदार से संपर्क करें। केवल एक पंजीकृत कर्मचारी भूमिका वाला उपयोगकर्ता सेंसर को कोल्डिवेट में बनाई गई कूलिंग इकाइयों से जोड़ सकता है।',
    },
    {
      id: 69,
      title:
        'कृपया सुनिश्चित करें कि आपके पास ऐप का नवीनतम संस्करण इंस्टॉल है। यदि समस्या बनी रहती है, तो कृपया उस पंजीकृत कर्मचारी से संपर्क करें जिसे आप रिपोर्ट कर रहे हैं और / या app@yourvcca.org पर ईमेल भेजकर या फीडबैक फॉर्म भरकर ऐप सहायता टीम को सूचित करें: https://forms.gle/2gKVzZjkJSPqEAan9.ऐप में कुछ ठीक से काम नहीं कर रहा है। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.COOLING_USER],
      text: 'कृपया सुनिश्चित करें कि आपके पास ऐप का नवीनतम संस्करण इंस्टॉल है। यदि समस्या बनी रहती है, तो कृपया कोल्ड रूम के ऑपरेटर से संपर्क करें और / या app@yourvcca.org पर ईमेल भेजकर ऐप सहायता टीम को सूचित करें।',
    },
    {
      id: 70,
      title:
        'कृपया सुनिश्चित करें कि आपके पास ऐप का नवीनतम संस्करण इंस्टॉल है। यदि समस्या बनी रहती है, तो कृपया कोल्ड रूम के ऑपरेटर से संपर्क करें और / या app@yourvcca.org पर ईमेल भेजकर ऐप सहायता टीम को सूचित करें।मैं ऐप के साथ अपने अनुभव के बारे में प्रतिक्रिया देना चाहता हूँ। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.COOLING_USER],
      text: 'लेने का समय एक अनुमानित मूल्य है। इस प्रकार, दुर्लभ मामले हो सकते हैं, जहां उत्पादन खराब हो जाता है, जबकि लेने का समय 0 से बड़ा होता है। चूंकि ताजा उपज का गुणवत्ता क्षय काफी हद तक तापमान पर निर्भर करता है, तापमान डेटा भविष्यवाणी को अधिक सटीक बनाने में मदद करता है। उदाहरण के लिए, समस्या तब उत्पन्न हो सकती है जब ऐप से कोई तापमान सेंसर जुड़ा न हो, और ऑपरेटर ने ऐप में कमरे के तापमान को नियमित रूप से अपडेट नहीं किया हो। ऐसा होने की स्थिति में कृपया रूम के संचालक को सूचित करें।',
    },
    {
      id: 71,
      title:
        ' ऐप सहायता टीम इस ऐप का उपयोग करने के आपके अनुभव के बारे में सुनना पसंद करेगी और आपकी प्रतिक्रिया का स्वागत करती है, कृपया app@yourvcca.org पर एक ईमेल भेजें या फ़ॉर्म के माध्यम से अपनी प्रतिक्रिया सबमिट करें:https://forms.gle/ceohKHT2QCcE3rFs5 .मैं ऐप के साथ अपने अनुभव के बारे में प्रतिक्रिया देना चाहता हूँ। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.COOLING_USER],
      text: 'ऐप को विकसित करने वाली टीम कूलिंग उपयोगकर्ताओं के बारे में कुछ बुनियादी जानकारी एकत्र कर रही है, जब वे पहली बार कमरे को बेसलाइन डेटा के रूप में उपयोग करना शुरू करते हैं, जिसकी तुलना ऐप द्वारा प्राप्त डेटा से की जाएगी। हमारा एकमात्र इरादा ऐप डिज़ाइन और ठंडे भंडारण के उपयोग में सुधार करना है।',
    },
    {
      id: 73,
      title:
        'ऐप सहायता टीम इस ऐप का उपयोग करने के आपके अनुभव के बारे में सुनना पसंद करेगी और आपकी प्रतिक्रिया का स्वागत करती है, कृपया app@yourvcca.org पर एक ईमेल भेजें या फ़ॉर्म के माध्यम से अपनी प्रतिक्रिया सबमिट करें:https://forms.gle/2gKVzZjkJSPqEAan9.मैं ऐप के साथ अपने अनुभव के बारे में प्रतिक्रिया देना चाहता हूँ। मुझे किससे संपर्क करना चाहिए?',
      role: [ERoles.COOLING_USER],
      text: 'ट्यूटोरियल और अक्सर पूछे जाने वाले प्रश्न अनुभाग की जाँच करना सुनिश्चित करें, क्योंकि उनमें ऐप के बारे में उपयोगी जानकारी होती है जो आपके प्रश्नों को स्पष्ट करने में मदद कर सकती है। यदि आपका प्रश्न अभी भी अनुत्तरित है, तो कृपया कोल्ड रूम के संचालक से संपर्क करें, या app@yourvcca.org पर लिखें',
    },
    {
      id: 74,
      title:
        'ऐप सहायता टीम इस ऐप का उपयोग करने के आपके अनुभव के बारे में सुनना पसंद करेगी और आपकी प्रतिक्रिया का स्वागत करेगी, कृपया app@yourvcca.org पर एक ईमेल भेजें।मैं ऐसे क्षेत्र में हूं जहां इंटरनेट कनेक्शन कम है: क्या मैं फिर भी ऐप का उपयोग कर सकता हूं?',
      role: [ERoles.COOLING_USER],
      text: 'कृपया सुनिश्चित करें कि आपके पास ऐप का नवीनतम संस्करण इंस्टॉल है। यदि समस्या बनी रहती है, तो कृपया कोल्ड रूम के संचालक से संपर्क करें और / या app@yourvcca.org पर एक ईमेल भेजकर ऐप सपोर्ट टीम को सूचित करें।',
    },
    {
      id: 75,
      title:
        "वर्तमान में, केवल नॉलेज हब अनुभाग ऑफ़लाइन उपलब्ध है। डैशबोर्ड और मार्केटप्लेस में जानकारी अभी भी दिखाई दे सकती है, लेकिन कनेक्टिविटी न होने की स्थिति में यह गलत हो सकती है। हम अनुशंसा करते हैं कि कनेक्शन स्थिर होने पर फिर से जाँच करें।'फसल मूल्य' आइकन पर क्लिक करने पर कौन से मूल्य प्रदर्शित होते हैं?",
      role: [ERoles.EMPLOYEE],
      text: 'अपने खाते को हटाने के लिए आप "मेनू" -> "खाता विवरण" पर नेविगेट कर सकते हैं और हटाएं पर क्लिक कर सकते हैं। कृपया सावधान रहें, यह क्रिया पूर्ववत नहीं की जा सकती! यदि आप कंपनी के अंतिम पंजीकृत कर्मचारी हैं, तो यह कार्रवाई कंपनी को हटा देगी। यदि लंबित चेकइन हैं, तो आप अपने खाते को तब तक नहीं हटा पाएंगे जब तक कि आपके किसी एक ऑपरेटर द्वारा ऐप में सभी क्रेट चेक-आउट नहीं कर दिए जाते।',
    },
    {
      id: 76,
      title: "'फसल मूल्य' अनुभाग में कुछ राज्य और बाज़ार क्यों गायब हैं?",
      role: [ERoles.OPERATOR],
      text: 'अपने खाते को हटाने के लिए आप "मेनू" -> "खाता विवरण" पर नेविगेट कर सकते हैं और हटाएं पर क्लिक कर सकते हैं। कृपया सावधान रहें, यह क्रिया पूर्ववत नहीं की जा सकती! यदि आप उन कमरों में से किसी एक को निर्दिष्ट अंतिम ऑपरेटर हैं, जहां खुले चेक-इन हैं, तो आप अपना खाता तब तक नहीं हटा सकते जब तक कि कोई पंजीकृत कर्मचारी कमरे के लिए कोई अन्य ऑपरेटर निर्दिष्ट नहीं करता है, या ऐप में सभी क्रेट चेक-आउट नहीं कर दिए जाते हैं।',
    },
    {
      id: 77,
      title: 'भावी बाजार मूल्यों की गणना कैसे की जाती है?',
      role: [ERoles.COOLING_USER],
      text: 'अपने खाते को हटाने के लिए आप "मेनू" -> "खाता विवरण" पर नेविगेट कर सकते हैं और हटाएं पर क्लिक कर सकते हैं। कृपया सावधान रहें, यह क्रिया पूर्ववत नहीं की जा सकती! यदि आपके पास किसी भी कमरे में खुला चेक-इन है, तो आप अपना खाता तब तक नहीं हटा सकते जब तक कि सभी क्रेट कमरों से चेक-आउट नहीं हो जाते। कृपया कमरे में अपने टोकरे इकट्ठा करना सुनिश्चित करें! यदि आपको लगता है कि ऐप में लंबित क्रेट हैं जिन्हें आपने पहले ही हटा दिया है, तो कृपया इसे हल करने के लिए कमरे के संचालक से संपर्क करें।',
    },
    {
      id: 78,
      title:
        'भविष्य के बाजार मूल्यों का पूर्वानुमान लगाने के लिए मशीन लर्निंग मॉडल को ऐतिहासिक बाजार मूल्य डेटा और अन्य डेटा जैसे मुद्रा रूपांतरण दर और पेट्रोल मूल्य पर प्रशिक्षित किया जाता है।मैं अपना खाता हटाना चाहता हूँ। मुझे क्या करना चाहिए?',
      role: [ERoles.EMPLOYEE],
      text: 'आप "मेन्यू" -> "मैनेजमेंट" -> "कूलिंग यूनिट" / "लोकेशन" में जाकर "डिलीट" पर क्लिक करके कूलिंग यूनिट्स और लोकेशन्स को डिलीट कर सकते हैं। आप ऐसा तभी कर पाएंगे जब कमरों में कोई चेक-इन लंबित न हो। अन्यथा, कृपया कमरे और स्थानों को हटाने का प्रयास करने से पहले ऑपरेटरों को चेक-आउट पूरा करने के लिए सूचित करें।',
    },
    {
      id: 79,
      title:
        "अपना खाता हटाने के लिए आप 'मेनू' -> 'खाता विवरण' पर जा सकते हैं, और हटाएं पर क्लिक कर सकते हैं। कृपया सावधान रहें, इस क्रिया को उलटा नहीं किया जा सकता है! यदि आप कंपनी के अंतिम पंजीकृत कर्मचारी हैं, तो यह क्रिया कंपनी को हटा देगी। यदि चेकइन लंबित हैं, तो आप तब तक अपना खाता नहीं हटा पाएंगे जब तक कि आपके किसी ऑपरेटर द्वारा ऐप में सभी क्रेट चेक-आउट नहीं कर दिए जाते।मैं अपना खाता हटाना चाहता हूँ। मुझे क्या करना चाहिए?",
      role: [ERoles.EMPLOYEE],
      text: 'आपको ऐप से अन्य उपयोगकर्ताओं को हटाने की अनुमति नहीं है। हालांकि, आप "मेन्यू" -> "प्रबंधन" -> "ऑपरेटर्स" पर नेविगेट करके अपने कमरों से ऑपरेटरों को अनअसाइन कर सकते हैं। यदि आप अभी भी उपयोगकर्ता को पूरी तरह से हटाना चाहते हैं ताकि उनकी आपकी कंपनी तक पहुंच न हो, तो कृपया app@yourvcca.org पर एक ईमेल लिखें और बताएं कि इसकी आवश्यकता क्यों है।',
    },
    {
      id: 80,
      title:
        "अपना खाता हटाने के लिए आप 'मेनू' -> 'खाता विवरण' पर जा सकते हैं, और हटाएं पर क्लिक कर सकते हैं। कृपया सावधान रहें, इस क्रिया को उलटा नहीं किया जा सकता है! यदि आप उन कमरों में से किसी एक के लिए नियुक्त अंतिम ऑपरेटर हैं जहाँ खुले चेक-इन हैं, तो आप अपना खाता तब तक नहीं हटा सकते जब तक कि कोई पंजीकृत कर्मचारी कमरे में किसी अन्य ऑपरेटर को नियुक्त न कर दे, या ऐप में सभी क्रेट चेक-आउट न हो जाएँ।मैं अपना खाता हटाना चाहता हूँ। मुझे क्या करना चाहिए?",
      role: [ERoles.OPERATOR],
      text: 'कूलिंग यूजर को सूची से हटाने के लिए, "मैनेजमेंट" -> "कूलिंग यूजर्स" पर नेविगेट करें, कूलिंग यूजर नेम पर क्लिक करें और फिर "डिलीट" बटन पर क्लिक करें। कृपया ध्यान दें कि केवल उन उपयोगकर्ताओं को हटाया जा सकता है जिनके पास कोई चेक-इन लंबित नहीं है! यदि चेक-इन लंबित हैं, तो कृपया उत्पाद लेने के लिए उपयोगकर्ता से संपर्क करें। ध्यान दें कि इस क्रिया को पूर्ववत नहीं किया जा सकता है! यदि उपयोगकर्ता के पास स्मार्टफोन है, तो यह ऑपरेशन उसे आपकी सूची से हटा देगा, लेकिन उपयोगकर्ता अभी भी कोल्ड्टिवेट का उपयोग करने में सक्षम होगा। यदि उपयोगकर्ता के पास स्मार्टफोन नहीं है, तो यह ऑपरेशन उसके खाते को हटा देता है और संबंधित फोन नंबर को मुक्त कर देता है।',
    },
    {
      id: 81,
      title:
        "अपना खाता हटाने के लिए आप 'मेनू' -> 'खाता विवरण' पर जा सकते हैं, और हटाएं पर क्लिक कर सकते हैं। कृपया सावधान रहें, इस क्रिया को उलटा नहीं किया जा सकता है! यदि आपके पास किसी भी कमरे में खुले चेक-इन हैं, तो आप अपना खाता तब तक नहीं हटा सकते जब तक कि सभी क्रेट कमरों से चेक-आउट न हो जाएं। कृपया अपने क्रेट कमरे में ही लेना सुनिश्चित करें! यदि आपको लगता है कि ऐप में ऐसे क्रेट लंबित हैं जिन्हें आपने पहले ही हटा दिया है, तो कृपया इसे सुलझाने के लिए कमरे के ऑपरेटर से संपर्क करें।मैं किसी कूलिंग यूनिट या स्थान को कैसे हटा सकता हूँ?",
      role: [ERoles.EMPLOYEE],
      text: 'आखिरी बार ऑपरेटरों और अन्य पंजीकृत कर्मचारियों ने ऐप में लॉग इन किया है, यह देखने के लिए, आप "मेनू" -> "प्रबंधन" -> "ऑपरेटर" / "पंजीकृत कर्मचारी" पर नेविगेट कर सकते हैं। नाम के आगे आप जो दिनांक और समय देखते हैं, वह अंतिम लॉगिन दिनांक और समय है।',
    },
    {
      id: 82,
      title:
        "आप 'मेनू' -> 'प्रबंधन' -> 'कूलिंग यूनिट' / 'स्थान' पर जाकर और हटाएं पर क्लिक करके कूलिंग यूनिट और स्थान हटा सकते हैं। आप ऐसा तभी कर पाएंगे जब कमरों में कोई लंबित चेक-इन न हो। अन्यथा, कृपया कमरे और स्थान हटाने का प्रयास करने से पहले ऑपरेटरों को चेक-आउट पूरा करने के लिए सूचित करें।मैं अपनी कंपनी से किसी अन्य पंजीकृत कर्मचारी या ऑपरेटर को कैसे हटा सकता हूं?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'आपको ऐप से अन्य उपयोगकर्ताओं को हटाने की अनुमति नहीं है। हालाँकि, आप "मेनू" -> "प्रबंधन" -> "ऑपरेटर" पर जाकर अपने कमरों से ऑपरेटरों को हटा सकते हैं। यदि आप अभी भी उपयोगकर्ता को पूरी तरह से हटाना चाहते हैं ताकि उन्हें आपकी कंपनी तक पहुँच न मिले, तो कृपया app@yourvcca.org पर एक ईमेल लिखें और बताएं कि इसकी आवश्यकता क्यों है।',
    },
    {
      id: 83,
      title:
        "आपको ऐप से अन्य उपयोगकर्ताओं को हटाने की अनुमति नहीं है। हालाँकि, आप 'मेनू' -> 'प्रबंधन' -> 'ऑपरेटर' पर जाकर अपने कमरों से ऑपरेटरों को हटा सकते हैं। यदि आप अभी भी उपयोगकर्ता को पूरी तरह से हटाना चाहते हैं ताकि उन्हें आपकी कंपनी तक पहुँच न मिले, तो कृपया app@yourvcca.org पर एक ईमेल लिखें और बताएं कि इसकी आवश्यकता क्यों है।मैं किसी कूलिंग उपयोगकर्ता को सूची से कैसे हटा सकता हूँ?",
      role: [ERoles.COOLING_USER],
      text: 'डैशबोर्ड में किसी आइटम पर क्लिक करके, आप उस ऑपरेटर का नाम और संपर्क नंबर देख सकते हैं जिसने आपके लिए चेक इन किया था। आप नंबर को क्लिपबोर्ड पर कॉपी कर सकते हैं और ऑपरेटर से प्रति फोन या एसएमएस पर संपर्क कर सकते हैं।',
    },
    {
      id: 84,
      title:
        "किसी कूलिंग यूजर को सूची से हटाने के लिए, 'प्रबंधन' -> 'कूलिंग यूजर' पर जाएँ, कूलिंग यूजर नाम पर क्लिक करें और फिर 'हटाएँ' बटन पर क्लिक करें। कृपया ध्यान दें कि केवल ऐसे यूजर को ही हटाया जा सकता है जिनके पास कोई लंबित चेक-इन नहीं है! यदि कोई लंबित चेक-इन है, तो कृपया उत्पाद लेने के लिए यूजर से संपर्क करें। ध्यान दें कि इस क्रिया को उलटा नहीं किया जा सकता है! यदि यूजर के पास स्मार्टफोन है, तो यह ऑपरेशन उसे आपकी सूची से हटा देगा, लेकिन यूजर अभी भी कोल्डटिवेट का उपयोग करने में सक्षम होगा। यदि यूजर के पास कोई स्मार्टफोन नहीं है, तो यह ऑपरेशन उसके खाते को हटा देता है और संबंधित फोन नंबर को मुक्त कर देता है।मैं यह कहां देख सकता हूं कि ऑपरेटरों ने हाल ही में ऐप का उपयोग किया है या नहीं?",
      role: [ERoles.COOLING_USER],
      text: 'यह देखने के लिए कि ऑपरेटर और अन्य पंजीकृत कर्मचारी आखिरी बार कब ऐप में लॉग इन हुए हैं, आप "मेनू" -> "प्रबंधन" -> "ऑपरेटर" / "पंजीकृत कर्मचारी" पर जा सकते हैं। नाम के आगे आपको जो तारीख और समय दिखाई देगा, वह आखिरी लॉग इन की तारीख और समय है।',
    },
    {
      id: 85,
      title:
        "यह देखने के लिए कि ऑपरेटर और अन्य पंजीकृत कर्मचारियों ने आखिरी बार कब ऐप में लॉग इन किया है, आप 'मेनू' -> 'प्रबंधन' -> 'ऑपरेटर' / 'पंजीकृत कर्मचारी' पर जा सकते हैं। नाम के आगे आपको जो तारीख और समय दिखाई देता है, वह आखिरी लॉग इन की तारीख और समय है।मैं प्रत्येक कमरे से उत्पन्न राजस्व और अन्य उपयोग के आंकड़ों की निगरानी कहां कर सकता हूं?",
      role: [ERoles.COOLING_USER],
      text: 'आप "मेनू" -> "प्रबंधन" -> "राजस्व विश्लेषण" पर जा सकते हैं, कूलिंग इकाइयों और रुचि के समय अंतराल का चयन कर सकते हैं, और आप इन कमरों से चेक-आउट से जुड़े कुल राजस्व को देखेंगे। आप कूलिंग उपयोगकर्ता, भुगतान विधि और समय के अनुसार भी फ़िल्टर कर सकते हैं। प्रति कमरे अपने चेक-इन के सारांश सांख्यिकी (उपयोगकर्ताओं की संख्या, क्रेटों की कुल संख्या, आदि) को देखने के लिए, आप "मेनू" -> "प्रबंधन" -> "उपयोग विश्लेषण" पर जा सकते हैं। साथ ही यहाँ आप तिथि और कूलिंग इकाई के अनुसार फ़िल्टर कर सकते हैं। दोनों पृष्ठों में, जानकारी एक्सेल फ़ाइलों के रूप में डाउनलोड की जा सकती है। "विश्लेषण" टैब में, आप उपयोगकर्ताओं, राजस्व, उपयोग और प्रभाव के बारे में जानकारी के साथ एक डैशबोर्ड पा सकते हैं। अंत में, कमरे में वर्तमान में फसलों के लिए क्रेटों की कुल संख्या, वजन और इष्टतम तापमान की निगरानी करने के लिए, आप "अधिक" -> "कूलिंग इकाइयाँ" -> "क्रेट जानकारी" पर जा सकते हैं।',
    },
    {
      id: 86,
      title:
        "आप 'मेनू' -> 'प्रबंधन' -> 'राजस्व विश्लेषण' पर जा सकते हैं, कूलिंग इकाइयों और रुचि के समय अंतराल का चयन कर सकते हैं, और आप इन कमरों से चेक-आउट से जुड़े कुल राजस्व को देखेंगे। आप कूलिंग उपयोगकर्ता, भुगतान विधि और समय के अनुसार भी फ़िल्टर कर सकते हैं। प्रति कमरे अपने चेक-इन के सारांश सांख्यिकी (उपयोगकर्ताओं की संख्या, क्रेटों की कुल संख्या, आदि) को देखने के लिए, आप 'मेनू' -> 'प्रबंधन' -> 'उपयोग विश्लेषण' पर जा सकते हैं। साथ ही यहाँ आप तिथि और कूलिंग इकाई के अनुसार फ़िल्टर कर सकते हैं। दोनों पृष्ठों में, जानकारी एक्सेल फ़ाइलों के रूप में डाउनलोड की जा सकती है। 'विश्लेषण' टैब में, आप उपयोगकर्ताओं, राजस्व, उपयोग और प्रभाव के बारे में जानकारी के साथ एक डैशबोर्ड पा सकते हैं। अंत में, कमरे में वर्तमान में फसलों के लिए क्रेटों की कुल संख्या, वजन और इष्टतम तापमान की निगरानी करने के लिए, आप 'अधिक' -> 'कूलिंग इकाइयाँ' -> 'क्रेट जानकारी' पर जा सकते हैं।मैं कैसे पता लगा सकता हूं कि उस शीतलन इकाई का संपर्क व्यक्ति कौन है जहां मेरा उत्पाद संग्रहीत है?",
      role: [ERoles.OPERATOR],
      text: 'ऐप सपोर्ट टीम इस ऐप का उपयोग करने के आपके अनुभव के बारे में सुनना पसंद करेगी और आपकी प्रतिक्रिया का स्वागत करती है, कृपया app@yourvcca.org पर एक ईमेल भेजें।',
    },
    {
      id: 87,
      title:
        'डैशबोर्ड में किसी आइटम पर क्लिक करके, आप उस ऑपरेटर का नाम और संपर्क नंबर देख सकते हैं जिसने आपके लिए चेक इन किया था। आप नंबर को क्लिपबोर्ड पर कॉपी कर सकते हैं और फ़ोन या एसएमएस के ज़रिए ऑपरेटर से संपर्क कर सकते हैं।मुझे एक सूचना मिली है। मुझे क्या करना चाहिए?',
      role: [ERoles.COOLING_USER],
      text: 'ऐप सपोर्ट टीम इस ऐप का उपयोग करने के आपके अनुभव के बारे में सुनना पसंद करेगी और आपकी प्रतिक्रिया का स्वागत करती है, कृपया app@yourvcca.org पर एक ईमेल भेजें।',
    },
    {
      id: 88,
      title:
        "आपको विभिन्न प्रकार की सूचनाएँ प्राप्त हो सकती हैं: सबसे पहले, ऐप आपको इस तथ्य के बारे में सूचित कर सकता है कि आपके द्वारा संग्रहीत कुछ क्रेट खराब होने वाले हैं। हम आपको सलाह देते हैं कि आप जितनी जल्दी हो सके कमरे से क्रेट इकट्ठा करें। आपको प्राप्त होने वाली एक और सूचना आपको भंडारण के बाद के बाजार सर्वेक्षण या बेसलाइन सर्वेक्षण को पूरा करने की याद दिलाने के लिए है। आप सर्वेक्षणों तक पहुँचने के लिए अधिसूचना पर क्लिक कर सकते हैं। हम जो जानकारी एकत्र करते हैं, वह कोल्ड्टीवेट टीम के लिए बहुत मूल्यवान है, ताकि उत्पाद को बाहर संग्रहीत करने की तुलना में कोल्ड रूम का उपयोग करने के लाभ की निगरानी की जा सके। यदि आपके पास बाज़ार में 'बिक्री के लिए' सूचीबद्ध क्रेट हैं, तो आपको क्रेट बिकने पर भी सूचनाएँ प्राप्त होंगी, और यदि ऑपरेटर बिक्री मूल्य को अपडेट करता है। यदि आपने मूल्य परिवर्तन का अनुरोध नहीं किया है, तो कृपया तुरंत ऑपरेटर से बात करें।शीतलन इकाइयों के मानचित्र पर क्या प्रदर्शित किया गया है?",
      role: [ERoles.COOLING_USER],
      text: 'मानचित्र पर आप अपना स्थान देख सकते हैं (आपसे कोल्डटिवेट को आपके स्थान तक पहुँचने की अनुमति मांगी जाएगी), आपके आस-पास की कूलिंग इकाइयों का स्थान, और इकाइयों के बारे में कुछ जानकारी (एकल या बहु-वस्तु, कंपनी, मूल्य निर्धारण)। कोल्ड रूम में जाकर, आप यूनिट के संचालन और भंडारण के अवसर के बारे में कोल्ड रूम ऑपरेटर से अधिक जानकारी प्राप्त कर सकते हैं।',
    },
    {
      id: 89,
      title:
        'मानचित्र पर आप अपना स्थान देख सकते हैं (आपसे कोल्डटिवेट को आपके स्थान तक पहुँचने की अनुमति मांगी जाएगी), आपके आस-पास की कूलिंग इकाइयों का स्थान, और इकाइयों के बारे में कुछ जानकारी (एकल या बहु-वस्तु, कंपनी, मूल्य निर्धारण)। कोल्ड रूम में जाकर, आप यूनिट के संचालन और भंडारण के अवसर के बारे में कोल्ड रूम ऑपरेटर से अधिक जानकारी प्राप्त कर सकते हैं। मैं ऐप की भाषा कैसे बदल सकता हूँ?',
      role: [ERoles.AUTH],
      text: 'ऐप की भाषा बदलने के लिए, आप होमपेज के नीचे दिखाई देने वाले ड्रॉपडाउन पर क्लिक कर सकते हैं, या, एक बार जब आप अपनी प्रोफ़ाइल में लॉग इन हो जाएं, तो "मेनू" -> "खाता विवरण" -> "स्थानीयकरण प्राथमिकताएं" पर जाएं।',
    },
    {
      id: 90,
      title:
        'मेरा तापमान सेंसर प्रकार कोल्डटिवेट (इकोज़ेन, यूबीबॉट, फिगोर, विक्ट्रॉन एनर्जी) द्वारा समर्थित है। मैं सेंसर कैसे सेट कर सकता हूँ?',
      role: [ERoles.EMPLOYEE],
      text: 'सेंसर को कूलिंग यूनिट से कनेक्ट करने के लिए, आप "मेनू" -> "प्रबंधन" -> "कूलिंग यूनिट" पर जा सकते हैं, उस यूनिट का चयन करें जिसके लिए सेंसर सेट अप किया जाना चाहिए, और फिर "सेंसर उपलब्ध" टॉगल करें। आप प्रत्येक समर्थित सेंसर प्रकार के लिए निर्देश का पालन कर सकते हैं और प्रमाणित कर सकते हैं। सहेजे जाने वाले परिवर्तनों के लिए पृष्ठ के निचले भाग में "सहेजें" को देखना याद रखें। आपको अगले 6 घंटों में "अधिक" -> "कूलिंग यूनिट" -> "कमरे की स्थिति" के अंतर्गत अपने सेंसर से तापमान रीडिंग देखनी चाहिए।',
    },
    {
      id: 91,
      title: " एनालिटिक्स टैब में 'कंपनी', 'समेकित' और 'तुलना' दृश्य के बीच क्या अंतर है?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'नेविगेशन बार में एनालिटिक्स टैब सभी कंपनी कोल्ड रूम के लिए सारांश आँकड़े प्रदान करता है। "कंपनी" दृश्य में, आप कोल्डटिवेट का उपयोग शुरू करने के बाद से सभी कूलिंग इकाइयों के लिए उपयोगकर्ताओं, उपयोग और प्रभाव पर डेटा देखते हैं। "एग्रीगेटेड" पर क्लिक करके, आपको यह कॉन्फ़िगर करने के लिए कहा जाता है कि आप किस कूलिंग यूनिट और समय अवधि में रुचि रखते हैं। उपयोगकर्ताओं, उपयोग और प्रभाव के लिए प्रदर्शित डेटा को चुनी गई समय अवधि में चयनित कूलिंग यूनिट में एग्रीगेट किया जाता है। यदि आप इकाइयों में तुलना करना चाहते हैं, तो आप "तुलना" टैब का उपयोग कर सकते हैं। यहां, डेटा तालिकाओं में प्रदर्शित होता है, जहां चुनी गई समय अवधि में प्रत्येक कूलिंग यूनिट का डेटा प्रदर्शित होता है। आप डेटा को सॉर्ट कर सकते हैं और कूलिंग यूनिट और समय अवधि को कभी भी बदल सकते हैं।',
    },
    {
      id: 92,
      title: 'एनालिटिक्स टैब में प्रदर्शित डेटा की गणना कैसे की जाती है?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'एनालिटिक्स टैब का लक्ष्य कोल्ड रूम में क्या हो रहा है, इसका एक व्यापक दृश्य प्रस्तुत करना है। उपयोगकर्ता और उपयोग डेटा को कोल्ड्टीवेट में दर्ज चेक-इन और चेक-आउट जानकारी से परिकलित किया जाता है। इस प्रकार आप समझ सकते हैं कि कितने उपयोगकर्ता और संचालन किए गए हैं, और प्रत्येक कोल्ड रूम का राजस्व या औसत अधिभोग क्या है। दूसरी ओर, प्रभाव अनुभाग का डेटा सर्वेक्षणों पर आधारित है, जिसे कूलिंग उपयोगकर्ताओं को पंजीकरण के समय (यानी कोल्ड स्टोरेज का उपयोग शुरू करने से पहले) और नियमित रूप से कोल्ड रूम से उत्पाद चेक-आउट करते समय भरने के लिए कहा जाता है। यह डेटा कटाई के बाद होने वाले नुकसान और कूलिंग का उपयोग करने वाले उपयोगकर्ताओं के राजस्व के विकास का अनुमान लगाने के लिए महत्वपूर्ण है। अंत में, CO2 अनुमान कोल्ड रूम में संग्रहीत फसलों को ठंडा करने से जुड़े उत्सर्जन की तुलना उसी फसल द्वारा बिना रेफ्रिजरेटेड संग्रहीत किए जाने पर होने वाले अनुमानित उत्सर्जन से करता है।',
    },
    {
      id: 93,
      title: 'एनालिटिक्स टैब में प्रदर्शित डेटा की गणना कैसे की जाती है?',
      role: [ERoles.COOLING_USER],
      text: 'एनालिटिक्स टैब का लक्ष्य आपको अपनी फसलों पर शीतलन के प्रभाव का एक व्यापक दृश्य प्रदान करना है। "क्रेट" के अंतर्गत प्रदर्शित डेटा कोल्ड्टीवेट में दर्ज चेक-इन और चेक-आउट जानकारी से परिकलित किया जाता है। इस प्रकार आप यह जान सकते हैं कि आपने किस फसल को कितना संग्रहित किया और औसत संग्रहण समय क्या है। "प्रभाव" अनुभाग का डेटा सर्वेक्षणों पर आधारित है, जिन्हें आपको पंजीकरण करते समय (यानी कोल्ड स्टोरेज का उपयोग शुरू करने से पहले) और नियमित रूप से कोल्ड रूम से उपज की जांच करते समय भरने के लिए कहा जाता है। यह डेटा कटाई के बाद होने वाले नुकसान और राजस्व के विकास का अनुमान लगाने के लिए महत्वपूर्ण है क्योंकि आप शीतलन का उपयोग करते हैं। सर्वेक्षणों को भरने के लिए एक अनुस्मारक पृष्ठ के शीर्ष पर दिखाया गया है, और हम आपको जब भी संभव हो उन्हें भरने के लिए प्रोत्साहित करते हैं। दोनों अनुभागों में, आप विशिष्ट कोल्ड रूम या समय अवधि का चयन करने के लिए शीर्ष दाईं ओर "कॉन्फ़िगर" बटन का उपयोग कर सकते हैं। यदि कुछ भी नहीं चुना गया है, तो आप कोल्ड्टीवेट का उपयोग शुरू करने के बाद से उपलब्ध सभी डेटा देख सकते हैं।',
    },
    {
      id: 94,
      title: 'मैं लॉग इन करता हूँ लेकिन मुझे मार्केटप्लेस की कार्यक्षमता दिखाई नहीं देती। क्यों?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'यदि आपके देश में मार्केटप्लेस समर्थित है, तो आपको नीचे नेविगेशन बार में "मार्केटप्लेस" आइकन दिखाई देगा। यदि आप इसे नहीं देख पा रहे हैं, तो इसका मतलब है कि यह कार्यक्षमता आपके देश में समर्थित नहीं है। फिलहाल, मार्केटप्लेस केवल नाइजीरिया में रहने वाले उपयोगकर्ताओं के लिए उपलब्ध है। यदि आप एक पंजीकृत कर्मचारी हैं और अपने देश में मार्केटप्लेस का संचालन करने में रुचि रखते हैं, तो कृपया हमसे app@yourvcca.org पर संपर्क करें।',
    },
    {
      id: 95,
      title: ' बाजार में कूलिंग कंपनी की क्या भूमिका है?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'कूलिंग कंपनी और उसके कर्मचारी मार्केटप्लेस में अपनी भागीदारी का स्तर तय कर सकते हैं। चूंकि यह कार्यक्षमता कोल्ड्टीवेट ऐप में चेक-इन किए जाने वाले क्रेट पर निर्भर करती है, इसलिए मार्केटप्लेस तभी काम कर सकता है जब कोल्ड रूम ऑपरेटर नियमित रूप से ऐप में चेक-इन और चेक-आउट संचालन को पंजीकृत करता है। मार्केटप्लेस के माध्यम से खरीदी गई उपज के लिए, कूलिंग कंपनी डिजिटल लेनदेन के हिस्से के रूप में कूलिंग शुल्क प्राप्त कर रही है। इसलिए यह महत्वपूर्ण है कि पंजीकृत कर्मचारी कंपनी के बैंक खाते का विवरण सेट करे: ऐसा करने के लिए, आपको "मेनू" -> "प्रबंधन" -> "विक्रेता सेटिंग (कंपनी)" -> "भुगतान विकल्प" पर जाना चाहिए। इसके अलावा, कूलिंग कंपनियां किसानों से उपज खरीदने (खरीदार की भूमिका निभाते हुए) और फिर उन फसलों को मार्केटप्लेस में फिर से बेचने (विक्रेता की भूमिका निभाते हुए) का फैसला कर सकती हैं। दोनों लेन-देन कोल्ड्टीवेट मार्केटप्लेस के माध्यम से किए जा सकते हैं। ध्यान दें कि ऑपरेटर और पंजीकृत कर्मचारी दोनों के पास खुद के लिए (व्यक्तिगत रूप से) या जिस कंपनी का वे प्रतिनिधित्व करते हैं, उसकी ओर से खरीदने का विकल्प है।',
    },
    {
      id: 96,
      title: 'बाज़ार में कोल्ड रूम ऑपरेटर की भूमिका क्या है?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'बाज़ार में कोल्ड रूम संचालकों की तीन मुख्य भूमिकाएँ हैं। 1) वे स्मार्टफोन के बिना कूलिंग करने वाले उपयोगकर्ताओं को अपना बैंक खाता स्थापित करने (ताकि वे डिजिटल भुगतान प्राप्त कर सकें), अपने क्रेटों को "बिक्री के लिए" और उनकी कीमत सूचीबद्ध करने में मदद करते हैं। 2) वे कोल्ड रूम में उपज को इस सिद्धांत के अनुसार व्यवस्थित रखने के लिए जिम्मेदार होते हैं कि एक क्रेट में मौजूद सभी उपज एक ही उपयोगकर्ता की होती है: जब किसी क्रेट में से कुछ उपज खरीदी जाती है (और इस तरह एक अलग मालिक की होती है), तो संचालक को खरीदी गई उपज को एक अलग क्रेट में रखने के लिए एक अधिसूचना प्राप्त होती है। यदि एक पूरी क्रेट खरीद ली जाती है, तो कोई कार्रवाई की आवश्यकता नहीं है। 3) कोल्ड रूम संचालक सभी चेक-आउट कार्यों के लिए जिम्मेदार होते हैं, जिनमें बाज़ार से होने वाले चेक-आउट भी शामिल हैं: जब कोई खरीदार (या डिलीवरी प्रतिनिधि) खरीदी गई उपज को लेने के लिए कोल्ड रूम में आता है,',
    },
    {
      id: 97,
      title: 'बाज़ार में शीतलन शुल्क कैसे एकत्रित किया जाता है?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'जब बाज़ार में क्रेट खरीदे जाते हैं, तो उस दिन तक का कूलिंग शुल्क खरीदार द्वारा भुगतान की जा रही कीमत से काट लिया जाता है और कूलिंग कंपनी को हस्तांतरित कर दिया जाता है। इस तरह, विक्रेता को कूलिंग शुल्क का भुगतान नहीं करना पड़ता है, क्योंकि यह पहले से ही डिजिटल लेनदेन में किया जाता है। इस कारण से, यह महत्वपूर्ण है कि विक्रेता और कूलिंग कंपनियों दोनों के पास कोल्डटिवेट में एक बैंक खाता हो। उदाहरण के लिए, यदि एक क्रेट 20 USD में खरीदा जाता है, और विक्रेता पर कूलिंग शुल्क के 3 USD बकाया हैं, तो खरीदार द्वारा भुगतान किए गए 20 USD में से, 17 USD विक्रेता के बैंक खाते में स्थानांतरित किए जाएंगे, और 3 USD कूलिंग कंपनी के बैंक खाते में स्थानांतरित किए जाएंगे। यदि खरीदार खरीद के उसी दिन उपज लेने आता है, तो कोई अन्य कूलिंग शुल्क देय नहीं है (क्योंकि दैनिक शुल्क विक्रेता द्वारा पहले ही भुगतान किया जाता है)। हालाँकि, यदि खरीदार उपज को भंडारण में रखने का निर्णय लेता है, तो मानक कूलिंग शुल्क लागू होता है, और कीमत की गणना खरीदार द्वारा इसे लेने तक कोल्ड रूम में रखे जाने वाले दिनों की संख्या के आधार पर की जाएगी। चेक-आउट के समय इन कूलिंग फीस को इकट्ठा करने की जिम्मेदारी कोल्ड रूम ऑपरेटर की होती है। ध्यान दें कि डिलीवरी के मामले में भी यही तर्क लागू होता है।',
    },
    {
      id: 98,
      title: 'मैं बाज़ार में उपज बेचना कैसे शुरू कर सकता हूँ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'आपके क्रेट बिक्री के लिए उपलब्ध होने के लिए, आपको दो कार्य करने होंगे। 1) एक बैंक खाता खोलें, जहाँ राजस्व जमा किया जाएगा। यदि आपके पास स्मार्टफ़ोन है, तो आप "मेनू" -> "खाता विवरण" -> "भुगतान विकल्प" पर नेविगेट करके ऐसा कर सकते हैं। यदि आपके पास स्मार्टफ़ोन नहीं है, तो ऑपरेटर अपने इंटरफ़ेस ("प्रबंधन" -> "उपयोगकर्ताओं को ठंडा करना" -> "भुगतान विवरण") से बैंक खाते सेट कर सकता है। कृपया ध्यान दें कि चूँकि बाज़ार में सभी भुगतान डिजिटल रूप से किए जाते हैं, इसलिए आपको किसी भी चीज़ को "बिक्री के लिए" सूचीबद्ध करने से पहले एक वैध बैंक खाता प्रदान करना होगा। 2) यदि आपके पास स्मार्टफ़ोन है, तो क्रेट के किसी भी चेक-इन सेट के लिए, आप प्रत्येक डैशबोर्ड आइटम के दाईं ओर ">" चिह्न पर क्लिक कर सकते हैं, "क्रेट वजन और बाज़ार सूची" पर नेविगेट कर सकते हैं, सेट कर सकते हैं कि आप कौन से क्रेट को "बिक्री के लिए" सेट करना चाहते हैं और प्रति किलोग्राम कीमत। बाज़ार में उपभोक्ता इन क्रेट को देख पाएंगे, और संकेतित राशि पर खरीद पाएंगे। जब भी कोई खरीदारी पूरी होगी, आपको एक सूचना मिलेगी। अगर आपके पास स्मार्टफोन नहीं है, तो कोल्ड रूम ऑपरेटर चेक-इन करते समय या उसके बाद, उन्हीं चरणों का पालन करते हुए क्रेट को "बिक्री के लिए" सेट कर सकता है। अगर ऑपरेटर चेक-इन के बाद आपके सूचीबद्ध क्रेट या कीमत को अपडेट करता है, तो आपको एक एसएमएस प्राप्त होगा।',
    },
    {
      id: 99,
      title: 'क्या खरीदार मेरे संपर्क विवरण देख सकते हैं?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'आप खुद तय कर सकते हैं कि आपकी उपज खरीदने में रुचि रखने वाले ग्राहकों को आपका संपर्क विवरण देखने में सक्षम होना चाहिए या नहीं। यह मूल्य वार्ता या ऐसी उपज के लिए आवर्ती ऑर्डर के मामले में उपयोगी हो सकता है जो अभी तक कोल्ड रूम में संग्रहीत नहीं है (और इसलिए खरीदार के लिए दिखाई नहीं देती है)। आप अपनी सेटिंग को "मेनू" -> "खाता विवरण" -> "संपर्क साझाकरण" के अंतर्गत कभी भी अपडेट कर सकते हैं।',
    },
    {
      id: 100,
      title: ' मैं एक खरीदार को छूट देना चाहता हूँ। मैं यह कैसे कर सकता हूँ?',
      role: [ERoles.EMPLOYEE],
      text: 'मेनू" -> "खाता विवरण" -> "डिस्काउंट कूपन" के अंतर्गत, आप कूपन बना सकते हैं जिसमें एक कोड और एक प्रतिशत छूट होती है। ये कूपन हैं जो आपके द्वारा बेचे जाने वाले उत्पादों (व्यक्तिगत रूप से) के लिए मान्य हैं। कंपनी के स्वामित्व वाले उत्पादों के लिए मान्य कूपन सेट करने के लिए, आप "विक्रेता सेटिंग (कंपनी)" के अंतर्गत "मेनू" -> "प्रबंधन" -> "डिस्काउंट कूपन" पर जा सकते हैं। आप ग्राहक के साथ कूपन कोड साझा कर सकते हैं, और वह भुगतान स्क्रीन में कोड को भुना सकता है। कूपन कोड तब तक मान्य रहते हैं जब तक आप उन्हें रद्द नहीं कर देते। यदि आप सभी संभावित खरीदारों को छूट देना चाहते हैं, तो आप बाज़ार में दिखाई देने वाले विक्रय मूल्य को कम कर सकते हैं।',
    },
    {
      id: 101,
      title: ' मैं एक खरीदार को छूट देना चाहता हूँ। मैं यह कैसे कर सकता हूँ?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'मेनू" -> "खाता विवरण" -> "डिस्काउंट कूपन" के अंतर्गत, आप कूपन बना सकते हैं जिसमें एक कोड और एक प्रतिशत छूट होती है। आप कूपन कोड को ग्राहक के साथ साझा कर सकते हैं, और वह भुगतान स्क्रीन में कोड को भुना सकता है। कूपन कोड तब तक वैध रहते हैं जब तक आप उन्हें रद्द नहीं कर देते। यदि आप सभी संभावित खरीदारों को छूट देना चाहते हैं, तो आप बाज़ार में दिखाई देने वाली बिक्री कीमत को कम कर सकते हैं।',
    },
    {
      id: 102,
      title: ' कोल्ड रूम संचालक मेरी फसलों के व्यवसायीकरण में किस प्रकार मेरी सहायता कर सकते हैं?',
      role: [ERoles.COOLING_USER],
      text: 'कोल्ड रूम ऑपरेटर कोल्ड रूम में उपज के भंडारण से संबंधित किसी भी चीज़ के लिए आपका संपर्क बिंदु हैं, और यदि आपके पास स्मार्टफ़ोन तक पहुँच नहीं है, तब भी वे आपकी फसल का विपणन करने में आपकी सहायता कर सकते हैं। अपने इंटरफ़ेस से, वे आपके बैंक खाते का विवरण सेट कर सकते हैं, जहाँ आपको उपज की बिक्री से राजस्व प्राप्त होगा। चेक-इन पर, वे आपको "बिक्री के लिए" क्रेट सूचीबद्ध करने में मदद कर सकते हैं, जो उन्हें बाज़ार में दिखाई देता है, और प्रत्येक उपज के लिए बिक्री मूल्य (प्रति किलोग्राम) निर्धारित करता है। यदि आप अपना विचार बदलते हैं, तो आप हमेशा "बिक्री के लिए" के रूप में सूचीबद्ध या असूचीबद्ध करके बाज़ार से क्रेट जोड़ने या हटाने के लिए कह सकते हैं। कुछ कोल्ड रूम में, ऑपरेटर या उनके सहयोगी सीधे किसानों से उपज खरीदने और खुदरा विक्रेताओं को बेचने के लिए भी जिम्मेदार होते हैं। चाहे आप इस विकल्प में रुचि रखने वाले किसान या व्यापारी हों, या कोल्ड रूम से थोक में खरीदने में रुचि रखने वाले खुदरा विक्रेता हों, कृपया इस अवसर का पता लगाने के लिए कूलिंग कंपनी से संपर्क करें।',
    },
    {
      id: 103,
      title: "बाज़ार में मुझे 'कंपनी की ओर से खरीदें' का कौन सा विकल्प दिखाई देता है?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ऑपरेटर और पंजीकृत कर्मचारी बाज़ार में या तो खुद के लिए, व्यक्तिगत रूप से या जिस कंपनी का वे प्रतिनिधित्व करते हैं, उसकी ओर से उत्पाद बेच और खरीद सकते हैं। यह विकल्प सभी लेन-देन को कंपनी के बैंक खाते से और कंपनी के बैंक खाते में निष्पादित करने की अनुमति देता है, न कि व्यक्तिगत बैंक खातों के माध्यम से। जब कोई ऑपरेटर या पंजीकृत कर्मचारी "कंपनी की ओर से" उत्पाद खरीदता है, तो कंपनी विक्रेता को देय राशि का भुगतान करती है, और क्रेटों की मालिक बन जाती है। यदि वे क्रेट बाज़ार में बिक्री के लिए सूचीबद्ध हैं, तो उन्हें कूलिंग कंपनी के स्वामित्व में दिखाया जाता है, और बिक्री शुल्क कंपनी के बैंक खाते में भेजा जाता है। जब कोई ऑपरेटर या पंजीकृत कर्मचारी अपने लिए उत्पाद खरीदता है, तो वे अपने व्यक्तिगत बैंक खाते के विवरण से विक्रेता को देय राशि का भुगतान करेंगे और व्यक्तिगत रूप से क्रेटों के मालिक बन जाएंगे। यदि उन्हें कूलिंग यूनिट में संग्रहीत किया जाता है, तो उन्हें ऑपरेटर या पंजीकृत कर्मचारी के नाम से सूचीबद्ध किया जाएगा और यदि उन्हें बाज़ार में बिक्री के लिए सूचीबद्ध किया जाता है, तो उन्हें ऑपरेटर या पंजीकृत कर्मचारी के स्वामित्व में भी दिखाया जाएगा।',
    },
    {
      id: 104,
      title: 'बाज़ार में कौन सी फीस दिखाई जाती है?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'मार्केटप्लेस में प्रदर्शित प्रत्येक आइटम का विक्रय मूल्य सीधे विक्रेता द्वारा निर्धारित किया जाता है और यह इस बात पर निर्भर करता है कि कितने किलोग्राम खरीदे गए हैं। उस राशि के अलावा, मार्केटप्लेस में दो शुल्क शामिल हैं: मार्केटप्लेस शुल्क एक 3.5% लेनदेन शुल्क है जिसे कोल्ड्टीवेट टीम द्वारा एप्लिकेशन को होस्ट करने और कार्यात्मक बनाए रखने के लिए एकत्र किया जाता है। भुगतान शुल्क वह शुल्क है जो डिजिटल भुगतान प्रणाली (नाइजीरिया में पेस्टैक) लेनदेन को संसाधित करने के लिए चार्ज कर रही है।',
    },
    {
      id: 105,
      title:
        'मैं एक खरीदार हूँ जो कोल्ड रूम से उत्पाद खरीदने में रुचि रखता हूँ, लेकिन मुझे बाज़ार में कुछ भी दिखाई नहीं दे रहा है। क्यों?',
      role: [ERoles.COOLING_USER],
      text: 'यदि आप मार्केटप्लेस टैब पर जाते हैं, लेकिन कोई उत्पाद नहीं देख पाते हैं, तो यह आपके द्वारा खोज पर लागू किए गए फ़िल्टर (जैसे स्थान, मूल्य सीमा, या रुचि की फसल) के कारण हो सकता है, या ऐसा इसलिए हो सकता है क्योंकि आपके आस-पास कोई आइटम बिक्री के लिए उपलब्ध नहीं है। यदि आपको आस-पास कोई मौजूदा कोल्ड रूम पता है, तो हम कोल्ड रूम ऑपरेटर से यह पूछने की सलाह देते हैं कि क्या कोई कूलिंग उपयोगकर्ता मार्केटप्लेस कार्यक्षमता के माध्यम से उत्पाद बेचने में रुचि रखता है और उन वस्तुओं को ऐप में सूचीबद्ध करने के लिए कहता है।',
    },
    {
      id: 106,
      title: 'क्या आप डिलीवरी सेवाएं प्रदान करते हैं?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'मार्केटप्लेस इस समय डिलीवरी सेवाएँ प्रदान नहीं करता है, लेकिन लॉजिस्टिक्स समाधानों के साथ कनेक्शन की सुविधा प्रदान करता है जो खरीदारों तक उत्पाद पहुँचा सकते हैं। एक पंजीकृत कर्मचारी के रूप में, आपके पास "मेनू" -> "प्रबंधन" -> "विक्रेता सेटिंग (कंपनी)" -> "डिलीवरी संपर्क" के अंतर्गत डिलीवरी संपर्क जोड़ने का विकल्प है। वे भुगतान के समय आपके कोल्ड रूम से उत्पाद खरीदने वाले सभी खरीदारों को प्रदर्शित किए जाते हैं। यदि आप एक खरीदार हैं, तो आपको अपनी डिलीवरी को व्यवस्थित करने के लिए उनसे संपर्क करने के लिए प्रोत्साहित किया जाता है। कृपया ध्यान दें कि यदि उत्पाद को खरीद के दिन ही उठाया जाता है, तो कोई कूलिंग शुल्क लागू नहीं होता है, लेकिन यदि आप फसलों को भंडारण में रखते हैं, तो दैनिक कूलिंग शुल्क देय होता है। जिस डिलीवरी संपर्क के साथ आप बातचीत कर रहे हैं, उसके साथ इस पर चर्चा करना सुनिश्चित करें।',
    },
    {
      id: 107,
      title:
        " मुझे ऐप में एक सूचना मिली जिसमें कहा गया था कि 'उत्पाद को पुनः वितरित करने की आवश्यकता है'। यह क्या है?",
      role: [ERoles.OPERATOR],
      text: 'कोल्ड रूम में चेक-इन प्रक्रिया के कारण, एक क्रेट की सामग्री एक ही किसान या व्यापारी की होती है। जैसे, बाज़ार में, एक खरीदार विक्रेता के क्रेट से कुछ किलो खरीद सकता है, खरीदी गई मात्रा को एक अलग क्रेट में ले जाना चाहिए। यह सूचना आपको सूचित करती है कि खरीदारी पूरी हो गई है, और इस पर क्लिक करके आप देख सकते हैं कि किस क्रेट से उपज ली जानी चाहिए। क्रेट को व्यवस्थित रखना यह सुनिश्चित करने के लिए महत्वपूर्ण है कि फसलें गलती से चेक-आउट न हो जाएं, और कूलिंग शुल्क सही तरीके से एकत्र किए जाएं। हम चेक-इन के समय "क्रेट आईडी" कार्यक्षमता का उपयोग करने की सलाह देते हैं ताकि कोल्डटिवेट में क्रेट को भौतिक क्रेट के साथ टैग किया जा सके और अधिक आसानी से ट्रैक किया जा सके कि अधिसूचना के आधार पर किन क्रेटों पर आपका ध्यान देने की आवश्यकता है।',
    },
    {
      id: 108,
      title: ' मैं बाज़ार से कितनी उपज खरीद सकता हूँ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'बाज़ार में प्रदर्शित प्रत्येक वस्तु के लिए, आप पूरा क्रेट या क्रेट में मौजूद किसी भी किलोग्राम की मात्रा खरीद सकते हैं। न्यूनतम मात्रा जो खरीदी जा सकती है वह 1 किलोग्राम है।',
    },
    {
      id: 109,
      title: 'मैंने कुछ उपज खरीदी है और उसे फिर से बेचना चाहता हूँ। मैं यह कैसे करूँ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'जब आप बाज़ार से कोई उत्पाद खरीदते हैं, तो आप खरीदी गई राशि के मालिक बन जाते हैं। "डैशबोर्ड" में, आपको एक नई प्रविष्टि दिखाई देगी जो दर्शाती है कि आपने कोल्ड रूम में क्या संग्रहीत किया है। यदि आप इसे बिक्री के लिए बेचना चाहते हैं, तो आप डैशबोर्ड आइटम के दाईं ओर ">" चिह्न पर क्लिक कर सकते हैं, "क्रेट वजन और बाज़ार सूची" पर नेविगेट कर सकते हैं, सेट कर सकते हैं कि आप कौन से क्रेट को "बिक्री के लिए" सेट करना चाहते हैं और प्रति किलोग्राम कीमत। बाज़ार में उपभोक्ता इन क्रेटों को देख पाएंगे, और संकेतित राशि पर खरीद पाएंगे। कृपया ध्यान दें कि बिक्री के लिए क्रेट सेट करने के लिए, आपका बैंक खाता सेट अप होना चाहिए। अपने बैंक खाते का विवरण जोड़ने के लिए निर्देशों का पालन करें, या "मेनू" -> "खाता विवरण" -> "भुगतान विकल्प" पर नेविगेट करें।',
    },
    {
      id: 110,
      title:
        ' मैं मार्केटप्लेस भुगतान प्रक्रिया से बाहर निकल गया हूँ। मैं अपनी खरीदारी को अंतिम रूप कैसे दे सकता हूँ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'जब आप शॉपिंग कार्ट में "भुगतान करें" पर क्लिक करके खरीदारी शुरू करते हैं, तो आपको भुगतान प्रदाता (नाइजीरिया में पेस्टैक) पर पुनः निर्देशित किया जाता है। यदि, किसी कारण से, आप प्रक्रिया को छोड़ देते हैं, तो आपका ऑर्डर "भुगतान लंबित" के रूप में चिह्नित किया जाएगा। आप अपना ऑर्डर मार्केटप्लेस पेज में "मेरे ऑर्डर" टैब के अंतर्गत पा सकते हैं। आप भुगतान को अंतिम रूप देने के लिए आइटम पर क्लिक कर सकते हैं। आपके पास भुगतान पूरा करने के लिए 30 मिनट हैं, जिसके बाद ऑर्डर को "रद्द" माना जाता है और अन्य खरीदारों को इसे खरीदने के लिए राशि मुक्त कर दी जाती है।',
    },
    {
      id: 111,
      title: ' मैं कुछ फसलों की जांच करने में असमर्थ हूं। ऐसा क्यों हो रहा है?',
      role: [ERoles.OPERATOR],
      text: 'यदि आप बाज़ार में सूचीबद्ध कुछ क्रेटों को चेक-आउट करने का प्रयास कर रहे हैं, और उन्हें चेक-आउट करने में असमर्थ हैं, तो यह संभवतः इस तथ्य के कारण है कि वे लंबित भुगतान आदेश का हिस्सा हैं। इसका मतलब है कि किसी खरीदार ने उन्हें शॉपिंग कार्ट में जोड़ा है और खरीद प्रक्रिया शुरू की है। खरीदार के पास भुगतान पूरा करने के लिए 30 मिनट हैं, जिसके बाद ऑर्डर रद्द कर दिया जाएगा। 30 मिनट बीत जाने के बाद, आप क्रेट को चेक-आउट कर पाएंगे।',
    },
  ],
  [APP_LOCALES.ORIYA]: [
    {
      id: 1,
      title: 'ମୁଁ କାହିଁକି ଆପ୍ ବ୍ୟବହାର କରିବା ଉଚିତ?',
      role: [ERoles.AUTH],
      text: ' ଏହି ଆପ୍ ଶୀତଳ କୋଠରୀ ପ୍ରଦାନକାରୀଙ୍କୁ ଶୀତଳ କୋଠରୀରେ ଦୈନନ୍ଦିନ କାର୍ଯ୍ୟରେ, ଶୀତଳ କୋଠରୀ ବ୍ୟବହାର କରୁଥିବା ଚାଷୀ ଏବଂ ଶୀତଳ କୋଠରୀରେ ସଂରକ୍ଷିତ ଫସଲ କିଣିବାକୁ ଆଗ୍ରହୀ ଗ୍ରାହକମାନଙ୍କୁ ସମର୍ଥନ କରିବା ପାଇଁ ଡିଜାଇନ୍ କରାଯାଇଛି। ଏହି ଆପ୍ ପ୍ରତ୍ୟେକ ସଂରକ୍ଷିତ କ୍ରେଟ୍ ପାଇଁ ଏକ ଡିଜିଟାଲ୍ ଇନଭେଣ୍ଟରୀ, ଦୂରବର୍ତ୍ତୀ ମନିଟରିଂ ଏବଂ ସେଲ୍ଫ-ଲାଇଫ୍ ମଡେଲ୍ ଏବଂ କ୍ରେତା ଏବଂ ବିକ୍ରେତାଙ୍କୁ ସଂଯୋଗ କରିବା ପାଇଁ ଏକ ବଜାର ସୁବିଧା ପ୍ରଦାନ କରେ। ଏଥିରେ ଜ୍ଞାନ ହବ୍ ମଧ୍ୟ ଅନ୍ତର୍ଭୁକ୍ତ, ଯାହା ସର୍ବୋତ୍ତମ ସଂରକ୍ଷଣ ତାପମାତ୍ରା ଏବଂ ସଂରକ୍ଷଣ ଜୀବନ ଉପରେ ସାମଗ୍ରୀ-ନିର୍ଦ୍ଦିଷ୍ଟ ସୁପାରିଶ ପ୍ରଦାନ କରେ।',
    },
    {
      id: 2,
      title: 'ଆପ୍ କିଏ ବ୍ୟବହାର କରିପାରିବେ?',
      role: [ERoles.AUTH],
      text: 'ଏହି ଆପ୍ ଶୀତଳ ଭଣ୍ଡାର କମ୍ପାନୀ, ଶୀତଳ ଭଣ୍ଡାର ବ୍ୟବହାର କରିବାକୁ ଆଗ୍ରହୀ ଚାଷୀ ଏବଂ ବ୍ୟବସାୟୀ ଏବଂ ବିଶ୍ୱବ୍ୟାପୀ ସମ୍ଭାବ୍ୟ କ୍ରେତାମାନେ ବ୍ୟବହାର କରିପାରିବେ। ସମଗ୍ର ଆପ୍ ରେ, ତିନୋଟି ଉପଭୋକ୍ତାଙ୍କ ଭୂମିକା ରହିଛି: (i) ପଞ୍ଜିକୃତ କର୍ମଚାରୀ: ଶୀତଳ ଭଣ୍ଡାର ପ୍ରଦାନକାରୀ ପରିଚାଳନା ଦଳର ଅଂଶ। ଜଣେ ବ୍ୟକ୍ତି ଯିଏ ଏହି କୋଠରୀ ସ୍ଥାପନ ଏବଂ ପରିଚାଳନା ପାଇଁ ଦାୟୀ, ସେ ସ୍ଥାନରେ ଶାରୀରିକ ଭାବରେ ଉପସ୍ଥିତ ନ ରହି ଭୂମିରେ ଅପରେଟରଙ୍କ କାର୍ଯ୍ୟକଳାପକୁ ନଜର ରଖିବାର ଦାୟିତ୍ୱରେ ଅଛନ୍ତି। ଉଦାହରଣ ସ୍ୱରୂପ: ଜଣେ କମ୍ପାନୀର ସିଇଓ, ସିଏଫଓ, ଇତ୍ୟାଦି। (ii) ଅପରେଟର: ଶୀତଳ ଭଣ୍ଡାରରେ ଶାରୀରିକ ଭାବରେ ଉପସ୍ଥିତ ଥିବା ଏବଂ ଏହାର ଚେକ୍-ଇନ୍, ଚେକ୍-ଆଉଟ୍ କାର୍ଯ୍ୟ ପରିଚାଳନା କରୁଥିବା ଜଣେ କର୍ମଚାରୀ। ଏହି ବ୍ୟକ୍ତି ଶୀତଳ ଭଣ୍ଡାର ବ୍ୟବହାରକାରୀଙ୍କ ସହିତ ସିଧାସଳଖ ଯୋଗାଯୋଗରେ ଥାଆନ୍ତି ଏବଂ ଏକ କମ୍ପାନୀ ପଞ୍ଜିକୃତ କର୍ମଚାରୀଙ୍କୁ ରିପୋର୍ଟ କରନ୍ତି। (iii) ଶୀତଳ ଭଣ୍ଡାର ବ୍ୟବହାରକାରୀ କିମ୍ବା ଗ୍ରାହକ: ଶୀତଳ ଭଣ୍ଡାର ବ୍ୟବହାରକାରୀ (କୃଷକ, ବ୍ୟବସାୟୀ, ଖୁଚୁରା ବ୍ୟବସାୟୀ, ଇତ୍ୟାଦି ହୋଇପାରେ) କିମ୍ବା ଗ୍ରାହକ (ବ୍ୟକ୍ତିଗତ, ଖୁଚୁରା ବିକ୍ରେତା, ପାଇକାରୀ)। ଏହି ଭୂମିକା ଯେକୌଣସି ବ୍ୟକ୍ତିଙ୍କ ପାଇଁ ଯେଉଁମାନେ ଶୀତଳ ଭଣ୍ଡାର କମ୍ପାନୀ ସହିତ ଲିଙ୍କ୍ ନହୋଇ ଆପ୍‌ରେ ପଞ୍ଜିକରଣ କରିବାକୁ ଚାହାଁନ୍ତି। ଯେଉଁମାନଙ୍କର ସ୍ମାର୍ଟଫୋନ୍ ଅଛି ସେମାନେ ଆପ୍‌ରେ ଉପଭୋକ୍ତା ଭାବରେ ଲଗ୍ ଇନ୍ କରିପାରିବେ। ଯଦି ସେମାନଙ୍କର ସ୍ମାର୍ଟଫୋନ୍ ନାହିଁ, ତେବେ ଅପରେଟରମାନେ ସେମାନଙ୍କ ପକ୍ଷରୁ ଶୀତଳ ଭଣ୍ଡାର ବ୍ୟବହାରକାରୀଙ୍କ କାର୍ଯ୍ୟ କରନ୍ତି।',
    },
    {
      id: 3,
      title: 'ମୁଁ କିପରି ଜଣେ ପଞ୍ଜିକୃତ କର୍ମଚାରୀ ଭାବରେ ସାଇନ୍ ଅପ୍ କରିପାରିବି?',
      role: [ERoles.AUTH],
      text: 'ଯଦି ଆପଣ ଆପଣଙ୍କ କମ୍ପାନୀରୁ ସାଇନ୍ ଅପ୍ କରିବାରେ ପ୍ରଥମ କର୍ମଚାରୀ, ତେବେ ଆପଣ "କମ୍ପାନୀ ଭାବରେ ସାଇନ୍ ଅପ୍ କରନ୍ତୁ" ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ ଏବଂ ଆପଣଙ୍କ କମ୍ପାନୀ ଏବଂ ନିଜକୁ (ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଏବଂ ପାସୱାର୍ଡ ସହିତ) ପଞ୍ଜିକରଣ କରିବା ପାଇଁ ପଦକ୍ଷେପଗୁଡ଼ିକ ଅନୁସରଣ କରିପାରିବେ। ଆପଣ ସଫଳତାର ସହ ସାଇନ୍ ଅପ୍ କରିବା ପରେ, ଆପଣ ଆପ୍‌ରେ ଜଣେ ପଞ୍ଜିକୃତ କର୍ମଚାରୀ ଭାବରେ ଲଗ୍ ଇନ୍ କରିପାରିବେ ଏବଂ ଆପଣଙ୍କ କମ୍ପାନୀରେ ଯୋଗଦେବା ପାଇଁ ଅନ୍ୟ ପଞ୍ଜିକୃତ କର୍ମଚାରୀଙ୍କୁ ଏକ SMS ନିମନ୍ତ୍ରଣ ପଠାଇପାରିବେ। କମ୍ପାନୀ ସୃଷ୍ଟି ହେବା ପରେ, ସମସ୍ତ ପଞ୍ଜିକୃତ କର୍ମଚାରୀଙ୍କୁ SMS ଦ୍ୱାରା ନିମନ୍ତ୍ରଣ କରାଯିବା ଉଚିତ। ନଚେତ୍, ସେମାନେ ସମାନ କମ୍ପାନୀ ସହିତ ସଂଯୋଗ ହେବେ ନାହିଁ।',
    },
    {
      id: 4,
      title: 'ମୁଁ କିପରି ଜଣେ ଅପରେଟର ଭାବରେ ସାଇନ୍ ଅପ୍ କରିପାରିବି?',
      role: [ERoles.AUTH],
      text: 'ସାଇନ୍ ଅପ୍ କରିବା ପାଇଁ, ତୁମକୁ ଏକ ନୋନ୍ଧିତ କର୍ମଚାରୀ ଦ୍ୱାରା ଆମନ୍ତ୍ରଣ ମିଳିବା ଆବଶ୍ୟକ। ତୁମେ ଏକ ଏସଏମଏସ୍ ପାଇପାରିବ, ଯାହାରେ ଏକ ଏକ୍ଟିଭେସନ୍ ଲିଙ୍କ୍ ରହିଥାଏ, ଯାହାର ମାଧ୍ୟମରେ ତୁମର ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ଓ ପାସୱାର୍ଡ ସେଟ୍ କରିପାରିବ।',
    },
    {
      id: 5,
      title: 'ମୁଁ କିପରି ଜଣେ କୁଲିଂ ଉପଭୋକ୍ତା କିମ୍ବା ଗ୍ରାହକ ଭାବରେ ସାଇନ୍ ଅପ୍ କରିପାରିବି?',
      role: [ERoles.AUTH],
      text: 'ସ୍ମାର୍ଟଫୋନ୍ ସହିତ ଶୀତଳୀକରଣ ବ୍ୟବହାରକାରୀ ଏବଂ ଗ୍ରାହକମାନେ ହୋମପେଜରେ "ଥଣ୍ଡା ଉପଭୋକ୍ତା କିମ୍ବା ଉପଭୋକ୍ତା ଭାବରେ ସାଇନ୍ ଅପ୍ କରନ୍ତୁ" ଉପରେ କ୍ଲିକ୍ କରି ଏବଂ ସେମାନଙ୍କର ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ଏବଂ ପାସୱାର୍ଡ ପ୍ରଦାନ କରି ପଞ୍ଜିକରଣ କରିପାରିବେ। ଯେଉଁ ଶୀତଳୀକରଣ ବ୍ୟବହାରକାରୀମାନଙ୍କର ସ୍ମାର୍ଟଫୋନ୍ ନାହିଁ ସେମାନଙ୍କୁ ଅପରେଟରମାନେ ଆପ୍ ସହିତ ଯୋଡିପାରିବେ। ଏହି କାର୍ଯ୍ୟ ସେହି ଶୀତଳୀକରଣ ବ୍ୟବହାରକାରୀଙ୍କ ପାଇଁ ଏକ ଚେକ୍-ଇନ୍ ଆରମ୍ଭ କରିବା ପାଇଁ ଆବଶ୍ୟକ। ଶୀତଳୀକରଣ ବ୍ୟବହାରକାରୀମାନଙ୍କୁ ଏକ ଫୋନ୍ ନମ୍ବର ପ୍ରଦାନ କରିବାକୁ ପଡିବ, ଯାହାକୁ ଅପରେଟର ଆବଶ୍ୟକ ହେଲେ ଶୀତଳୀକରଣ ବ୍ୟବହାରକାରୀଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରିବା ପାଇଁ ବ୍ୟବହାର କରିବେ। ଏହି କ୍ଷେତ୍ରରେ କୌଣସି ପାସୱାର୍ଡ ଆବଶ୍ୟକ ନାହିଁ।',
    },
    {
      id: 6,
      title: 'ମୁଁ ଜଣେ ଉପଭୋକ୍ତା ଭାବରେ ପଞ୍ଜୀକରଣ ସମାପ୍ତ କରିପାରିବି ନାହିଁ। ମୁଁ କଣ କରିବା ଉଚିତ?',
      role: [ERoles.AUTH],
      text: 'ପଞ୍ଜୀକରଣ ସମାପ୍ତ କରିବା ପାଇଁ, ଦୟାକରି ନିଶ୍ଚିତ କରନ୍ତୁ ଯେ ନିମ୍ନଲିଖିତ ସର୍ତ୍ତଗୁଡ଼ିକ ପୂରଣ ହୋଇଛି: (i) ଆପଣ ସଠିକ୍ ଦେଶ କୋଡ୍ ସହିତ ଏକ ଫୋନ୍ ନମ୍ବର ପ୍ରବେଶ କରୁଛନ୍ତି (ଯଥା ଭାରତ ପାଇଁ +91); (ii) ଆପଣ ପ୍ରଦାନ କରିଥିବା ଫୋନ୍ ନମ୍ବର ଅନ୍ୟ କୌଣସି ଉପଭୋକ୍ତାଙ୍କ ପଞ୍ଜୀକରଣ ପାଇଁ ବ୍ୟବହୃତ ହୋଇନାହିଁ; (iii) ଆପଣ ଯେଉଁ ପାସୱାର୍ଡ ପ୍ରବେଶ କରୁଛନ୍ତି ତାହା ସମସ୍ତ ଅନୁରୋଧିତ ସର୍ତ୍ତ ପୂରଣ କରୁଛି; (iv) ଆପଣ ଯେଉଁ ପାସୱାର୍ଡ ପ୍ରବେଶ କରୁଛନ୍ତି ତାହା ସମାନ - ଆପଣ ପାସୱାର୍ଡଗୁଡ଼ିକୁ ପ୍ରକାଶ କରିବା ପାଇଁ ଆଖି ଚିହ୍ନ ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ ଏବଂ ସେଗୁଡ଼ିକ ସମାନ କି ନାହିଁ ଯାଞ୍ଚ କରିପାରିବେ।',
    },
    {
      id: 7,
      title: "ମୋ ପାଖରେ ଫୋନ୍ ନାହିଁ କିନ୍ତୁ ଆପ୍ ବ୍ୟବହାର କରିବାକୁ ଚାହୁଁଛି। ମୁଁ କ'ଣ କରିବା ଉଚିତ?",
      role: [ERoles.AUTH],
      text: 'ଯଦି ଆପଣ ଜଣେ ପଞ୍ଜିକୃତ କର୍ମଚାରୀ, ଜଣେ ଅପରେଟର କିମ୍ବା ଜଣେ ଗ୍ରାହକ, ତେବେ ସାଇନ୍ ଅପ୍ କରିବା ପାଇଁ ଆପଣଙ୍କୁ ଏକ ବୈଧ ଫୋନ୍ ନମ୍ବର ପ୍ରଦାନ କରିବାକୁ ପଡିବ। ଆପ୍ ସଠିକ୍ ଭାବରେ ବ୍ୟବହାର କରିବା ପାଇଁ ଏକ ସ୍ମାର୍ଟଫୋନ୍ ଆବଶ୍ୟକ। ଯଦି ଆପଣ ଜଣେ କୁଲିଂ ଉପଭୋକ୍ତା ଏବଂ ଆପଣଙ୍କର ଫୋନ୍ ନାହିଁ, ତେବେ ଆମେ ଆପଣଙ୍କୁ ଏକ ବୈଧ ଫୋନ୍ ନମ୍ବର ପ୍ରଦାନ କରିବାକୁ ପରାମର୍ଶ ଦେଉଛୁ, ଯାହା ଦ୍ଵାରା ଆବଶ୍ୟକ ହେଲେ ଅପରେଟର ଆପଣଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରିପାରିବେ। ଯଦି ଆପଣଙ୍କର ନିଜର ଫୋନ୍ ନମ୍ବର ନାହିଁ, ତେବେ ଆପଣ ପରିବାରର ସଦସ୍ୟ କିମ୍ବା ବନ୍ଧୁଙ୍କ ଫୋନ୍ ନମ୍ବର ଦେଇପାରିବେ। ଯଦି ଏହା ସମ୍ଭବ ନୁହେଁ, ତେବେ ଚେକ୍-ଇନ୍ ସମୟରେ କୁଲିଂ ଉପଭୋକ୍ତା ଭାବରେ "ଫୋନ୍ ବିନା ବ୍ୟବହାରକାରୀ" ଚୟନ କରି ଅପରେଟର ଏବେ ବି ରୁମରେ ଉତ୍ପାଦିତ ଦ୍ରବ୍ୟ ସଂରକ୍ଷଣ କରିପାରିବେ।',
    },
    {
      id: 8,
      title: 'ପଞ୍ଜିକୃତ କର୍ମଚାରୀ ଭାବରେ ଲଗଇନ୍ କରିବା ପାଇଁ କେଉଁ ବିବରଣୀ ଆବଶ୍ୟକ?',
      role: [ERoles.AUTH],
      text: 'ନୋନ୍ଧିତ କର୍ମଚାରୀମାନେ ଇମେଲ୍ କିମ୍ବା ଫୋନ୍ ନମ୍ବର୍ ସହିତ, ତାଙ୍କର ପାସୱାର୍ଡ ସହିତ ଲଗ୍ଇନ୍ କରିପାରିବେ।',
    },
    {
      id: 9,
      title: 'ଜଣେ ଅପରେଟର ଭାବରେ ଲଗଇନ୍ କରିବା ପାଇଁ କେଉଁ ବିବରଣୀ ଆବଶ୍ୟକ?',
      role: [ERoles.AUTH],
      text: 'ଓପେରେଟର୍ମାନେ ତାଙ୍କର ଫୋନ୍ ନମ୍ବର୍ ଓ ପାସୱାର୍ଡ ସହିତ ଲଗ୍ଇନ୍ କରିପାରିବେ।',
    },
    {
      id: 10,
      title: 'କୁଲିଂ ଉପଭୋକ୍ତା କିମ୍ବା ଗ୍ରାହକ ଭାବରେ ଲଗଇନ୍ କରିବା ପାଇଁ କେଉଁ ବିବରଣୀ ଆବଶ୍ୟକ?',
      role: [ERoles.AUTH],
      text: 'ସ୍ମାର୍ଟଫୋନ୍ ଥିବା କୁଲିଂ ବ୍ୟବହାରକାରୀମାନେ ସେମାନଙ୍କର ଫୋନ୍ ନମ୍ବର ଏବଂ ପାସୱାର୍ଡ ସାହାଯ୍ୟରେ ଲଗ୍ ଇନ୍ କରିପାରିବେ। ଯେଉଁମାନଙ୍କର ସ୍ମାର୍ଟଫୋନ୍ ନାହିଁ କୁଲିଂ ବ୍ୟବହାରକାରୀମାନେ ଲଗ୍ ଇନ୍ କରିବାକୁ ପଡିବ ନାହିଁ: ଅପରେଟର ସେମାନଙ୍କ ପକ୍ଷରୁ କାର୍ଯ୍ୟ କରିପାରିବେ। ବଜାର ଦେଖିବାକୁ ଆଗ୍ରହୀ ଗ୍ରାହକମାନେ ସେମାନଙ୍କର ଫୋନ୍ ନମ୍ବର ଏବଂ ପାସୱାର୍ଡ ସାହାଯ୍ୟରେ ଲଗ୍ ଇନ୍ କରିପାରିବେ।',
    },
    {
      id: 11,
      title: 'ମୁଁ ପ୍ରତି SMS ରେ କୌଣସି ନିମନ୍ତ୍ରଣ ପାଇନାହିଁ। ମୁଁ କଣ କରିବା ଉଚିତ?',
      role: [ERoles.AUTH],
      text: 'ଯଦି ଆପଣ ତାଙ୍କର ପାସୱାର୍ଡ୍ ହରାଇ ଯାଇଛନ୍ତି, ତେବେ ଲଗ୍ଇନ୍ ସମୟରେ "ପାସୱାର୍ଡ୍ ବୁଲିଗଲା" ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରି, ଆପଣଙ୍କର ଫୋନ୍ ନମ୍ବର୍ ଦେଇ ପ୍ରବେଶ କରନ୍ତୁ, ଏବଂ ଆପଣ ଏକ ନୂତନ ପାସୱାର୍ଡ୍ ସେଟ୍ କରିବା ପାଇଁ ଏକ SMS ସହିତ ଲିଙ୍କ୍ ପାଇବେ।',
    },
    {
      id: 12,
      title: 'ମୁଁ ମୋର ପାସୱାର୍ଡ ହଜି ଯାଇଛି। ମୁଁ କଣ କରିବା ଉଚିତ?',
      role: [ERoles.AUTH],
      text: 'ଯଦି ଆପଣ ଆପଣଙ୍କର ପାସୱାର୍ଡ ହଜିଯାଇଛନ୍ତି, ତେବେ ଆପଣ ସାଇନ୍ ଇନ୍ କରିବା ସମୟରେ "ପାସୱାର୍ଡ ଭୁଲିଗଲେ" ଉପରେ କ୍ଲିକ୍ କରି ଆପଣଙ୍କର ଆକାଉଣ୍ଟକୁ ପୁନରୁଦ୍ଧାର କରିପାରିବେ, ଆପଣଙ୍କର ଫୋନ୍ ନମ୍ବର ଲେଖନ୍ତୁ, ଏବଂ ଆପଣ ଏକ ନୂତନ ପାସୱାର୍ଡ ସେଟ୍ କରିବା ପାଇଁ ଏକ ଲିଙ୍କ ସହିତ ଏକ SMS ପାଇବେ।',
    },
    {
      id: 13,
      title: 'ଜ୍ଞାନ କେନ୍ଦ୍ର କ’ଣ?',
      role: [ERoles.EMPLOYEE],
      text: 'ନଲେଜ୍ ହବ୍ ହେଉଛି ଏକ ପୃଷ୍ଠା ଯାହା ଉପରେ ବାମ ପାର୍ଶ୍ୱରେ ଥିବା ମେନୁରେ କ୍ଲିକ୍ କରି ପହଞ୍ଚିପାରିବ। ଏଥିରେ ବିଭିନ୍ନ ସାମଗ୍ରୀ ପାଇଁ ସର୍ବୋତ୍ତମ ସଂରକ୍ଷଣ ଅଭ୍ୟାସ ବିଷୟରେ ଉପଯୋଗୀ ସୂଚନା ରହିଛି, ଯେଉଁଥିରେ ସର୍ବୋତ୍ତମ ତାପମାତ୍ରା ଏବଂ ଏହି ତାପମାତ୍ରା ତଳେ ଆନୁମାନିକ ସଂରକ୍ଷଣ ସମୟ ଅନ୍ତର୍ଭୁକ୍ତ।',
    },
    {
      id: 14,
      title: 'ମୁଁ ମୋର ପ୍ରୋଫାଇଲ୍ କିପରି ସମ୍ପାଦନ କରିପାରିବି?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: '"ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" ଉପରେ କ୍ଲିକ୍ କରି, ଆପଣ ଆପଣଙ୍କର ପ୍ରୋଫାଇଲ୍ ଦେଖିପାରିବେ ଏବଂ ଆପଣଙ୍କର "ବ୍ୟକ୍ତିଗତ ବିବରଣୀ" (ନାମ ଏବଂ ଶେଷ ନାମ, ଫୋନ୍ ନମ୍ବର, ଇମେଲ୍ ଏବଂ ଲିଙ୍ଗ) ସମ୍ପାଦନ କରିପାରିବେ। "ସ୍ଥାନୀୟକରଣ ପସନ୍ଦ" ଅଧୀନରେ, ଆପଣ ଆପ୍ ଭାଷା ପରିବର୍ତ୍ତନ କରିପାରିବେ। "ବିକ୍ରେତା ସେଟିଂସ" ଅଧୀନରେ, ଆପଣ ଆପଣଙ୍କର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ବିବରଣୀ ସେଟ୍ ଅପ୍ କରିପାରିବେ, କୁପନ୍ ତିଆରି କରିପାରିବେ ଏବଂ ମାର୍କେଟପ୍ଲେସ୍ ବ୍ୟବହାରକାରୀଙ୍କ ପାଇଁ ଆପଣଙ୍କର ଯୋଗାଯୋଗ ବିବରଣୀ ସାର୍ବଜନୀନ କରିପାରିବେ। ଆପଣଙ୍କ କମ୍ପାନୀ, ସ୍ଥାନ ଏବଂ କୁଲିଂ ୟୁନିଟ୍‌ର ବିବରଣୀ ପରିବର୍ତ୍ତନ କରିବାକୁ, "ମେନୁ" -> "ପରିଚାଳନା"କୁ ଯାଆନ୍ତୁ, ଏବଂ ତା"ପରେ ଆପଣ ପରିବର୍ତ୍ତନ କରିବାକୁ ଚାହୁଁଥିବା ମେନୁ ଆଇଟମ୍ ଚୟନ କରନ୍ତୁ।',
    },
    {
      id: 15,
      title: 'ମୁଁ ମୋର ପ୍ରୋଫାଇଲ୍ କିପରି ସମ୍ପାଦନ କରିପାରିବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଏକ ଓପରେଟରକୁ କୁଲିଂ ଇନ୍ୟୁଟ୍ସ ସହିତ ଯୋଗ କରିବାର ତିନୋଟି ଉପାୟ ଅଛି। ଆପଣ ଏହି ବ୍ୟକ୍ତିକୁ ଆମନ୍ତ୍ରଣ ପଠାଇବା ବେଳେ ଏକ (କିମ୍ବା ତାହାଠାରୁ ବେଶି) କୁଲିଂ ଇନ୍ୟୁଟ୍ ଆସୋସିଏଟ୍ କରିପାରିବେ। ନହେଲେ, ଆପଣ "ପରିଚାଳନା" -> "ଓପରେଟର୍ସ"କୁ ଯାଇ, ଓପରେଟରକୁ ବାଛି ଏବଂ "କୁଲିଂ ଇନ୍ୟୁଟ୍ ଚୟନ କରନ୍ତୁ" ଉପରେ କ୍ଲିକ୍ କରି ମୋଡଫାଇ କରିପାରିବେ। ଶେଷରେ, "ପରିଚାଳନା" -> "କୁଲିଂ ଇନ୍ୟୁଟ୍ସ"ରେ କୁଲିଂ ଇନ୍ୟୁଟ୍ ତିଆରି କରିବା ସମୟରେ, ଆପଣ ଏହାକୁ ଓପରେଟର୍ସ ନିମିତ୍ତେ ବି ଆସୋସିଏଟ୍ କରିପାରିବେ। ଆପଣ ଦେଖିବା ପୂର୍ବରୁ ଆପଣଙ୍କର ପରିବର୍ତ୍ତନଗୁଡ଼ିକୁ ସଂରକ୍ଷିତ କରିବାକୁ ଭୁଲିବେନି!',
    },
    {
      id: 16,
      title: 'ମୁଁ କିପରି କୁଲିଂ ୟୁନିଟରେ ଅପରେଟରମାନଙ୍କୁ ନିଯୁକ୍ତ କରିପାରିବି?',
      role: [ERoles.OPERATOR],
      text: 'ହଁ, ଆପଣ "ଫୋନ୍ ବିହୀନ ୟୁଜର୍" ନାମକ ତିନି ସହିତ ଏହି ବ୍ୟକ୍ତିଙ୍କର ଚେକ୍-ଇନ୍ ଆରମ୍ଭ କରିପାରିବେ। ଏହି ଖାତାକୁ ମଧ୍ୟ ଏହାର ଚେକ୍-ଇନ୍ ପାଇଁ ବ୍ୟବହାର କରାଯାଇପାରିବା ସହିତ, ଏହି ଘରରେ ପ୍ରତ୍ୟେକ କ୍ରେଟ୍ର ମାଲିକଙ୍କୁ ଚିହ୍ନିତ କରିବାକୁ କ୍ରେଟ୍ସକୁ ନାମ ଟାଗ୍ ସାମିଲ କରିବାକୁ ନିଶ୍ଚିତ କରନ୍ତୁ।',
    },
    {
      id: 17,
      title:
        'ଜଣେ ଶୀତଳ ଉପଭୋକ୍ତା ଶୀତଳ କୋଠରୀକୁ ଆସିଥାନ୍ତି କିନ୍ତୁ ତାଙ୍କ ପାଖରେ କୌଣସି ଫୋନ୍ ନାହିଁ। ମୁଁ କ’ଣ ତାଙ୍କୁ ପଞ୍ଜୀକୃତ କରିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ହଁ, ଆପଣ "User without a phone" ନାମକ କୁଲିଂ ୟୁଜର ବ୍ୟବହାର କରି ସେହି ବ୍ୟକ୍ତିଙ୍କ ପାଇଁ ଏକ ଚେକ୍ ଇନ୍ ଆରମ୍ଭ କରିପାରିବେ। ଯେହେତୁ ଅନେକ ଲୋକ ଚେକ୍ ଇନ୍ ପାଇଁ ଏହି ଆକାଉଣ୍ଟ୍ ବ୍ୟବହାର କରିପାରନ୍ତି, ପ୍ରତ୍ୟେକ କ୍ରେଟର ମାଲିକଙ୍କୁ ଚିହ୍ନଟ କରିବା ପାଇଁ ରୁମ୍‌ରେ ଥିବା କ୍ରେଟ୍‌ଗୁଡ଼ିକରେ ଏକ ନାମ ଟ୍ୟାଗ୍ ଯୋଡିବାକୁ ନିଶ୍ଚିତ କରନ୍ତୁ।',
    },
    {
      id: 18,
      title: 'ମୁଁ ମୋର କମ୍ପାନୀକୁ କିପରି ପଞ୍ଜୀକୃତ କରିବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣଙ୍କର କମ୍ପାନୀକୁ ରେଜିସ୍ଟର୍ କରିବାକୁ, ଆପଣଙ୍କର ସ୍ୱାଗତ ପୃଷ୍ଠାରେ "କମ୍ପାନୀ ଭାବରେ ସାଇନ୍ ଅପ୍" ବାଛନ୍ତୁ ଏବଂ ଆବଶ୍ୟକ ବିବରଣୀ ପୂରଣ କରନ୍ତୁ। ଏକ ପାସ୍‌ୱାର୍ଡ୍ ଦିଅନ୍ତୁ ତାପରେ "ସାଇନ୍ ଅପ୍" କ୍ଲିକ୍ କରନ୍ତୁ ଏବଂ ଆପଣ ତିଆରି ଅଛନ୍ତି!',
    },
    {
      id: 19,
      title: 'ମୁଁ ମୋ କମ୍ପାନୀ ପାଇଁ ଏକ ନୂତନ ସ୍ଥାନ କିପରି ପଞ୍ଜୀକରଣ କରିବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ପ୍ରତ୍ୟେକ କୁଲିଂ ଇନ୍ୟୁଟ୍ ଏକ ସ୍ଥାନରେ ସୃଷ୍ଟି କରାଯିବା ଆବଶ୍ୟକ (ଏବଂ ଏକ ସ୍ଥାନ ପାଇଁ ଅନେକ କୁଲିଂ ଇନ୍ୟୁଟ୍ ତିଆରି କରାଯାଇପାରେ)। ଆପଣଙ୍କର କମ୍ପାନୀ ପାଇଁ ଏକ ନୂତନ ସ୍ଥାନ ଯୋଡିବାକୁ, ମେନୁରେ "ପରିଚାଳନା" > "ସ୍ଥାନଗୁଡିକ" ବାଛନ୍ତୁ। ଏକ ନୂତନ ସ୍ଥାନ ଯୋଡିବା ପାଇଁ ଶୀର୍ଷ ସମାନ୍ୟ କୋଣରେ "+" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ। ଆବଶ୍ୟକ ବିବରଣୀ ପୂରଣ କରନ୍ତୁ। ପ୍ରମାଣିତ କରିବା ପାଇଁ "ଯୋଡନ୍ତୁ" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
    },
    {
      id: 20,
      title: 'ମୋ କମ୍ପାନୀ ପାଇଁ ମୁଁ କିପରି ଏକ ନୂତନ କୁଲିଂ ୟୁନିଟ୍ ପଞ୍ଜୀକରଣ କରିବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣଙ୍କର କମ୍ପାନୀ ପାଇଁ ନୂତନ କୁଲିଂ ଇନ୍ୟୁଟ୍ ରେଜିଷ୍ଟର୍ କରିବାକୁ, ଆପଣଙ୍କ ପାଖରେ ଅନୁଷ୍ଠିତ ଏକ ସ୍ଥାନ ଥିବା ଆବଶ୍ୟକ। ତେଣୁ, ମେନୁରେ "ପରିଚାଳନା" > "କୁଲିଂ ଇନ୍ୟୁଟ୍ସ" ବାଛନ୍ତୁ। ଏକ ନୂତନ କୁଲିଂ ଇନ୍ୟୁଟ୍ ଯୋଡିବା ପାଇଁ ଶୀର୍ଷ ସମାନ୍ୟ କୋଣରେ "+" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ। ଆବଶ୍ୟକ ବିବରଣୀ ପୂରଣ କରନ୍ତୁ। ପ୍ରମାଣିତ କରିବା ପାଇଁ "ଯୋଡନ୍ତୁ" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
    },
    {
      id: 21,
      title:
        'ମୋ କମ୍ପାନୀର ଅନ୍ୟ ପଞ୍ଜିକୃତ କର୍ମଚାରୀଙ୍କୁ ଆପ୍ ପାଇଁ ପଞ୍ଜିକରଣ କରିବାକୁ ମୁଁ କିପରି ନିମନ୍ତ୍ରଣ କରିବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣଙ୍କର କମ୍ପାନୀ ପାଇଁ ଅନ୍ୟ ରେଜିଷ୍ଟର୍ କରାଯାଇଥିବା କର୍ମଚାରୀଙ୍କୁ ଆମନ୍ତ୍ରଣ ଦେବା ପାଇଁ, ମେନୁରେ "ପରିଚାଳନା" > "ସେବା ପ୍ରଦାନକାରୀ" ବାଛନ୍ତୁ। ଆମନ୍ତ୍ରଣ ଦେବାକୁ ଚାହୁଁଥିବା କର୍ମଚାରୀର ଫୋନ୍ ନମ୍ବର ଯୋଡିବା ପାଇଁ ଶୀର୍ଷ ସମାନ୍ୟ କୋଣରେ "+" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ। "ଆମନ୍ତ୍ରଣ" ଉପରେ କ୍ଲିକ୍ କରି ପ୍ରମାଣିତ କରନ୍ତୁ: ଆପଣଙ୍କର ସହକର୍ମୀ ଏକ SMS ସହିତ ଏକ ଲିଙ୍କ ପାଇବେ, ଯାହା ସେ/ସେ ନିଜରେ ସାଇନ୍ ଅପ୍ ପୃଷ୍ଠାକୁ ନିଦେଶ କରିବ। ସହିତ, ଆପଣ ଏହି ଆମନ୍ତ୍ରଣ ଲିଙ୍କ ସହିତ ଏକ ଇମେଲ୍ ପାଇବେ। ଦୟାକରି ଏହିକୁ ଓପରେଟରକୁ ଆଗକୁ ପଠାନ୍ତୁ ଯଦି ସେ/ସେ ଏହାକୁ SMS ଦ୍ୱାରା ନ ପାଇଥିବେ।',
    },
    {
      id: 22,
      title: 'ଆପ୍ ପାଇଁ ପଞ୍ଜିକରଣ କରିବା ପାଇଁ ମୁଁ କିପରି ଶୀତଳ ଭଣ୍ଡାର ଅପରେଟରମାନଙ୍କୁ ନିମନ୍ତ୍ରଣ କରିବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣଙ୍କର କୁଲିଂ ଇନ୍ୟୁଟ୍ସ ପାଇଁ ଓପରେଟର୍ସକୁ ଆମନ୍ତ୍ରଣ ପଠାଇବାକୁ, ମେନୁରେ "ପରିଚାଳନା" > "ଓପରେଟର୍ସ" ବାଛନ୍ତୁ। ଆମନ୍ତ୍ରଣ ଦେବାକୁ ଚାହୁଁଥିବା ଓପରେଟରର ଫୋନ୍ ନମ୍ବର ଯୋଡିବା ପାଇଁ ଶୀର୍ଷ ସମାନ୍ୟ କୋଣରେ "+" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ। "ଆମନ୍ତ୍ରଣ" ଉପରେ କ୍ଲିକ୍ କରି ପ୍ରମାଣିତ କରନ୍ତୁ: ଓପରେଟର୍ ଏକ ସନ୍ଦେଶ ସହିତ ଏକ ଲିଙ୍କ ପାଇବେ, ଯାହା ସେ/ସେକୁ ସାଇନ୍ ଅପ୍ ପୃଷ୍ଠାକୁ ନିଦେଶ କରିବ। ସହିତ, ଆପଣ ଏହି ଆମନ୍ତ୍ରଣ ଲିଙ୍କ ସହିତ ଏକ ଇମେଲ୍ ପାଇବେ। ଦୟାକରି ଏହିକୁ ଓପରେଟରକୁ ଆଗକୁ ପଠାନ୍ତୁ ଯଦି ସେ/ସେ ଏହାକୁ SMS ଦ୍ୱାରା ନ ପାଇଥିବେ।',
    },
    {
      id: 23,
      title: 'ମୁଁ କିପରି ଏକ କୁଲିଂ ୟୁନିଟର ତାପମାତ୍ରା ନିରୀକ୍ଷଣ କରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ କୁଲିଂ ୟୁନିଟର ତାପମାତ୍ରା ନିରୀକ୍ଷଣ କରିବା ପାଇଁ, ନାଭିଗେସନ୍ ବାର୍ ର ତଳ ଡାହାଣ କୋଣରେ "ଅଧିକ" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ, "କୁଲିଂ ୟୁନିଟ୍" ଚୟନ କରନ୍ତୁ, "ରୁମ୍ ଅବସ୍ଥା" କୁ ନେଭିଗେଟ୍ କରନ୍ତୁ, ଏବଂ ଡ୍ରପ୍‌ଡାଉନ୍ ରୁ ଆଗ୍ରହର କୁଲିଂ ୟୁନିଟ୍ ଚୟନ କରନ୍ତୁ। ଏହି ପ୍ୟାନେଲରେ, ଆପଣ ସମୟ ସହିତ ତାପମାତ୍ରା ସହିତ ଏକ ଗ୍ରାଫ୍ ଦେଖିବେ - ଆପଣ ଏକ ଡାଟାପଏଣ୍ଟ ଉପରେ କ୍ଲିକ୍ କରି ତାପମାତ୍ରା ମୂଲ୍ୟ ଏବଂ ଟାଇମ୍‌ଷ୍ଟାମ୍ପ ଦେଖିପାରିବେ। ଯଦି କୋଠରୀରେ ଆପ୍ ସହିତ ସେନ୍ସର ସଂଯୋଗ ହୋଇଛି, ତେବେ ଆପଣ ଏଠାରେ ପ୍ରକୃତ କୋଠରୀ ତାପମାତ୍ରା ଦେଖିପାରିବେ। ଅନ୍ୟଥା, ଗ୍ରାଫ୍ ଆପ୍ ମଧ୍ୟରେ ରୁମ୍ ଅପରେଟର ମାନୁଆଲି ସେଟ୍ କରିଥିବା ତାପମାତ୍ରା ଦେଖାଇବ। ଅନ୍ୟ ଏକ କୁଲିଂ ୟୁନିଟର ତାପମାତ୍ରା ଯାଞ୍ଚ କରିବା ପାଇଁ, ଆପଣ ପୃଷ୍ଠାର ଉପର ଡ୍ରପ୍‌ଡାଉନ୍ ରୁ ଏହାକୁ ଚୟନ କରିପାରିବେ।',
    },
    {
      id: 24,
      title: 'ମୁଁ କିପରି ଏକ କୁଲିଂ ୟୁନିଟର ବ୍ୟବହାର ନିରୀକ୍ଷଣ କରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ କୁଲିଂ ୟୁନିଟର ଅକୁପାନ୍ସି ପରିଚାଳନା କରିବା ପାଇଁ ନାଭିଗେସନ୍ ବାରର ତଳ ଡାହାଣ କୋଣରେ "ଅଧିକ" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ, "କୁଲିଂ ୟୁନିଟ୍" ଚୟନ କରନ୍ତୁ, "ପ୍ଲାନର୍"କୁ ଯାଆନ୍ତୁ, ଏବଂ ଡ୍ରପଡାଉନ୍ ରୁ ଆଗ୍ରହର କୁଲିଂ ୟୁନିଟ୍ ଚୟନ କରନ୍ତୁ। ଏଠାରେ ଆପଣ ବର୍ତ୍ତମାନର ଅକୁପାନ୍ସି (ଉପର) ଏବଂ ପରବର୍ତ୍ତୀ 7 ଦିନ (ତଳ) ପାଇଁ ପୂର୍ବାନୁମାନ ଅକୁପାନ୍ସି ଦେଖିପାରିବେ। ଭବିଷ୍ୟତ ଅକୁପାନ୍ସି ବିଷୟରେ ସୂଚନା ପ୍ରତ୍ୟେକ ଉପଭୋକ୍ତା ଚେକ୍-ଇନ୍ ସମୟରେ ଷ୍ଟୋରେଜରେ ଯୋଜନାବଦ୍ଧ ଦିନ ଭାବରେ ଘୋଷଣା କରିଥିବା ଦିନ ସଂଖ୍ୟା ଉପରେ ଆଧାରିତ। ସତର୍କ ରୁହନ୍ତୁ ଯେ ଏହା କେବଳ ଏକ ଆକଳନ ଏବଂ ଭୁଲ ହୋଇପାରେ।',
    },
    {
      id: 25,
      title: 'ଗୋଟିଏ କୋଠରୀରେ କେଉଁ ଜିନିଷଗୁଡ଼ିକ ରଖାଯାଇଛି ତାହା ମୁଁ କିପରି ଦେଖିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ସ୍କ୍ରିନର ତଳରେ "ଡ୍ୟାସବୋର୍ଡ" ଆଇକନ୍‌ରେ କ୍ଲିକ୍ କରନ୍ତୁ ଏବଂ ଡ୍ରପ୍ଡାଉନ୍‌ରୁ ଆଗ୍ରହୀ କୁଲିଂ ଇଉନିଟ୍‌କୁ ଚୟନ କରନ୍ତୁ ଯାହା ସମସ୍ତ ସଂଗ୍ରହିତ ବସ୍ତୁଗୁଡିକୁ ଦେଖିପାରିବେ।',
    },
    {
      id: 26,
      title: 'ମୁଁ ଏକ କୁଲିଂ ୟୁନିଟର ପୂର୍ବ ଚେକ୍-ଇନ୍ ଏବଂ ଚେକ୍-ଆଉଟ୍ କିପରି ଦେଖିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଏକ କୁଲିଂ ୟୁନିଟର ଅତୀତର ଗତିବିଧି ଦେଖିବା ପାଇଁ ନାଭିଗେସନ୍ ବାରର ତଳ ଡାହାଣ କୋଣରେ "ଅଧିକ" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ, ଏବଂ "ଇତିହାସ" ଚୟନ କରନ୍ତୁ: ଅତୀତର ଚେକ୍-ଇନ୍ (ସବୁଜ କ୍ରେଟ୍ ସହିତ ଆଇକନ୍), ଚେକ୍-ଆଉଟ୍ (କମଳା କ୍ରେଟ୍ ସହିତ ଆଇକନ୍), ଏବଂ କାରବାର ବିବରଣୀ ସହିତ ମାର୍କେଟପ୍ଲେସ୍ କାର୍ଯ୍ୟ (ନୀଳ କାର୍ଟ୍ ସହିତ ଆଇକନ୍) ପ୍ରଦର୍ଶିତ ହୁଏ। ଯଦି ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ କାରବାର ଆଗ୍ରହର ହୋଇଥାଏ ତେବେ ସନ୍ଧାନ କାର୍ଯ୍ୟ ଏହାକୁ ଖୋଜିବାରେ ଆପଣଙ୍କୁ ସହାୟତା କରିପାରିବ!',
    },
    {
      id: 28,
      title: 'ଆପ୍‌ରେ ଅପରେଟର କ’ଣ ମୁଖ୍ୟ କାର୍ଯ୍ୟ କରିପାରିବେ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ଅପରେଟର: ନୂତନ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ ପଞ୍ଜୀକରଣ କରିପାରିବେ, ଚେକ୍-ଇନ୍ ଆରମ୍ଭ କରିପାରିବେ, ଷ୍ଟୋରେଜ୍ ଏବଂ ରୁମ୍ ଅକ୍ୟୁପାନ୍ସିରେ ଥିବା ଜିନିଷଗୁଡ଼ିକ ତଦାରଖ କରିପାରିବେ, ଚେକ୍-ଆଉଟ୍ ଆରମ୍ଭ କରିପାରିବେ, ଏବଂ ତାଙ୍କ ଦାୟିତ୍ୱରେ ଥିବା କୁଲିଂ ୟୁନିଟ୍‌ର ତାପମାତ୍ରା ତଦାରଖ କରିପାରିବେ। ଅପରେଟର ବିକ୍ରୟ ପାଇଁ କିଛି କ୍ରେଟ୍ ତାଲିକାଭୁକ୍ତ କରିବାରେ ଏବଂ ବିକ୍ରୟ ମୂଲ୍ୟ ସ୍ଥିର କରିବାରେ ମଧ୍ୟ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ ସହାୟତା କରିପାରିବେ।',
    },
    {
      id: 29,
      title: 'ମୁଁ ନୂତନ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ କିପରି ପଞ୍ଜୀକରଣ କରିପାରିବି?',
      role: [ERoles.OPERATOR],
      text: 'ନୂତନ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ ପଞ୍ଜିକରଣ କରିବା ପାଇଁ, ମେନୁରେ "ପରିଚାଳନା" > "କୁଲିଂ ବ୍ୟବହାରକାରୀ" କୁ ଯାଆନ୍ତୁ। ଉପର ଡାହାଣ କୋଣରେ ଥିବା "+" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ ଏବଂ ପୂର୍ବରୁ ପଞ୍ଜିକୃତ ବ୍ୟବହାରକାରୀଙ୍କୁ ଏକ କୋଡ୍ ସହିତ ଯୋଡିବେ କି ବ୍ୟବହାରକାରୀଙ୍କ ବିବରଣୀ ଯୋଡିବେ କି ନାହିଁ ତାହା ବାଛନ୍ତୁ। ଜଣେ କୁଲିଂ ବ୍ୟବହାରକାରୀ ଯାହାଙ୍କର ଏକ ସ୍ମାର୍ଟଫୋନ୍ ଅଛି ଏବଂ ସେ ପୂର୍ବରୁ Coldtivate ରେ ପଞ୍ଜିକୃତ ହୋଇସାରିଛନ୍ତି ତାଙ୍କର ଏକ ଅନନ୍ୟ କୋଡ୍ ଅଛି, ଯାହାକୁ ସେ "ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" -> "ବ୍ୟକ୍ତିଗତ ବିବରଣୀ" -> କୁଲିଂ ବ୍ୟବହାରକାରୀ ଆମଦାନୀ କୋଡ୍ ଅନ୍ତର୍ଗତ ପାଇପାରିବେ। ଯଦି ଉପଭୋକ୍ତାଙ୍କର କୌଣସି ସ୍ମାର୍ଟଫୋନ୍ ନାହିଁ, କିମ୍ବା ଏପର୍ଯ୍ୟନ୍ତ ପଞ୍ଜିକୃତ ହୋଇନାହିଁ, ତେବେ ଆପଣ ନାମ, ଲିଙ୍ଗ ଏବଂ ଟେଲିଫୋନ୍ ନମ୍ବର ଯୋଡି ଉପଭୋକ୍ତାଙ୍କୁ ଯୋଡିପାରିବେ। ଯଦି ଉପଭୋକ୍ତାଙ୍କର ନିଜସ୍ୱ ନମ୍ବର ନାହିଁ, ତେବେ ଅନ୍ୟ ଜଣେ ବ୍ୟକ୍ତିଙ୍କ (ଯଥା ବନ୍ଧୁ, ସମ୍ପର୍କୀୟ) ନମ୍ବର ବ୍ୟବହାର କରାଯାଇପାରିବ, କିନ୍ତୁ ଦୟାକରି ମନେରଖନ୍ତୁ ଯେ ଗୋଟିଏ ଫୋନ୍ ନମ୍ବର କେବଳ ଥରେ ବ୍ୟବହାର କରାଯାଇପାରିବ। ନିଶ୍ଚିତ କରିବା ପାଇଁ "ପରିବର୍ତ୍ତନଗୁଡ଼ିକୁ ସଂରକ୍ଷଣ କରନ୍ତୁ" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ। ପଞ୍ଜିକରଣ ସମାପ୍ତ କରିବା ପାଇଁ, ଆପଣଙ୍କୁ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ କିଛି ପ୍ରଶ୍ନ ପଚାରି ଏକ ଛୋଟ ସର୍ଭେ ପୂରଣ କରିବାକୁ ପଡିବ। "ପରିଚାଳନା" -> "କୁଲିଂ ବ୍ୟବହାରକାରୀ" -> "କୁଲିଂ ବ୍ୟବହାରକାରୀ ସର୍ଭେ" କୁ ନାଭିଗେଟ୍ କରି ପରବର୍ତ୍ତୀ ସମୟରେ ସର୍ଭେ ମଧ୍ୟ ସମାପ୍ତ କରାଯାଇପାରିବ।',
    },
    {
      id: 30,
      title:
        "ପଞ୍ଜୀକରଣ ସମୟରେ ସର୍ଭେ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେବା ପାଇଁ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କ ପାଖରେ ସମୟ ନାହିଁ। ମୁଁ କ'ଣ କରିବା ଉଚିତ?",
      role: [ERoles.OPERATOR],
      text: 'ଅନୁସନ୍ଧାନ ପ୍ରଶ୍ନଗୁଡିକୁ "Complete later" କ୍ଲିକ୍ କରି ସ୍କିପ୍ କରିପାରିବେ। ଏହି ସମୟରେ, କୁଲିଂ ୟୁଜର୍ ପାଇଁ ପ୍ରଥମେ ଏକ ଚେକ୍-ଇନ୍ ସୃଷ୍ଟି କଲେ ଅନୁସନ୍ଧାନ ପୂରଣ କରିବା ପାଇଁ ପ୍ରେରିତ ହେବେ। ସୁପାରିଶ କରାଯାଉଛି ଯେ ଅନୁସନ୍ଧାନ ପ୍ରଶ୍ନଗୁଡିକୁ ଏକାଧିକ ସମୟ ନେଇ ସତର୍କ ଭାବରେ ଉତ୍ତର ଦିଅନ୍ତୁ: ଏହି ପରି ସେ ବେଶି ଲାଗି ହୋଇଥିବା Coldtivate ଆପ୍‌ର ସେବା ପାଇପାରିବେ!',
    },
    {
      id: 31,
      title:
        'ଜଣେ ଅପରେଟର ମୋତେ କମ୍ପାନୀର କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କ ତାଲିକାରେ ଯୋଡିବା ପାଇଁ ଏକ କୋଡ୍ ମାଗୁଛନ୍ତି। ମୁଁ କୋଡ୍ କେଉଁଠାରେ ପାଇପାରିବି?',
      role: [ERoles.OPERATOR],
      text: 'ଚେକ୍-ଇନ୍ ଆରମ୍ଭ କରିବା ପାଇଁ, ଡ୍ୟାଶବୋର୍ଡରେ ଯାଆନ୍ତୁ ଏବଂ ନିମ୍ନ ବାଁଦ ଦିଗରେ ଥିବା କ୍ରିୟା ବ୍ୟବସ୍ଥାପକ ବଟନକୁ କ୍ଲିକ୍ କରନ୍ତୁ, ତାପରେ ସବୁଜ ବଟନକୁ କ୍ଲିକ୍ କରନ୍ତୁ।',
    },
    {
      id: 32,
      title:
        "ସାଇନ୍ ଅପ୍ ସମୟରେ ସର୍ଭେ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେବା ପାଇଁ ମୋ ପାଖରେ ସମୟ ନାହିଁ। ମୁଁ କ'ଣ କରିବା ଉଚିତ?",
      role: [ERoles.OPERATOR],
      text: 'ଚେକ୍-ଆଉଟ୍ ଆରମ୍ଭ କରିବାକୁ ଦୁଇଟି ପଦ୍ଧତି ଅଛି, ଦୁହିଁ ଡ୍ୟାଶବୋର୍ଡ ପୃଷ୍ଠାରୁ ଆରମ୍ଭ ହୁଏ। ଆପଣ ନିମ୍ନ ବାଁଦ ଦିଗରେ ଥିବା କ୍ରିୟା ବ୍ୟବସ୍ଥାପକ ବଟନକୁ କ୍ଲିକ୍ କରିପାରିବେ ଏବଂ ଲାଲ ବଟନକୁ କ୍ଲିକ୍ କରିପାରିବେ। ଏହି ପଦ୍ଧତିରେ, ଆପଣ କେଉଁସି କୁଲିଂ ୟୁଜର୍ (ଏବଂ କେଉଁ କୁଲିଂ ଇନ୍ଇଟ୍) ଅନୁସାରେ ଚେକ୍-ଆଉଟ୍ ଆରମ୍ଭ କରିବେ ଏବଂ ତାଙ୍କର କ୍ରେଟ୍‌ଗୁଡିକୁ ବହୁତ ସମୟରୁ ଚେକ୍-ଆଉଟ୍ କରିପାରିବେ। ବିକଳ୍ପରୂପେ, ଆପଣ ଡ୍ୟାଶବୋର୍ଡରେ ଦେଖିଥିବା କିଛି ଆଇଟମ୍‌ର ଉପରେ "ବିବରଣୀ ଦେଖନ୍ତୁ" କ୍ଲିକ୍ କରିପାରିବେ (ଠିକ କୁଲିଂ ଇନ୍ଇଟ୍ରେ ଥିବାକୁ ନିଶ୍ଚିତ କରନ୍ତୁ), ଏବଂ "ଚେକ୍-ଆଉଟ୍" କ୍ଲିକ୍ କରିପାରିବେ। ଏହି ପଦ୍ଧତିରେ, ଆପଣ ସେହି ସ୍ଟୋରେଜ୍ ଆଇଟମ୍‌ରୁ କେବଳ କ୍ରେଟ୍‌ଗୁଡିକୁ ଚେକ୍-ଆଉଟ୍ କରିପାରିବେ।',
    },
    {
      id: 33,
      title: 'ମୁଁ ମୋର ଫସଲଗୁଡ଼ିକୁ ଥଣ୍ଡା କୋଠରୀରେ ସଂରକ୍ଷଣ କରିବାକୁ ଆଗ୍ରହୀ। ମୁଁ ସେଗୁଡ଼ିକୁ କିପରି ପାଇବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣଙ୍କ ପାଖରେ ଥିବା ଶୀତଳ କୋଠରୀ ଖୋଜିବା ପାଇଁ, ନାଭିଗେସନ୍ ବାର୍ ର ତଳ ଡାହାଣ କୋଣରେ "ଅଧିକ" କୁ ଯାଆନ୍ତୁ, "କୁଲିଂ ୟୁନିଟ୍" ଏବଂ "ମ୍ୟାପ୍" ଚୟନ କରନ୍ତୁ। ଏଠାରେ ଆପଣ ନିକଟସ୍ଥ ଶୀତଳ କୋଠରୀ ଖୋଜିପାରିବେ, ଏବଂ ତା"ପରେ ଆପଣଙ୍କର କ୍ରେଟ୍ଗୁଡ଼ିକୁ ରୁମକୁ ଆଣିପାରିବେ। ଶୀତଳ କୋଠରୀ ପରିଚାଳକ ଆପଣଙ୍କୁ ବୁଝିବାରେ ସାହାଯ୍ୟ କରିପାରିବେ ଯେ ରୁମ କିପରି କାମ କରେ, ଆପଣଙ୍କୁ କିପରି ଚାର୍ଜ କରାଯିବ, ଏବଂ ଶୀତଳ ଭଣ୍ଡାର ବ୍ୟବହାର କରିବାର ଲାଭ କ"ଣ।',
    },
    {
      id: 34,
      title: 'ମୁଁ କିପରି ଚେକ୍ ଇନ୍ ଆରମ୍ଭ କରିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ଚେକ୍-ଇନ୍ ଆରମ୍ଭ କରିବାକୁ, ଡ୍ୟାସବୋର୍ଡକୁ ଯାଆନ୍ତୁ ଏବଂ ତଳ ଡାହାଣ ପାର୍ଶ୍ୱରେ ଥିବା କାର୍ଯ୍ୟକଳାପ ପରିଚାଳକ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ, ଏବଂ ତା"ପରେ ସବୁଜ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
    },
    {
      id: 35,
      title: 'ମୁଁ କିପରି ଚେକ୍ ଆଉଟ୍ ଆରମ୍ଭ କରିପାରିବି?',
      role: [ERoles.OPERATOR],
      text: 'ଡ୍ୟାସବୋର୍ଡ ପୃଷ୍ଠାରୁ ଆରମ୍ଭ କରି ଚେକ୍ ଆଉଟ୍ ଆରମ୍ଭ କରିବାର ଦୁଇଟି ଉପାୟ ଅଛି। ଆପଣ ତଳ ଡାହାଣ ପାର୍ଶ୍ୱରେ ଥିବା କାର୍ଯ୍ୟକଳାପ ପରିଚାଳକ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ, ଏବଂ ତାପରେ ଲାଲ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ। ଏହି ଉପାୟରେ, ଆପଣ କେଉଁ କୁଲିଂ ବ୍ୟବହାରକାରୀ (ଏବଂ କେଉଁ କୁଲିଂ ୟୁନିଟ୍‌ରେ) ଚେକ୍ ଆଉଟ୍ ଆରମ୍ଭ କରିବାକୁ ଚାହୁଁଛନ୍ତି ତାହା ଚୟନ କରିପାରିବେ, ଏବଂ ଏକାଧିକ ଚେକ୍ ଇନ୍‌ରୁ ତାଙ୍କ କ୍ରେଟ୍‌ଗୁଡ଼ିକୁ ଯାଞ୍ଚ କରିପାରିବେ। ବିକଳ୍ପ ଭାବରେ, ଆପଣ ଡ୍ୟାସବୋର୍ଡରେ ଦେଖୁଥିବା ଏକ ଆଇଟମ୍ ପାଇଁ "ବିବରଣୀ ଦେଖନ୍ତୁ" ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ (ସଠିକ୍ କୁଲିଂ ୟୁନିଟ୍‌ରେ ଥିବା ନିଶ୍ଚିତ କରନ୍ତୁ), ଏବଂ "ଚେକ୍ ଆଉଟ୍" ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ। ଏହି କ୍ଷେତ୍ରରେ, ଆପଣ କେବଳ ସେହି ଷ୍ଟୋରେଜ୍ ଆଇଟମ୍‌ରୁ କ୍ରେଟ୍‌ଗୁଡ଼ିକୁ ଚେକ୍-ଆଉଟ୍ କରିପାରିବେ।',
    },
    {
      id: 36,
      title:
        ' ମୋର ଶୀତଳ କୋଠରୀରେ ତାପମାତ୍ରା ସେନ୍ସର ଅଛି। ସେଗୁଡ଼ିକୁ କୋଲଡିଭେଟ୍ ସହିତ ସଂଯୋଗ କରାଯାଇପାରିବ କି?',
      role: [ERoles.AUTH],
      text: 'ଜ୍ଞାନ କେନ୍ଦ୍ର ହେଉଛି ଏକ ପୃଷ୍ଠା ଯାହାକୁ ଉପର ଡାହାଣ ପାଇଁ ମେନୁ ଉପରେ କ୍ଲିକ୍ କରି ପହଞ୍ଚିବାକୁ ପାରିବେ। ଏହା ବିଭିନ୍ନ ସାମଗ୍ରୀ ପାଇଁ ସର୍ବୋତ୍ତମ ସ୍ଥାପନ ପ୍ରଥାସମୂହ ବିଷୟରେ ଉପକୃତ ସୂଚନା ସମ୍ବଲିତ କରେ, ସହିତ ସଠିକ୍ ତାପମାତ୍ରା ଓ ଏହି ତାପମାତ୍ରାରେ ପ୍ରାୟ ଷ୍ଟୋରେଜ୍ ସମୟ।',
    },
    {
      id: 37,
      title: 'ମୁଁ ଆପ୍ ସାହାଯ୍ୟରେ ରୁମରେ ଥିବା ସେନ୍ସରଗୁଡ଼ିକୁ କିପରି ସଂଯୋଗ କରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଯଦି କୋଠରୀରେ ତାପମାତ୍ରା ସେନ୍ସର ଅଛି ଯାହାକୁ କୋଲଡିଭେଟ୍ ଆପ୍ ସହିତ ସଂଯୋଗ କରାଯାଇପାରିବ, ଦୟାକରି ଆପଣଙ୍କର ଦାୟୀତ୍ୱବାନଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ। କେବଳ ପଞ୍ଜିକୃତ କର୍ମଚାରୀ ଭୂମିକା ଥିବା ଉପଭୋକ୍ତା ହିଁ କୋଲଡିଭେଟ୍‌ରେ ସୃଷ୍ଟି ହୋଇଥିବା କୁଲିଂ ୟୁନିଟ୍ ସହିତ ସେନ୍ସରଗୁଡ଼ିକୁ ଲିଙ୍କ୍ କରିପାରିବେ।',
    },
    {
      id: 38,
      title: 'ମୁଁ କୁଲିଂ ୟୁନିଟର ତାପମାତ୍ରା କିପରି ସ୍ଥିର କରିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ପିକ୍ ଅପ୍ ସମୟ କୁଲିଂ ଇନ୍ଯୁଜର୍ ପାଇଁ ସୁପାରିଶ କରାଯାଇଥିବା ଦିନଗୁଡିକର ସଂଖ୍ୟା। ପରେ, ଉତ୍ପାଦ ବଜାର ସାର୍ଥକତା ହାରାଇବ। ଶୂନ୍ୟର ସମୟ ପିକ୍ ଅପ୍ ଅର୍ଥାତ୍ ଇନ୍ଯୁଜର୍କୁ ତୁରନ୍ତ ମାଲ ସଂଗ୍ରହ କରିବାକୁ ଆସିବା ଆବଶ୍ୟକ ଏବଂ ଦିନ 2 ଅବଧିରେ ବଜାରକୁ ବିକ୍ରୟ କରିବା ପାଇଁ ସମୟ ରହିଛି। ଡ୍ୟାସବୋର୍ଡ୍ (ଉପରେ ଡାହାଣ) ଏବଂ ପ୍ରତ୍ୟେକ ସଂଗ୍ରହ ବସ୍ତୁ ପାଇଁ ବିସ୍ତୃତ ଦୃଶ୍ୟରେ ଦେଖାଯାଇପାରିବ।',
    },
    {
      id: 39,
      title: 'ଷ୍ଟୋରେଜ୍ ପରେ ବଜାର ସର୍ଭେ ପାଇଁ ଜଣେ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କ ସହିତ କିପରି ଯୋଗାଯୋଗ କରିବେ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ତାଜା ଶାକ ଓ ଫଳ ଖରାପ ହେବାକୁ ଯାଉଛି, ଏବଂ ସେମାନେ କଟାହେବା ପରେ କେତେ ତାଜା ରହିବେ ସେଥିରେ ଅଧିକାଂଶ ଭାଗ ତାପମାନ ଉପରେ ନିର୍ଭର କରେ। ତେଣୁ, ଉଠାଇବା ସମୟ ସମ୍ପର୍କିତ ଥଣ୍ଡା ଯନ୍ତ୍ରର ତାପମାନ ଓ ଉତ୍ପାଦନର ଆରମ୍ଭିକ ଗୁଣତା ସହିତ ଗଣାଯାଏ ଯେବେ ସେହିଥଣ୍ଡା ଯନ୍ତ୍ରକୁ ନେଇଆସାଯାଏ। ଏହି ଗଣନାରେ ବ୍ୟବହୃତ ପ୍ୟାରାମିଟର ସମସ୍ତ ପଦାର୍ଥ ପାଇଁ ବିଶେଷ। ବିଭିନ୍ନ ପଦାର୍ଥର ନାଶପାଇଁ କିପରି ଭିନ୍ନ ହୁଏ ତାହା ଜାଣିବା ପାଇଁ କ୍ନୋୱଲେଜ୍ ହବ୍ ଦେଖନ୍ତୁ।',
    },
    {
      id: 40,
      title: 'ସଂରକ୍ଷଣ ପରବର୍ତ୍ତୀ ବଜାର ସର୍ଭେ କ’ଣ ଏବଂ ମୁଁ ଏହାକୁ କାହିଁକି ପୂରଣ କରିବା ଉଚିତ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: '"ଅଧିକ" -> "ଇତିହାସ" ଟ୍ୟାବ୍‌ରେ ପ୍ରତ୍ୟେକ ଚେକ୍ ଆଉଟ୍ ପାଖରେ ଥିବା ତିନୋଟି ବିନ୍ଦୁ ଉପରେ କ୍ଲିକ୍ କରି ଏବଂ "ବଜାର ସର୍ଭେ ପୂରଣ କରନ୍ତୁ" ଚୟନ କରି ବଜାର ସର୍ଭେ ଉପଲବ୍ଧ ହୋଇପାରିବ। ଏହି ସର୍ଭେ ବହୁତ ଛୋଟ ଏବଂ ଏଥିରେ ଆପଣ ପୂର୍ବରୁ ରୁମ୍‌ରେ ସଂରକ୍ଷଣ କରିଥିବା ଉତ୍ପାଦର ବିକ୍ରୟ ମୂଲ୍ୟ ଏବଂ ଏହାର କେତେ ଅଂଶ ନଷ୍ଟ ହୋଇଛି ସେ ବିଷୟରେ ସୂଚନା ପଚାରେ। ଏହି ସୂଚନାକୁ ଗୋପନୀୟ ଭାବରେ ବିବେଚନା କରାଯିବ ଏବଂ କେବଳ କୋଲଡିଭେଟ୍ ଦଳ ଦ୍ୱାରା ଶୀତଳ ଭଣ୍ଡାର ବ୍ୟବହାରର ପ୍ରଭାବ ମୂଲ୍ୟାଙ୍କନ କରିବା ପାଇଁ ବ୍ୟବହାର କରାଯିବ। ଏକ ଲାଲ ବିନ୍ଦୁ ସେହି ଚେକ୍ ଆଉଟ୍ ଚିହ୍ନଟ କରିବ ଯେଉଁଗୁଡ଼ିକ ପାଇଁ ବଜାର ସର୍ଭେ ଏପର୍ଯ୍ୟନ୍ତ ସମାପ୍ତ ହୋଇନାହିଁ। ଆପଣଙ୍କୁ ବିଜ୍ଞପ୍ତି ପ୍ୟାନେଲରେ ଆପଣଙ୍କ ଧ୍ୟାନ ଆବଶ୍ୟକ କରୁଥିବା ଚେକ୍ ଆଉଟ୍ ବିଷୟରେ ମନେ ପକାଇ ଦିଆଯିବ ଏବଂ ସର୍ଭେ ଖୋଲିବା ପାଇଁ ବିଜ୍ଞପ୍ତି ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ। ଆପଣ "ଆନାଲିଟିକ୍ସ" ଟ୍ୟାବ୍‌ରେ ପୂରଣ କରିବାକୁ ଆବଶ୍ୟକ ହେଉଥିବା ସର୍ଭେଗୁଡ଼ିକୁ ମଧ୍ୟ ଆକ୍ସେସ୍ କରିପାରିବେ, ଏବଂ ତା"ପରେ "ପ୍ରଭାବ" ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ।',
    },
    {
      id: 41,
      title: 'ଡ୍ୟାସବୋର୍ଡରେ ଥିବା ଗୋଟିଏ ଜିନିଷର ସୂଚନା ମୁଁ କିପରି ପଢ଼ିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ଡ୍ୟାସବୋର୍ଡରେ ଥିବା ପ୍ରତ୍ୟେକ ଆଇଟମ୍ ସମାନ ଫସଲ ପ୍ରକାରର କ୍ରେଟ୍‌ଗୁଡ଼ିକର ଏକ ସେଟ୍ ପ୍ରଦର୍ଶିତ କରେ ଯାହାକୁ ଏକାଠି ଚେକ୍-ଇନ୍ କରାଯାଇଛି। ଉପରେ ଥିବା ଦିନ ସଂଖ୍ୟା ହେଉଛି ଉଠାଇବା ସମୟ ପର୍ଯ୍ୟନ୍ତ ପୂର୍ବାନୁମାନ କରାଯାଇଥିବା ବାକି ଦିନ। ତଳେ, ଆପଣ ଫସଲ ପ୍ରକାର ଏବଂ ଚେକ୍-ଇନ୍ ID ଦେଖିପାରିବେ। କ୍ରେଟ୍ ପ୍ରତୀକ ପାଖରେ ଥିବା ସଂଖ୍ୟା ହେଉଛି ଚେକ୍-ଇନ୍ ହୋଇଥିବା କ୍ରେଟ୍‌ଗୁଡ଼ିକର ସଂଖ୍ୟା। ଏହା ପାଖରେ, ଆପଣ କୁଲିଂ ଫି ଏବଂ କ୍ରେଟ୍‌ଗୁଡ଼ିକ କେତେ ଦିନ ପାଇଁ ଷ୍ଟୋରେଜ୍‌ରେ ରଖାଯାଇଛି ତାହା ଦେଖିପାରିବେ। ଡାହାଣ ପାର୍ଶ୍ୱରେ ଥିବା କାର୍ଡ ପାଖରେ ଥିବା ସଂଖ୍ୟାଟି ଚିହ୍ନଟ କରେ ଯେ ବଜାରରେ "ବିକ୍ରୟ ପାଇଁ" ଭାବରେ କେତେ କ୍ରେଟ୍ ତାଲିକାଭୁକ୍ତ ହୋଇଛି। ପ୍ରତ୍ୟେକ ଆଇଟମ୍‌ର ତଳେ, ଆପଣ କ୍ରେଟ୍‌ଗୁଡ଼ିକର ମାଲିକ ଏବଂ ଯୋଗାଯୋଗ ବିବରଣୀ ଦେଖିପାରିବେ।',
    },
    {
      id: 42,
      title: 'ଉଠାଇବାର ସମୟ କେତେ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ଅକ୍ଷମତା ଲାଲ ଭାବରେ ଦିଆଯାଇଛି ଯେତେବେଳେ ଥଣ୍ଡା ଯନ୍ତ୍ରର କ୍ଷମତାର 80% ରୁ ଅଧିକ ବ୍ୟବହୃତ ହୋଇଛି। ଭବିଷ୍ୟତ ଅକ୍ଷମତା ବିଷୟରେ ସୂଚନା ହେଉଛି ଯେତେବେଳେ ପ୍ରତିଟି ବ୍ୟବହାରକାରୀ ସେଗୁଡିକୁ ଆସିବା ପରେ ଷ୍ଟୋରେ ପ୍ରତିଦିନ ବ୍ୟବହାର କରିବା ଭାବରେ ଘୋଷଣା କରିଛନ୍ତି। ଏହା ଏକ ଅନୁମାନ ମାତ୍ର ଅଟେ ଏବଂ ଏହା ଭୁଲ ହୋଇପାରେ। ତେଣୁ, ଲାଲ ରୁମ ଅକ୍ଷମତା ମାତ୍ର ଏହାର ସୂଚନା ଯେ ରୁମ ପୂରଣ ହେଉଛି। ତୁମେ ଚିନ୍ତା କରିବାର ଆବଶ୍ୟକ ନାହିଁ, କିନ୍ତୁ ପ୍ରସଙ୍ଗାନୁସାରେ କାର୍ଯ୍ୟ ନିଷ୍ପାଦନ କରିପାରିବେ। ଉଦାହରଣ ସ୍ୱରୂପ, ତୁମେ ସେହି ଥଣ୍ଡା ବ୍ୟବହାରକାରୀଙ୍କୁ ଯେଉଁଥିରେ ପଦାର୍ଥର ଉତ୍ପାଦନ ହାଣି ଶୀଘ୍ର ଚେକ୍-ଆଉଟ କରିବାକୁ ସୁପାରିଶ କରିପାରିବେ। "ଡ୍ୟାଶବୋର୍ଡ" ତଳେ ଉତ୍ପାଦନ ଆବଶ୍ୟକତା ସହିତ ଏକ କ୍ରମିକ ତାଲିକା ଦେଖିପାରିବେ।',
    },
    {
      id: 43,
      title: 'ଉଠାଣର ସମୟ କିପରି ଗଣନା କରାଯାଏ? ଏହା କେଉଁ କାରଣ ଦ୍ୱାରା ପ୍ରଭାବିତ ହୁଏ?',
      role: [ERoles.OPERATOR],
      text: 'ତାଜା ପନିପରିବା ଏବଂ ଫଳଗୁଡ଼ିକ ନଷ୍ଟଶୀଳ, ଏବଂ ଅମଳ ପରେ ସେମାନେ କିପରି ସେମାନଙ୍କର ତାଜାତା ହରାଇବେ ତାହା ମୁଖ୍ୟତଃ ତାପମାତ୍ରା ଉପରେ ନିର୍ଭର କରେ। ତେଣୁ, ସଂଗ୍ରହ କରିବାର ସମୟ ସମ୍ପୃକ୍ତ ଶୀତଳୀକରଣ ୟୁନିଟର ତାପମାତ୍ରା ଏବଂ ଶୀତଳୀକରଣ ୟୁନିଟକୁ ଅଣାଯିବା ସମୟରେ ଉତ୍ପାଦର ପ୍ରାରମ୍ଭିକ ଗୁଣବତ୍ତା ଉପରେ ଆଧାର କରି ଗଣନା କରାଯାଏ। ଏହି ଗଣନାରେ ବ୍ୟବହୃତ ପାରାମିଟରଗୁଡ଼ିକ ପ୍ରତ୍ୟେକ ସାମଗ୍ରୀ ପାଇଁ ସ୍ୱତନ୍ତ୍ର। ନଲେଜ୍ ହବ୍‌ରେ ଆପଣ ବିଭିନ୍ନ ସାମଗ୍ରୀ ମଧ୍ୟରେ ନଷ୍ଟଶୀଳତା କିପରି ଭିନ୍ନ ହୁଏ ସେ ବିଷୟରେ କିଛି ଅନ୍ତର୍ଦୃଷ୍ଟି ପାଇପାରିବେ।',
    },
    {
      id: 44,
      title: 'ସଂଗ୍ରହ କରିବାର ସମୟ ୦ ଦିନ, କିନ୍ତୁ ଉତ୍ପାଦିତ ଜିନିଷ ଏବେ ବି ଭଲ ଦେଖାଯାଉଛି। କାହିଁକି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ରଙ୍ଗ ଉଠାଇବା ସମୟ ପୂର୍ବାନୁମାନ ପୂର୍ବରୁ ରହିଥିବା ଦିନଗୁଡିକୁ ପ୍ରତିନିଧିତ୍ୱ କରେ। ତୁମେ ଦେଖିବେ ଯେ ବାର୍ ଲାଲ ହୁଏ ଯେତେବେଳେ ଏହା 2 ଦିନ ରୁ କମ୍ ହୁଏ, ପୀତ ହୁଏ ଯେତେବେଳେ ଏହା 7 ଦିନ ରୁ କମ୍ ହୁଏ, ଏବଂ ସବୁଜ ହୁଏ ଯେତେବେଳେ ଏହା 7 ଦିନ ରୁ ଅଧିକ ହୁଏ। ଏହି ମୂଲ୍ୟ ସମସ୍ତ ଷ୍ଟୋରେ ଆଇଟମ ପାଇଁ ବିଶେଷ ଅଟେ ଏବଂ ଥଣ୍ଡା ଯନ୍ତ୍ରରେ ତାପମାନ ଆଧାରରେ ଦିନକୁ ଅନେକ ଥର ପୁନଃଗଣନା ହୁଏ। ଯଦି କ୍ୟାଲ୍କୁଲେସନ ପାଇଁ କୌଣସି ମୋଡେଲ୍ ଉପଲବ୍ଧ ନାହିଁ, ତେବେ ବାର୍ର ରଙ୍ଗ ଧୂସର ହୋଇଥାଏ।',
    },
    {
      id: 45,
      title: 'ସଂଗ୍ରହ ପାଇଁ ସମୟ ୦ ଦିନରୁ ଅଧିକ, କିନ୍ତୁ ଉତ୍ପାଦିତ ଦ୍ରବ୍ୟ ପ୍ରାୟ ନଷ୍ଟ ହୋଇଗଲାଣି। କାହିଁକି?',
      role: [ERoles.OPERATOR],
      text: 'ଡ୍ୟାଶବୋର୍ଡ ଅଦ୍ୟତନ ହେବାରେ କିଛି ସମୟ ଲାଗିପାରେ। ସେଥିରେ ତୁମେ ସଠିକ୍ ଥଣ୍ଡା ଯନ୍ତ୍ରକୁ ଦେଖୁଛ ନାହିଁ ତାହା ଯାଞ୍ଚ କର। ଯଦି ତୁମେ ଏହି ସମସ୍ୟା ଅବଲମ୍ବନ କରୁଛ, ତେବେ ଆପ୍ଲିକେସନ୍ ସମର୍ଥନ ଟିମ୍କୁ app@yourvcca.org ରେ ରିପୋର୍ଟ କର।',
    },
    {
      id: 46,
      title: 'ସଂଗ୍ରହ ପାଇଁ ସମୟ ୦ ଦିନରୁ ଅଧିକ, କିନ୍ତୁ ଉତ୍ପାଦିତ ଦ୍ରବ୍ୟ ପ୍ରାୟ ନଷ୍ଟ ହୋଇଗଲାଣି। କାହିଁକି?',
      role: [ERoles.OPERATOR],
      text: 'ତୁମେ ଯଦି ଅଦ୍ୟତନ କରିପାରିବା ସମୟ ଯାଇଛ, ତେବେ ଡ୍ୟାଶବୋର୍ଡରେ ଏହା ସମୟ ଲାଗିପାରେ। କିଛି ସମୟ ପରେ ତୁମେ ତାହା ଦେଖିବେ। ଯଦି ଆହୁରି ସମସ୍ୟା ଅଛି, ତେବେ ସମର୍ଥନ ସହିତ ସମ୍ପର୍କ କରିବା ପାଇଁ କିଛି ତଥ୍ୟ ପାଇଁ app@yourvcca.org ରେ ସମ୍ପର୍କ କର।',
    },
    {
      id: 47,
      title:
        'ପରବର୍ତ୍ତୀ ଗୋଟିଏ ଦିନ ପାଇଁ ରୁମ୍ ଅକ୍ୟୁପାନ୍ସି ଲାଲ ରଙ୍ଗର ହେବ (୨୦% ରୁ କମ୍)। ଏହା କ’ଣ ଉପରେ ଆଧାରିତ? ମୁଁ ଚିନ୍ତିତ ହେବା ଉଚିତ କି?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'ଯେତେବେଳେ କୁଲିଂ ୟୁନିଟ୍ କ୍ଷମତାର 80% ରୁ ଅଧିକ ବ୍ୟବହାର କରାଯାଏ, ସେତେବେଳେ ଅକ୍ୟୁପାନ୍ସି ଲାଲ ଭାବରେ ଦେଖାଯାଏ। ଭବିଷ୍ୟତ ଅକ୍ୟୁପାନ୍ସି ବିଷୟରେ ସୂଚନା ପ୍ରତ୍ୟେକ ଉପଭୋକ୍ତା ଚେକ୍-ଇନ୍ ସମୟରେ ଷ୍ଟୋରେଜ୍ ପାଇଁ ଯୋଜନାବଦ୍ଧ ଦିନ ଭାବରେ ଘୋଷଣା କରିଥିବା ଦିନ ସଂଖ୍ୟା ଉପରେ ଆଧାରିତ। ସତର୍କ ରୁମ୍ ଅକ୍ୟୁପାନ୍ସି କେବଳ ଏକ ସଙ୍କେତ ଯେ ରୁମ୍ ପୂର୍ଣ୍ଣ ହେଉଛି। ଆପଣଙ୍କୁ ଚିନ୍ତା କରିବାର ଆବଶ୍ୟକତା ନାହିଁ କିନ୍ତୁ ସେହି ଅନୁସାରେ ପଦକ୍ଷେପ ନେଇପାରିବେ। ଉଦାହରଣ ସ୍ୱରୂପ, ଯେଉଁ ଶୀତଳ ବ୍ୟବହାରକାରୀମାନଙ୍କର ଷ୍ଟୋରେଜ୍ ସାମଗ୍ରୀ ସଂଗ୍ରହ ପାଇଁ ସର୍ବନିମ୍ନ ସମୟ ଅଛି ସେମାନଙ୍କୁ ଶୀଘ୍ର ଯାଞ୍ଚ କରିବାକୁ ପରାମର୍ଶ ଦେବା ପାଇଁ ଯୋଗାଯୋଗ କରିବା ବିଷୟରେ ବିଚାର କରନ୍ତୁ। ଆପଣ ସମୟ ଅନୁସାରେ ଅର୍ଡର କରିବା ସମୟରେ "ଡ୍ୟାସବୋର୍ଡ" ଅଧୀନରେ ଯାଞ୍ଚ କରିବାକୁ ସବୁଠାରୁ ଜରୁରୀ ଜିନିଷଗୁଡ଼ିକର ଏକ ଅର୍ଡର ତାଲିକା ଦେଖିପାରିବେ।',
    },
    {
      id: 48,
      title:
        'ଜଣେ କୁଲିଂ ବ୍ୟବହାରକାରୀ ରୁମକୁ ଏପରି ଏକ ସାମଗ୍ରୀ ଆଣୁଛନ୍ତି ଯାହା ତାଲିକାରେ ନାହିଁ। ମୁଁ କ’ଣ ତାହା ଏବେ ବି ଯାଞ୍ଚ କରିପାରିବି?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'ନିଶ୍ଚିତ, ଏହି କ୍ଷେତ୍ରରେ ଆପଣ କମୋଡିଟି ତାଲିକାରୁ "ଅନ୍ୟ" ଚୟନ କରି ଯାଞ୍ଚ ଆରମ୍ଭ କରିପାରିବେ। "ଅତିରିକ୍ତ ସୂଚନା" ଅଧୀନରେ, ଆପଣ କମୋଡିଟିର ନାମ ମଧ୍ୟ ଟାଇପ୍ କରିପାରିବେ, ଯାହା ଆପଣଙ୍କୁ ପୁଣି ଥରେ ଖୋଜିବାରେ ସାହାଯ୍ୟ କରିବ।',
    },
    {
      id: 49,
      title: "ଡ୍ୟାସବୋର୍ଡରେ, ପ୍ରତ୍ୟେକ ଜିନିଷର ଏକ ରଙ୍ଗୀନ ବାର୍ ଅଛି। ବାର୍ ର ରଙ୍ଗ କ'ଣ ଦର୍ଶାଏ?",
      role: [ERoles.EMPLOYEE],
      text: 'ଏହି ରଙ୍ଗ ଉଠାଇବା ସମୟ ପୂର୍ବରୁ ବାକି ଥିବା ଦିନଗୁଡ଼ିକୁ ପ୍ରତିନିଧିତ୍ୱ କରେ। 2 ଦିନରୁ କମ୍ ହେଲେ ଆପଣ ବାର୍‌କୁ ଲାଲ ରଙ୍ଗରେ, 7 ଦିନରୁ କମ୍ ହେଲେ ହଳଦିଆ ରଙ୍ଗରେ ଏବଂ 7 ଦିନରୁ ଅଧିକ ହେଲେ ସବୁଜ ରଙ୍ଗରେ ଦେଖିବେ। ଏହି ମୂଲ୍ୟଗୁଡ଼ିକ ପ୍ରତ୍ୟେକ ଷ୍ଟୋରେଜ୍ ଆଇଟମ୍ ପାଇଁ ନିର୍ଦ୍ଦିଷ୍ଟ ଏବଂ କୁଲିଂ ୟୁନିଟ୍‌ର ତାପମାତ୍ରା ଉପରେ ଆଧାର କରି ଦିନକୁ ଅନେକ ଥର ପୁନଃଗଣନା କରାଯାଏ। ଯେତେବେଳେ ଗଣନା ପାଇଁ କୌଣସି ମଡେଲ୍ ଉପଲବ୍ଧ ନଥାଏ, ସେତେବେଳେ ବାର୍‌ର ରଙ୍ଗ ଧୂସର ରଙ୍ଗ ହେବ।',
    },
    {
      id: 50,
      title:
        'ମୁଁ ସଫଳତାର ସହ ଏକ ଚେକ୍ ଇନ୍ ସମାପ୍ତ କରିଛି କିନ୍ତୁ ଏପର୍ଯ୍ୟନ୍ତ ଡ୍ୟାସବୋର୍ଡରେ ଥିବା ଜିନିଷଗୁଡ଼ିକ ଦେଖିପାରୁନାହିଁ। କାହିଁକି?',
      role: [ERoles.OPERATOR],
      text: 'ଡ୍ୟାସବୋର୍ଡ ଅପଡେଟ୍ ହେବାକୁ କିଛି ସମୟ ଲାଗିପାରେ। ଦୟାକରି ଯାଞ୍ଚ କରନ୍ତୁ ଯେ ଆପଣ ସଠିକ୍ କୁଲିଂ ୟୁନିଟ୍ ଖୋଜୁଛନ୍ତି କି ନାହିଁ। ଯଦି ଆପଣ ସମସ୍ୟାକୁ ବାରମ୍ବାର ଦେଖୁଛନ୍ତି, ତେବେ ଦୟାକରି app@yourvcca.org କୁ ରିପୋର୍ଟ କରନ୍ତୁ।',
    },
    {
      id: 51,
      title:
        'ମୁଁ ସଫଳତାର ସହ ଏକ ଚେକ୍ ଆଉଟ୍ ସମାପ୍ତ କରିଛି କିନ୍ତୁ ଏବେ ବି ଡ୍ୟାସବୋର୍ଡରେ ଥିବା ଜିନିଷଗୁଡ଼ିକ ଦେଖିପାରୁଛି। କାହିଁକି?',
      role: [ERoles.OPERATOR],
      text: 'ଡ୍ୟାସବୋର୍ଡ ଅପଡେଟ୍ ହେବା ପାଇଁ କିଛି ସମୟ ନେଇପାରେ। ଦୟାକରି ଯାଞ୍ଚ କରନ୍ତୁ ଯେ ଆପଣ ଯେଉଁ ଜିନିଷଗୁଡ଼ିକ ଚେକ୍-ଆଉଟ୍ କରିଛନ୍ତି ତାହା ସଠିକ୍ ଥିଲା କି ନାହିଁ, ଏବଂ ଆପଣ ସଠିକ୍ କୁଲିଂ ୟୁନିଟ୍‌ରେ ଖୋଜୁଛନ୍ତି କି ନାହିଁ। ଯଦି ଆପଣ ସମସ୍ୟାକୁ ବାରମ୍ବାର ଦେଖୁଛନ୍ତି, ତେବେ ଦୟାକରି app@yourvcca.org କୁ ରିପୋର୍ଟ କରନ୍ତୁ।',
    },
    {
      id: 52,
      title: 'ତାପମାତ୍ରା ସେନ୍ସରଟି ଠିକ୍ ଭାବରେ କାମ କରୁଛି କି ନାହିଁ ମୁଁ କିପରି ଯାଞ୍ଚ କରିପାରିବି?',
      role: [ERoles.OPERATOR],
      text: 'ଆପ୍ ବିକାଶ କରୁଥିବା ଦଳ ଥଣ୍ଡା ବ୍ୟବହାରକାରୀଙ୍କର କିଛି ମୂଳଭୂତ ସୂଚନା ସଂଗ୍ରହ କରୁଛି, ଯାହାକି ସ୍ଥାପନା ସୂଚନା ଭାବରେ ଏହାକୁ ପ୍ରଥମ ଥର ରୁମ ବ୍ୟବହାର କରିବା ସମୟରେ ସଂଗ୍ରହ କରାଯାଇଥାଏ। ଏହାର ଏକମାତ୍ର ଉଦ୍ଦେଶ୍ୟ ହେଉଛି ଆପ୍ ଡିଜାଇନ୍ ଏବଂ ଶୀତଳ କକ୍ଷ ବ୍ୟବହାର ଉପରେ ସୁଧାର କରିବା।',
    },
    {
      id: 53,
      title: 'ମୁଁ ଏକ ସୂଚନା ପାଇଲି ଯେ ସେନ୍ସର କାମ କରୁନାହିଁ। ମୁଁ କଣ କରିବା ଉଚିତ?',
      role: [ERoles.OPERATOR],
      text: 'ତୁମେ ଗୋଟିଏ ଥଣ୍ଡା ବ୍ୟବହାରକାରୀ ସହିତ ସମ୍ପର୍କ କରିବାକୁ ପ୍ରଶ୍ନ କରାଯିବାକୁ ସୁଚିତ ହେବ, ଯେଉଁଥିରେ ସେ ସମ୍ପ୍ରତି ରୁମରୁ କିଛି ପଦାର୍ଥ ଚେକ୍-ଆଉଟ୍ କରିଛନ୍ତି ଏବଂ ସେ କେଉଁଠି ଏବଂ କେତେ ବିକ୍ରୟ କରିଛନ୍ତି ତାହା ପଚାରାଯିବ। ଏହି ସୂଚନା ଆପ୍ ବିକାଶ କରୁଥିବା ଦଳକୁ ବଜାର ମୂଲ୍ୟ ଅନୁମାନର ସଠିକ୍ତା ସନ୍ଧାନ କରିବାରେ ସାହାଯ୍ୟ କରିବ।',
    },
    {
      id: 54,
      title: 'ଯଦି ସେନ୍ସର ନାହିଁ, ତେବେ ଉଠାଇବା ସମୟ କିପରି ଗଣନା କରାଯାଇପାରିବ?',
      role: [ERoles.EMPLOYEE],
      text: 'ଟ୍ୟୁଟୋରିଆଲ୍ ଏବଂ FAQ ସେକ୍ସନ୍ ଯାଞ୍ଚ କରିବାକୁ ନିଶ୍ଚିତ କର, କାରଣ ସେଥିରେ ଆପ୍ ସମ୍ପର୍କରେ ଉପକୃତ ସୂଚନା ଥାଏ ଯାହା ତୁମର ପ୍ରଶ୍ନଗୁଡିକୁ ସ୍ପଷ୍ଟ କରିବାରେ ସାହାଯ୍ୟ କରିପାରେ। ଯଦି ତୁମେ ଆପ୍ ସହାୟତା ଦଳ ସହିତ ସମ୍ପର୍କ କରିବାକୁ ଚାହାଁ, ତେବେ app@yourvcca.org କୁ ଇମେଲ୍ ପଠାଇବାକୁ ଆଗ୍ରହ କର।',
    },
    {
      id: 55,
      title: 'ପ୍ରତ୍ୟେକ ଥର ମୁଁ ଚେକ୍-ଇନ୍ ଆରମ୍ଭ କଲେ, ମୋତେ ତାପମାତ୍ରା ଆଲର୍ଟ ପପଅପ୍ ମିଳେ। କାହିଁକି?',
      role: [ERoles.OPERATOR],
      text: 'ଟ୍ୟୁଟୋରିଆଲ୍ ଏବଂ FAQ ସେକ୍ସନ୍ ଯାଞ୍ଚ କରିବାକୁ ନିଶ୍ଚିତ କର, କାରଣ ସେଥିରେ ଆପ୍ ସମ୍ପର୍କରେ ଉପକୃତ ସୂଚନା ଥାଏ ଯାହା ତୁମର ପ୍ରଶ୍ନଗୁଡିକୁ ସ୍ପଷ୍ଟ କରିବାରେ ସାହାଯ୍ୟ କରିପାରେ। ଯଦି ତୁମର ପ୍ରଶ୍ନ ଏପରି ମିଳୁନାହିଁ, ତେବେ ତୁମେ ଯେଉଁ ତାଲିକାକାରୀ କର୍ମଚାରୀ ସହିତ ସମ୍ପର୍କ କରୁଛ ତାଙ୍କୁ ସମ୍ପର୍କ କର।',
    },
    {
      id: 56,
      title:
        'ପ୍ରତ୍ୟେକ ଥର ମୁଁ ଚେକ୍-ଆଉଟ୍ ସମାପ୍ତ କରିବା ସମୟରେ, ମୋତେ ତାପମାତ୍ରା ଆଲର୍ଟ ପପଅପ୍ ମିଳେ। କାହିଁକି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଦୟାକରି ସୁନିଶ୍ଚିତ କରିବାକୁ ଯେ ତୁମେ ସର୍ବଶେଷ ଆପ୍ ସଂସ୍କରଣ ସଂସ୍ଥାପିତ କରିଛ। ଯଦି ସମସ୍ୟା ଅବସ୍ଥାନ କରିଥାଏ, ତେବେ ଆପ୍ ସହାୟତା ଦଳକୁ ସୂଚନା ଦେବାକୁ app@yourvcca.org କୁ ଇମେଲ୍ ପଠାଇବାକୁ କିମ୍ବା ମତାମତ ଫର୍ମ ଭରିବାକୁ: https://forms.gle/ceohKHT2QCcE3rFs5 ।',
    },
    {
      id: 57,
      title:
        'ପ୍ରଥମ କ୍ରେଟରେ ଯାଞ୍ଚ କରିବା ପୂର୍ବରୁ ମୁଁ କାହିଁକି ଜଣେ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ ପ୍ରଶ୍ନାବଳୀ ପୂରଣ କରିବାକୁ କହିବି?',
      role: [ERoles.OPERATOR],
      text: 'ଦୟାକରି ସୁନିଶ୍ଚିତ କରିବାକୁ ଯେ ତୁମେ ସର୍ବଶେଷ ଆପ୍ ସଂସ୍କରଣ ସଂସ୍ଥାପିତ କରିଛ। ଯଦି ସମସ୍ୟା ଅବସ୍ଥାନ କରିଥାଏ, ତେବେ ତୁମେ ଯେଉଁ ତାଲିକାକାରୀ କର୍ମଚାରୀ ସହିତ ସମ୍ପର୍କ କରୁଛ ତାଙ୍କୁ ସମ୍ପର୍କ କରିବାକୁ କିମ୍ବା ଆପ୍ ସହାୟତା ଦଳକୁ ସୂଚନା ଦେବାକୁ app@yourvcca.org କୁ ଇମେଲ୍ ପଠାଇବାକୁ କିମ୍ବା ମତାମତ ଫର୍ମ ଭରିବାକୁ: https://forms.gle/2gKVzZjkJSPqEAan9 ।',
    },
    {
      id: 58,
      title: 'ଆପ୍‌ରେ ପଞ୍ଜିକରଣ କରିବା ସମୟରେ ମୋତେ କାହିଁକି ଏକ ପ୍ରଶ୍ନାବଳୀ ପୂରଣ କରିବାକୁ ପଡିବ?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପ୍ ସହାୟତା ଦଳ ତୁମର ଆପ୍ ବ୍ୟବହାର ବିଷୟରେ ମତାମତ ଶୁଣିବାକୁ ଚାହେଁ ଏବଂ ତୁମର ମତାମତ ସ୍ୱାଗତ କରେ, ଦୟାକରି app@yourvcca.org କୁ ଇମେଲ୍ ପଠାଇବାକୁ କିମ୍ବା ମତାମତ ଫର୍ମ ଭରିବାକୁ: https://forms.gle/ceohKHT2QCcE3rFs5 ।',
    },
    {
      id: 60,
      title:
        'ପ୍ରତ୍ୟେକ ଷ୍ଟୋରେଜ୍ ଜିନିଷର ବିକ୍ରୟ ମୂଲ୍ୟ ବିଷୟରେ ମୁଁ କାହିଁକି କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ ପଚାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଏହି ଟ୍ୟାବରେ, ଆପଣ ବଜାର ମୂଲ୍ୟ ପୂର୍ବାନୁମାନକୁ ଗ୍ରାଫ୍ କିମ୍ବା ଟେବଲ୍ ଫର୍ମାଟ୍ରେ ଦେଖିପାରିବେ। ମୂଲ୍ୟ ପ୍ରବୃତ୍ତି ପୃଷ୍ଠା ଶେଷ ଏକ ମାସର ତଥ୍ୟ ଏବଂ ଏକ ବିଶିଷ୍ଟ ବଜାର ଏବଂ ମାଲ୍ (ଭାରତରେ) ପାଇଁ 14-ଦିନର ପୂର୍ବାନୁମାନକୁ କିମ୍ବା ଏକ ରାଜ୍ୟ ପ୍ରତି ମାସିକ ପୂର୍ବାନୁମାନକୁ (ନାଇଜେରିଆରେ) ଦୃଶ୍ୟମାନ କରେ। ମୂଲ୍ୟ ରେଙ୍କିଂ ପୃଷ୍ଠା ସମସ୍ତ ବଜାର ମୂଲ୍ୟ ପୂର୍ବାନୁମାନକୁ ସର୍ବୋଚ୍ଚରୁ ନିଚାରେ ଅନୁକ୍ରମ କରେ, ଏବଂ ତାରିଖ, ରାଜ୍ୟ, ଜିଲ୍ଲା ଏବଂ ବଜାର (ଭାରତରେ) ଦ୍ୱାରା ଫିଲ୍ଟର କରିବାର ସାମର୍ଥ୍ୟ ସହିତ।',
    },
    {
      id: 61,
      title: 'ମୁଁ ଆପର କିଛି ଅଂଶ ବୁଝିପାରୁନାହିଁ। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଟ୍ୟୁଟୋରିଆଲ୍ ଏବଂ FAQ ବିଭାଗ ଯାଞ୍ଚ କରିବାକୁ ନିଶ୍ଚିତ କରନ୍ତୁ, କାରଣ ଏଥିରେ ଆପ୍ ବିଷୟରେ ଉପଯୋଗୀ ସୂଚନା ଅଛି ଯାହା ଆପଣଙ୍କ ପ୍ରଶ୍ନଗୁଡ଼ିକୁ ସ୍ପଷ୍ଟ କରିବାରେ ସାହାଯ୍ୟ କରିପାରେ। ଯଦି ଆପଣ ଆପ୍ ସମର୍ଥନ ଦଳ ସହିତ ଯୋଗାଯୋଗ କରିବାକୁ ଚାହାଁନ୍ତି, ଦୟାକରି app@yourvcca.org କୁ ଏକ ଇମେଲ୍ ପଠାନ୍ତୁ।',
    },
    {
      id: 62,
      title: 'ମୁଁ ଆପର କିଛି ଅଂଶ ବୁଝିପାରୁନାହିଁ। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଭବିଷ୍ୟତ ମାର୍କେଟ ମୂଲ୍ୟ ମୂଲ୍ୟାଙ୍କନ କରିବାକୁ ଏକ ମ୍ୟାଚିନ୍ ଲେର୍ଣ୍ଣିଙ୍ଗ୍ ମୋଡେଲ୍ ପୂର୍ବ ମାର୍କେଟ ମୂଲ୍ୟ ତଥ୍ୟ ଏବଂ ଅନ୍ୟାନ୍ୟ ତଥ୍ୟ ଯେପରିକି କରେନ୍ସୀ କନଭର୍ସନ୍ ରେଟ୍ ଏବଂ ପେଟ୍ରୋଲ୍ ମୂଲ୍ୟ ଉପରେ ଟ୍ରେନ୍ କରାଯାଇଥାଏ।',
    },
    {
      id: 66,
      title: 'ମୁଁ ଆପର କିଛି ଅଂଶ ବୁଝିପାରୁନାହିଁ। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.COOLING_USER],
      text: 'ଆପଣ "Complete later" କ୍ଲିକ୍ କରି ଅନୁସନ୍ଧାନ ପ୍ରଶ୍ନଗୁଡିକୁ ସ୍କିପ୍ କରିପାରିବେ। ଆପଣ ଏହି ସର୍ଭେ କୁ "ଖାତା ବିବରଣୀ" ରେ ଭାଗ ଭାଗ ମଧ୍ୟରେ ସମୟରେ ପୂରଣ କରିପାରିବେ। ତେବେ, ଆପଣ ବାସ୍ତବରେ ଅନୁସନ୍ଧାନ ପ୍ରଶ୍ନଗୁଡିକୁ ସାଇନ୍ ଅପ୍ ସମୟରେ ସବୁଦିନ ସମୟ ନେଇ ଉତ୍ତର ଦେବାକୁ ସୁପାରିଶ କରାଯାଉଛି: ଏହା ଆପଣକୁ Coldtivate ଆପ୍ ସହିତ ଏକ ଅଧିକ ସାରଗର୍ଭୀୟ ଅନୁଭବ ମିଳିବ!',
    },
    {
      id: 67,
      title: 'ମୁଁ ଆପରେ ଏକ ବଗ୍ ପାଇଛି। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.COOLING_USER],
      text: 'ଦୟାକରି ନିଶ୍ଚିତ କରନ୍ତୁ ଯେ ଆପଣ ଆପ୍‌ର ନବୀନତମ ସଂସ୍କରଣ ସଂସ୍ଥାପିତ କରିଛନ୍ତି। ଯଦି ସମସ୍ୟା ଲାଗି ରହେ, ଦୟାକରି app@yourvcca.org କୁ ଏକ ଇମେଲ୍ ପଠାଇ କିମ୍ବା ମତାମତ ଫର୍ମ ପୂରଣ କରି ଆପ୍ ସମର୍ଥନ ଦଳକୁ ସୂଚିତ କରନ୍ତୁ: https://forms.gle/ceohKHT2QCcE3rFs5।',
    },
    {
      id: 68,
      title: 'ଆପରେ କିଛି ଠିକ୍ ଭାବରେ କାମ କରୁନାହିଁ। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.OPERATOR],
      text: 'ଯଦି କୋଠାରେ ତାପମାତ୍ରା ସେନସର୍‌ଗୁଡିକୁ Coldtivate ଆପ୍‌ସହିତ ସଂଯୋଜନ କରାଯାଇପାରିବ, ଦୟାକରି ଆପଣଙ୍କର ଦାୟିତ୍ୱ ଓଠାରେ ସଂଯୋଗ କରନ୍ତୁ। Coldtivateରେ ସୃଷ୍ଟି ହୋଇଥିବା କୁଲିଂ ଇନ୍ଇଟ୍‌ସହିତ ସେନସର୍‌ଗୁଡିକୁ ଲିଙ୍କ୍ କରିବା ପାଇଁ କେବଳ ରେଜିଷ୍ଟର୍ ହୋଇଥିବା କର୍ମଚାରୀ ଭୂମିକା ଥିବା ବ୍ୟକ୍ତିଙ୍କୁ ସୁମିତ କରାଯିବ।',
    },
    {
      id: 69,
      title: 'ଆପରେ କିଛି ଠିକ୍ ଭାବରେ କାମ କରୁନାହିଁ। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.COOLING_USER],
      text: 'ଦୟାକରି ନିଶ୍ଚିତ କରନ୍ତୁ ଯେ ଆପଣ ଆପ୍‌ର ସର୍ବଶେଷ ସଂସ୍କରଣ ସଂସ୍ଥାପିତ କରିଛନ୍ତି। ଯଦି ସମସ୍ୟା ଜାରି ରହେ, ଦୟାକରି ଏକ ଶୀତଳ କୋଠରୀର ଅପରେଟରଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ ଏବଂ / କିମ୍ବା app@yourvcca.org କୁ ଏକ ଇମେଲ୍ ପଠାଇ ଆପ୍ ସମର୍ଥନ ଦଳକୁ ସୂଚିତ କରନ୍ତୁ।',
    },
    {
      id: 70,
      title:
        'ମୁଁ ଆପ୍ ସହିତ ମୋର ଅଭିଜ୍ଞତା ବିଷୟରେ ମତାମତ ଦେବାକୁ ଚାହୁଁଛି। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.COOLING_USER],
      text: 'ଉଠାଇବା ସମୟ ପୂର୍ବାନୁମାନ ମୂଲ୍ୟ ଅଟେ। ତେଣୁ, କେତେକ ଅସାଧାରଣ ଘଟଣା ଘଟିପାରେ, ଯେଉଁଥିରେ ଉତ୍ପାଦନ ଉଠାଇବା ସମୟ 0 ଠାରୁ ଅଧିକ ହେବା ସତ୍ୱେ ଖରାପ ହେବାକୁ ଯାଉଛି। ତାଜା ପଦାର୍ଥର ଗୁଣତା ହାନି ମୁଖ୍ୟତଃ ତାପମାନ ଉପରେ ନିର୍ଭର କରେ, ତେଣୁ ତାପମାନ ତଥ୍ୟ ଅନୁମାନକୁ ଅଧିକ ସଠିକ୍ କରିବାରେ ସାହାଯ୍ୟ କରେ। ଉଦାହରଣ ସ୍ୱରୂପ, ସମସ୍ୟା ତାପମାନ ସେନ୍ସର ଆପ୍ ସହିତ ଯୋଡାଯାଇନଥିଲେ ଆସିପାରେ, ଏବଂ ଓପରେଟର ଆପ୍ ରେ ରୁମର ତାପମାନ ପ୍ରତି ନିୟମିତ ଅପଡେଟ୍ କରିନଥିଲେ। ଯଦି ଏହା ଘଟିଲେ ଓପରେଟରକୁ ସୂଚିତ କରିବେ।',
    },
    {
      id: 71,
      title:
        'ମୁଁ ଆପ୍ ସହିତ ମୋର ଅଭିଜ୍ଞତା ବିଷୟରେ ମତାମତ ଦେବାକୁ ଚାହୁଁଛି। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.COOLING_USER],
      text: 'ଆପ୍ ବିକାଶ କରୁଥିବା ଦଳ ଥଣ୍ଡା ବ୍ୟବହାରକାରୀଙ୍କର କିଛି ମୂଳଭୂତ ସୂଚନା ସଂଗ୍ରହ କରୁଛି, ଯାହାକି ସ୍ଥାପନା ସୂଚନା ଭାବରେ ଏହାକୁ ପ୍ରଥମ ଥର ରୁମ ବ୍ୟବହାର କରିବା ସମୟରେ ସଂଗ୍ରହ କରାଯାଇଥାଏ। ଏହାର ଏକମାତ୍ର ଉଦ୍ଦେଶ୍ୟ ହେଉଛି ଆପ୍ ଡିଜାଇନ୍ ଏବଂ ଶୀତଳ କକ୍ଷ ବ୍ୟବହାର ଉପରେ ସୁଧାର କରିବା।',
    },
    {
      id: 73,
      title:
        'ମୁଁ ଆପ୍ ସହିତ ମୋର ଅଭିଜ୍ଞତା ବିଷୟରେ ମତାମତ ଦେବାକୁ ଚାହୁଁଛି। ମୁଁ କାହା ସହିତ ଯୋଗାଯୋଗ କରିବା ଉଚିତ?',
      role: [ERoles.COOLING_USER],
      text: 'ଟ୍ୟୁଟୋରିଆଲ୍ ଏବଂ FAQ ସେକ୍ସନ୍ ଯାଞ୍ଚ କରିବାକୁ ନିଶ୍ଚିତ କର, କାରଣ ସେଥିରେ ଆପ୍ ସମ୍ପର୍କରେ ଉପକୃତ ସୂଚନା ଥାଏ ଯାହା ତୁମର ପ୍ରଶ୍ନଗୁଡିକୁ ସ୍ପଷ୍ଟ କରିବାରେ ସାହାଯ୍ୟ କରିପାରେ। ଯଦି ତୁମର ପ୍ରଶ୍ନ ଏପରି ମିଳୁନାହିଁ, ତେବେ ତୁମେ ଗୋଟିଏ ଶୀତଳ କକ୍ଷ ଅପରେଟର ସହିତ ସମ୍ପର୍କ କରିବାକୁ କିମ୍ବା app@yourvcca.org କୁ ଇମେଲ୍ ପଠାଇବାକୁ ପ୍ରୟାସ କର।',
    },
    {
      id: 74,
      title:
        'ମୁଁ ଏପରି ଏକ ଅଞ୍ଚଳରେ ଅଛି ଯେଉଁଠାରେ ଇଣ୍ଟରନେଟ୍ ସଂଯୋଗ କମ୍ ଅଛି: ମୁଁ କ’ଣ ଏବେ ବି ଆପ୍ ବ୍ୟବହାର କରିପାରିବି?',
      role: [ERoles.COOLING_USER],
      text: 'ଦୟାକରି ସୁନିଶ୍ଚିତ କରିବାକୁ ଯେ ତୁମେ ସର୍ବଶେଷ ଆପ୍ ସଂସ୍କରଣ ସଂସ୍ଥାପିତ କରିଛ। ଯଦି ସମସ୍ୟା ଅବସ୍ଥାନ କରିଥାଏ, ତେବେ ତୁମେ ଗୋଟିଏ ଶୀତଳ କକ୍ଷ ଅପରେଟର ସହିତ ସମ୍ପର୍କ କରିବାକୁ କିମ୍ବା ଆପ୍ ସହାୟତା ଦଳକୁ ସୂଚନା ଦେବାକୁ app@yourvcca.org କୁ ଇମେଲ୍ ପଠାଇବାକୁ ପ୍ରୟାସ କର।',
    },
    {
      id: 75,
      title: "'ଫସଲ ମୂଲ୍ୟ' ଆଇକନ ଉପରେ କ୍ଲିକ୍ କଲେ କେଉଁ ମୂଲ୍ୟ ପ୍ରଦର୍ଶିତ ହୁଏ?",
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣ "ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" କୁ ଗୋଟେଇ ଡିଲିଟ୍ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରି ଆପଣଙ୍କର ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରିପାରିବେ। ଦୟାକରି ସାବଧାନ ରୁହନ୍ତୁ, ଏହି କାର୍ଯ୍ୟ ପୂର୍ବବର୍ତୀ ହେବାକୁ ସମ୍ଭବ ନୁହେଁ! ଯଦି ଆପଣ କମ୍ପାନୀର ସେଷ ନନ୍ଦିତ କର୍ମଚାରୀ ଅଛନ୍ତି, ତେବେ ଏହି କାର୍ଯ୍ୟ କମ୍ପାନୀକୁ ଡିଲିଟ୍ କରିଦେବ। ଯଦି କିଛି ପେଣ୍ଡିଂ ଚେକ-ଇନ୍ ଅଛି, ତେବେ ସମସ୍ତ କିଟା ଏକ ଆପ୍ ଦ୍ୱାରା ଚେକ-ଆଉଟ୍ ହୋଇଯାଇଥିବା ପର୍ଯ୍ୟନ୍ତ ଆପଣ ଆପଣଙ୍କର ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରିପାରିବେ ନାହିଁ।',
    },
    {
      id: 76,
      title: "'ଫସଲ ମୂଲ୍ୟ' ବିଭାଗରେ କିଛି ରାଜ୍ୟ ଏବଂ ବଜାର କାହିଁକି ଲୁପ୍ତ?",
      role: [ERoles.OPERATOR],
      text: 'ଆପଣ "ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" କୁ ଗୋଟେଇ ଡିଲିଟ୍ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରି ଆପଣଙ୍କର ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରିପାରିବେ। ଦୟାକରି ସାବଧାନ ରୁହନ୍ତୁ, ଏହି କାର୍ଯ୍ୟ ପୂର୍ବବର୍ତୀ ହେବାକୁ ସମ୍ଭବ ନୁହେଁ! ଯଦି ଆପଣ ଯେଉଁଠାରେ ଖୋଲା ଚେକ-ଇନ୍ ଅଛି ସେହି ରୁମର ସେଷ ଓପରେଟର ଅଛନ୍ତି, ତେବେ ଆପଣ ଆପଣଙ୍କର ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରିପାରିବେ ନାହିଁ, ଯଦି ଏକ ନନ୍ଦିତ କର୍ମଚାରୀ ଅନ୍ୟ ଓପରେଟର୍ ରୁମକୁ ନିଯୁକ୍ତ କରେ, କିମ୍ବା ସମସ୍ତ କିଟା ଆପ୍ ଦ୍ୱାରା ଚେକ-ଆଉଟ୍ ହୋଇଯାଇଥାଏ।',
    },
    {
      id: 77,
      title: 'ଭବିଷ୍ୟତର ବଜାର ମୂଲ୍ୟ କିପରି ଗଣନା କରାଯାଏ?',
      role: [ERoles.COOLING_USER],
      text: 'ଆପଣ "ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" କୁ ଗୋଟେଇ ଡିଲିଟ୍ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରି ଆପଣଙ୍କର ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରିପାରିବେ। ଦୟାକରି ସାବଧାନ ରୁହନ୍ତୁ, ଏହି କାର୍ଯ୍ୟ ପୂର୍ବବର୍ତୀ ହେବାକୁ ସମ୍ଭବ ନୁହେଁ! ଯଦି ଆପଣ କିଛି ଖୋଲା ଚେକ-ଇନ୍ ରହିଥିବା ରୁମରେ ଅଛନ୍ତି, ତେବେ ସମସ୍ତ କିଟା ରୁମରୁ ଚେକ-ଆଉଟ୍ ହୋଇଯାଇପାରିବେ ନାହିଁ। ଦୟାକରି ନିଶ୍ଚିତ କରନ୍ତୁ ଯେ ଆପଣଙ୍କର କିଟା ରୁମରେ ସଂଗ୍ରହ କରାଯାଇଛି! ଯଦି ଆପଣ ଭାବନ୍ତି ଯେ ଆପ୍ ମଧ୍ୟରେ କିଛି ପେଣ୍ଡିଂ କିଟା ଅଛି ଯାହାକୁ ଆପଣ ପୂର୍ବରୁ ହଟାଇଛନ୍ତି, ଦୟାକରି ରୁମର ଓପରେଟର ସହ ସଂଯୋଗ କରନ୍ତୁ।',
    },
    {
      id: 78,
      title: 'ମୁଁ ମୋର ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରିବାକୁ ଚାହୁଁଛି। ମୁଁ କଣ କରିବା ଉଚିତ?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣ "ମେନୁ" -> "ମ୍ୟାନେଜମେଣ୍ଟ" -> "କୁଲିଂ ଏକକ" / "ସ୍ଥାନ" କୁ ଯାଇ ଡିଲିଟ୍ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରି କୁଲିଂ ଏକକ ଏବଂ ସ୍ଥାନଗୁଡିକୁ ଡିଲିଟ୍ କରିପାରିବେ। ଆପଣ ତେବେ ଏହା କରିପାରିବେ ଯଦି ରୁମରେ କେୂ ତୃଟି ଚେକ-ଇନ୍ ନାହିଁ। ଅନ୍ୟଥା, ଦୟାକରି ଓପରେଟରମାନେ ସହ ସଂଯୋଗ କରନ୍ତୁ ଯାହା ଚେକ-ଆଉଟ୍ ସମ୍ପୂର୍ଣ୍ଣ କରିବାକୁ।',
    },
    {
      id: 79,
      title: 'ମୁଁ ମୋର ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରିବାକୁ ଚାହୁଁଛି। ମୁଁ କଣ କରିବା ଉଚିତ?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣ ଅନ୍ୟ ଉପଭୋକ୍ତାମାନେ କୁ ଆପ୍ରୁ ଡିଲିଟ୍ କରିବାକୁ ଅନୁମତି ନାହିଁ। ତଥାପି, ଆପଣ "ମେନୁ" -> "ମ୍ୟାନେଜମେଣ୍ଟ" -> "ଓପରେଟର୍ସ" କୁ ଯାଇ କମ୍ପାନୀର ରୁମ୍ରୁ ଓପରେଟର୍ମାନେ କୁ ଅନସଂଯୋଗ କରିପାରିବେ। ଯଦି ଆପଣ ତଥାପି ଆପଣଙ୍କର କମ୍ପାନୀକୁ ପ୍ରବେଶ ନ ଦେବା ପାଇଁ ଉପଭୋକ୍ତା କୁ ପୂର୍ଣ୍ଣ ଭାବେ ହଟାଇବାକୁ ଚାହାଁଛନ୍ତି, ଦୟାକରି app@yourvcca.org କୁ ଏକ ଇମେଲ୍ ଲେଖନ୍ତୁ ଏବଂ କାହିଁକି ଏହି କାର୍ଯ୍ୟ ଆବଶ୍ୟକ ହେଉଛି ତାହା ବିବେଚନା କରନ୍ତୁ।',
    },
    {
      id: 80,
      title: 'ମୁଁ ମୋର ଆକାଉଣ୍ଟ୍ ଡିଲିଟ୍ କରିବାକୁ ଚାହୁଁଛି। ମୁଁ କଣ କରିବା ଉଚିତ?',
      role: [ERoles.OPERATOR],
      text: 'ଏକ କୁଲିଂ ୟୁଜର୍ କୁ ତାଲିକାରୁ ଡିଲିଟ୍ କରିବାକୁ, "ମ୍ୟାନେଜମେଣ୍ଟ" -> "କୁଲିଂ ୟୁଜର୍ସ" ରେ ଯାଆନ୍ତୁ, ଯେଉଁ କୁଲିଂ ୟୁଜର୍ ନାମ କ୍ଲିକ୍ କରନ୍ତୁ ଏବଂ ପରେ "ଡିଲିଟ୍" ବଟନ୍ କ୍ଲିକ୍ କରନ୍ତୁ। ଦୟାକରି ଧ୍ୟାନ ଦିଅନ୍ତୁ, କେବଳ କୌଣସି ପେଣ୍ଡିଂ ଚେକ-ଇନ୍ ନଥିବା ଉପଭୋକ୍ତାମାନେ ଡିଲିଟ୍ କରାଯାଇପାରିବେ! ଯଦି ପେଣ୍ଡିଂ ଚେକ-ଇନ୍ ଅଛି, ଦୟାକରି ଉପଭୋକ୍ତା ସହ ସଂଯୋଗ କରନ୍ତୁ ଯେପରିକି ମାଲ୍ ଉଠାନ୍ତୁ। ଦୟାକରି ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ, ଯଦି ଉପଭୋକ୍ତାଙ୍କର ସ୍ମାର୍ଟଫୋନ୍ ଅଛି, ତେବେ ଏହି କାର୍ଯ୍ୟ କରିବାକୁ ତାଙ୍କୁ ସାହାଯ୍ୟ କରନ୍ତୁ।',
    },
    {
      id: 81,
      title: 'ମୁଁ କିପରି ଏକ କୁଲିଂ ୟୁନିଟ୍ କିମ୍ବା ଏକ ସ୍ଥାନ ଡିଲିଟ୍ କରିପାରିବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଆପଣ "ମେନୁ" -> "ପରିଚାଳନା" -> "କୁଲିଂ ୟୁନିଟ୍" / "ସ୍ଥାନ" କୁ ଯାଇ ଡିଲିଟ କରନ୍ତୁ ଉପରେ କ୍ଲିକ୍ କରି କୁଲିଂ ୟୁନିଟ୍ ଏବଂ ସ୍ଥାନଗୁଡ଼ିକୁ ଡିଲିଟ କରିପାରିବେ। ଆପଣ କେବଳ ସେତେବେଳେ ଏହା କରିପାରିବେ ଯଦି ରୁମଗୁଡ଼ିକରେ କୌଣସି ବାକି ଥିବା ଚେକ୍-ଇନ୍ ନାହିଁ। ନଚେତ୍, ରୁମ ଏବଂ ସ୍ଥାନଗୁଡ଼ିକୁ ଡିଲିଟ କରିବାକୁ ଚେଷ୍ଟା କରିବା ପୂର୍ବରୁ ଦୟାକରି ଚେକ୍-ଆଉଟ୍ ସମାପ୍ତ କରିବା ପାଇଁ ଅପରେଟରମାନଙ୍କୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    },
    {
      id: 82,
      title:
        'ମୁଁ ମୋ କମ୍ପାନୀରୁ ଅନ୍ୟ ଜଣେ ପଞ୍ଜିକୃତ କର୍ମଚାରୀ କିମ୍ବା ଅପରେଟରଙ୍କୁ କିପରି ଡିଲିଟ୍ କରିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ଆପଣଙ୍କୁ ଆପ୍‌ରୁ ଅନ୍ୟ ଉପଭୋକ୍ତାମାନଙ୍କୁ ଡିଲିଟ୍ କରିବାକୁ ଅନୁମତି ନାହିଁ। ତଥାପି, ଆପଣ "ମେନୁ" -> "ପରିଚାଳନା" -> "ଅପରେଟର"କୁ ନାଭିଗେଟ୍ କରି ଆପଣଙ୍କ ରୁମ୍‌ରୁ ଅପରେଟରମାନଙ୍କୁ ଅଣଆସାଇନ୍ କରିପାରିବେ। ଯଦି ଆପଣ ଏବେ ବି ଉପଭୋକ୍ତାଙ୍କୁ ସମ୍ପୂର୍ଣ୍ଣ ଭାବରେ ହଟାଇବାକୁ ଚାହୁଁଛନ୍ତି ଯାହା ଦ୍ଵାରା ସେମାନଙ୍କର ଆପଣଙ୍କ କମ୍ପାନୀକୁ ପ୍ରବେଶ ରହିବ ନାହିଁ, ଦୟାକରି app@yourvcca.org କୁ ଏକ ଇମେଲ୍ ଲେଖନ୍ତୁ ଏବଂ ଏହା କାହିଁକି ଆବଶ୍ୟକ ତାହା ବୁଝାନ୍ତୁ।',
    },
    {
      id: 83,
      title: 'ମୁଁ ତାଲିକାରୁ ଜଣେ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ କିପରି ଡିଲିଟ୍ କରିପାରିବି?',
      role: [ERoles.COOLING_USER],
      text: 'ତାଲିକାରୁ ଜଣେ କୁଲିଂ ବ୍ୟବହାରକାରୀଙ୍କୁ ଡିଲିଟ୍ କରିବା ପାଇଁ, "ପରିଚାଳନା" -> "କୁଲିଂ ବ୍ୟବହାରକାରୀ" କୁ ଯାଆନ୍ତୁ, କୁଲିଂ ବ୍ୟବହାରକାରୀ ନାମ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ ଏବଂ ତା"ପରେ "ଡିଲିଟ୍" ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ। ଦୟାକରି ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ କେବଳ ଯେଉଁ ବ୍ୟବହାରକାରୀଙ୍କ ପାଖରେ କୌଣସି ବିଚାରାଧୀନ ଚେକ୍-ଇନ୍ ନାହିଁ ସେମାନଙ୍କୁ ଡିଲିଟ୍ କରାଯାଇପାରିବ! ଯଦି କୌଣସି ବିଚାରାଧୀନ ଚେକ୍-ଇନ୍ ଅଛି, ଦୟାକରି ଉତ୍ପାଦ ଉଠାଇବା ପାଇଁ ଉପଭୋକ୍ତାଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ। ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ ଏହି କାର୍ଯ୍ୟକୁ ପ୍ରତ୍ୟାହାର କରାଯାଇପାରିବ ନାହିଁ! ଯଦି ଉପଭୋକ୍ତାଙ୍କ ପାଖରେ ଏକ ସ୍ମାର୍ଟଫୋନ୍ ଅଛି, ତେବେ ଏହି କାର୍ଯ୍ୟ ତାଙ୍କୁ ଆପଣଙ୍କ ତାଲିକାରୁ ହଟାଇ ଦେବ, କିନ୍ତୁ ଉପଭୋକ୍ତା ଏବେ ବି କୋଲ୍ଡଟିଭେଟ୍ ବ୍ୟବହାର କରିପାରିବେ। ଯଦି ଉପଭୋକ୍ତାଙ୍କ ପାଖରେ କୌଣସି ସ୍ମାର୍ଟଫୋନ୍ ନାହିଁ, ତେବେ ଏହି କାର୍ଯ୍ୟ ତାଙ୍କ ଆକାଉଣ୍ଟକୁ ଡିଲିଟ୍ କରିଦିଏ ଏବଂ ସମ୍ପୃକ୍ତ ଫୋନ୍ ନମ୍ବରକୁ ମୁକ୍ତ କରେ।',
    },
    {
      id: 84,
      title: 'ଅପରେଟରମାନେ ସମ୍ପ୍ରତି ଆପ୍ ବ୍ୟବହାର କରିଛନ୍ତି କି ନାହିଁ ତାହା ମୁଁ କେଉଁଠାରେ ମନିଟର କରିପାରିବି?',
      role: [ERoles.COOLING_USER],
      text: 'ଅପରେଟର ଏବଂ ଅନ୍ୟାନ୍ୟ ପଞ୍ଜିକୃତ କର୍ମଚାରୀମାନେ ଆପ୍‌ରେ ଶେଷ ଥର କେବେ ଲଗ୍ ଇନ୍ କରିଛନ୍ତି ତାହା ଯାଞ୍ଚ କରିବା ପାଇଁ, ଆପଣ "ମେନୁ" -> "ପରିଚାଳନା" -> "ଅପରେଟର" / "ପଞ୍ଜିକୃତ କର୍ମଚାରୀ" କୁ ଯାଇପାରିବେ। ନାମ ପାଖରେ ଆପଣ ଯେଉଁ ତାରିଖ ଏବଂ ସମୟ ଦେଖୁଛନ୍ତି ତାହା ହେଉଛି ଶେଷ ଲଗ୍ ଇନ୍ ତାରିଖ ଏବଂ ସମୟ।',
    },
    {
      id: 85,
      title:
        'ପ୍ରତ୍ୟେକ କୋଠରୀରୁ ହେଉଥିବା ରାଜସ୍ୱ ଏବଂ ଅନ୍ୟାନ୍ୟ ବ୍ୟବହାର ପରିସଂଖ୍ୟାନ ମୁଁ କେଉଁଠାରେ ନିରୀକ୍ଷଣ କରିପାରିବି?',
      role: [ERoles.COOLING_USER],
      text: 'ଆପଣ "ମେନୁ" -> "ପରିଚାଳନା" -> "ରାଜସ୍ୱ ବିଶ୍ଳେଷଣ"କୁ ନାଭିଗେଟ୍ କରିପାରିବେ, କୁଲିଂ ୟୁନିଟ୍ ଏବଂ ଆଗ୍ରହର ସମୟ ବ୍ୟବଧାନ ଚୟନ କରିପାରିବେ, ଏବଂ ଆପଣ ଏହି କୋଠରୀଗୁଡ଼ିକରୁ ଚେକ୍-ଆଉଟ୍ ସହିତ ଜଡିତ ମୋଟ ରାଜସ୍ୱ ଦେଖିପାରିବେ। ଆପଣ କୁଲିଂ ବ୍ୟବହାରକାରୀ, ଦେୟ ପଦ୍ଧତି ଏବଂ ସମୟ ଦ୍ୱାରା ମଧ୍ୟ ଫିଲ୍ଟର କରିପାରିବେ। ପ୍ରତି କୋଠରୀରେ ଆପଣଙ୍କର ଚେକ୍-ଇନ୍‌ର ସାରାଂଶ ପରିସଂଖ୍ୟାନ (ଉପଭୋକ୍ତାଙ୍କ ସଂଖ୍ୟା, ମୋଟ କ୍ରେଟ୍ ସଂଖ୍ୟା, ଇତ୍ୟାଦି) ଦୃଶ୍ୟମାନ କରିବାକୁ, ଆପଣ "ମେନୁ" -> "ପରିଚାଳନା" -> "ବ୍ୟବହାର ବିଶ୍ଳେଷଣ"କୁ ନାଭିଗେଟ୍ କରିପାରିବେ। ଏଠାରେ ଆପଣ ତାରିଖ ଏବଂ କୁଲିଂ ୟୁନିଟ୍ ଦ୍ୱାରା ମଧ୍ୟ ଫିଲ୍ଟର କରିପାରିବେ। ଉଭୟ ପୃଷ୍ଠାରେ, ସୂଚନାକୁ ଏକ୍ସେଲ୍ ଫାଇଲ୍ ଭାବରେ ଡାଉନଲୋଡ୍ କରାଯାଇପାରିବ। "ବିଶ୍ଳେଷଣ" ଟ୍ୟାବ୍‌ରେ, ଆପଣ ଉପଭୋକ୍ତା, ରାଜସ୍ୱ, ବ୍ୟବହାର ଏବଂ ପ୍ରଭାବ ବିଷୟରେ ସୂଚନା ସହିତ ଏକ ଡ୍ୟାସବୋର୍ଡ ପାଇପାରିବେ। ଶେଷରେ, ବର୍ତ୍ତମାନ କୋଠରୀରେ ଥିବା ଫସଲ ପାଇଁ ମୋଟ କ୍ରେଟ୍ ସଂଖ୍ୟା, ଓଜନ ଏବଂ ସର୍ବୋତ୍ତମ ତାପମାତ୍ରା ନିରୀକ୍ଷଣ କରିବାକୁ, ଆପଣ "ଅଧିକ" -> "କୁଲିଂ ୟୁନିଟ୍" -> "କ୍ରେଟ୍ ସୂଚନା"କୁ ନାଭିଗେଟ୍ କରିପାରିବେ।',
    },
    {
      id: 86,
      title:
        'ମୋର ଉତ୍ପାଦିତ ଦ୍ରବ୍ୟ ସଂରକ୍ଷଣ ହେଉଥିବା ଏକ ଶୀତଳୀକରଣ ୟୁନିଟ୍ ପାଇଁ ଯୋଗାଯୋଗ ବ୍ୟକ୍ତି କିଏ ତାହା ମୁଁ କିପରି ଜାଣିପାରିବି?',
      role: [ERoles.OPERATOR],
      text: 'ଆପ୍ ସହାୟତା ଦଳ ତୁମର ଆପ୍ ବ୍ୟବହାର ବିଷୟରେ ମତାମତ ଶୁଣିବାକୁ ଚାହେଁ ଏବଂ ତୁମର ମତାମତ ସ୍ୱାଗତ କରେ, ଦୟାକରି app@yourvcca.org କୁ ଇମେଲ୍ ପଠାଇବାକୁ କିମ୍ବା ମତାମତ ଫର୍ମ ଭରିବାକୁ: https://forms.gle/2gKVzZjkJSPqEAan9 ।',
    },
    {
      id: 87,
      title: 'ମୁଁ ଏକ ବିଜ୍ଞପ୍ତି ପାଇଛି। ମୁଁ କଣ କରିବା ଉଚିତ?',
      role: [ERoles.COOLING_USER],
      text: 'ଆପ୍ ସହାୟତା ଦଳ ତୁମର ଆପ୍ ବ୍ୟବହାର ବିଷୟରେ ମତାମତ ଶୁଣିବାକୁ ଚାହେଁ ଏବଂ ତୁମର ମତାମତ ସ୍ୱାଗତ କରେ, ଦୟାକରି app@yourvcca.org କୁ ଇମେଲ୍ ପଠାଇବାକୁ ପ୍ରୟାସ କର।',
    },
    {
      id: 88,
      title: 'କୁଲିଂ ୟୁନିଟର ମାନଚିତ୍ରରେ କ’ଣ ପ୍ରଦର୍ଶିତ ହୋଇଛି?',
      role: [ERoles.COOLING_USER],
      text: 'ମାନଚିତ୍ରରେ ଆପଣ ଆପଣଙ୍କର ସ୍ଥାନ (ଆପଣଙ୍କ ସ୍ଥାନକୁ ପ୍ରବେଶ କରିବା ପାଇଁ Coldtivate ପାଇଁ ଅନୁମତି ମଗାଯିବ), ଆପଣଙ୍କ ଚାରିପାଖରେ ଥିବା କୁଲିଂ ୟୁନିଟ୍‌ଗୁଡ଼ିକର ସ୍ଥାନ ଏବଂ ୟୁନିଟ୍‌ଗୁଡ଼ିକ ବିଷୟରେ କିଛି ସୂଚନା (ଏକକ କିମ୍ବା ମଲ୍ଟିକମୋଡିଟି, କମ୍ପାନୀ, ମୂଲ୍ୟ) ଭିଜୁଆଲାଇଜ୍ କରିପାରିବେ। କୋଲ୍ଡ ରୁମ୍‌କୁ ଯାଇ, ଆପଣ ୟୁନିଟ୍‌ର କାର୍ଯ୍ୟକ୍ଷମତା ଏବଂ ସଂରକ୍ଷଣ ପାଇଁ ସୁଯୋଗ ବିଷୟରେ କୋଲ୍ଡ ରୁମ୍ ଅପରେଟରଙ୍କଠାରୁ ଅଧିକ ସୂଚନା ପାଇପାରିବେ।',
    },
    {
      id: 89,
      title: ' ମୁଁ ଆପର ଭାଷା କିପରି ପରିବର୍ତ୍ତନ କରିପାରିବି?',
      role: [ERoles.AUTH],
      text: ' ଆପ୍ ଭାଷା ପରିବର୍ତ୍ତନ କରିବାକୁ, ଆପଣ ହୋମପେଜର ତଳେ ଦେଖୁଥିବା ଡ୍ରପଡାଉନ୍ ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ, କିମ୍ବା, ଆପଣ ଆପଣଙ୍କ ପ୍ରୋଫାଇଲରେ ଲଗ୍ ଇନ୍ ହେବା ପରେ, "ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" -> "ସ୍ଥାନୀୟକରଣ ପସନ୍ଦ" କୁ ନେଭିଗେଟ୍ କରିପାରିବେ।',
    },
    {
      id: 90,
      title:
        'ମୋର ତାପମାତ୍ରା ସେନ୍ସର ପ୍ରକାର Coldtivate (Ecozen, UbiBot, Figorr, Victron Energy) ଦ୍ୱାରା ସମର୍ଥିତ। ମୁଁ ସେନ୍ସରଗୁଡ଼ିକୁ କିପରି ସେଟ୍ ଅପ୍ କରିପାରିବି?',
      role: [ERoles.EMPLOYEE],
      text: 'ଏକ ସେନ୍ସରକୁ ଏକ କୁଲିଂ ୟୁନିଟ୍ ସହିତ ସଂଯୋଗ କରିବା ପାଇଁ, ଆପଣ "ମେନୁ" -> "ପରିଚାଳନା" -> "କୁଲିଂ ୟୁନିଟ୍" କୁ ନେଭିଗେଟ୍ କରିପାରିବେ, ସେନ୍ସର ସେଟ୍ ଅପ୍ କରାଯିବାକୁ ଥିବା ୟୁନିଟ୍ ଚୟନ କରିପାରିବେ, ଏବଂ ତାପରେ "ସେନ୍ସର ଉପଲବ୍ଧ" ଟୋଗଲ୍ କରିପାରିବେ। ଆପଣ ପ୍ରତ୍ୟେକ ସମର୍ଥିତ ସେନ୍ସର ପ୍ରକାର ପାଇଁ ନିର୍ଦ୍ଦେଶାବଳୀ ଅନୁସରଣ କରିପାରିବେ ଏବଂ ପ୍ରମାଣୀକରଣ କରିପାରିବେ। ପରିବର୍ତ୍ତନଗୁଡ଼ିକୁ ସେଭ୍ କରିବା ପାଇଁ ପୃଷ୍ଠାର ତଳ ଭାଗରେ ଥିବା "ସେଭ୍" ଘଣ୍ଟାକୁ ମନେରଖନ୍ତୁ। ଆପଣ "ଅଧିକ" -> "କୁଲିଂ ୟୁନିଟ୍" -> "ରୁମ୍ ଅବସ୍ଥା" ଅନ୍ତର୍ଗତ ଆପଣଙ୍କ ସେନ୍ସରରୁ ତାପମାତ୍ରା ପାଠ୍ୟଗୁଡ଼ିକ ପରବର୍ତ୍ତୀ 6 ଘଣ୍ଟା ମଧ୍ୟରେ ଦେଖିପାରିବେ।',
    },
    {
      id: 91,
      title:
        " ଆନାଲିଟିକ୍ସ ଟ୍ୟାବରେ 'କମ୍ପାନୀ', 'ଏଗ୍ରେଗେଟେଡ୍' ଏବଂ 'ତୁଳନା' ଦୃଶ୍ୟ ମଧ୍ୟରେ କ'ଣ ପାର୍ଥକ୍ୟ ଅଛି?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ନାଭିଗେସନ୍ ବାରରେ ଥିବା ଆନାଲିଟିକ୍ସ ଟ୍ୟାବ୍ ସମସ୍ତ କମ୍ପାନୀର ଶୀତଳ କୋଠରୀ ପାଇଁ ସାରାଂଶ ପରିସଂଖ୍ୟାନ ପ୍ରଦାନ କରେ। "କମ୍ପାନୀ" ଦୃଶ୍ୟରେ, ଆପଣ କୋଲଡିଭେଟ୍ ବ୍ୟବହାର ଆରମ୍ଭ କରିବା ପରଠାରୁ ସମସ୍ତ ଶୀତଳ ୟୁନିଟ୍ ପାଇଁ ଉପଭୋକ୍ତା, ବ୍ୟବହାର ଏବଂ ପ୍ରଭାବ ଉପରେ ଏକ ତଥ୍ୟ ଦେଖିପାରିବେ। "ଏଗ୍ରଗେଟେଡ୍" ଉପରେ କ୍ଲିକ୍ କରି, ଆପଣଙ୍କୁ କେଉଁ ଶୀତଳ ୟୁନିଟ୍ ଏବଂ ସମୟ ଅବଧିରେ ଆପଣ ଆଗ୍ରହୀ ତାହା କନଫିଗର୍ କରିବାକୁ ଅନୁରୋଧ କରାଯାଏ। ଉପଭୋକ୍ତା, ବ୍ୟବହାର ଏବଂ ପ୍ରଭାବ ପାଇଁ ପ୍ରଦର୍ଶିତ ତଥ୍ୟ ଚୟନିତ ସମୟ ଅବଧିରେ ଚୟନିତ ଶୀତଳ ୟୁନିଟ୍ ମଧ୍ୟରେ ଏକତ୍ରିତ କରାଯାଏ। ଯଦି ଆପଣ ୟୁନିଟ୍ ମଧ୍ୟରେ ତୁଳନା କରିବାକୁ ଚାହାଁନ୍ତି, ତେବେ ଆପଣ "ତୁଳନା" ଟ୍ୟାବ୍ ବ୍ୟବହାର କରିପାରିବେ। ଏଠାରେ, ତଥ୍ୟ ସାରଣୀରେ ପ୍ରଦର୍ଶିତ ହୁଏ, ଯେଉଁଠାରେ ଚୟନିତ ସମୟ ଅବଧିରେ ପ୍ରତ୍ୟେକ ଶୀତଳ ୟୁନିଟ୍ ରୁ ତଥ୍ୟ ବିସ୍ତାରିତ ହୁଏ। ଆପଣ ଯେକୌଣସି ସମୟରେ ତଥ୍ୟକୁ ସଜାଡ଼ି ପାରିବେ ଏବଂ ଶୀତଳ ୟୁନିଟ୍ ଏବଂ ସମୟ ଅବଧି ପରିବର୍ତ୍ତନ କରିପାରିବେ।',
    },
    {
      id: 92,
      title: 'ଆନାଲିଟିକ୍ସ ଟ୍ୟାବରେ ପ୍ରଦର୍ଶିତ ଡାଟା କିପରି ଗଣନା କରାଯାଏ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ଆନାଲିଟିକ୍ସ ଟ୍ୟାବ୍‌ର ଲକ୍ଷ୍ୟ ହେଉଛି ଶୀତଳ କୋଠରୀରେ କ’ଣ ଘଟୁଛି ତାହାର ଏକ ବ୍ୟାପକ ଦୃଶ୍ୟ ପ୍ରଦାନ କରିବା। କୋଲଡିଭେଟରେ ରେକର୍ଡ ହୋଇଥିବା ଚେକ୍-ଇନ୍ ଏବଂ ଚେକ୍-ଆଉଟ୍ ସୂଚନାରୁ ବ୍ୟବହାରକାରୀ ଏବଂ ବ୍ୟବହାର ତଥ୍ୟ ଗଣନା କରାଯାଏ। ତେଣୁ ଆପଣ ବୁଝିପାରିବେ ଯେ କେତେ ଜଣ ଉପଭୋକ୍ତା ଏବଂ କାର୍ଯ୍ୟ କରାଯାଇଛି, ଏବଂ ପ୍ରତ୍ୟେକ ଶୀତଳ କୋଠରୀର ରାଜସ୍ୱ କିମ୍ବା ହାରାହାରି ଅଧିଗ୍ରହଣ କେତେ। ଅନ୍ୟପକ୍ଷରେ, ପ୍ରଭାବ ବିଭାଗର ତଥ୍ୟ ସର୍ଭେ ଉପରେ ଆଧାରିତ ଯାହା ଶୀତଳ ବ୍ୟବହାରକାରୀଙ୍କୁ ପଞ୍ଜିକୃତ ହେବା ସମୟରେ (ଯଥା ସେମାନେ ଶୀତଳ ଭଣ୍ଡାର ବ୍ୟବହାର କରିବା ପୂର୍ବରୁ) ଏବଂ ନିୟମିତ ଭାବରେ ଶୀତଳ କୋଠରୀରୁ ଉତ୍ପାଦିତ ଦ୍ରବ୍ୟ ଯାଞ୍ଚ କରିବା ସମୟରେ ପୂରଣ କରିବାକୁ କୁହାଯାଇଥାଏ। ଏହି ତଥ୍ୟ ଅମଳ ପରବର୍ତ୍ତୀ କ୍ଷତି ଏବଂ ଶୀତଳ ବ୍ୟବହାର କରିବା ସମୟରେ ଉପଭୋକ୍ତାଙ୍କ ରାଜସ୍ୱର ବିବର୍ତ୍ତନ ଆକଳନ କରିବା ପାଇଁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ଶେଷରେ, CO2 ଆକଳନ ଶୀତଳ କୋଠରୀରେ ସଂରକ୍ଷିତ ଫସଲକୁ ଶୀତଳ କରିବା ସହିତ ଜଡିତ ନିର୍ଗମନକୁ ଅନୁମାନିତ ନିର୍ଗମନ ସହିତ ତୁଳନା କରେ ଯାହା ଶୀତଳ କୋଠରୀରେ ସଂରକ୍ଷଣ ନକରି ସଂରକ୍ଷଣ କରିବା ସମୟରେ ସମାନ ଫସଲ ସୃଷ୍ଟି କରିଥାନ୍ତା।',
    },
    {
      id: 93,
      title: 'ଆନାଲିଟିକ୍ସ ଟ୍ୟାବରେ ପ୍ରଦର୍ଶିତ ଡାଟା କିପରି ଗଣନା କରାଯାଏ?',
      role: [ERoles.COOLING_USER],
      text: 'ଆନାଲିଟିକ୍ସ ଟ୍ୟାବ୍‌ର ଲକ୍ଷ୍ୟ ହେଉଛି ଆପଣଙ୍କ ଫସଲ ଉପରେ ଶୀତଳୀକରଣର ପ୍ରଭାବର ଏକ ବ୍ୟାପକ ଦୃଶ୍ୟ ପ୍ରଦାନ କରିବା। "କ୍ରେଟ୍ସ" ଅଧୀନରେ ପ୍ରଦର୍ଶିତ ତଥ୍ୟ କୋଲ୍ଡଟିଭେଟରେ ରେକର୍ଡ ହୋଇଥିବା ଚେକ୍-ଇନ୍ ଏବଂ ଚେକ୍-ଆଉଟ୍ ସୂଚନାରୁ ଗଣନା କରାଯାଏ। ଏହିପରି ଆପଣ କେଉଁ ଫସଲକୁ କେତେ ସଂରକ୍ଷଣ କରିଛନ୍ତି ଏବଂ ହାରାହାରି ସଂରକ୍ଷଣ ସମୟ ଜାଣିପାରିବେ। "ପ୍ରଭାବ" ବିଭାଗର ତଥ୍ୟ ପଞ୍ଜିକରଣ କରିବା ସମୟରେ (ଯଥା ଆପଣ ଶୀତଳ ସଂରକ୍ଷଣ ବ୍ୟବହାର କରିବା ପୂର୍ବରୁ) ଏବଂ ନିୟମିତ ଭାବରେ ଶୀତଳ କୋଠରୀରୁ ଉତ୍ପାଦିତ ଦ୍ରବ୍ୟକୁ ଚେକ୍-ଆଉଟ୍ କରିବା ସମୟରେ ପୂରଣ କରିବାକୁ କୁହାଯାଉଥିବା ସର୍ଭେ ଉପରେ ଆଧାରିତ। ଏହି ତଥ୍ୟ ଆପଣ ଶୀତଳୀକରଣ ବ୍ୟବହାର କରିବା ସମୟରେ ଅମଳ ପରବର୍ତ୍ତୀ କ୍ଷତି ଏବଂ ରାଜସ୍ୱର ବିବର୍ତ୍ତନ ଆକଳନ କରିବା ପାଇଁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ସର୍ଭେ ପୂରଣ କରିବା ପାଇଁ ଏକ ସ୍ମରଣକାରୀ ପୃଷ୍ଠାର ଉପରେ ଦେଖାଯାଇଛି, ଏବଂ ଆମେ ଆପଣଙ୍କୁ ଯେତେବେଳେ ସମ୍ଭବ ସେଗୁଡ଼ିକୁ ପୂରଣ କରିବାକୁ ଉତ୍ସାହିତ କରୁଛୁ। ଉଭୟ ବିଭାଗରେ, ଆପଣ ନିର୍ଦ୍ଦିଷ୍ଟ ଶୀତଳ କୋଠରୀ କିମ୍ବା ଏକ ସମୟ ଅବଧି ଚୟନ କରିବା ପାଇଁ ଉପର ଡାହାଣ ପାର୍ଶ୍ୱରେ ଥିବା "କନଫିଗର୍" ବଟନ୍ ବ୍ୟବହାର କରିପାରିବେ। ଯଦି କିଛି ଚୟନ କରାଯାଇ ନାହିଁ, ତେବେ ଆପଣ କୋଲ୍ଡଟିଭେଟ୍ ବ୍ୟବହାର କରିବା ଆରମ୍ଭ କରିବା ପରଠାରୁ ଉପଲବ୍ଧ ସମସ୍ତ ଡାଟା ଦେଖିପାରିବେ।',
    },
    {
      id: 94,
      title: 'ମୁଁ ଲଗ୍ ଇନ୍ କରେ କିନ୍ତୁ ମୁଁ ମାର୍କେଟପ୍ଲେସ୍ କାର୍ଯ୍ୟକାରିତା ଦେଖିପାରୁନାହିଁ। କାହିଁକି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଯଦି ଆପଣଙ୍କ ଦେଶରେ ମାର୍କେଟପ୍ଲେସ୍ ସମର୍ଥିତ, ତେବେ ଆପଣ ତଳ ନାଭିଗେସନ୍ ବାରରେ ଏକ "ମାର୍କେଟପ୍ଲେସ୍" ଆଇକନ୍ ଦେଖିବେ। ଯଦି ଆପଣ ଏହାକୁ ଦେଖିପାରୁନାହାଁନ୍ତି, ତେବେ ଏହାର ଅର୍ଥ ହେଉଛି ଏହି କାର୍ଯ୍ୟକ୍ଷମତା ଆପଣଙ୍କ ଦେଶରେ ସମର୍ଥିତ ନୁହେଁ। ବର୍ତ୍ତମାନ, ମାର୍କେଟପ୍ଲେସ୍ କେବଳ ନାଇଜେରିଆରେ ରହୁଥିବା ବ୍ୟବହାରକାରୀଙ୍କ ପାଇଁ ଉପଲବ୍ଧ। ଯଦି ଆପଣ ଜଣେ ପଞ୍ଜିକୃତ କର୍ମଚାରୀ ଏବଂ ଆପଣଙ୍କ ଦେଶରେ ମାର୍କେଟପ୍ଲେସ୍ ପାଇଲଟ୍ କରିବାକୁ ଆଗ୍ରହୀ, ଦୟାକରି app@yourvcca.org ରେ ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    },
    {
      id: 95,
      title: " ବଜାରରେ ଏକ କୁଲିଂ କମ୍ପାନୀର ଭୂମିକା କ'ଣ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ଏକ ଶୀତଳୀକରଣ କମ୍ପାନୀ ଏବଂ ଏହାର କର୍ମଚାରୀମାନେ ବଜାରରେ ସେମାନଙ୍କର ସମ୍ପୃକ୍ତିର ସ୍ତର ନିର୍ଣ୍ଣୟ କରିପାରିବେ। ଯେହେତୁ କାର୍ଯ୍ୟକାରିତା କୋଲଡିଭେଟ୍ ଆପ୍‌ରେ ଚେକ୍-ଇନ୍ ହେଉଥିବା କ୍ରେଟ୍ ଉପରେ ନିର୍ଭର କରେ, ଏକ ବଜାର କେବଳ ସେତେବେଳେ କାମ କରିପାରିବ ଯଦି ଶୀତଳ କୋଠରୀ ପରିଚାଳନାକାରୀ ନିୟମିତ ଭାବରେ ଆପ୍‌ରେ ଚେକ୍-ଇନ୍ ଏବଂ ଚେକ୍-ଆଉଟ୍ କାର୍ଯ୍ୟଗୁଡ଼ିକୁ ପଞ୍ଜୀକୃତ କରନ୍ତି। ବଜାର ମାଧ୍ୟମରେ କିଣାଯାଇଥିବା ଉତ୍ପାଦ ପାଇଁ, ଶୀତଳୀକରଣ କମ୍ପାନୀ ଡିଜିଟାଲ୍ କାରବାରର ଅଂଶ ଭାବରେ ଶୀତଳୀକରଣ ଫି ଗ୍ରହଣ କରୁଛି। ତେଣୁ ଜଣେ ପଞ୍ଜିକୃତ କର୍ମଚାରୀ କମ୍ପାନୀର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ବିବରଣୀ ସେଟ୍ କରିବା ଅତ୍ୟନ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ: ଏହା କରିବା ପାଇଁ, ଆପଣଙ୍କୁ "ମେନୁ" -> "ପରିଚାଳନା" -> "ବିକ୍ରେତା ସେଟିଂସ୍ (କମ୍ପାନୀ)" -> "ପେମେଣ୍ଟ ବିକଳ୍ପ" କୁ ଯିବା ଉଚିତ। ଏହା ସହିତ, ଶୀତଳୀକରଣ କମ୍ପାନୀଗୁଡ଼ିକ ଚାଷୀଙ୍କଠାରୁ ଉତ୍ପାଦ କିଣିବାକୁ (କ୍ରେତାଙ୍କ ଭୂମିକା ଗ୍ରହଣ କରି) ନିଷ୍ପତ୍ତି ନେଇପାରିବେ ଏବଂ ତା’ପରେ ବଜାରରେ ସେହି ଫସଲଗୁଡ଼ିକୁ ପୁନଃବିକ୍ରୟ କରିପାରିବେ (ବିକ୍ରେତାଙ୍କ ଭୂମିକା ଗ୍ରହଣ କରି)। ଉଭୟ କାରବାର କୋଲଡିଭେଟ୍ ବଜାର ମାଧ୍ୟମରେ କରାଯାଇପାରିବ। ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ ଉଭୟ ଅପରେଟର ଏବଂ ପଞ୍ଜିକୃତ କର୍ମଚାରୀଙ୍କ ପାଖରେ ନିଜ ପାଇଁ (ବ୍ୟକ୍ତିଗତ ଭାବରେ) କିମ୍ବା ସେମାନେ ପ୍ରତିନିଧିତ୍ୱ କରୁଥିବା କମ୍ପାନୀ ପକ୍ଷରୁ କିଣିବାର ବିକଳ୍ପ ଅଛି।',
    },
    {
      id: 96,
      title: "ବଜାରରେ ଜଣେ ଶୀତଳ କୋଠରୀ ପରିଚାଳକଙ୍କ ଭୂମିକା କ'ଣ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: ' ବଜାରରେ ଶୀତଳ କୋଠରୀ ପରିଚାଳନାକାରୀମାନଙ୍କର ତିନୋଟି ମୁଖ୍ୟ ଭୂମିକା ରହିଛି। 1) ସେମାନେ ସ୍ମାର୍ଟଫୋନ୍ ବିନା ଶୀତଳ ବ୍ୟବହାରକାରୀଙ୍କୁ ସେମାନଙ୍କର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ସେଟ୍ ଅପ୍ କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତି (ଯାହା ଦ୍ଵାରା ସେମାନେ ଡିଜିଟାଲ୍ ପେମେଣ୍ଟ୍ ପାଇପାରିବେ), ସେମାନଙ୍କର କ୍ରେଟ୍ଗୁଡ଼ିକୁ "ବିକ୍ରୟ ପାଇଁ" ତାଲିକାଭୁକ୍ତ କରନ୍ତି ଏବଂ ସେମାନଙ୍କର ମୂଲ୍ୟ। 2) ଏକ କ୍ରେଟ୍‌ରେ ଥିବା ସମସ୍ତ ଉତ୍ପାଦ ଜଣେ ବ୍ୟବହାରକାରୀଙ୍କର ବୋଲି ନୀତି ଅନୁସରଣ କରି ଶୀତଳ କୋଠରୀରେ ଉତ୍ପାଦିତ ସାମଗ୍ରୀକୁ ସଂଗଠିତ ରଖିବା ପାଇଁ ସେମାନେ ଦାୟୀ: ଯେତେବେଳେ ଏକ କ୍ରେଟ୍‌ରେ ଥିବା କିଛି ଉତ୍ପାଦ କିଣାଯାଏ (ଏବଂ ତେଣୁ ଭିନ୍ନ ମାଲିକଙ୍କର), ଅପରେଟର କ୍ରୟ କରାଯାଇଥିବା ଉତ୍ପାଦକୁ ଏକ ପୃଥକ କ୍ରେଟ୍‌କୁ ସ୍ଥାନାନ୍ତର କରିବା ପାଇଁ ଏକ ବିଜ୍ଞପ୍ତି ପାଆନ୍ତି। ଯଦି ଏକ ସମ୍ପୂର୍ଣ୍ଣ କ୍ରେଟ୍ କିଣାଯାଏ, ତେବେ କୌଣସି ପଦକ୍ଷେପ ନେବାର ଆବଶ୍ୟକତା ନାହିଁ। 3) ବଜାରରୁ ହେଉଥିବା ସମସ୍ତ ଚେକ୍-ଆଉଟ୍ କାର୍ଯ୍ୟ ପାଇଁ ଶୀତଳ କୋଠରୀ ପରିଚାଳନାକାରୀମାନେ ଦାୟୀ: ଯେତେବେଳେ ଜଣେ କ୍ରେତା (କିମ୍ବା ଜଣେ ବିତରଣ ପ୍ରତିନିଧି) କିଣାଯାଇଥିବା ଉତ୍ପାଦ ଉଠାଇବା ପାଇଁ ଶୀତଳ କୋଠରୀରେ ପହଞ୍ଚନ୍ତି, ଅପରେଟର କ୍ଲେଡ୍‌ଟିଭେଟ୍‌ରୁ ସେହି କ୍ରେଟ୍‌କୁ ଯାଞ୍ଚ କରିବା ଉଚିତ।',
    },
    {
      id: 97,
      title: 'ବଜାରରେ କୁଲିଂ ଫି କିପରି ସଂଗ୍ରହ କରାଯାଏ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଯେତେବେଳେ ବଜାରରେ କ୍ରେଟ୍ କିଣାଯାଏ, ସେହି ଦିନ ପର୍ଯ୍ୟନ୍ତର କୁଲିଂ ଫି କ୍ରେତା ଦେଉଥିବା ମୂଲ୍ୟରୁ କାଟି କୁଲିଂ କମ୍ପାନୀକୁ ସ୍ଥାନାନ୍ତରିତ କରାଯାଏ। ଏହି ଉପାୟରେ, ବିକ୍ରେତାଙ୍କୁ କୁଲିଂ ଫି ସମାଧାନ କରିବାକୁ ପଡ଼ିବ ନାହିଁ, କାରଣ ଏହା ପୂର୍ବରୁ ଡିଜିଟାଲ୍ କାରବାରରେ କରାଯାଇଥାଏ। ଏହି କାରଣରୁ, ବିକ୍ରେତା ଏବଂ କୁଲିଂ କମ୍ପାନୀ ଉଭୟଙ୍କର କୋଲଡିଭେଟରେ ଏକ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ସ୍ଥାପନ କରିବା ଅତ୍ୟନ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ଉଦାହରଣ ସ୍ୱରୂପ, ଯଦି ଏକ କ୍ରେଟ୍ 20 USD ରେ କିଣାଯାଏ, ଏବଂ ଜଣେ ବିକ୍ରେତା 3 USD କୁଲିଂ ଫି ପାଆନ୍ତି, ତେବେ କ୍ରେତାଙ୍କ ଦ୍ୱାରା ପ୍ରଦାନ କରାଯାଇଥିବା 20 USD ମଧ୍ୟରୁ 17 USD ବିକ୍ରେତାଙ୍କ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟକୁ ସ୍ଥାନାନ୍ତରିତ କରାଯିବ, ଏବଂ 3 USD କୁଲିଂ କମ୍ପାନୀର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟକୁ ସ୍ଥାନାନ୍ତରିତ କରାଯିବ। ଯଦି କ୍ରେତା କ୍ରୟ ଦିନ ହିଁ ଉତ୍ପାଦ ଉଠାଇବାକୁ ଆସନ୍ତି, ତେବେ ଅନ୍ୟ କୌଣସି କୁଲିଂ ଫି ଦେବାକୁ ପଡ଼ିବ ନାହିଁ (କାରଣ ଦୈନିକ ଫି ବିକ୍ରେତା ପୂର୍ବରୁ ପ୍ରଦାନ କରିଛନ୍ତି)। ତଥାପି, ଯଦି କ୍ରେତା ଉତ୍ପାଦକୁ ସଂରକ୍ଷଣରେ ରଖିବାକୁ ନିଷ୍ପତ୍ତି ନିଅନ୍ତି, ତେବେ ମାନକ କୁଲିଂ ଫି ପ୍ରଯୁଜ୍ୟ ହେବ, ଏବଂ କ୍ରେତା ଏହାକୁ ଉଠାଇବା ପର୍ଯ୍ୟନ୍ତ ଉତ୍ପାଦକୁ ଶୀତଳ କୋଠରୀରେ କେତେ ଦିନ ରଖାଯାଇଛି ତାହା ଉପରେ ନିର୍ଭର କରି ମୂଲ୍ୟ ଗଣନା କରାଯିବ। ଚେକ୍-ଆଉଟ୍ ସମୟରେ ଏହି କୁଲିଂ ଫି ଆଦାୟ କରିବା ପାଇଁ ଶୀତଳ କୋଠରୀ ପରିଚାଳକ ଦାୟୀ। ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ ବିତରଣ କ୍ଷେତ୍ରରେ ମଧ୍ୟ ସମାନ ଯୁକ୍ତି ପ୍ରଯୁଜ୍ୟ।',
    },
    {
      id: 98,
      title: 'ମୁଁ ବଜାରରେ ଉତ୍ପାଦିତ ସାମଗ୍ରୀ କିପରି ବିକ୍ରୟ ଆରମ୍ଭ କରିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଆପଣଙ୍କର କ୍ରେଟ୍ ବିକ୍ରୟ ପାଇଁ ଉପଲବ୍ଧ ହେବା ପାଇଁ, ଆପଣଙ୍କୁ ଦୁଇଟି କାର୍ଯ୍ୟ କରିବାକୁ ପଡିବ। 1) ଏକ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ସେଟ୍ ଅପ୍ କରନ୍ତୁ, ଯେଉଁଠାରେ ରାଜସ୍ୱ ଜମା ହେବ। ଯଦି ଆପଣଙ୍କର ଏକ ସ୍ମାର୍ଟଫୋନ୍ ଅଛି, ତେବେ ଆପଣ "ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" -> "ପେମେଣ୍ଟ ବିକଳ୍ପ" କୁ ନାଭିଗେଟ୍ କରି ଏହା କରିପାରିବେ। ଯଦି ଆପଣଙ୍କର ଏକ ସ୍ମାର୍ଟଫୋନ୍ ନାହିଁ, ତେବେ ଅପରେଟର୍ ତାଙ୍କ ଇଣ୍ଟରଫେସ୍ ("ପରିଚାଳନା" -> "କୁଲିଂ ୟୁଜର୍ସ" -> "ପେମେଣ୍ଟ ବିବରଣୀ") ରୁ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ସେଟ୍ ଅପ୍ କରିପାରିବେ। ଦୟାକରି ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ ଯେହେତୁ ସମସ୍ତ ପେମେଣ୍ଟ ବଜାରରେ ଡିଜିଟାଲ୍ ଭାବରେ କରାଯାଏ, ତେଣୁ "ବିକ୍ରୟ ପାଇଁ" କୌଣସି ଜିନିଷ ତାଲିକାଭୁକ୍ତ ହେବା ପୂର୍ବରୁ ଆପଣଙ୍କୁ ଏକ ବୈଧ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ପ୍ରଦାନ କରିବାକୁ ପଡିବ। 2) ଯଦି ଆପଣଙ୍କର ଏକ ସ୍ମାର୍ଟଫୋନ୍ ଅଛି, ତେବେ ଯେକୌଣସି ଚେକ୍-ଇନ୍ ହୋଇଥିବା କ୍ରେଟ୍ ସେଟ୍ ପାଇଁ, ଆପଣ ପ୍ରତ୍ୟେକ ଡ୍ୟାସବୋର୍ଡ ଆଇଟମ୍ ର ଡାହାଣ ପାର୍ଶ୍ୱରେ ଥିବା ">" ଚିହ୍ନ ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ, "କ୍ରେଟ୍ ଓଜନ ଏବଂ ବଜାର ତାଲିକା" କୁ ନାଭିଗେଟ୍ କରିପାରିବେ, ଆପଣ କେଉଁ କ୍ରେଟ୍ "ବିକ୍ରୟ ପାଇଁ" ଏବଂ ପ୍ରତି କିଲୋଗ୍ରାମ ମୂଲ୍ୟ ସ୍ଥିର କରିବାକୁ ଚାହୁଁଛନ୍ତି ତାହା ସ୍ଥିର କରିପାରିବେ। ବଜାରରେ ଗ୍ରାହକମାନେ ଏହି କ୍ରେଟ୍ ଦେଖିପାରିବେ ଏବଂ ସୂଚିତ ପରିମାଣରେ କିଣିପାରିବେ। କ୍ରୟ ସମାପ୍ତ ହେବା ପରେ ଆପଣ ଯେକୌଣସି ସମୟରେ ଏକ ବିଜ୍ଞପ୍ତି ପାଇବେ। ଯଦି ଆପଣଙ୍କର ସ୍ମାର୍ଟଫୋନ୍ ନାହିଁ, ତେବେ ଶୀତଳ କୋଠରୀ ପରିଚାଳକ ଆପଣ ଚେକ୍-ଇନ୍ କରିବା ସମୟରେ କିମ୍ବା ପରେ ସମାନ ପଦକ୍ଷେପ ଅନୁସରଣ କରି କ୍ରେଟ୍ "ବିକ୍ରୟ ପାଇଁ" ସେଟ୍ କରିପାରିବେ। ଯଦି ଅପରେଟର ଆପଣଙ୍କର ତାଲିକାଭୁକ୍ତ କ୍ରେଟ୍ କିମ୍ବା ଚେକ୍-ଇନ୍ ପରେ ମୂଲ୍ୟ ଅପଡେଟ୍ କରନ୍ତି, ତେବେ ଆପଣ ଏକ SMS ପାଇବେ।',
    },
    {
      id: 99,
      title: 'କ୍ରେତାମାନେ ମୋର ଯୋଗାଯୋଗ ବିବରଣୀ ଦେଖିପାରିବେ କି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' ଆପଣଙ୍କ ଉତ୍ପାଦ କିଣିବାକୁ ଆଗ୍ରହୀ ଗ୍ରାହକମାନେ ଆପଣଙ୍କ ଯୋଗାଯୋଗ ବିବରଣୀ ଦେଖିପାରିବେ କି ନାହିଁ ତାହା ଆପଣ ନିଜେ ନିଷ୍ପତ୍ତି ନେଇପାରିବେ। ଏହା ମୂଲ୍ୟ ଆଲୋଚନା କିମ୍ବା ଶୀତଳ କୋଠରୀରେ ସଂରକ୍ଷଣ ହୋଇନଥିବା ଉତ୍ପାଦ ପାଇଁ ପୁନରାବୃତ୍ତି ଅର୍ଡର କ୍ଷେତ୍ରରେ ଉପଯୋଗୀ ହୋଇପାରେ (ଏବଂ ତେଣୁ କ୍ରେତାଙ୍କ ପାଇଁ ଦୃଶ୍ୟମାନ ନୁହେଁ)। ଆପଣ "ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" -> "ଯୋଗାଯୋଗ ସେୟାରିଂ" ଅଧୀନରେ ଯେକୌଣସି ସମୟରେ ଆପଣଙ୍କର ସେଟିଂସ୍ ଅପଡେଟ୍ କରିପାରିବେ।',
    },
    {
      id: 100,
      title: ' ମୁଁ ଜଣେ କ୍ରେତାଙ୍କୁ ରିହାତି ଦେବାକୁ ଚାହୁଁଛି। ମୁଁ ଏହା କିପରି କରିପାରିବି?',
      role: [ERoles.EMPLOYEE],
      text: '"ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" -> "ଡିକାଉଣ୍ଟ କୁପନ୍" ଅଧୀନରେ, ଆପଣ ଏକ କୋଡ୍ ଏବଂ ଶତକଡ଼ା ରିହାତି ଥିବା କୁପନ୍ ସୃଷ୍ଟି କରିପାରିବେ। ଏଗୁଡ଼ିକ ହେଉଛି ସେହି କୁପନ୍ ଯାହା ଆପଣ ବିକ୍ରୟ କରୁଥିବା ଉତ୍ପାଦ ପାଇଁ ବୈଧ (ବ୍ୟକ୍ତିଗତ ଭାବରେ)। କମ୍ପାନୀର ମାଲିକାନା ଉତ୍ପାଦ ପାଇଁ ବୈଧ କୁପନ୍ ସେଟ୍ କରିବାକୁ, ଆପଣ "ବିକ୍ରେତା ସେଟିଂସ୍ (କମ୍ପାନୀ)" ଅଧୀନରେ "ମେନୁ" -> "ପରିବର୍ତ୍ତନ" -> "ଡିକାଉଣ୍ଟ କୁପନ୍" କୁ ନାଭିଗେଟ୍ କରିପାରିବେ। ଆପଣ ଗ୍ରାହକଙ୍କ ସହିତ କୁପନ୍ କୋଡ୍ ସେୟାର କରିପାରିବେ, ଏବଂ ସେ ପେମେଣ୍ଟ ସ୍କ୍ରିନରେ କୋଡ୍ ରିଡିମ୍ କରିପାରିବେ। କୁପନ୍ କୋଡ୍ ଆପଣ ପ୍ରତ୍ୟାହାର ନ କରିବା ପର୍ଯ୍ୟନ୍ତ ବୈଧ ରହିବ। ଯଦି ଆପଣ ସମସ୍ତ ସମ୍ଭାବ୍ୟ କ୍ରେତାଙ୍କୁ ରିହାତି ପ୍ରଦାନ କରିବାକୁ ଚାହାଁନ୍ତି, ତେବେ ଆପଣ ବଜାରରେ ଦୃଶ୍ୟମାନ ବିକ୍ରୟ ମୂଲ୍ୟକୁ ହ୍ରାସ କରିପାରିବେ।',
    },
    {
      id: 101,
      title: ' ମୁଁ ଜଣେ କ୍ରେତାଙ୍କୁ ରିହାତି ଦେବାକୁ ଚାହୁଁଛି। ମୁଁ ଏହା କିପରି କରିପାରିବି?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: '"ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" -> "ଡିକାଉଣ୍ଟ କୁପନ୍" ଅଧୀନରେ, ଆପଣ ଏପରି କୁପନ୍ ତିଆରି କରିପାରିବେ ଯେଉଁଥିରେ ଏକ କୋଡ୍ ଏବଂ ଶତକଡ଼ା ରିହାତି ଥାଏ। ଆପଣ ଗ୍ରାହକଙ୍କ ସହିତ କୁପନ୍ କୋଡ୍ ସେୟାର କରିପାରିବେ, ଏବଂ ସେ ପେମେଣ୍ଟ ସ୍କ୍ରିନରେ କୋଡ୍ ରିଡିମ୍ କରିପାରିବେ। କୁପନ୍ କୋଡ୍ ଆପଣ ପ୍ରତ୍ୟାହାର ନ କରିବା ପର୍ଯ୍ୟନ୍ତ ବୈଧ ରହିବ। ଯଦି ଆପଣ ସମସ୍ତ ସମ୍ଭାବ୍ୟ କ୍ରେତାଙ୍କୁ ରିହାତି ଦେବାକୁ ଚାହାଁନ୍ତି, ତେବେ ଆପଣ ବଜାରରେ ଦୃଶ୍ୟମାନ ବିକ୍ରୟ ମୂଲ୍ୟକୁ ହ୍ରାସ କରିପାରିବେ।',
    },
    {
      id: 102,
      title: ' ମୋର ଫସଲକୁ ବାଣିଜ୍ୟିକ କରିବାରେ ଶୀତଳ କୋଠରୀ ପରିଚାଳକମାନେ କିପରି ସାହାଯ୍ୟ କରିପାରିବେ?',
      role: [ERoles.COOLING_USER],
      text: 'ଶୀତଳ କୋଠରୀରେ ଉତ୍ପାଦିତ ସାମଗ୍ରୀ ସଂରକ୍ଷଣ ସହିତ ଜଡିତ ଯେକୌଣସି ଜିନିଷ ପାଇଁ ଶୀତଳ କୋଠରୀ ପରିଚାଳକମାନେ ଆପଣଙ୍କର ଯୋଗାଯୋଗ ବିନ୍ଦୁ ଅଟନ୍ତି, ଏବଂ ଯଦି ଆପଣଙ୍କର ସ୍ମାର୍ଟଫୋନ୍ ଉପଲବ୍ଧ ନଥାଏ, ତେବେ ମଧ୍ୟ ସେମାନେ ଆପଣଙ୍କର ଫସଲ ବଜାରରେ ପହଞ୍ଚାଇବାରେ ସାହାଯ୍ୟ କରିପାରିବେ। ସେମାନଙ୍କର ଇଣ୍ଟରଫେସ୍ ରୁ, ସେମାନେ ଆପଣଙ୍କର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ବିବରଣୀ ସେଟ୍ ଅପ୍ କରିପାରିବେ, ଯେଉଁଠାରେ ଆପଣ ଉତ୍ପାଦିତ ସାମଗ୍ରୀ ବିକ୍ରୟରୁ ରାଜସ୍ୱ ପାଇବେ। ଚେକ୍-ଇନ୍ ସମୟରେ, ସେମାନେ ଆପଣଙ୍କୁ "ବିକ୍ରୟ ପାଇଁ" କ୍ରେଟ୍ ତାଲିକାଭୁକ୍ତ କରିବାରେ ସାହାଯ୍ୟ କରିପାରିବେ, ଯାହା ସେଗୁଡ଼ିକୁ ବଜାରରେ ଦୃଶ୍ୟମାନ କରିଥାଏ, ଏବଂ ପ୍ରତ୍ୟେକ ଉତ୍ପାଦ ପାଇଁ ବିକ୍ରୟ ମୂଲ୍ୟ (ପ୍ରତି କିଲୋଗ୍ରାମ) ସ୍ଥିର କରିଥାଏ। ଯଦି ଆପଣ ଆପଣଙ୍କର ମନ ପରିବର୍ତ୍ତନ କରନ୍ତି, ତେବେ ଆପଣ ସର୍ବଦା ବଜାରରୁ କ୍ରେଟ୍ଗୁଡ଼ିକୁ "ବିକ୍ରୟ ପାଇଁ" ତାଲିକାଭୁକ୍ତ କିମ୍ବା ତାଲିକାଭୁକ୍ତ କରି ଯୋଡିବା କିମ୍ବା ଅପସାରଣ କରିବାକୁ କହିପାରିବେ। କିଛି ଶୀତଳ କୋଠରୀରେ, ଅପରେଟର କିମ୍ବା ସେମାନଙ୍କର ସହଯୋଗୀମାନେ ସିଧାସଳଖ ଚାଷୀଙ୍କଠାରୁ ଉତ୍ପାଦ କିଣି ଖୁଚୁରା ବ୍ୟବସାୟୀଙ୍କୁ ବିକ୍ରୟ କରିବା ପାଇଁ ମଧ୍ୟ ଦାୟୀ। ଆପଣ ଏହି ବିକଳ୍ପରେ ଆଗ୍ରହୀ ଜଣେ ଚାଷୀ କିମ୍ବା ବ୍ୟବସାୟୀ, କିମ୍ବା ଶୀତଳ କୋଠରୀରୁ ବହୁ ପରିମାଣରେ କିଣିବାକୁ ଆଗ୍ରହୀ ଜଣେ ଖୁଚୁରା ବ୍ୟବସାୟୀ, ଦୟାକରି ଏହି ସୁଯୋଗ ଅନୁସନ୍ଧାନ କରିବା ପାଇଁ ଶୀତଳ କମ୍ପାନୀ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    },
    {
      id: 103,
      title: "ବଜାରରେ ମୁଁ ଦେଖୁଥିବା 'କମ୍ପାନୀ ତରଫରୁ କିଣନ୍ତୁ' ବିକଳ୍ପଟି କ'ଣ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ଅପରେଟର ଏବଂ ପଞ୍ଜିକୃତ କର୍ମଚାରୀମାନେ ବଜାରରେ ନିଜ ପାଇଁ, ବ୍ୟକ୍ତିଗତ ଭାବରେ କିମ୍ବା ସେମାନେ ପ୍ରତିନିଧିତ୍ୱ କରୁଥିବା କମ୍ପାନୀ ପକ୍ଷରୁ ଉତ୍ପାଦିତ ସାମଗ୍ରୀ ବିକ୍ରୟ ଏବଂ କ୍ରୟ କରିପାରିବେ। ଏହି ବିକଳ୍ପ ସମସ୍ତ କାରବାର କମ୍ପାନୀର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟରୁ ଏବଂ ବ୍ୟକ୍ତିଗତ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ମାଧ୍ୟମରେ ନୁହେଁ, ବରଂ କମ୍ପାନୀର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟରୁ କାର୍ଯ୍ୟକାରୀ କରିବାକୁ ଅନୁମତି ଦିଏ। ଯେତେବେଳେ ଜଣେ ଅପରେଟର କିମ୍ବା ପଞ୍ଜିକୃତ କର୍ମଚାରୀ "କମ୍ପାନୀର ପକ୍ଷରୁ" ଉତ୍ପାଦିତ ସାମଗ୍ରୀ କିଣନ୍ତି, ସେତେବେଳେ କମ୍ପାନୀ ବିକ୍ରେତାଙ୍କୁ ପ୍ରାପ୍ୟ ପରିମାଣ ପ୍ରଦାନ କରେ ଏବଂ କ୍ରେଟର ମାଲିକ ହୋଇଯାଏ। ଯଦି ସେହି କ୍ରେଟରଗୁଡ଼ିକ ବଜାରରେ ବିକ୍ରୟ ପାଇଁ ତାଲିକାଭୁକ୍ତ ହୋଇଥାଏ, ତେବେ ସେଗୁଡ଼ିକୁ ଶୀତଳୀକରଣ କମ୍ପାନୀର ମାଲିକାନା ଭାବରେ ଦର୍ଶାଯାଏ ଏବଂ ବିକ୍ରୟ ଶୁଳ୍କ କମ୍ପାନୀର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟକୁ ପଠାଯାଏ। ଯେତେବେଳେ ଜଣେ ଅପରେଟର କିମ୍ବା ପଞ୍ଜିକୃତ କର୍ମଚାରୀ ନିଜ ପାଇଁ ଉତ୍ପାଦିତ ସାମଗ୍ରୀ କିଣନ୍ତି, ସେତେବେଳେ ସେମାନେ ପ୍ରଦାନ କରାଯାଇଥିବା ସେମାନଙ୍କର ବ୍ୟକ୍ତିଗତ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ବିବରଣୀରୁ ବିକ୍ରେତାଙ୍କୁ ପ୍ରାପ୍ୟ ପରିମାଣ ପ୍ରଦାନ କରିବେ ଏବଂ ବ୍ୟକ୍ତିଗତ ଭାବରେ କ୍ରେଟର ମାଲିକ ହେବେ। ଯଦି ସେଗୁଡ଼ିକୁ ଶୀତଳୀକରଣ ୟୁନିଟରେ ସଂରକ୍ଷଣ କରାଯାଏ, ତେବେ ସେଗୁଡ଼ିକୁ ଅପରେଟର କିମ୍ବା ପଞ୍ଜିକୃତ କର୍ମଚାରୀଙ୍କ ନାମରେ ତାଲିକାଭୁକ୍ତ କରାଯିବ ଏବଂ ଯଦି ସେଗୁଡ଼ିକୁ ବଜାରରେ ବିକ୍ରୟ ପାଇଁ ତାଲିକାଭୁକ୍ତ କରାଯାଏ, ତେବେ ସେଗୁଡ଼ିକୁ ଅପରେଟର କିମ୍ବା ପଞ୍ଜିକୃତ କର୍ମଚାରୀଙ୍କ ମାଲିକାନା ଭାବରେ ଦର୍ଶାଯିବ।',
    },
    {
      id: 104,
      title: 'ବଜାରରେ ଦେଖାଯାଉଥିବା ଶୁଳ୍କ କ’ଣ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' ବଜାରରେ ପ୍ରଦର୍ଶିତ ପ୍ରତ୍ୟେକ ଜିନିଷର ବିକ୍ରୟ ମୂଲ୍ୟ ବିକ୍ରେତାଙ୍କ ଦ୍ୱାରା ସିଧାସଳଖ ସ୍ଥିର କରାଯାଏ ଏବଂ ଏହା କେତେ କିଲୋ କିଣାଯାଇଛି ତାହା ଉପରେ ନିର୍ଭର କରେ। ସେହି ପରିମାଣ ବ୍ୟତୀତ, ବଜାରରେ ଦୁଇଟି ଶୁଳ୍କ ଅନ୍ତର୍ଭୁକ୍ତ: ବଜାର ଶୁଳ୍କ ହେଉଛି ଏକ 3.5% କାରବାର ଶୁଳ୍କ ଯାହା କୋଲଡିଭେଟ୍ ଦଳ ଦ୍ୱାରା ଆବେଦନକୁ କାର୍ଯ୍ୟକ୍ଷମ କରିବା ଏବଂ ହୋଷ୍ଟ କରିବା ପାଇଁ ସଂଗ୍ରହ କରାଯାଏ। ପେମେଣ୍ଟ ଶୁଳ୍କ ହେଉଛି ସେହି ଶୁଳ୍କ ଯାହାକୁ ଡିଜିଟାଲ୍ ପେମେଣ୍ଟ ସିଷ୍ଟମ୍ (ନାଇଜେରିଆରେ PayStack) କାରବାର ପ୍ରକ୍ରିୟାକରଣ ପାଇଁ ଆଦାୟ କରୁଛି।',
    },
    {
      id: 105,
      title:
        'ମୁଁ ଜଣେ କ୍ରେତା ଯିଏ ଶୀତଳ କୋଠରୀରୁ ଉତ୍ପାଦିତ ଦ୍ରବ୍ୟ କିଣିବାକୁ ଆଗ୍ରହୀ, କିନ୍ତୁ ମୁଁ ବଜାରରେ କିଛି ଦେଖୁନାହିଁ। କାହିଁକି?',
      role: [ERoles.COOLING_USER],
      text: 'ଯଦି ଆପଣ ମାର୍କେଟପ୍ଲେସ୍ ଟ୍ୟାବ୍ କୁ ଯାଆନ୍ତି କିନ୍ତୁ କୌଣସି ଉତ୍ପାଦ ଦେଖିପାରୁନାହାଁନ୍ତି, ତେବେ ଏହା ଆପଣ ସନ୍ଧାନରେ ପ୍ରୟୋଗ କରିଥିବା ଫିଲ୍ଟରଗୁଡ଼ିକ (ଯେପରିକି ସ୍ଥାନ, ମୂଲ୍ୟ ସୀମା, କିମ୍ବା ଆଗ୍ରହର ଫସଲ) ଯୋଗୁଁ ହୋଇପାରେ, କିମ୍ବା ଆପଣଙ୍କ ଆଖପାଖରେ କୌଣସି ସାମଗ୍ରୀ ବିକ୍ରୟ ପାଇଁ ଉପଲବ୍ଧ ନଥିବାରୁ ହୋଇପାରେ। ଯଦି ଆପଣ ନିକଟରେ ଏକ ବିଦ୍ୟମାନ ଶୀତଳ କୋଠରୀ ବିଷୟରେ ଜାଣନ୍ତି, ତେବେ ଆମେ ଶୀତଳ କୋଠରୀ ଅପରେଟରଙ୍କୁ ପଚାରିବାକୁ ସୁପାରିଶ କରୁଛୁ ଯେ କୌଣସି ଶୀତଳ ଉପଭୋକ୍ତା ବଜାର କାର୍ଯ୍ୟକାରିତା ମାଧ୍ୟମରେ ଉତ୍ପାଦ ବିକ୍ରୟ କରିବାକୁ ଆଗ୍ରହୀ କି ନାହିଁ ଏବଂ ସେହି ଜିନିଷଗୁଡ଼ିକୁ ଆପ୍‌ରେ ତାଲିକାଭୁକ୍ତ କରିବାକୁ କୁହନ୍ତୁ।',
    },
    {
      id: 106,
      title: 'ଆପଣ ବିତରଣ ସେବା ପ୍ରଦାନ କରନ୍ତି କି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଏହି ସମୟରେ ବଜାର ବିତରଣ ସେବା ପ୍ରଦାନ କରେ ନାହିଁ, କିନ୍ତୁ କ୍ରେତାଙ୍କ ପାଖରେ ଉତ୍ପାଦିତ ସାମଗ୍ରୀ ପହଞ୍ଚାଇପାରିବା ପାଇଁ ଲଜିଷ୍ଟିକ୍ସ ସମାଧାନ ସହିତ ସଂଯୋଗକୁ ସୁଗମ କରିଥାଏ। ଜଣେ ପଞ୍ଜିକୃତ କର୍ମଚାରୀ ଭାବରେ, ଆପଣଙ୍କ ପାଖରେ "ମେନୁ" -> "ପରିଚାଳନା" -> "ବିକ୍ରେତା ସେଟିଂସ୍ (କମ୍ପାନୀ)" -> "ବିତରଣ ଯୋଗାଯୋଗ" ଅଧୀନରେ ବିତରଣ ଯୋଗାଯୋଗ ଯୋଡିବାର ବିକଳ୍ପ ଅଛି। ସେଗୁଡ଼ିକ ଆପଣଙ୍କ ଶୀତଳ କୋଠରୀରୁ ଉତ୍ପାଦିତ ସାମଗ୍ରୀ କ୍ରୟ କରୁଥିବା ସମସ୍ତ କ୍ରେତାଙ୍କୁ ଦେୟ ଦେଇ ପ୍ରଦର୍ଶିତ ହୁଏ। ଯଦି ଆପଣ ଜଣେ କ୍ରେତା, ତେବେ ଆପଣଙ୍କୁ ଆପଣଙ୍କର ବିତରଣ ବ୍ୟବସ୍ଥା କରିବା ପାଇଁ ସେମାନଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରିବାକୁ ଉତ୍ସାହିତ କରାଯାଉଛି। ଦୟାକରି ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ ଯଦି ଉତ୍ପାଦିତ ସାମଗ୍ରୀ କ୍ରୟ ଦିନ ହିଁ ଉଠାଯାଏ, ତେବେ କୌଣସି ଶୀତଳକରଣ ଶୁଳ୍କ ଲାଗୁ ହେବ ନାହିଁ, କିନ୍ତୁ ଯଦି ଆପଣ ଫସଲକୁ ସଂରକ୍ଷଣରେ ରଖନ୍ତି, ତେବେ ଏକ ଦୈନିକ ଶୀତଳକରଣ ଶୁଳ୍କ ଦେବାକୁ ପଡିବ। ଆପଣ ଯେଉଁ ବିତରଣ ଯୋଗାଯୋଗ ସହିତ ଆଲୋଚନା କରୁଛନ୍ତି ତାଙ୍କ ସହିତ ଏହା ଆଲୋଚନା କରିବାକୁ ନିଶ୍ଚିତ କରନ୍ତୁ।',
    },
    {
      id: 107,
      title:
        " ମୁଁ ଆପରେ ଏକ ବିଜ୍ଞପ୍ତି ପାଇଲି ଯେଉଁଥିରେ ଲେଖାଥିଲା ଯେ 'ଉତ୍ପାଦନକୁ ପୁନଃବଣ୍ଟନ କରିବାକୁ ପଡିବ'। ତାହା କ'ଣ?",
      role: [ERoles.OPERATOR],
      text: 'ଶୀତଳ କୋଠରୀରେ ଚେକ୍-ଇନ୍ ପ୍ରକ୍ରିୟା ଯୋଗୁଁ, ଗୋଟିଏ କ୍ରେଟର ସାମଗ୍ରୀ ଜଣେ ଚାଷୀ କିମ୍ବା ବ୍ୟବସାୟୀଙ୍କର ହୋଇଥାଏ। ବଜାରରେ, ଜଣେ କ୍ରେତା ଜଣେ ବିକ୍ରେତାଙ୍କ ଏକ କ୍ରେଟ୍ ରୁ କିଛି କିଲୋଗ୍ରାମ କିଣିପାରିବେ, ତେଣୁ କ୍ରୟ ହୋଇଥିବା ପରିମାଣ ଏକ ପୃଥକ କ୍ରେଟ୍ କୁ ସ୍ଥାନାନ୍ତରିତ ହେବା ଉଚିତ। ଏହି ବିଜ୍ଞପ୍ତି ଆପଣଙ୍କୁ ସୂଚିତ କରେ ଯେ ଏକ କ୍ରୟ ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଛି, ଏବଂ ଏହା ଉପରେ କ୍ଲିକ୍ କରି ଆପଣ କେଉଁ କ୍ରେଟ୍ ରୁ ଉତ୍ପାଦିତ ଦ୍ରବ୍ୟ ନିଆଯିବ ତାହା ଦେଖିପାରିବେ। ଫସଲଗୁଡ଼ିକୁ ଭୁଲରେ ଚେକ୍-ଆଉଟ୍ ନ କରିବା ଏବଂ ଶୀତଳକରଣ ଫି ସଠିକ୍ ଭାବରେ ସଂଗ୍ରହ କରିବା ନିଶ୍ଚିତ କରିବା ପାଇଁ କ୍ରେଟ୍ଗୁଡ଼ିକୁ ସଂଗଠିତ ରଖିବା ଅତ୍ୟନ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। କୋଲଡିଭେଟରେ ଭୌତିକ କ୍ରେଟ୍ ସହିତ କ୍ରେଟ୍ ଟ୍ୟାଗ୍ କରିବା ଏବଂ ବିଜ୍ଞପ୍ତି ଆଧାରରେ କେଉଁ କ୍ରେଟ୍ ପାଇଁ ଆପଣଙ୍କର ଧ୍ୟାନ ଆବଶ୍ୟକ ତାହା ସହଜରେ ଟ୍ରାକ୍ କରିବା ପାଇଁ ଆମେ ଚେକ୍-ଇନ୍ ସମୟରେ "କ୍ରେଟ୍ ଆଇଡି" କାର୍ଯ୍ୟକ୍ଷମତା ବ୍ୟବହାର କରିବାକୁ ସୁପାରିଶ କରୁଛୁ।',
    },
    {
      id: 108,
      title: ' ମୁଁ ବଜାରରୁ କେତେ ପରିମାଣର ଉତ୍ପାଦ କିଣିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: ' ବଜାରରେ ପ୍ରଦର୍ଶିତ ପ୍ରତ୍ୟେକ ଜିନିଷ ପାଇଁ, ଆପଣ ସମ୍ପୂର୍ଣ୍ଣ କ୍ରେଟ୍ କିମ୍ବା କ୍ରେଟ୍ ରେ ଥିବା ଯେକୌଣସି କିଲୋଗ୍ରାମ କିଣିପାରିବେ। ସର୍ବନିମ୍ନ 1 କିଲୋଗ୍ରାମ କିଣିହେବ।',
    },
    {
      id: 109,
      title: 'ମୁଁ କିଛି ଉତ୍ପାଦ କିଣିଛି ଏବଂ ଏହାକୁ ପୁନଃବିକ୍ରୟ କରିବାକୁ ଚାହେଁ। ମୁଁ ଏହା କିପରି କରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଯେତେବେଳେ ଆପଣ ବଜାରରୁ କିଛି ଉତ୍ପାଦ କିଣିବେ, ଆପଣ କ୍ରୟ ହୋଇଥିବା ପରିମାଣର ମାଲିକ ହେବେ। "ଡ୍ୟାସବୋର୍ଡ"ରେ, ଆପଣ ଏକ ନୂତନ ପ୍ରବେଶ ଦେଖିବେ ଯାହା ସୂଚିତ କରେ ଯେ ଆପଣ ଶୀତଳ କୋଠରୀରେ କ"ଣ ସଂରକ୍ଷଣ କରିଛନ୍ତି। ଯଦି ଆପଣ ଏହାକୁ ବିକ୍ରୟ ପାଇଁ ବିକ୍ରୟ କରିବାକୁ ଚାହାଁନ୍ତି, ତେବେ ଆପଣ ଡ୍ୟାସବୋର୍ଡ ଆଇଟମର ଡାହାଣ ପାର୍ଶ୍ୱରେ ">" ଚିହ୍ନ ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ, "କ୍ରେଟ୍ ଓଜନ ଏବଂ ବଜାର ତାଲିକା" କୁ ନେଭିଗେଟ୍ କରିପାରିବେ, ଆପଣ କେଉଁ କ୍ରେଟ୍ "ବିକ୍ରୟ ପାଇଁ" ଏବଂ ପ୍ରତି କିଲୋଗ୍ରାମ ମୂଲ୍ୟ ସ୍ଥିର କରିବାକୁ ଚାହୁଁଛନ୍ତି ତାହା ସ୍ଥିର କରିପାରିବେ। ବଜାରରେ ଗ୍ରାହକମାନେ ଏହି କ୍ରେଟ୍ଗୁଡ଼ିକୁ ଦେଖିପାରିବେ ଏବଂ ସୂଚିତ ପରିମାଣରେ କିଣିପାରିବେ। ଦୟାକରି ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ ବିକ୍ରୟ ପାଇଁ କ୍ରେଟ୍ ସେଟ୍ କରିବାକୁ, ଆପଣଙ୍କର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ସେଟ୍ ଅପ୍ ହେବା ଆବଶ୍ୟକ। ଆପଣଙ୍କର ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ ବିବରଣୀ ଯୋଡିବା ପାଇଁ ନିର୍ଦ୍ଦେଶାବଳୀ ଅନୁସରଣ କରନ୍ତୁ, କିମ୍ବା "ମେନୁ" -> "ଆକାଉଣ୍ଟ ବିବରଣୀ" -> "ପେମେଣ୍ଟ ବିକଳ୍ପ" କୁ ନେଭିଗେଟ୍ କରନ୍ତୁ।',
    },
    {
      id: 110,
      title:
        ' ମୁଁ ମାର୍କେଟପ୍ଲେସ୍ ପେମେଣ୍ଟ ପ୍ରକ୍ରିୟାରୁ ବାହାରି ଆସିଲି। ମୁଁ ମୋର କ୍ରୟକୁ କିପରି ଶେଷ କରିପାରିବି?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ଯେତେବେଳେ ଆପଣ ସପିଂ କାର୍ଟରେ "ପେ" ଉପରେ କ୍ଲିକ୍ କରି କ୍ରୟ ଆରମ୍ଭ କରନ୍ତି, ଆପଣଙ୍କୁ ପେମେଣ୍ଟ ପ୍ରଦାନକାରୀ (ନାଇଜେରିଆରେ PayStack) ପାଖକୁ ପୁନଃନିର୍ଦ୍ଦେଶିତ କରାଯାଏ। ଯଦି, କୌଣସି କାରଣରୁ, ଆପଣ ପ୍ରକ୍ରିୟା ପରିତ୍ୟାଗ କରନ୍ତି, ତେବେ ଆପଣଙ୍କର ଅର୍ଡର "ପେମେଣ୍ଟ ବାକି" ଭାବରେ ଚିହ୍ନିତ ହେବ। ଆପଣ ମାର୍କେଟପ୍ଲେସ୍ ପୃଷ୍ଠାରେ "ମୋ ଅର୍ଡର" ଟ୍ୟାବ୍ ତଳେ ଆପଣଙ୍କର ଅର୍ଡର ପାଇପାରିବେ। ଆପଣ ପେମେଣ୍ଟ ଚୂଡ଼ାନ୍ତ କରିବା ପାଇଁ ଆଇଟମ୍ ଉପରେ କ୍ଲିକ୍ କରିପାରିବେ। ପେମେଣ୍ଟ ସମାପ୍ତ କରିବା ପାଇଁ ଆପଣଙ୍କ ପାଖରେ 30 ମିନିଟ୍ ସମୟ ଅଛି, ଯାହା ପରେ ଅର୍ଡରକୁ "ବାତିଲ୍ କରାଯାଇଛି" ବୋଲି ବିବେଚନା କରାଯାଏ ଏବଂ ଅନ୍ୟ କ୍ରେତାମାନେ ଏହାକୁ କିଣିବା ପାଇଁ ପରିମାଣ ମୁକ୍ତ କରାଯାଏ।',
    },
    {
      id: 111,
      title: ' ମୁଁ କିଛି ଫସଲ ଯାଞ୍ଚ କରିପାରୁନାହିଁ। ଏହା କାହିଁକି ହେଉଛି?',
      role: [ERoles.OPERATOR],
      text: 'ଯଦି ଆପଣ ବଜାରରେ ତାଲିକାଭୁକ୍ତ କିଛି କ୍ରେଟଗୁଡ଼ିକୁ ଯାଞ୍ଚ କରିବାକୁ ଚେଷ୍ଟା କରୁଛନ୍ତି, ଏବଂ ସେଗୁଡ଼ିକୁ ଯାଞ୍ଚ କରିପାରୁନାହାଁନ୍ତି, ତେବେ ଏହା ସମ୍ଭବତଃ ଏକ ପେମେଣ୍ଟ ଅର୍ଡରର ଅଂଶ ହୋଇଥିବାରୁ ହୋଇପାରେ। ଏହାର ଅର୍ଥ ହେଉଛି ଜଣେ କ୍ରେତା ସେଗୁଡ଼ିକୁ ସପିଂ କାର୍ଟରେ ଯୋଡିଛନ୍ତି ଏବଂ ଏକ କ୍ରୟ ପ୍ରକ୍ରିୟା ଆରମ୍ଭ କରିଛନ୍ତି। କ୍ରେତାଙ୍କ ପାଖରେ ଦେୟ ସମାପ୍ତ କରିବା ପାଇଁ 30 ମିନିଟ୍ ସମୟ ଅଛି, ଯାହା ପରେ ଅର୍ଡର ବାତିଲ ହୋଇଯିବ। 30 ମିନିଟ୍ ବିତିଗଲା ପରେ, ଆପଣ କ୍ରେଟକୁ ଯାଞ୍ଚ କରିପାରିବେ।',
    },
  ],
  [APP_LOCALES.HAUSA]: [
    {
      id: 1,
      title: 'Me yasa zan yi amfani da app?',
      role: [ERoles.AUTH],
      text: 'An tsara manhajar ne don tallafawa masu samar da dakunan sanyi a ayyukansu na yau da kullun a dakunan sanyi, manoma masu amfani da dakunan sanyi, da masu amfani da sha"awar siyan amfanin gona da aka adana a cikin dakunan sanyi. Ka"idar ta ƙunshi ƙira na dijital, sa ido mai nisa da ƙirar rayuwa ga kowane akwati da aka adana, da wurin kasuwa don haɗa masu siye da masu siyarwa. Hakanan ya haɗa da Cibiyar Ilimi, wanda ke ba da takamaiman shawarwarin kayayyaki akan mafi kyawun yanayin ajiya da rayuwar ajiya.',
    },
    {
      id: 2,
      title: 'Wanene zai iya amfani da app?',
      role: [ERoles.AUTH],
      text: 'Kamfanonin adana sanyi, manoma da "yan kasuwa masu sha"awar yin amfani da ma"ajiyar sanyi, da masu sayan sanyi za su iya amfani da shi a duk duniya. A cikin ƙa"idar, akwai ayyuka masu amfani guda uku: (i) Ma"aikaci mai rijista: ɓangaren ƙungiyar kula da masu ba da ɗakin sanyi. Mutumin da ke da alhakin kafawa da sarrafa ɗakin, shine ke kula da ayyukan masu aiki a ƙasa, ba tare da kasancewa a jiki a wurin ba. Misali: Shugaban Kamfanin, CFO, da sauransu. (ii) Ma"aikaci: ma"aikaci yana cikin jiki a dakin sanyi kuma yana kula da rajistarsa, ayyukan dubawa. Wannan mutumin yana hulɗa kai tsaye tare da masu amfani da ɗakin sanyi, kuma yana ba da rahoto ga ma"aikaci mai rijista na kamfani. (iii) Masu amfani da sanyaya ko mabukaci: masu amfani da dakin sanyi (na iya zama manoma, yan kasuwa, dillalai, da sauransu) ko mabukaci (mutum, dillali, dillali). Wannan rawar ta kasance ga duk wanda ke son yin rajista a cikin app ba tare da an haɗa shi da kamfanin sanyaya ba. Masu amfani da kwantar da hankali waɗanda ke da wayar hannu za su iya shiga cikin app azaman masu amfani. Idan ba su da wayar hannu, masu aiki suna yin ayyukan sanyaya masu amfani a madadinsu.',
    },
    {
      id: 3,
      title: "Ta yaya zan iya yin rajista a matsayin ma'aikaci mai rijista?",
      role: [ERoles.AUTH],
      text: 'Idan kai ne ma"aikaci na farko daga kamfanin ku da ya fara rajista, zaku iya danna maɓallin "Yi rijista azaman kamfani" kuma ku bi matakan yin rijistar kamfanin ku da kanku (ciki har da bayanan sirri da kalmar sirri). Da zarar kun yi nasarar yin rajista, za ku iya shiga a matsayin ma"aikaci mai rijista a cikin app ɗin kuma aika gayyatar SMS zuwa sauran ma"aikatan da suka yi rajista don shiga cikin kamfanin ku. Da zarar an ƙirƙiri kamfani, duk Ma"aikatan da ke Rijista ya kamata a gayyaci su ta SMS. In ba haka ba, ba za a haɗa su da kamfani ɗaya ba.',
    },
    {
      id: 4,
      title: 'Ta yaya zan iya yin rajista a matsayin Mai Aiki?',
      role: [ERoles.AUTH],
      text: 'Don yin rajista, kuna buƙatar ma"aikaci mai rijista ya gayyace ku. Za ku karɓi SMS tare da hanyar haɗin kunnawa, daga inda zaku iya saita bayanan sirri da kalmar wucewa.',
    },
    {
      id: 5,
      title: 'Ta yaya zan iya yin rajista a matsayin mai Cooling mai amfani ko Mabukaci?',
      role: [ERoles.AUTH],
      text: 'Masu amfani da sanyaya da wayoyin hannu da masu amfani za su iya yin rijista danna kan "Yi rijista azaman mai amfani ko mabukaci" a cikin shafin gida da samar da bayanan sirri da kalmar sirri. Masu amfani da sanyaya waɗanda ba su da wayar hannu za a iya ƙara su zuwa app ta masu aiki. Ana buƙatar wannan aikin don fara rajistar masu amfani da sanyaya. Masu amfani da sanyaya suna buƙatar samar da lambar waya, wanda mai aiki zai yi amfani da shi don tuntuɓar masu sanyaya idan akwai buƙata. Ba a buƙatar kalmar sirri a wannan yanayin.',
    },
    {
      id: 6,
      title: 'Ba zan iya kammala rajista a matsayin mai amfani ba. Me zan yi?',
      role: [ERoles.AUTH],
      text: 'Don kammala rajistar, da fatan za a tabbatar cewa an gamsu da waɗannan sharuɗɗan: (i) Kana shigar da lambar waya tare da madaidaicin lambar ƙasa (misali +91 na Indiya); (ii) Ba a yi amfani da lambar wayar da kuka bayar don yin rajistar wani mai amfani ba; (iii) Kalmar sirrin da kake shigar da ita ta cika dukkan sharuɗɗan da ake buƙata; (iv) Kalmomin sirrin da kuke shigar dasu iri daya ne - zaku iya danna alamar ido don bayyana kalmar sirri sannan ku duba daidai suke.',
    },
    {
      id: 7,
      title: 'Ba ni da waya amma ina so in yi amfani da app. Me zan yi?',
      role: [ERoles.AUTH],
      text: 'Idan kai ma"aikaci ne mai rijista, ma"aikaci, ko mabukaci, kana buƙatar samar da ingantacciyar lambar waya don yin rajista. Ana buƙatar wayar hannu don amfani da ƙa"idar daidai. Idan kai mai sanyaya ne kuma ba ka da waya, muna kuma ba ka shawara da ka samar da ingantacciyar lambar waya, ta yadda mai aiki zai iya tuntuɓar ka idan akwai buƙata. Kuna iya ba da lambar wayar dan uwa ko aboki idan ba ku da naku. Idan hakan bai yiwu ba, har yanzu mai aiki na iya adana kayan amfanin a cikin daki ta zaɓar "User without phone" a matsayin mai sanyaya a wurin shiga.',
    },
    {
      id: 8,
      title: "Wadanne cikakkun bayanai ake buƙata don shiga a matsayin ma'aikaci mai rijista?",
      role: [ERoles.AUTH],
      text: 'Ma"aikata masu rijista zasu iya shiga tare da imel ko lambar waya, da kalmar sirri.',
    },
    {
      id: 9,
      title: 'Wadanne bayanai ake buƙata don shiga a matsayin mai gudanarwa?',
      role: [ERoles.AUTH],
      text: 'Masu aiki za su iya shiga da lambar wayar su da kalmar sirri.',
    },
    {
      id: 10,
      title:
        'Wadanne cikakkun bayanai ake buƙata don shiga azaman mai Cooling mai amfani ko Mabukaci?',
      role: [ERoles.AUTH],
      text: 'Masu amfani da kwantar da hankali tare da wayar hannu za su iya shiga tare da lambar wayar su da kalmar wucewa. Masu amfani da sanyaya waɗanda ba su da wayar hannu ba sa buƙatar shiga: ma"aikacin na iya yin ayyukan a madadinsu. Masu amfani da sha"awar ganin kasuwa za su iya shiga da lambar wayar su da kalmar sirri.',
    },
    {
      id: 11,
      title: 'Ban sami wata gayyata ta SMS ba. Me zan yi?',
      role: [ERoles.AUTH],
      text: 'Idan kun rasa kalmar sirrinku, zaku iya dawo da asusunku ta danna "Forgot Password" yayin shiga, shigar da lambar wayar ku, kuma zaku karɓi SMS tare da hanyar haɗi don saita sabon kalmar sirri.',
    },
    {
      id: 12,
      title: 'Na rasa kalmar sirri ta. Me zan yi?',
      role: [ERoles.AUTH],
      text: 'Idan kun rasa kalmar sirrinku, zaku iya dawo da asusunku ta danna "Forgot Password" yayin shiga, shigar da lambar wayar ku, kuma zaku karɓi SMS tare da hanyar haɗi don saita sabon kalmar sirri.',
    },
    {
      id: 13,
      title: 'Menene Cibiyar Ilimi?',
      role: [ERoles.EMPLOYEE],
      text: 'Cibiyar Ilimi shafi ne da za a iya samunsa ta hanyar danna Menu na hagu na sama. Ya ƙunshi bayanai masu amfani game da mafi kyawun ayyukan ajiya don kayayyaki daban-daban, gami da mafi kyawun zafin jiki da kimanin lokacin ajiya a ƙarƙashin wannan zafin.',
    },
    {
      id: 14,
      title: 'Ta yaya zan iya gyara bayanin martaba na?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ta danna "Menu" -> "Bayanan asusu", za ku iya ganin bayanan ku kuma ku gyara bayananku na sirri" (suna na farko da na ƙarshe, lambar waya, imel, da jinsi). Ƙarƙashin "Zaɓuɓɓukan Gida", zaku iya canza yaren ƙa"idar. Karkashin "Saitunan Mai siyarwa", zaku iya saita bayanan asusun bankin ku, ƙirƙirar takardun shaida, da sanya bayanan tuntuɓar ku ga jama"a ga masu amfani da kasuwa. Don canza bayanan kamfanin ku, wurare, da raka"o"in sanyaya, kewaya zuwa "Menu" -> "Management", sannan zaɓi abin menu da kuke son canzawa.',
    },
    {
      id: 15,
      title: 'Ta yaya zan iya gyara bayanin martaba na?',
      role: [ERoles.EMPLOYEE],
      text: 'Akwai hanyoyi guda uku don haɗa ma"aikaci zuwa sashin sanyaya. Za ka iya sanya naúrar sanyaya (ko fiye da ɗaya) ga ma"aikaci lokacin da kake aika masa/ta gayyata. In ba haka ba, zaku iya canza raka"o"in sanyaya da ke da alaƙa da mai ba da sabis ta hanyar kewayawa zuwa "Management" -> "Masu aiki", zaɓi afareta, sannan danna "Zaɓi naúrar sanyaya". A ƙarshe, lokacin ƙirƙirar naúrar sanyaya a cikin "Management" -> "Cooling units", zaku iya sanya masu aiki a gare ta. Tuna adana canje-canjen ku kafin fita!',
    },
    {
      id: 16,
      title: 'Ta yaya zan iya sanya masu aiki zuwa sassan sanyaya?',
      role: [ERoles.OPERATOR],
      text: 'Ee, zaku iya fara bincikar mutumin ta amfani da mai sanyaya mai suna "User without waya". Kamar yadda mutane da yawa za su iya amfani da wannan asusu don shiga, tabbatar da ƙara alamar suna a akwatunan da ke cikin ɗakin don gano mai kowane akwati.',
    },
    {
      id: 17,
      title:
        'Mai amfani da sanyaya ya isa dakin sanyi amma bashi da waya. Zan iya har yanzu rajistar shi/ta?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ee, zaku iya fara bincikar mutumin ta amfani da mai sanyaya mai suna "User without waya". Kamar yadda mutane da yawa za su iya amfani da wannan asusu don shiga, tabbatar da ƙara alamar suna a akwatunan da ke cikin ɗakin don gane mai kowane akwati.',
    },
    {
      id: 18,
      title: 'Ta yaya zan yi rajistar kamfani na?',
      role: [ERoles.EMPLOYEE],
      text: 'Don yin rijistar kamfanin ku, akan allon maraba zaɓi "Yi rijista azaman kamfani" kuma cika bayanan da ake buƙata. Shigar da kalmar sirri sannan danna "Sign up" kuma kuna shirye don tafiya!',
    },
    {
      id: 19,
      title: 'Ta yaya zan yi rajistar sabon wurin kamfani na?',
      role: [ERoles.EMPLOYEE],
      text: 'Ana buƙatar ƙirƙira kowace naúrar sanyaya a wuri (kuma ana iya ƙirƙirar raka"a masu sanyaya da yawa don wuri ɗaya). Don ƙara sabon wuri don kamfanin ku, a cikin menu zaɓi "Gudanarwa"> "Wurare". Danna "+" a saman kusurwar dama don ƙara sabon wuri. Cika bayanan da ake buƙata. Danna "ƙara" don tabbatarwa.',
    },
    {
      id: 20,
      title: 'Ta yaya zan yi rijistar sabon sashin sanyaya ga kamfani na?',
      role: [ERoles.EMPLOYEE],
      text: 'Don yin rijistar sabon rukunin sanyaya don kamfanin ku, kuna buƙatar ƙirƙirar aƙalla wuri ɗaya. Sannan, a cikin menu zaɓi "Management"> "Cooling units". Danna "+" a saman kusurwar dama don ƙara sabon sashin sanyaya. Cika bayanan da ake buƙata. Danna "ƙara" don tabbatarwa.',
    },
    {
      id: 21,
      title:
        "Ta yaya zan gayyaci sauran ma'aikatan da suka yi rajista daga kamfanina don yin rajista don app?",
      role: [ERoles.EMPLOYEE],
      text: 'Don gayyatar wasu ma"aikatan da suka yi rijista don kamfanin ku, a cikin menu zaɓi "Gudanarwa"> "Ma"aikacin Rijista". Danna "+" a saman kusurwar dama don ƙara lambar wayar ma"aikacin da kake son gayyata. Danna "Gayyata" don tabbatarwa: abokin aikinku zai karɓi SMS tare da hanyar haɗin da ke jagorantar shi kai tsaye zuwa allon rajista. Bugu da kari, za ku kuma sami imel tare da hanyar haɗin gayyatar. Da fatan za a tura wannan ga ma"aikacin idan har bai samu ta SMS ba.',
    },
    {
      id: 22,
      title: "Ta yaya zan gayyaci ma'aikatan ajiyar sanyi don yin rajista don ƙa'idar?",
      role: [ERoles.EMPLOYEE],
      text: 'Don aika gayyata ga masu aiki don raka"o"in sanyaya ku, a cikin menu zaɓi "Gudanarwa"> "Masu aiki". Danna "+" a saman kusurwar dama don ƙara lambar tarho na afaretan da kake son gayyata. Danna "Gayyata" don tabbatarwa: ma"aikacin zai karɓi saƙo tare da hanyar haɗin da ke jagorantar shi kai tsaye zuwa allon sa hannu. Bugu da kari, za ku kuma sami imel tare da hanyar haɗin gayyatar. Da fatan za a tura wannan ga ma"aikacin idan har bai samu ta SMS ba.',
    },
    {
      id: 23,
      title: 'Ta yaya zan saka idanu da zafin naúrar sanyaya?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Don saka idanu akan yanayin zafi na takamaiman naúrar sanyaya, danna "Ƙari" a kusurwar dama ta dama na mashigin kewayawa, zaɓi "Cooling Units", kewaya zuwa "Yanayin ɗaki", sannan zaɓi sashin sanyaya na sha"awa daga zazzagewa. A cikin wannan rukunin, zaku ga jadawali tare da zafin jiki na tsawon lokaci - zaku iya danna maballin bayanai don ganin ƙimar zafin jiki da tambarin lokaci. Idan dakin yana da na"urori masu auna firikwensin da aka haɗa zuwa app, zaku iya ganin ainihin zafin ɗakin a nan. In ba haka ba, jadawali zai nuna yanayin yanayin da ma"aikacin ɗakin ya saita da hannu a cikin ƙa"idar. Don duba zafin wata naúrar sanyaya, zaku iya zaɓar shi daga jerin abubuwan da ke saman shafin.',
    },
    {
      id: 24,
      title: 'Ta yaya zan sa ido kan zama na sashin sanyaya?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Don gudanar da zama na takamaiman naúrar sanyaya danna kan "Ƙari" a kusurwar dama ta dama na mashigin kewayawa, zaɓi "Cooling Units", kewaya zuwa "Mai Tsara", sannan zaɓi sashin sanyaya na sha"awa daga zazzagewa. Anan zaka iya ganin mazaunin na yanzu (saman) da kuma wanda aka annabta na zama na kwanaki 7 masu zuwa (kasa). Bayanin game da zama na gaba ya dogara ne akan adadin kwanakin da kowane mai amfani ya bayyana a matsayin kwanakin da aka tsara a wurin ajiya lokacin shiga. Yi hankali cewa wannan kiyasi ne kawai kuma yana iya zama kuskure.',
    },
    {
      id: 25,
      title: 'Yaya zan iya ganin abubuwan da aka adana a daki?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Danna alamar "Dashboard" a kasan allon kuma zaɓi sashin sanyaya na sha"awa daga jerin abubuwan da aka ajiye don ganin jerin duk abubuwan da aka adana a cikin naúrar sanyaya.',
    },
    {
      id: 26,
      title: 'Ta yaya zan iya ganin shigarwar da aka shige da kuma fitar da naúrar sanyaya?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Don ganin motsin da ya gabata na naúrar sanyaya danna kan "Ƙari" a kusurwar dama ta dama na mashigin kewayawa, kuma zaɓi "Tarihi": rajistan shiga da suka gabata (gumakan da koren akwati), dubawa (gumaka tare da akwatun lemu), kuma ana nuna ayyukan kasuwa (gumaka masu shuɗi) tare da cikakkun bayanan ma"amala. Idan takamaiman ma"amala yana da ban sha"awa aikin bincike zai iya taimaka maka wajen gano ta!',
    },
    {
      id: 28,
      title: 'Wadanne manyan ayyuka ne mai aiki zai iya yi a cikin app?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Mai aiki na iya: yin rijistar sabbin masu amfani da sanyaya, fara rajistan shiga, saka idanu akan abubuwa a cikin ma"ajiya da wurin zama, fara dubawa, da lura da yanayin yanayin sanyaya da yake da alhakinsa. Har ila yau, ma"aikacin na iya taimakawa masu amfani da sanyaya a cikin jera wasu akwatuna don siyarwa da saita farashin siyarwa.',
    },
    {
      id: 29,
      title: 'Ta yaya zan iya yin rajistar sabbin masu amfani da sanyaya?',
      role: [ERoles.OPERATOR],
      text: 'Don yin rijistar sabon mai amfani da sanyaya, a cikin Menu kewaya zuwa "Management"> "Masu amfani da sanyaya". Danna "+" a saman kusurwar dama kuma zaɓi ko za a ƙara mai amfani da riga mai rijista tare da lamba, ko ƙara bayanan mai amfani. Mai sanyaya mai amfani wanda ke da wayowin komai da ruwan kuma ya riga ya yi rajista a cikin Coldtivate yana da lamba ta musamman, wacce zai iya samu a ƙarƙashin "Menu" -> "Bayanan Asusu" -> "Bayani na Sirri" -> Lambobin shigo da mai mai sanyaya. Idan mai amfani ba shi da wayar hannu, ko kuma ba a yi rajista ba tukuna, zaku iya ƙara mai amfani ta ƙara suna, jinsi da lambar tarho. Idan mai amfani ba shi da lambar kansa, za a iya amfani da lambar wani (misali abokai, dangi), amma da fatan za a iya amfani da lambar waya ɗaya sau ɗaya kawai. Danna "Ajiye canje-canje" don tabbatarwa. Don kammala rajistar, kuna buƙatar cika ɗan gajeren bincike ta yin ƴan tambayoyi ga mai amfani da sanyaya. Hakanan za"a iya kammala binciken a wani wuri na gaba ta hanyar kewayawa zuwa "Gudanarwa" -> "Masu Amfani" -> "Binciken Mai Amfani" Cooling".',
    },
    {
      id: 30,
      title:
        'Mai amfani da sanyaya ba shi da lokaci don amsa tambayoyin binciken a rajista. Me zan yi?',
      role: [ERoles.OPERATOR],
      text: 'Kuna iya tsallake tambayoyin binciken ta danna "Kammala daga baya". A wannan yanayin, za a sa ka kammala binciken a karon farko da kake ƙirƙirar rajistan shiga don mai sanyaya. Ana ba da shawarar ɗaukar lokaci da amsa tambayoyin binciken da kyau: ta wannan hanyar mai amfani zai iya samun ƙarin ƙwarewa tare da Coldtivate app!',
    },
    {
      id: 31,
      title:
        "Wani ma'aikaci yana tambayar ni lambar don ƙara ni cikin jerin masu amfani da sanyaya na kamfanin. A ina zan sami lambar?",
      role: [ERoles.OPERATOR],
      text: 'Don fara rajista, kewaya zuwa Dashboard kuma danna maballin Mai sarrafa Ayyuka a ƙasan dama, sannan danna maɓallin kore.',
    },
    {
      id: 32,
      title: 'Ba ni da lokaci don amsa tambayoyin binciken a yin rajista. Me zan yi?',
      role: [ERoles.OPERATOR],
      text: 'Akwai hanyoyi guda biyu don fara dubawa, duka suna farawa a cikin shafin Dashboard. Kuna iya danna maballin Mai sarrafa Ayyuka a ƙasan dama, sannan danna maɓallin ja. Ta wannan hanyar, zaku iya zaɓar wanda mai amfani da sanyaya (kuma a cikin wace sashin sanyaya) kuke son fara rajistan, kuma zaku iya bincika akwatunan sa daga ins ɗin rajista da yawa. A madadin, za ku iya danna "Duba cikakkun bayanai" don wani abu da kuke gani a cikin Dashboard (tabbatar cewa yana cikin madaidaicin sashin sanyaya), sannan danna "Duba". A wannan yanayin, zaku iya bincika akwatuna daga abin ajiyar kawai.',
    },
    {
      id: 33,
      title: "Ina sha'awar adana amfanin gona na a cikin dakuna masu sanyi. Ta yaya zan same su?",
      role: [ERoles.EMPLOYEE],
      text: 'Don nemo ɗakunan sanyi kusa da ku, kewaya zuwa "Ƙari" a kusurwar dama ta dama na mashaya, zaɓi "Cooling units" da "Map". Anan zaku iya nemo dakunan sanyi na kusa, sannan ku kawo akwatunan ku zuwa dakin. Mai kula da ɗakin sanyi zai iya taimaka muku fahimtar yadda ɗakin yake aiki, yadda za a caje ku, da menene fa"idodin amfani da ajiyar sanyi.',
    },
    {
      id: 34,
      title: 'Ta yaya zan iya fara rajistan shiga?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Don fara rajista, kewaya zuwa Dashboard kuma danna maballin Mai sarrafa Ayyuka a ƙasan dama, sannan danna maɓallin kore.',
    },
    {
      id: 35,
      title: 'Ta yaya zan iya fara dubawa?',
      role: [ERoles.OPERATOR],
      text: 'Akwai hanyoyi guda biyu don fara dubawa, duka suna farawa a cikin shafin Dashboard. Kuna iya danna maballin Mai sarrafa Ayyuka a ƙasan dama, sannan danna maɓallin ja. Ta wannan hanyar, zaku iya zaɓar wanda mai amfani da sanyaya (kuma a cikin wace sashin sanyaya) kuke son fara rajistan, kuma zaku iya bincika akwatunan sa daga ins ɗin rajista da yawa. A madadin, za ku iya danna "Duba cikakkun bayanai" don wani abu da kuke gani a cikin Dashboard (tabbatar cewa yana cikin madaidaicin sashin sanyaya), sannan danna "Duba". A wannan yanayin, za ku iya kawai bincika akwatunan daga abin ajiyar.',
    },
    {
      id: 36,
      title:
        "Ina da na'urori masu auna zafin jiki a cikin dakin sanyi. Za a iya haɗa su zuwa Coldtivate?",
      role: [ERoles.AUTH],
      text: 'Cibiyar Ilimi shafi ne da za a iya samunsa ta hanyar danna Menu na hagu na sama. Ya ƙunshi bayanai masu amfani game da mafi kyawun ayyukan ajiya don kayayyaki daban-daban, gami da mafi kyawun zafin jiki da kimanin lokacin ajiya a ƙarƙashin wannan zafin.',
    },
    {
      id: 37,
      title: "Ta yaya zan haɗa na'urori masu auna firikwensin a cikin daki tare da app?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Idan akwai na"urori masu auna zafin jiki a cikin ɗakin waɗanda za a iya haɗa su zuwa aikace-aikacen Coldtivate, da fatan za a yi magana da alhakin ku. Mai amfani kawai tare da aikin ma"aikaci mai rijista zai iya haɗa na"urori masu auna firikwensin zuwa raka"a masu sanyaya waɗanda aka ƙirƙira a cikin Coldtivate.',
    },
    {
      id: 38,
      title: 'Ta yaya zan iya saita zafin naúrar sanyaya?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lokacin ɗauka shine adadin kwanakin da aka ba da shawara ga mai sanyaya don ɗaukar kaya. Bayan haka, kayan zai fara rasa kasuwancin sa. Lokacin da za a ɗauka daidai da sifili yana nuna cewa mai amfani ya kamata ya zo don tattara kayan a cikin ajiya nan da nan kuma ya ɗauki kwanaki 2 don sayar da shi ga kasuwa. Ana iya ganin shi a cikin Dashboard (dama na sama) kuma a cikin cikakken ra"ayi don kowane abu na ajiya.',
    },
    {
      id: 39,
      title: 'Yadda ake tuntuɓar mai amfani da sanyaya don binciken kasuwar bayan-ajiya?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Sabbin kayan lambu da "ya"yan itatuwa suna lalacewa, kuma yadda suke rasa sabo bayan girbi ya dogara ne akan yanayin zafi. Lokacin da za a ɗauka, don haka, ana ƙididdige shi bisa yanayin zafin naúrar sanyaya daidai, kuma akan ingancin farkon samfurin lokacin da aka kawo shi zuwa sashin sanyaya. Siffofin da aka yi amfani da su a cikin wannan lissafin sun keɓanta ga kowane kayayyaki. Kuna iya samun ƙarin haske kan yadda lalacewa ta bambanta tsakanin kayayyaki daban-daban a cikin Cibiyar Ilimi.',
    },
    {
      id: 40,
      title: 'Menene binciken kasuwar bayan-ajiya kuma me yasa zan cika shi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ana iya samun damar binciken kasuwar ta danna ɗigogi uku kusa da kowane dubawa a cikin "Ƙari" -> "Tarihi" shafin kuma zaɓi "Cika da binciken kasuwa". Binciken gajere ne kuma yana neman bayani game da farashin siyar da kayayyakin da kuka adana a daki a baya, da kuma nawa ne ya lalace. Za a kula da wannan bayanin azaman sirri kuma ƙungiyar Coldtivate za ta yi amfani da ita kawai don kimanta tasirin amfani da ajiyar sanyi. Jajayen ɗigo za su gano wuraren da ba a kammala binciken kasuwa ba tukuna. Za a tunatar da ku game da abubuwan dubawa waɗanda ke buƙatar kulawar ku a cikin kwamitin sanarwa kuma kuna iya danna sanarwar don buɗe binciken. Hakanan zaka iya shiga cikin binciken da kake buƙatar cikawa a cikin shafin "Analytics", sannan danna "Impact".',
    },
    {
      id: 41,
      title: 'Ta yaya zan karanta bayanin abu ɗaya a cikin Dashboard?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Kowane abu a cikin Dashboard yana nuna saitin akwatuna na nau"in amfanin gona iri ɗaya waɗanda aka bincika tare. Adadin kwanakin da ke saman su ne kwanakin da aka annabta har zuwa lokacin ɗauka. A ƙasa, kuna ganin nau"in amfanin gona da ID ɗin rajista. Lambar da ke kusa da alamar akwati ita ce adadin akwatunan da aka bincika. Kusa da shi, za ku ga kuɗin sanyaya, da adadin kwanakin da aka ajiye akwatunan. Lambar da ke kusa da katin a gefen dama yana gano adadin akwatunan da aka jera a matsayin "na siyarwa" a kasuwa. A kasan kowane abu, kuna ganin mai mallakar akwatunan da bayanan tuntuɓar.',
    },
    {
      id: 42,
      title: 'Menene lokacin ɗauka?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ana nuna wurin zama kamar ja lokacin da aka yi amfani da fiye da kashi 80% na ƙarfin naúrar sanyaya. Bayanin game da zama na gaba ya dogara ne akan adadin kwanakin da kowane mai amfani ya bayyana a matsayin kwanakin da aka tsara a wurin ajiya lokacin shiga. Yi hankali cewa wannan kiyasi ne kawai kuma yana iya zama kuskure. Don haka, kasancewar jan daki alama ce ta cewa ɗakin yana cika. Ba kwa buƙatar damuwa amma kuna iya ɗaukar mataki daidai. Misali, yi la"akari da tuntuɓar masu amfani da sanyaya waɗanda kayan aikinsu a cikin ajiya ke da mafi ƙarancin lokacin ɗauka don ba su shawarar su duba nan ba da jimawa ba. Kuna iya ganin jerin abubuwan da aka ba da oda na abubuwan gaggawa don dubawa ƙarƙashin "Dashboard" lokacin da kuka ba da oda ta lokaci don ɗauka.',
    },
    {
      id: 43,
      title: 'Yaya ake lissafin lokacin karba? Ta waɗanne abubuwa ne ke tasiri?',
      role: [ERoles.OPERATOR],
      text: 'Sabbin kayan lambu da "ya"yan itatuwa suna lalacewa, kuma yadda suke rasa sabo bayan girbi ya dogara ne akan yanayin zafi. Lokacin da za a ɗauka, don haka, ana ƙididdige shi bisa yanayin zafin naúrar sanyaya daidai, kuma akan ingancin farkon samfurin lokacin da aka kawo shi zuwa sashin sanyaya. Siffofin da aka yi amfani da su a cikin wannan lissafin sun keɓanta ga kowane kayayyaki. Kuna iya samun ƙarin haske kan yadda lalacewa ta bambanta tsakanin kayayyaki daban-daban a cikin Cibiyar Ilimi.',
    },
    {
      id: 44,
      title: 'Lokacin karba shine kwanaki 0 amma har yanzu samfurin yana da kyau. Me yasa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Launi yana wakiltar sauran kwanaki kafin lokacin ɗauka. Za ku ga mashaya da ja lokacin da bai wuce kwanaki 2 ba, a cikin rawaya lokacin da ƙasa da kwanaki 7, da kore lokacin da ya wuce kwanaki 7. Waɗannan dabi"u sun keɓance ga kowane abu na ajiya kuma ana sake ƙididdige su sau da yawa a kowace rana dangane da zafin jiki a cikin sashin sanyaya. Lokacin da babu samfurin lissafi don samuwa, launi na mashaya zai zama launin toka.',
    },
    {
      id: 45,
      title: 'Lokacin karban ya fi kwanaki 0 amma amfanin ya kusan lalacewa. Me yasa?',
      role: [ERoles.OPERATOR],
      text: 'Dashboard na iya ɗaukar ɗan lokaci don ɗaukaka. Hakanan da fatan za a tabbatar cewa kuna kallo a daidai sashin sanyaya. Idan kun ci gaba da lura da batun, da fatan za a ba da rahoto zuwa app@yourvcca.org.',
    },
    {
      id: 46,
      title: 'Lokacin karban ya fi kwanaki 0 amma amfanin ya kusan lalacewa. Me yasa?',
      role: [ERoles.OPERATOR],
      text: 'Dashboard na iya ɗaukar ɗan lokaci don ɗaukaka. Hakanan da fatan za a tabbatar cewa abubuwan da kuka bincika sune daidai, kuma kuna duban sashin sanyaya daidai. Idan kun ci gaba da lura da batun, da fatan za a ba da rahoto zuwa app@yourvcca.org.',
    },
    {
      id: 47,
      title:
        'Dakin zama na ɗaya daga cikin kwanaki masu zuwa ja ne (kasa da 20%). Menene wannan ya dogara? Ya kamata in damu?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'Ana nuna wurin zama kamar ja lokacin da aka yi amfani da fiye da kashi 80% na ƙarfin naúrar sanyaya. Bayanin game da zama na gaba ya dogara ne akan adadin kwanakin da kowane mai amfani ya bayyana a matsayin kwanakin da aka tsara a wurin ajiya lokacin shiga. Yi hankali cewa wannan kiyasi ne kawai kuma yana iya zama kuskure. Don haka, kasancewar jan daki alama ce ta cewa ɗakin yana cika. Ba kwa buƙatar damuwa amma kuna iya ɗaukar mataki daidai. Misali, yi la"akari da tuntuɓar masu amfani da sanyaya waɗanda kayan aikinsu a cikin ajiya ke da mafi ƙarancin lokacin ɗauka don ba su shawarar su duba nan ba da jimawa ba. Kuna iya ganin jerin abubuwan da aka ba da oda na abubuwan gaggawa don dubawa ƙarƙashin "Dashboard" lokacin da kuka ba da oda ta lokaci don ɗauka.',
    },
    {
      id: 48,
      title:
        'Mai amfani da sanyaya yana kawo wa ɗakin kayayyaki da ba a cikin lissafin. Zan iya har yanzu duba wannan a?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'Ana aika sanarwar bayan rashin samun bayanai daga firikwensin sama da awanni 12, kuma yana nufin yanayin da aka saita a cikin "Cooling Units"> "Yanayin daki" yanzu ana amfani da shi. Ka"idar za ta yi ƙoƙarin sake haɗawa da firikwensin kowane awa 1, don haka muna ba da shawara a jira "yan sa"o"i idan wannan matsala ce ta haɗin kai. Idan babu sabon bayanan firikwensin na sa"o"i da yawa ko kwanaki, matsalar na iya kasancewa a gefen hardware, misali, na"urar firikwensin na iya ƙarewa da baturi.',
    },
    {
      id: 49,
      title:
        'cikin Dashboard, kowane abu yana da mashaya mai launi. Menene launi na mashaya yake wakilta?',
      role: [ERoles.EMPLOYEE],
      text: 'Lokacin da babu na"urori masu auna firikwensin da aka haɗa zuwa ƙa"idar, ƙirar don ƙididdige lokacin ɗauka ya dogara da yanayin zafin da Mai aiki ya saita. Wannan shi ne dalilin da ya sa ake sa Operator shigar da sabon yanayin zafin jiki a kowane sabon rajistan shiga kuma ya duba. Domin samfurin ya zama daidai, yana da mahimmanci cewa zafin jiki ya kasance na zamani. Da fatan za a umurci masu aiki a sashin sanyaya ku game da wannan muhimmin mataki.',
    },
    {
      id: 50,
      title:
        'Na yi nasarar kammala rajistan shiga amma har yanzu ban ga abubuwan da ke cikin dashboard ba. Me yasa?',
      role: [ERoles.OPERATOR],
      text: 'Wannan fitowar tunatarwa ce a gare ku don sanar da ƙa"idar game da madaidaicin saita zafin dakin sanyaya idan babu na"urori masu auna firikwensin a wurin (ko kuma idan ba sa aiki yadda ya kamata). Ya kamata ku bincika ko ƙimar da aka nuna a cikin popup daidai yake da wanda zaku iya karantawa a cikin rukunin kulawa a cikin ɗakin. Idan wannan ba haka bane, yakamata ku sabunta yanayin zafi. In ba haka ba, zaku iya tabbatarwa kuma ku ci gaba da rajistan shiga. Samun sabunta yanayin zafin jiki yana da matukar mahimmanci ga ƙirar da ke ƙididdige lokacin ɗauka don zama daidai.',
    },
    {
      id: 51,
      title:
        'Na yi nasarar kammala bincike amma har yanzu ina iya ganin abubuwan a cikin dashboard. Me yasa?',
      role: [ERoles.OPERATOR],
      text: 'Dashboard na iya ɗaukar ɗan lokaci don ɗaukaka. Hakanan da fatan za a tabbatar cewa abubuwan da kuka bincika sune daidai, kuma kuna duban sashin sanyaya daidai. Idan kun ci gaba da lura da batun, da fatan za a ba da rahoto zuwa app@yourvcca.org.',
    },
    {
      id: 52,
      title: 'Ta yaya zan iya bincika cewa firikwensin zafin jiki yana aiki lafiya?',
      role: [ERoles.OPERATOR],
      text: 'Ƙungiyar da ke haɓaka ƙa"idar tana tattara wasu mahimman bayanai game da masu amfani da sanyaya lokacin da suka fara amfani da ɗakin a matsayin bayanan tushe waɗanda za a kwatanta da bayanan da app ɗin ya samu. Manufar kawai ita ce haɓaka ƙirar ƙa"idar da amfani da ɗakin sanyi.',
    },
    {
      id: 53,
      title: 'Na sami sanarwar cewa firikwensin baya aiki. Me zan yi?',
      role: [ERoles.OPERATOR],
      text: 'Za a umarce ku da ku tuntuɓi mai amfani da sanyaya wanda kwanan nan ya bincika wasu kayan abinci daga ɗakin kuma ku tambayi game da inda kuma farashin suka sayar da kayan da aka adana a cikin ɗakin. Wannan bayanin zai taimaka wa ƙungiyar haɓaka ƙa"idar don ingantawa da haɓaka daidaiton hasashen farashin kasuwa da aka bayar.',
    },
    {
      id: 54,
      title: "Yaya za a iya ƙididdige lokacin ɗauka idan babu na'urori masu auna firikwensin?",
      role: [ERoles.EMPLOYEE],
      text: 'Tabbatar duba koyawa da sashin FAQ, saboda suna ɗauke da bayanai masu amfani game da ƙa"idar wanda zai iya taimakawa wajen fayyace tambayoyinku. Idan kuna son tuntuɓar ƙungiyar tallafin app, da fatan za a aika imel zuwa app@yourvcca.org.',
    },
    {
      id: 55,
      title: 'Duk lokacin da na fara rajista, ina samun faɗakarwar zazzabi. Me yasa?',
      role: [ERoles.OPERATOR],
      text: 'Tabbatar duba koyawa da sashin FAQ, saboda suna ɗauke da bayanai masu amfani game da ƙa"idar wanda zai iya taimakawa wajen fayyace tambayoyinku. Idan har yanzu ba a amsa tambayar ku ba, da fatan za a tuntuɓi ma"aikacin Rijista da kuke ba da rahoto.',
    },
    {
      id: 56,
      title: 'Duk lokacin da na kammala dubawa, Ina samun faɗakarwar zazzabi. Me yasa?',
      role: [ERoles.EMPLOYEE],
      text: 'Da fatan za a tabbatar cewa an shigar da sabuwar sigar app. Idan matsalar ta ci gaba, da fatan za a sanar da ƙungiyar tallafin app ta hanyar aika imel zuwa app@yourvcca.org ko ta hanyar cike fom ɗin amsawa: https://forms.gle/ceohKHT2QCCE3rFs5.',
    },
    {
      id: 57,
      title:
        'Me yasa nake buƙatar tambayar mai amfani da sanyaya don cika takardar tambaya kafin ya iya dubawa a cikin akwati na farko?',
      role: [ERoles.OPERATOR],
      text: 'Da fatan za a tabbatar cewa an shigar da sabuwar sigar app. Idan matsalar ta ci gaba, da fatan za a tuntuɓi ma"aikacin Rajista da kuke ba da rahoto da/ko sanar da ƙungiyar tallafin app ta hanyar aika imel zuwa app@yourvcca.org ko ta hanyar cike fom ɗin amsawa: https://forms.gle/2gKVzZjkJSPqEAan9 .',
    },
    {
      id: 58,
      title: "Me yasa nake buƙatar cika takardar tambaya lokacin da na yi rajista akan ƙa'idar?",
      role: [ERoles.EMPLOYEE],
      text: 'Ƙungiyar goyon bayan app za su so jin labarin kwarewarku ta amfani da wannan app kuma suna maraba da ra"ayoyin ku, da fatan za a aika imel zuwa app@yourvcca.org ko ƙaddamar da ra"ayoyin ku ta hany[APP_LOCALES.ARABIC]: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 60,
      title:
        'Me yasa nake buƙatar tambayar masu amfani da sanyaya game da farashin siyar da kowane abun ajiya?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'cikin wannan shafin, zaku iya ganin hasashen farashin kasuwa ko dai a cikin tsari ko a tsarin tebur. Shafin Trend na Farashin yana ba da damar duba watan ƙarshe na bayanai da kuma hasashen kwanaki 14 don takamaiman kasuwa da kayayyaki (a Indiya) ko hasashen kowane wata a kowace jiha (a Najeriya). Shafin Farashin farashi yana ba da damar duba duk hasashen farashin kasuwa da aka ba da umarnin daga mafi girma zuwa mafi ƙasƙanci, kuma tare da yuwuwar tace ta kwanan wata, jiha, gunduma da kasuwa (a Indiya).',
    },
    {
      id: 61,
      title: 'Ban fahimci sassan app ɗin ba. Wa zan tuntubi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Tabbatar duba koyawa da sashin FAQ, saboda suna ɗauke da bayanai masu amfani game da ƙa"idar wanda zai iya taimakawa wajen fayyace tambayoyinku. Idan kuna son tuntuɓar ƙungiyar tallafin app, da fatan za a aika imel zuwa app@yourvcca.org.',
    },
    {
      id: 62,
      title: 'Ban fahimci sassan app ɗin ba. Wa zan tuntubi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'An horar da samfurin koyon injin akan bayanan farashin kasuwa na tarihi da sauran bayanai kamar canjin kuɗi da farashin man fetur, don yin hasashen farashin kasuwa na gaba.',
    },
    {
      id: 66,
      title: 'Ban fahimci sassan app ɗin ba. Wa zan tuntubi?',
      role: [ERoles.COOLING_USER],
      text: 'Kuna iya tsallake tambayoyin binciken ta danna "Kammala daga baya". Za ku sami binciken a matsayin ɓangare na Cikakkun Asusunku kuma kuna iya kammala shi kowane lokaci. Koyaya, ana ba da shawarar ɗaukar lokaci don amsa tambayoyin binciken sosai lokacin da kuka fara amfani da ɗakin: ta wannan hanyar za ku iya samun ƙarin ƙwarewa tare da Coldtivate app!',
    },
    {
      id: 67,
      title: 'Na sami bug a cikin app. Wa zan tuntubi?',
      role: [ERoles.COOLING_USER],
      text: 'Da fatan za a tabbatar cewa an shigar da sabuwar sigar app. Idan matsalar ta ci gaba, da fatan za a sanar da ƙungiyar tallafin app ta hanyar aika imel zuwa app@yourvcca.org ko ta hanyar cike fom ɗin amsa: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 68,
      title: 'Wani abu baya aiki da kyau a cikin app. Wa zan tuntubi?',
      role: [ERoles.OPERATOR],
      text: 'Idan akwai na"urori masu auna zafin jiki a cikin ɗakin waɗanda za a iya haɗa su zuwa aikace-aikacen Coldtivate, da fatan za a yi magana da alhakin ku. Mai amfani kawai tare da aikin ma"aikaci mai rijista zai iya haɗa na"urori masu auna firikwensin zuwa raka"a masu sanyaya waɗanda aka ƙirƙira a cikin Coldtivate.',
    },
    {
      id: 69,
      title: 'Wani abu baya aiki da kyau a cikin app. Wa zan tuntubi?',
      role: [ERoles.COOLING_USER],
      text: 'Da fatan za a tabbatar cewa an shigar da sabuwar sigar app. Idan matsalar ta ci gaba, tuntuɓi afaretan ɗakin sanyi kuma / ko sanar da ƙungiyar tallafin app ta hanyar aika imel zuwa app@yourvcca.org.',
    },
    {
      id: 70,
      title: "Ina so in ba da ra'ayi game da gogewa ta da app. Wa zan tuntubi?",
      role: [ERoles.COOLING_USER],
      text: 'Lokacin ɗauka shine ƙima da aka annabta. Don haka, lokuta da ba kasafai ba na iya faruwa, inda samfurin ya lalace yayin da lokacin da za a ɗauka ya fi 0. Kamar yadda ingancin lalata kayan sabo ya dogara da zafin jiki, bayanan zafin jiki yana taimakawa hasashen ya zama daidai. Misali, batun na iya tasowa lokacin da babu na"urori masu auna zafin jiki da ke da alaƙa da ƙa"idar, kuma ma"aikacin bai sabunta yawan zafin da ke cikin ɗakin a kai a kai ba. Da fatan za a sanar da ma"aikacin ɗakin idan hakan ya faru.',
    },
    {
      id: 71,
      title: "Ina so in ba da ra'ayi game da gogewa ta da app. Wa zan tuntubi?",
      role: [ERoles.COOLING_USER],
      text: 'Ƙungiyar da ke haɓaka ƙa"idar tana tattara wasu mahimman bayanai game da masu amfani da sanyaya lokacin da suka fara amfani da ɗakin a matsayin bayanan tushe waɗanda za a kwatanta da bayanan da app ɗin ya samu. Manufar kawai ita ce haɓaka ƙirar ƙa"idar da amfani da ɗakin sanyi.',
    },
    {
      id: 73,
      title: "Ina so in ba da ra'ayi game da gogewa ta da app. Wa zan tuntubi?",
      role: [ERoles.COOLING_USER],
      text: 'Tabbatar duba koyawa da sashin FAQ, saboda suna ɗauke da bayanai masu amfani game da ƙa"idar wanda zai iya taimakawa wajen fayyace tambayoyinku. Idan har yanzu ba a amsa tambayar ku ba, da fatan za a tuntuɓi ma"aikacin ɗakin sanyi, ko rubuta zuwa app@yourvcca.org',
    },
    {
      id: 74,
      title: 'Ina cikin yankin da ke da ƙarancin haɗin Intanet: Shin zan iya amfani da app ɗin?',
      role: [ERoles.COOLING_USER],
      text: 'Da fatan za a tabbatar cewa an shigar da sabuwar sigar app. Idan matsalar ta ci gaba, tuntuɓi afaretan ɗakin sanyi da/ko sanar da ƙungiyar tallafin app ta aika imel zuwa app@yourvcca.org.',
    },
    {
      id: 75,
      title: "Wadanne farashin ne ake nunawa lokacin danna alamar 'Farashin amfanin gona'?",
      role: [ERoles.EMPLOYEE],
      text: 'Don share asusun ku zaku iya kewaya zuwa "Menu" -> "Bayanan Asusu", sannan danna Share. Da fatan za a yi hankali, wannan aikin ba za a iya juyawa ba! Idan kai ne Ma"aikaci na ƙarshe da yayi rijista na kamfanin, wannan matakin zai share kamfanin. Idan akwai rajistan shiga da ake jira, ba za ku iya share asusunku ba har sai an bincika dukkan akwatunan a cikin ƙa"idar ta ɗaya daga cikin ma"aikatan ku.',
    },
    {
      id: 76,
      title: "Me yasa wasu jihohi da kasuwanni suka ɓace a sashin 'Farashin amfanin gona'?",
      role: [ERoles.OPERATOR],
      text: 'Don share asusun ku zaku iya kewaya zuwa "Menu" -> "Bayanan Asusu", sannan danna Share. Da fatan za a yi hankali, wannan aikin ba za a iya juyawa ba! Idan kai ne Operator na ƙarshe da aka sanya wa ɗayan dakunan da akwai buɗaɗɗen rajista, ba za ka iya share asusunka ba har sai ma"aikaci mai rijista ya sanya wani ma"aikacin ɗakin, ko duk an duba akwatunan a cikin app.',
    },
    {
      id: 77,
      title: 'Yaya ake lissafin farashin kasuwa na gaba?',
      role: [ERoles.COOLING_USER],
      text: 'Don share asusun ku zaku iya kewaya zuwa "Menu" -> "Bayanan Asusu", sannan danna Share. Da fatan za a yi hankali, wannan aikin ba za a iya juyawa ba! Idan kuna da buɗaɗɗen rajistan shiga a kowane ɗayan ɗakunan, ba za ku iya share asusunku ba har sai an duba duk akwatunan daga ɗakunan. Da fatan za a tabbatar da tattara akwatunan ku a cikin ɗakin! Idan kuna tunanin akwai akwatunan jirage a cikin ƙa"idar da kuka riga kuka cire, da fatan za a yi magana da ma"aikacin ɗakin don warware shi.',
    },
    {
      id: 78,
      title: 'Ina so in goge asusuna. Me zan yi?',
      role: [ERoles.EMPLOYEE],
      text: 'Kuna iya share raka"a da wuraren sanyaya ta zuwa "Menu" -> "Gudanarwa" -> "Raka"a sanyaya" / "Wurare" kuma danna Share. Za ku iya yin hakan ne kawai idan babu rajistan shiga a cikin dakunan. In ba haka ba, da fatan za a yi magana da masu aiki don kammala rajistan shiga kafin ku yi ƙoƙarin share ɗakuna da wuraren.',
    },
    {
      id: 79,
      title: 'Ina so in goge asusuna. Me zan yi?',
      role: [ERoles.EMPLOYEE],
      text: 'Ba a ba ku damar share wasu masu amfani daga app ɗin ba. Koyaya, zaku iya raba masu aiki daga ɗakunanku ta hanyar kewayawa zuwa "Menu" -> "Gudanarwa" -> "Masu aiki". Idan har yanzu kuna son cire mai amfani da gaske don kada su sami damar shiga kamfanin ku, da fatan za a rubuta imel zuwa app@yourvcca.org kuma bayyana dalilin da yasa ake buƙatar wannan.',
    },
    {
      id: 80,
      title: 'Ina so in goge asusuna. Me zan yi?',
      role: [ERoles.OPERATOR],
      text: 'Don share mai amfani da sanyaya daga lissafin, kewaya zuwa "Management" -> "Cooling users", danna sunan mai sanyaya sannan kuma maɓallin "Share". Lura cewa masu amfani kawai waɗanda ba su da rajistan shiga za a iya share su! Idan akwai rajista masu jiran aiki, tuntuɓi mai amfani don ɗaukar samfurin. Lura cewa wannan aikin ba za a iya juyawa ba! Idan mai amfani yana da wayar hannu, wannan aikin zai cire shi/ta daga jerin ku, amma har yanzu mai amfani zai iya amfani da Coldtivate. Idan mai amfani ba shi da wayowin komai da ruwan, wannan aikin yana share asusunsa kuma ya saki lambar wayar da ke da alaƙa.',
    },
    {
      id: 81,
      title: 'Ta yaya zan iya share naúrar sanyaya ko wuri?',
      role: [ERoles.EMPLOYEE],
      text: 'Don duba lokacin ƙarshe na masu aiki da sauran ma"aikatan da suka yi rajista sun shiga cikin app ɗin, zaku iya kewaya zuwa "Menu" -> "Gudanarwa" -> "Mai aiki" / "Ma"aikacin Rijista". Kwanan wata da lokacin da kuke gani kusa da sunan sune kwanan wata da lokacin shiga ta ƙarshe.',
    },
    {
      id: 82,
      title: "Ta yaya zan iya share wani ma'aikaci mai rijista ko ma'aikaci daga kamfani na?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ba a ba ku damar share wasu masu amfani daga app ɗin ba. Koyaya, zaku iya raba masu aiki daga ɗakunanku ta hanyar kewayawa zuwa "Menu" -> "Gudanarwa" -> "Masu aiki". Idan har yanzu kuna son cire mai amfani da gaske don kada su sami damar shiga kamfanin ku, da fatan za a rubuta imel zuwa app@yourvcca.org kuma bayyana dalilin da yasa ake buƙatar wannan.',
    },
    {
      id: 83,
      title: 'Ta yaya zan iya share mai amfani da sanyaya daga lissafin?',
      role: [ERoles.COOLING_USER],
      text: 'Ta danna kan wani abu a cikin dashboard, za ka iya ganin suna da lambar tuntuɓar ma"aikacin da ya yi maka rajistan shiga. Zaka iya kwafi lambar zuwa allo kuma tuntuɓi afareta ta waya ko sms.',
    },
    {
      id: 84,
      title: 'A ina zan iya saka idanu ko masu aiki sun yi amfani da app kwanan nan?',
      role: [ERoles.COOLING_USER],
      text: 'Don duba lokacin ƙarshe na masu aiki da sauran ma"aikatan da suka yi rajista sun shiga cikin app ɗin, zaku iya kewaya zuwa "Menu" -> "Gudanarwa" -> "Mai aiki" / "Ma"aikacin Rijista". Kwanan wata da lokacin da kuke gani kusa da sunan sune kwanan wata da lokacin shiga ta ƙarshe.',
    },
    {
      id: 85,
      title:
        'ina zan iya saka idanu kan kudaden shiga da kowane daki ke samarwa da sauran kididdigar amfani?',
      role: [ERoles.COOLING_USER],
      text: 'Kuna iya kewaya zuwa "Menu" -> "Management" -> "Binciken Kuɗi", zaɓi raka"o"in sanyaya da tazarar lokacin sha"awa, kuma zaku ga jimillar kudaden shiga da ke da alaƙa da rajistar daga waɗannan ɗakunan. Hakanan zaka iya tace ta hanyar sanyaya mai amfani, hanyar biyan kuɗi, da lokaci. Don ganin taƙaitaccen ƙididdiga na rajistan shiga kowane ɗaki (kamar adadin masu amfani, adadin akwatuna, da sauransu), zaku iya kewaya zuwa "Menu" -> "Gudanarwa" -> "Binciken Amfani". Hakanan a nan zaku iya tace ta kwanan wata da sashin sanyaya. A cikin shafuka guda biyu, ana iya sauke bayanai azaman fayilolin Excel. A cikin shafin "Analyis", zaku iya samun ƙarin dashboard tare da bayani game da masu amfani, kudaden shiga, amfani, da tasiri. A ƙarshe, don saka idanu jimlar adadin akwatuna, nauyi, da yanayin zafi mafi kyau don amfanin gona a halin yanzu a cikin ɗakin, zaku iya kewaya zuwa "Ƙari" -> "Yankunan sanyaya" -> "Bayanin Crates".',
    },
    {
      id: 86,
      title:
        'Ta yaya zan iya gano wanene mai tuntuɓar sashin sanyaya inda ake adana amfanin gona na?',
      role: [ERoles.OPERATOR],
      text: 'Ƙungiyar tallafin app za su so su ji labarin gogewar ku ta amfani da wannan app kuma suna maraba da ra"ayoyin ku, da fatan za a aika imel zuwa app@yourvcca.org ko ƙaddamar da ra"ayin ku ta hany[APP_LOCALES.ARABIC]: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 87,
      title: 'Na sami sanarwa Me zan yi?',
      role: [ERoles.COOLING_USER],
      text: 'Ƙungiyar goyon bayan ƙa"idar za ta so jin labarin kwarewarku ta amfani da wannan app kuma suna maraba da ra"ayoyin ku, da fatan za a aika imel zuwa app@yourvcca.org.',
    },
    {
      id: 88,
      title: 'Menene aka nuna akan taswirar sassan sanyaya?',
      role: [ERoles.COOLING_USER],
      text: 'kan taswirar za ku iya hango wurin da kuke (za a nemi izinin Coldtivate don samun damar wurin ku), wurin da wuraren sanyaya ke kewaye da ku, da wasu bayanai game da raka"o"in (kasuwanci ɗaya ko multicommodity, kamfani, farashi). Ta hanyar zuwa ɗakin sanyi, za ku iya samun ƙarin bayani daga ma"aikacin ɗakin sanyi akan aiki na naúrar da damar ajiya.',
    },
    {
      id: 89,
      title: 'Ta yaya zan iya canza yaren app?',
      role: [ERoles.AUTH],
      text: 'Don canza yaren ƙa"idar, zaku iya danna maballin da kuke gani a ƙasan shafin farko, ko kuma, da zarar kun shiga cikin bayanan martaba, kewaya zuwa "Menu" -> "Bayanan asusu" -> "Preferences Localization" .',
    },
    {
      id: 90,
      title:
        "Nau'in firikwensin zafin jiki na yana goyan bayan Coldtivate (Ecozen, UbiBot, Figorr, Victron Energy). Ta yaya zan iya saita firikwensin?",
      role: [ERoles.EMPLOYEE],
      text: 'Domin haɗa firikwensin zuwa naúrar sanyaya, zaku iya kewaya zuwa "Menu" -> "Management" -> "Cooling Units", zaɓi naúrar da yakamata a saita firikwensin, sannan kunna "Sensor available". Kuna iya bin umarnin kowane nau"in firikwensin da aka goyan baya kuma ku tabbatar. Tuna da agogon "Ajiye" a kasan shafin don adana canje-canje. Ya kamata ku ga karatun zafin jiki daga na"urori masu auna firikwensin ku a cikin sa"o"i 6 masu zuwa a ƙarƙashin "Ƙari" -> "Yanayin sanyaya" -> "Yanayin ɗaki".',
    },
    {
      id: 91,
      title:
        "Menene bambanci tsakanin 'Kamfanin', 'Haɗaɗɗen', da 'Kwantatawa' ra'ayi a cikin shafin Bincike?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Shafin Analytics a cikin mashaya kewayawa yana ba da taƙaitaccen ƙididdiga ga duk ɗakunan sanyi na kamfanin. A cikin kallon "Kamfani", kuna ganin bayanai kan masu amfani, amfani, da tasiri ga duk raka"o"in sanyaya tun lokacin da kuka fara amfani da Coldtivate. Ta danna "Aggregated", ana sa ka saita raka"o"in sanyaya da lokacin lokacin da kake sha"awar. Ana tattara bayanan da aka nuna don masu amfani, amfani, da tasiri a cikin zaɓaɓɓun raka"o"in sanyaya a cikin lokacin da aka zaɓa. Idan kuna son kwatanta raka"a, zaku iya amfani da shafin "Comparison". Anan, ana nuna bayanan a cikin allunan, inda bayanai daga kowace naúrar sanyaya a cikin lokacin da aka zaɓa. Kuna iya tsara bayanan kuma canza raka"a sanyaya da lokacin lokaci kowane lokaci.',
    },
    {
      id: 92,
      title: 'Ta yaya ake ƙididdige bayanan da aka nuna a cikin shafin Bincike?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Manufar shafin Analytics shine bayar da cikakkiyar ra"ayi na abin da ke faruwa a ɗakunan sanyi. Ana ƙididdige bayanan mai amfani da amfani daga wurin shiga da bayanan da aka yi rikodin a Coldtivate. Don haka za ku iya fahimtar yawan masu amfani da ayyukan da aka yi, da menene kudaden shiga ko matsakaicin zama na kowane ɗakin sanyi. Bayanan sashin tasirin, a gefe guda, ya dogara ne akan binciken da ake buƙatar masu amfani da sanyaya su cika lokacin da aka yi rajista (watau kafin su fara amfani da ajiyar sanyi) da kuma a kai a kai yayin da suke duba kayan da aka samar daga ɗakin sanyi. . Wannan bayanan yana da mahimmanci don ƙididdige juyin halitta na asarar bayan girbi da kuma kudaden shiga na masu amfani yayin da suke amfani da sanyaya. A ƙarshe, ƙididdigar CO2 ta kwatanta fitar da hayaƙin da ke da alaƙa da sanyaya kayan amfanin gona da aka adana a cikin ɗakin sanyi tare da fitar da hayaƙi iri ɗaya da amfanin gona zai haifar lokacin da ba a adana shi ba.',
    },
    {
      id: 93,
      title: 'Ta yaya ake ƙididdige bayanan da aka nuna a cikin shafin Bincike?',
      role: [ERoles.COOLING_USER],
      text: 'Manufar shafin Analytics shine don ba ku cikakkiyar ra"ayi game da tasirin sanyaya akan amfanin gonakin ku. Bayanan da aka nuna a ƙarƙashin "Crates" ana ƙididdige su daga wurin shiga da bayanan da aka yi rikodin a Coldtivate. Kuna iya haka nawa kuka adana amfanin amfanin gona da matsakaicin lokacin ajiya. Bayanan sashin "Impact" ya dogara ne akan binciken da aka umarce ka da ka cika lokacin da kake yin rajista (watau kafin ka fara amfani da ajiyar sanyi) da kuma akai-akai yayin da kake duba kayan da aka samo daga ɗakin sanyi. Wannan bayanan yana da mahimmanci don ƙididdige juyin halittar asarar amfanin gona da kudaden shiga yayin da kuke amfani da sanyaya. Ana nuna tunatarwa don cika binciken a saman shafin, kuma muna ƙarfafa ku ku cika su a duk lokacin da zai yiwu. A cikin sassan biyu, zaku iya amfani da maɓallin "Configure" a saman dama don zaɓar takamaiman ɗakunan sanyi ko lokacin lokaci. Idan ba a zaɓi komai ba, za ku ga duk bayanan akwai tun lokacin da kuka fara amfani da Coldtivate.',
    },
    {
      id: 94,
      title: 'Ina shiga amma ba zan iya ganin aikin kasuwa ba. Me yasa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Idan kasuwa yana da tallafi a ƙasarku, zaku ga alamar "Marketplace" a cikin mashaya kewayawa na ƙasa. Idan ba za ku iya ganinsa ba, yana nufin ba a tallafawa wannan aikin a ƙasarku. A halin yanzu, kasuwa tana samuwa ne kawai ga masu amfani da ke cikin Najeriya. Idan ma"aikaci ne mai rijista kuma kuna sha"awar tukin jirgin sama a cikin ƙasarku, da fatan za a tuntuɓe mu a app@yourvcca.org.',
    },
    {
      id: 95,
      title: 'Menene aikin kamfanin sanyaya a kasuwa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Kamfanin sanyaya da ma"aikatansa na iya yanke shawarar matakin sa hannu a kasuwa. Kamar yadda aikin ya dogara da akwatunan da ake dubawa a cikin aikace-aikacen Coldtivate, kasuwa na iya aiki kawai idan ma"aikacin dakin sanyi yana yin rajista akai-akai da ayyukan shiga da dubawa a cikin app. Don samfurin da aka saya ta kasuwa, kamfanin sanyaya yana karɓar kuɗin sanyaya a matsayin wani ɓangare na ma"amala na dijital. Don haka yana da mahimmanci cewa ma"aikaci mai rijista ya tsara bayanan asusun banki na kamfanin: don yin haka, ya kamata ku kewaya zuwa "Menu" -> "Gudanarwa" -> "Saitunan Masu siyarwa (Kamfanin)" -> "Zaɓuɓɓukan biyan kuɗi". Bugu da ƙari, kamfanonin sanyaya za su iya yanke shawarar siyan amfanin gona daga manoma (waɗanda suke taka rawar mai saye) sannan su sake sayar da amfanin gonakin a kasuwa (wasan kwaikwayo na mai siyarwa). Ana iya yin ma"amaloli biyu ta hanyar kasuwar Coldtivate. Lura cewa duka Ma"aikata da Ma"aikatan Rijista suna da zaɓi don siyan da kansu (a matsayin daidaikun mutane) ko a madadin kamfanin da suke wakilta.',
    },
    {
      id: 96,
      title: "Menene aikin ma'aikacin dakin sanyi a kasuwa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Masu aikin dakin sanyi a kasuwa suna da manyan ayyuka guda uku. 1) Suna taimaka wa masu amfani da sanyaya ba tare da wayar salula ba don saita asusun ajiyar banki (domin su sami biyan kuɗi na dijital), jera akwatunan "na siyarwa" da farashin su. 2) Suna da alhakin adana kayan amfanin gona a cikin dakin sanyi da aka tsara bisa ka"idar cewa duk abin da ke cikin akwati na mai amfani ne guda ɗaya: lokacin da aka sayi wasu kayan da ke cikin akwati (kuma don haka na wani mai shi ne daban), ma"aikacin. yana karɓar sanarwa don matsar da abin da aka saya zuwa wani akwati daban. Idan an sayi gabaɗayan akwati, ba a buƙatar wani mataki. 3) Masu aiki da ɗakin sanyi suna da alhakin duk ayyukan dubawa, gami da waɗanda ke fitowa daga kasuwa: lokacin da mai siye (ko wakilin bayarwa) ya isa ɗakin sanyi don ɗaukar kayan amfanin da aka saya, ma"aikacin ya kamata ya bincika akwatin. daga Coldtivate.',
    },
    {
      id: 97,
      title: 'Yaya ake karɓar kuɗin sanyaya a kasuwa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lokacin da aka sayi akwatuna a kasuwa, ana cire kuɗin sanyaya har zuwa wannan rana daga farashin da mai saye yake biya kuma a tura shi zuwa kamfanin sanyaya. Ta wannan hanyar, mai siyarwa ba dole ba ne ya daidaita kuɗin sanyaya, kamar yadda aka riga aka yi a cikin ma"amala na dijital. Saboda wannan dalili, yana da mahimmanci cewa duka masu siyarwa da kamfanonin sanyaya suna da asusun banki da aka kafa a Coldtivate. Misali, idan an sayi akwati akan dalar Amurka 20, kuma mai siyarwa yana bin dalar Amurka 3 na kudin sanyaya, daga cikin dalar Amurka 20 da mai saye ya biya, za a tura dala 17 zuwa asusun banki na mai siyar, kuma 3 USD za a samu. canja wurin zuwa asusun banki na kamfanin sanyaya. Idan mai saye ya zo karban amfanin gona a rana guda da siyan, babu wani kudin sanyaya da ya kamata (saboda kudin yau da kullun ya riga ya biya ta mai siyarwa). Duk da haka, idan mai siye ya yanke shawarar ajiye kayan amfanin gona a ajiya, daidaitaccen kuɗin sanyaya ya shafi, kuma za a ƙididdige farashin ya danganta da adadin kwanakin da aka ajiye kayan amfanin a cikin ɗakin sanyi har sai mai siye ya karɓa. Ma"aikacin dakin sanyi ne ke da alhakin tattara waɗannan kuɗaɗen sanyaya lokacin dubawa. Lura cewa idan ana bayarwa, dabaru iri ɗaya ne.',
    },
    {
      id: 98,
      title: 'Ta yaya zan iya fara sayar da amfanin gona a kasuwa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Domin akwatunan ku su kasance don siyarwa, kuna buƙatar yin ayyuka biyu. 1) Kafa asusun banki, inda za a ajiye kudaden shiga. Idan kuna da wayar hannu, zaku iya yin ta ta hanyar kewayawa zuwa "Menu" -> "Bayanan Asusu" -> "Zaɓuɓɓukan Biyan kuɗi". Idan ba ku da wayar hannu, ma"aikacin zai iya saita asusun banki daga tsarin sa / ta ("Management" -> "Cooling Users" -> "Bayanin biyan kuɗi". Da fatan za a lura cewa kamar yadda ake yin duk biyan kuɗi ta hanyar dijital a cikin kasuwa, dole ne ka samar da ingantaccen asusun banki kafin a jera wani abu "na siyarwa" 2) Idan kana da wayar hannu, ga kowane saitin akwatunan da aka bincika, zaku iya danna alamar "">" a gefen dama na. kowanne abun dashboard, kewaya zuwa "Crate nauyi da lissafin kasuwa", saita akwatunan da kuke son saita "na siyarwa" da farashin kowace kg. Masu cin kasuwa a kasuwa za su iya ganin waɗannan akwatunan, kuma su saya a adadin da aka nuna. Za ku karɓi sanarwa duk lokacin da aka kammala siyan. Idan ba ku da wayar hannu, ma"aikacin ɗakin sanyi zai iya saita akwatunan "sayar" lokacin da kuka shiga, ko bayan, bin matakan iri ɗaya. Za ku karɓi SMS idan mai aiki ya sabunta akwatunan da aka lissafa ko farashin bayan shiga.',
    },
    {
      id: 99,
      title: 'Masu saye za su iya ganin bayanan tuntuɓa na?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Kuna iya yanke shawarar kanku ko abokan cinikin da ke sha"awar siyan kayan amfanin ku ya kamata su iya ganin bayanan tuntuɓar ku. Wannan na iya zama da amfani idan ana yin shawarwarin farashi ko umarni akai-akai don kayan amfanin da ba a adana ba tukuna a cikin ɗakin sanyi (kuma don haka ba a iya gani ga mai siye). Kuna iya sabunta saitunanku kowane lokaci a ƙarƙashin "Menu" -> "Bayanan asusu" -> "Raba lambobin sadarwa".',
    },
    {
      id: 100,
      title: 'Ina so in bayar da rangwame ga mai siye. Ta yaya zan iya yi?',
      role: [ERoles.EMPLOYEE],
      text: 'ƙarƙashin "Menu" -> "Bayanan asusu" -> "Rangwamen takardun shaida", zaku iya ƙirƙirar takardun shaida waɗanda ke da lamba da rangwamen kashi. Waɗannan su ne takardun shaida waɗanda ke da inganci don samfuran da kuke siyarwa (a matsayin mutum ɗaya). Don saita takardun shaida waɗanda ke aiki don samarwa mallakar kamfani, zaku iya kewaya zuwa "Menu" -> "Mangement" -> "Rangwamen kuɗi" a ƙarƙashin" Saitunan Mai siyarwa (Kamfanin)". Kuna iya raba lambar coupon tare da abokin ciniki, kuma za ta iya fanshi lambar a allon biyan kuɗi. Lambobin kwafin suna nan suna aiki har sai kun soke su. Idan kuna son bayar da rangwame ga duk masu yuwuwar siyayya, zaku iya rage farashin siyar da ake gani a kasuwa.',
    },
    {
      id: 101,
      title: 'Ina so in bayar da rangwame ga mai siye. Ta yaya zan iya yi?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'ƙarƙashin "Menu" -> "Bayanan asusu" -> "Rangwamen takardun shaida", zaku iya ƙirƙirar takardun shaida waɗanda ke da lamba da rangwamen kashi. Kuna iya raba lambar coupon tare da abokin ciniki, kuma za ta iya fanshi lambar a allon biyan kuɗi. Lambobin kwafin suna nan suna aiki har sai kun soke su. Idan kuna son bayar da rangwame ga duk masu yuwuwar siyayya, zaku iya rage farashin siyar da ake gani a kasuwa.',
    },
    {
      id: 102,
      title: 'Ta yaya masu aikin dakin sanyi za su taimake ni in sayar da amfanin gona na?',
      role: [ERoles.COOLING_USER],
      text: 'Masu sarrafa dakin sanyi su ne wurin tuntuɓar ku don duk wani abu da ya shafi adana kayan amfanin gona a cikin dakuna masu sanyi, kuma suna iya taimaka muku wajen tallata amfanin gonar ku koda kuwa ba ku da damar yin amfani da wayar hannu. Ta hanyar haɗin yanar gizon su, za su iya saita bayanan asusun bankin ku, inda za ku sami kudaden shiga daga sayar da kayan amfanin gona. A lokacin shiga, za su iya taimaka maka lissafin akwatunan "saye", wanda ke sa su ganuwa a kasuwa, da saita farashin siyarwa (kowace kilogiram) na kowane samfur. Idan kun canza ra"ayin ku, koyaushe kuna iya tambayar ƙara ko cire akwatuna daga kasuwa ta jera ko cire su azaman "na siyarwa". A wasu dakuna masu sanyi, masu aiki ko abokan aikinsu suma suna da alhakin siyan kayan amfanin gona kai tsaye daga manoma, da kuma sayar da su ga yan kasuwa. Ko kai manomi ne ko ɗan kasuwa mai sha"awar wannan zaɓi, ko dillali mai sha"awar siye da yawa daga ɗakin sanyi, tuntuɓi kamfanin sanyaya don gano wannan damar.',
    },
    {
      id: 103,
      title: "Menene zaɓi 'Saya a madadin kamfani' na gani a kasuwa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Masu gudanarwa da ma"aikatan da suka yi rajista za su iya siyar da siyan kayan amfanin gona a kasuwa ko dai don kansu, daidaikun mutane, ko a madadin kamfanin da suke wakilta. Wannan zaɓin yana ba da damar aiwatar da duk ma"amaloli daga asusun banki na kamfani, ba ta hanyar asusun banki ɗaya ba. Lokacin da ma"aikaci ko ma"aikaci mai rijista ya sayi kayan "a madadin kamfani", kamfanin ya biya kuɗin da ya dace ga mai siyarwa, kuma ya zama mai mallakar akwatunan. Idan waɗannan akwatunan an jera su don siyarwa a kasuwa, ana nuna su a matsayin mallakar kamfanin sanyaya, kuma ana aika kuɗin siyar zuwa asusun bankin kamfanin. Lokacin da ma"aikaci ko ma"aikacin da ke da rijista ya sayi kayan amfanin gona da kansa, za su biya kuɗin da ya kamata ga mai siyarwa daga cikakkun bayanan asusun ajiyar su na banki da aka bayar kuma su zama masu mallakar akwatunan da kan su. Idan an ajiye su a cikin sashin sanyaya, za a jera su a ƙarƙashin sunan Ma"aikata ko Ma"aikatan da ke Rajista kuma idan an jera su don sayarwa a kasuwa, za a nuna su kamar yadda ma"aikaci ko ma"aikaci mai rijista ma.',
    },
    {
      id: 104,
      title: 'Menene kudaden da aka nuna a kasuwa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Farashin siyar da kowane abu da aka nuna a kasuwa an saita shi kai tsaye ta mai siyarwa kuma ya dogara da kilogiram nawa aka saya. A saman wannan adadin, kasuwa ta ƙunshi kudade biyu: Kuɗin Kasuwa kuɗin ma"amala ne na 3.5% wanda ƙungiyar Coldtivate ta tattara don ɗaukar nauyin aikace-aikacen da kuma kula da aikin. Kudin Biyan kuɗi shine kuɗin da tsarin biyan kuɗi na dijital (PayStack a Najeriya) ke ɗauka don aiwatar da ciniki.',
    },
    {
      id: 105,
      title:
        "Ni mai siye ne mai sha'awar siyan kayan amfanin gona daga dakuna masu sanyi, amma ban ga komai a kasuwa ba. Me yasa?",
      role: [ERoles.COOLING_USER],
      text: 'Idan kun kewaya zuwa shafin Kasuwa amma ba ku iya ganin kowane samfuri, wannan na iya zama saboda abubuwan tacewa waɗanda kuka yi amfani da su akan binciken (kamar wuri, kewayon farashi, ko amfanin gona), ko kuma yana iya zama saboda babu wani abu da yake. akwai don siyarwa a kusa da ku. Idan kun san wani daki mai sanyi da ke kusa, muna ba da shawarar tambayar ma"aikacin dakin sanyi ko kowane mai amfani da sanyaya yana sha"awar siyar da kayan amfanin ta hanyar aikin kasuwa kuma ku nemi waɗannan abubuwan da za a jera su a cikin app ɗin.',
    },
    {
      id: 106,
      title: 'Kuna bayar da sabis na bayarwa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Kasuwa baya bayar da sabis na isarwa a wannan lokacin, amma yana sauƙaƙe haɗin kai tare da hanyoyin dabaru waɗanda zasu iya isar da amfanin ga masu siye. A matsayin ma"aikaci mai rijista, kuna da zaɓi don ƙara lambobin sadarwa na isarwa ƙarƙashin "Menu" -> "Gudanarwa" -> "Saitunan Masu siyarwa (Kamfani)" -> "Lambobin Isarwa". Ana nuna su ga duk masu siye da ke siyan kayan amfanin gona daga dakunan sanyi lokacin biya. Idan kai mai siye ne, ana ƙarfafa ka ka tuntuɓar su don tsara isar da ka. Lura cewa idan an karɓi amfanin gona a rana ɗaya da siyan, babu kuɗin sanyaya, amma idan kun ajiye amfanin gonakin a ajiya, ana biyan kuɗin sanyaya kowace rana. Tabbatar ku tattauna wannan tare da tuntuɓar bayarwa da kuke tattaunawa da ita.',
    },
    {
      id: 107,
      title:
        "Na sami sanarwa a cikin app ɗin yana cewa 'Produce yana buƙatar sake rarrabawa'. Menene wancan?",
      role: [ERoles.OPERATOR],
      text: 'Saboda tsarin shiga a dakin sanyi, abun cikin akwati daya na manomi ko dan kasuwa daya ne. Kamar yadda, a cikin kasuwa, mai siye zai iya siyan kilogiram daga cikin akwati na mai siyarwa, adadin da aka saya ya kamata a motsa shi zuwa wani akwati daban. Wannan sanarwar tana sanar da ku cewa an gama siyayya, kuma ta danna kan ta zaku iya hango ko wane kwalin ya kamata a ɗauko samfurin. Tsara manyan akwatuna yana da mahimmanci don tabbatar da cewa ba a bincika amfanin gona bisa kuskure ba, kuma ana karɓar kuɗin sanyaya daidai. Muna ba da shawarar yin amfani da aikin "Crate ID" a wurin shiga don yiwa akwatuna alama a cikin Coldtivate tare da akwatunan jiki da sauƙin waƙa waɗanda akwatunan ke buƙatar hankalin ku dangane da sanarwar.',
    },
    {
      id: 108,
      title: 'Nawa zan iya saya a kasuwa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ga kowane abu da aka nuna a kasuwa, zaku iya siyan cikakken akwati ko kowane adadin kilogiram ɗin da ke cikin akwatin. Mafi qarancin adadin da za a iya saya shi ne 1 kg.',
    },
    {
      id: 109,
      title: 'Na sayi kayan noma kuma ina so in sake siyarwa. Yaya zan yi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lokacin da ka sayi wasu kayan amfanin gona daga kasuwa, ka zama mai mallakar adadin da aka saya. A cikin "Dashboard", za ku ga sabon shigarwa wanda ke nuna abin da kuka adana a cikin dakin sanyi. Idan kana son siyar da shi don siyarwa, zaku iya danna alamar "">" a gefen dama na abun dashboard, kewaya zuwa "Crate weight and the marketplace listing", saita akwatunan da kuke so a saita "na siyarwa" kuma farashin kowace kg. Masu cin kasuwa a kasuwa za su iya ganin waɗannan akwatunan, kuma su saya a adadin da aka nuna. Lura cewa don saita akwatunan siyarwa, ana buƙatar saita asusun bankin ku. Bi umarnin don ƙara bayanan asusun bankin ku, ko kewaya zuwa "Menu" -> "Bayanan asusu" -> "Zaɓuɓɓukan biyan kuɗi".',
    },
    {
      id: 110,
      title: 'Na fita tsarin biyan kuɗi na kasuwa. Ta yaya zan iya kammala sayan nawa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lokacin da kuka fara siya ta danna kan "Biya" a cikin Kasuwancin Siyayya, ana tura ku zuwa mai biyan kuɗi (PayStack a Najeriya). Idan, saboda kowane dalili, kun yi watsi da tsarin, za a yiwa odar ku alama a matsayin "Biyan da ake jira". Kuna iya nemo odar ku a ƙarƙashin shafin "My Orders" a cikin shafin kasuwa. Kuna iya danna abu don kammala biyan kuɗi. Kuna da mintuna 30 don kammala biyan kuɗi, bayan haka ana ɗaukar odar "An soke" kuma adadin ya sami "yanci don sauran masu siye su saya.',
    },
    {
      id: 111,
      title: 'Ba zan iya duba wasu amfanin gona ba. Me yasa hakan ke faruwa?',
      role: [ERoles.OPERATOR],
      text: 'Idan kuna ƙoƙarin bincika wasu akwatunan da aka jera a kasuwa, kuma ba za ku iya bincika su ba, wannan yana yiwuwa saboda kasancewarsu wani ɓangare na odar biyan kuɗi da ake jira. Wannan yana nufin cewa mai siye ya ƙara su a cikin keken siyayya kuma ya ƙaddamar da tsarin siyan. Mai siye yana da mintuna 30 don kammala biyan kuɗi, bayan haka za a soke odar. Bayan minti 30 sun wuce, za ku iya duba akwatin.',
    },
  ],
  [APP_LOCALES.YORUBA]: [
    {
      id: 1,
      title: 'Kini idi ti MO le lo app naa?',
      role: [ERoles.AUTH],
      text: 'Ohun elo naa jẹ apẹrẹ lati ṣe atilẹyin fun awọn olupese yara tutu ni awọn iṣẹ ojoojumọ wọn ni awọn yara tutu, awọn agbe ti o nlo awọn yara tutu, ati awọn alabara ti o nifẹ si rira awọn irugbin ti o fipamọ sinu awọn yara tutu. Ìfilọlẹ naa ṣe ẹya akojo oja oni-nọmba kan, ibojuwo latọna jijin ati awoṣe igbesi aye selifu fun apoti kọọkan ti o fipamọ, ati ibi ọja lati sopọ awọn olura ati awọn ti o ntaa. O tun pẹlu Ipele Imọ, eyiti o pese awọn iṣeduro ọja-pato lori iwọn otutu ipamọ to dara julọ ati igbesi aye ibi ipamọ.',
    },
    {
      id: 2,
      title: 'Tani o le lo app naa?',
      role: [ERoles.AUTH],
      text: 'Ohun elo naa le ṣee lo nipasẹ awọn ile-iṣẹ ibi ipamọ tutu, awọn agbe ati awọn oniṣowo ti o nifẹ si lilo ibi ipamọ tutu, ati awọn olura ti o ni agbara ni ayika agbaye. Ni gbogbo ohun elo naa, awọn ipa olumulo mẹta lo wa: (i) Oṣiṣẹ ti o forukọsilẹ: apakan ti ẹgbẹ iṣakoso olupese yara tutu. A eniyan ti o jẹ lodidi fun a ṣeto soke ati idari awọn yara, ni o wa ni abojuto ti a gbojufo awọn oniṣẹ akitiyan lori ilẹ, lai a wa ni ara ni ipo. Fun apẹẹrẹ: Alakoso ile-iṣẹ kan, CFO, bbl Eniyan yii wa ni olubasọrọ taara pẹlu awọn olumulo yara tutu, ati awọn ijabọ si oṣiṣẹ ile-iṣẹ ti o forukọsilẹ. (iii) Awọn olumulo tutu tabi olumulo: awọn olumulo yara tutu (le jẹ agbe, awọn oniṣowo, awọn alatuta, ati bẹbẹ lọ) tabi olumulo (olukuluku, alagbata, alataja). Ipa yii wa fun ẹnikẹni ti o fẹ forukọsilẹ ninu ohun elo laisi asopọ si ile-iṣẹ itutu agbaiye. Awọn olumulo itutu ti o ni foonuiyara le wọle si ohun elo naa bi awọn olumulo. Ti wọn ko ba ni foonuiyara kan, awọn oniṣẹ n ṣe awọn iṣẹ itutu agbaiye awọn olumulo fun wọn.',
    },
    {
      id: 3,
      title: 'Bawo ni MO ṣe le forukọsilẹ bi oṣiṣẹ ti o forukọsilẹ?',
      role: [ERoles.AUTH],
      text: 'Ti o ba jẹ oṣiṣẹ akọkọ lati ile-iṣẹ rẹ lati forukọsilẹ, o le tẹ bọtini "Forukọsilẹ bi ile-iṣẹ" ki o tẹle awọn igbesẹ lati forukọsilẹ ile-iṣẹ rẹ ati funrararẹ (pẹlu awọn alaye ti ara ẹni ati ọrọ igbaniwọle). Ni kete ti o ba ti forukọsilẹ ni aṣeyọri, o le wọle bi oṣiṣẹ ti o forukọsilẹ ninu ohun elo naa ki o fi ifiwepe SMS ranṣẹ si awọn oṣiṣẹ ti o forukọsilẹ lati darapọ mọ ile-iṣẹ rẹ. Ni kete ti ile-iṣẹ naa ba ṣẹda, gbogbo Awọn oṣiṣẹ ti o forukọsilẹ yẹ ki o pe nipasẹ SMS. Bibẹẹkọ, wọn kii yoo sopọ si ile-iṣẹ kanna.',
    },
    {
      id: 4,
      title: 'Bawo ni MO ṣe le forukọsilẹ bi Oṣiṣẹ?',
      role: [ERoles.AUTH],
      text: 'Lati forukọsilẹ, o nilo lati pe nipasẹ oṣiṣẹ ti o forukọsilẹ. Iwọ yoo gba SMS kan pẹlu ọna asopọ imuṣiṣẹ, lati ibiti o ti le ṣeto awọn alaye ti ara ẹni ati ọrọ igbaniwọle rẹ.',
    },
    {
      id: 5,
      title: 'Bawo ni MO ṣe le forukọsilẹ bi Olumulo Itutu tabi Olumulo?',
      role: [ERoles.AUTH],
      text: 'Awọn olumulo itutu agbaiye pẹlu awọn fonutologbolori ati Awọn onibara le forukọsilẹ tite lori "Forukọsilẹ bi olumulo itutu agbaiye tabi olumulo" ni oju-ile ati pese awọn alaye ti ara ẹni ati ọrọ igbaniwọle. Awọn olumulo itutu ti ko ni foonuiyara le ṣe afikun si app nipasẹ awọn oniṣẹ. Iṣiṣẹ yii nilo lati bẹrẹ iṣayẹwo fun awọn olumulo itutu agbaiye wọnyẹn. Awọn olumulo itutu nilo lati pese nọmba foonu kan, eyiti oniṣẹ yoo lo lati kan si awọn olumulo itutu ni ọran ti iwulo. Ko si ọrọ igbaniwọle ti o nilo ninu ọran yii.',
    },
    {
      id: 6,
      title: 'Mi o le pari iforukọsilẹ bi olumulo. Kini o yẹ ki n ṣe?',
      role: [ERoles.AUTH],
      text: 'Lati pari iforukọsilẹ, jọwọ rii daju pe awọn ipo wọnyi ni itẹlọrun: (i) O n tẹ nọmba foonu kan sii pẹlu koodu orilẹ-ede to pe (fun apẹẹrẹ +91 fun India); (ii) Nọmba foonu ti o pese ko ti lo lati forukọsilẹ olumulo miiran; (iii) Ọrọigbaniwọle ti o n wọle mu gbogbo awọn ipo ti o beere ṣẹ; (iv) Awọn ọrọ igbaniwọle ti o n wọle jẹ kanna - o le tẹ aami oju lati ṣafihan awọn ọrọ igbaniwọle ati ṣayẹwo pe wọn dọgba.',
    },
    {
      id: 7,
      title: 'Emi ko ni foonu ṣugbọn fẹ lati lo app naa. Kini o yẹ ki n ṣe?',
      role: [ERoles.AUTH],
      text: 'Ti o ba jẹ oṣiṣẹ ti forukọsilẹ, oniṣẹ ẹrọ, tabi olumulo kan, o nilo lati pese nọmba foonu to wulo lati forukọsilẹ. Foonuiyara nilo lati lo app ni deede. Ti o ba jẹ olumulo itutu agbaiye ati pe ko ni foonu, a tun gba ọ ni imọran lati pese nọmba foonu to wulo, ki oniṣẹ le kan si ọ ni ọran ti o nilo. O le fun nọmba foonu ọmọ ẹgbẹ tabi ọrẹ kan ti o ko ba ni tirẹ. Ti eyi ko ba ṣee ṣe, oniṣẹ tun le fi awọn ọja pamọ sinu yara nipa yiyan "Olumulo laisi foonu" gẹgẹbi olumulo itutu ni wiwa-iwọle.',
    },
    {
      id: 8,
      title: 'Awọn alaye wo ni o nilo fun iwọle bi oṣiṣẹ ti o forukọsilẹ?',
      role: [ERoles.AUTH],
      text: 'Awọn oṣiṣẹ ti o forukọsilẹ le wọle pẹlu imeeli tabi nọmba foonu, ati ọrọ igbaniwọle wọn.',
    },
    {
      id: 9,
      title: 'Awọn alaye wo ni o nilo fun buwolu wọle bi oniṣẹ?',
      role: [ERoles.AUTH],
      text: 'Awọn oniṣẹ le wọle pẹlu nọmba foonu wọn ati ọrọ igbaniwọle.',
    },
    {
      id: 10,
      title: 'Awọn alaye wo ni o nilo fun iwọle bi olumulo Itutu tabi Olumulo?',
      role: [ERoles.AUTH],
      text: 'Awọn olumulo itutu agbaiye pẹlu foonuiyara le wọle pẹlu nọmba foonu wọn ati ọrọ igbaniwọle. Awọn olumulo itutu ti ko ni foonuiyara ko nilo lati wọle: oniṣẹ le ṣe awọn iṣẹ fun wọn. Awọn onibara ti o nifẹ lati rii ibi ọja le wọle pẹlu nọmba foonu wọn ati ọrọ igbaniwọle.',
    },
    {
      id: 11,
      title: 'Mi o gba ipe kankan fun SMS. Kini o yẹ ki n ṣe?',
      role: [ERoles.AUTH],
      text: 'Ti o ba ti padanu ọrọ igbaniwọle rẹ, o le mu akọọlẹ rẹ pada sipo nipa titẹ lori "Gbagbe ọrọ igbaniwọle" ni wiwọle, tẹ nọmba foonu rẹ sii, ati pe iwọ yoo gba SMS kan pẹlu ọna asopọ lati ṣeto ọrọ igbaniwọle tuntun kan.',
    },
    {
      id: 12,
      title: 'Mo ti padanu ọrọ igbaniwọle mi. Kini o yẹ ki n ṣe?',
      role: [ERoles.AUTH],
      text: 'Ti o ba ti padanu ọrọ igbaniwọle rẹ, o le mu akọọlẹ rẹ pada sipo nipa titẹ lori "Gbagbe ọrọ igbaniwọle" ni wiwọle, tẹ nọmba foonu rẹ sii, ati pe iwọ yoo gba SMS kan pẹlu ọna asopọ lati ṣeto ọrọ igbaniwọle tuntun kan.',
    },
    {
      id: 13,
      title: 'Kini Ibudo Imọ?',
      role: [ERoles.EMPLOYEE],
      text: 'Ibudo Imọ jẹ oju-iwe ti o le de ọdọ nipasẹ titẹ si Akojọ aṣyn ni apa osi. O ni alaye to wulo nipa awọn iṣe ipamọ to dara julọ fun awọn ọja oriṣiriṣi, pẹlu iwọn otutu to dara julọ ati akoko ibi ipamọ isunmọ labẹ iwọn otutu yii.',
    },
    {
      id: 14,
      title: 'Bawo ni MO ṣe le ṣatunkọ profaili mi?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Nipa titẹ si "Akojọ aṣyn" -> "Awọn alaye akọọlẹ", o le wo profaili rẹ ki o ṣatunkọ "awọn alaye ti ara ẹni" (orukọ akọkọ ati idile, nọmba foonu, imeeli, ati akọ). Labẹ "awọn ayanfẹ agbegbe", o le yi ede app pada. Labẹ "Eto Olutaja", o le ṣeto awọn alaye akọọlẹ banki rẹ, ṣẹda awọn kuponu, ati jẹ ki awọn alaye olubasọrọ rẹ jẹ gbangba fun awọn olumulo ọja. Lati yi awọn alaye ti ile-iṣẹ rẹ pada, awọn ipo, ati awọn ẹya itutu agbaiye, lilö kiri si "Akojọ aṣyn" -> "Iṣakoso", lẹhinna yan ohun akojọ aṣayan ti o fẹ yipada.',
    },
    {
      id: 15,
      title: 'Bawo ni MO ṣe le ṣatunkọ profaili mi?',
      role: [ERoles.EMPLOYEE],
      text: 'Awọn ọna mẹta lo wa lati sopọ oniṣẹ ẹrọ si ẹyọ itutu agbaiye. O le fi ẹya itutu agbaiye (tabi diẹ ẹ sii ju ọkan) si oniṣẹ ẹrọ nigbati o ba nfi ifiwepe ranṣẹ si i. Bibẹẹkọ, o le ṣe atunṣe awọn ẹya itutu agbaiye ti o ni nkan ṣe pẹlu oniṣẹ ẹrọ ti a fun nipasẹ lilọ kiri si "Iṣakoso" -> "Awọn oniṣẹ", yiyan oniṣẹ, lẹhinna tẹ lori "Yan ẹyọ itutu agbaiye". Lakotan, nigba ṣiṣẹda ẹyọ itutu agbaiye ni "Iṣakoso" -> "Awọn ẹya itutu", o tun le fi awọn oniṣẹ ṣiṣẹ si. Ranti lati ṣafipamọ awọn ayipada rẹ ṣaaju ki o to jade!',
    },
    {
      id: 16,
      title: 'Bawo ni MO ṣe le fi awọn oniṣẹ si awọn ẹya itutu agbaiye?',
      role: [ERoles.OPERATOR],
      text: 'Bẹẹni, o le bẹrẹ a ayẹwo ni fun awọn ti eniyan nipa lilo awọn itutu olumulo ti a npè ni "User lai foonu". Bi ọpọ eniyan ṣe le lo akọọlẹ yii lati ṣayẹwo, rii daju pe o ṣafikun aami orukọ si awọn apoti inu yara lati ṣe idanimọ oniwun apoti kọọkan.',
    },
    {
      id: 17,
      title:
        'Olumulo itutu agbaiye de yara tutu ṣugbọn ko ni foonu. Ṣe Mo tun le forukọsilẹ fun u?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Bẹẹni, o le bẹrẹ a ayẹwo ni fun awọn ti eniyan nipa lilo awọn itutu olumulo ti a npè ni "User lai foonu". Bi ọpọ eniyan ṣe le lo akọọlẹ yii fun ṣayẹwo, rii daju pe o ṣafikun aami orukọ si awọn apoti inu yara lati ṣe idanimọ oniwun apoti kọọkan.',
    },
    {
      id: 18,
      title: 'Bawo ni MO ṣe forukọsilẹ ile-iṣẹ mi?',
      role: [ERoles.EMPLOYEE],
      text: 'Lati forukọsilẹ ile-iṣẹ rẹ, loju iboju itẹwọgba yan "Forukọsilẹ bi ile-iṣẹ" ati fọwọsi alaye ti o nilo. Tẹ ọrọ igbaniwọle sii lẹhinna tẹ "Forukọsilẹ" ati pe o ti ṣetan lati lọ!',
    },
    {
      id: 19,
      title: 'Bawo ni MO ṣe forukọsilẹ ipo tuntun fun ile-iṣẹ mi?',
      role: [ERoles.EMPLOYEE],
      text: 'Ẹka itutu agbaiye kọọkan nilo lati ṣẹda ni ipo kan (ati pe awọn ẹya itutu agbaiye pupọ le ṣẹda fun ipo kanna). Lati fi ipo titun kun fun ile-iṣẹ rẹ, ninu akojọ aṣayan yan "Iṣakoso"> "Awọn ipo". Tẹ "+" ni igun apa ọtun oke lati ṣafikun ipo tuntun. Fọwọsi alaye ti o nilo. Tẹ "fi" lati jẹrisi.',
    },
    {
      id: 20,
      title: 'Bawo ni MO ṣe forukọsilẹ ẹyọ itutu agbaiye tuntun fun ile-iṣẹ mi?',
      role: [ERoles.EMPLOYEE],
      text: 'Lati forukọsilẹ ẹyọ itutu agbaiye tuntun fun ile-iṣẹ rẹ, o nilo lati ni o kere ju ipo kan ti a ṣẹda. Lẹhinna, ninu akojọ aṣayan yan "Iṣakoso"> "Awọn ẹya itutu agbaiye". Tẹ lori "+" ni igun apa ọtun oke lati ṣafikun ẹyọ itutu agbaiye tuntun kan. Fọwọsi alaye ti o nilo. Tẹ "fi" lati jẹrisi.',
    },
    {
      id: 21,
      title:
        'Bawo ni MO ṣe pe awọn oṣiṣẹ Iforukọsilẹ miiran lati ile-iṣẹ mi lati forukọsilẹ fun app naa?',
      role: [ERoles.EMPLOYEE],
      text: 'Lati pe awọn oṣiṣẹ miiran ti o forukọsilẹ fun ile-iṣẹ rẹ, ninu akojọ aṣayan yan "Iṣakoso"> "Oṣiṣẹ Iforukọsilẹ". Tẹ "+" ni igun apa ọtun oke lati ṣafikun nọmba tẹlifoonu ti oṣiṣẹ ti o fẹ pe. Tẹ "Pe" lati jẹrisi: ẹlẹgbẹ rẹ yoo gba SMS kan pẹlu ọna asopọ kan ti o ṣe itọsọna taara si iboju iforukọsilẹ. Ni afikun, iwọ yoo tun gba imeeli pẹlu ọna asopọ ifiwepe. Jọwọ firanṣẹ eyi si oniṣẹ ti ko ba gba nipasẹ SMS.',
    },
    {
      id: 22,
      title: 'Bawo ni MO ṣe pe awọn oniṣẹ ibi ipamọ tutu lati forukọsilẹ fun ohun elo naa?',
      role: [ERoles.EMPLOYEE],
      text: 'Lati fi ifiwepe ranṣẹ si awọn oniṣẹ fun awọn ẹya itutu agbaiye rẹ, ninu akojọ aṣayan yan "Iṣakoso"> "Awọn oniṣẹ". Tẹ "+" ni igun apa ọtun oke lati ṣafikun nọmba tẹlifoonu ti oniṣẹ ti o fẹ pe. Tẹ "Pe" lati jẹrisi: oniṣẹ yoo gba ifiranṣẹ kan pẹlu ọna asopọ kan ti o tọ ọ taara si iboju iforukọsilẹ. Ni afikun, iwọ yoo tun gba imeeli pẹlu ọna asopọ ifiwepe. Jọwọ firanṣẹ eyi si oniṣẹ ti ko ba gba nipasẹ SMS.',
    },
    {
      id: 23,
      title: 'Bawo ni MO ṣe ṣe atẹle iwọn otutu ti ẹyọ itutu agbaiye kan?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lati ṣe atẹle iwọn otutu ti ẹyọ itutu agbaiye kan pato, tẹ lori "Die sii" ni igun apa ọtun isalẹ ti ọpa lilọ kiri, yan "Awọn iwọn itutu agbaiye", lilö kiri si "Awọn ipo yara", ki o yan ẹyọ itutu agbaiye ti iwulo lati inu sisọ silẹ. Ninu igbimọ yii, iwọ yoo wo aworan kan pẹlu iwọn otutu lori akoko - o le tẹ lori aaye data kan lati wo iye iwọn otutu ati aami-akoko. Ti yara naa ba ni awọn sensọ ti o sopọ si app, iwọ yoo ni anfani lati wo iwọn otutu yara gangan nibi. Bibẹẹkọ, aworan naa yoo ṣe afihan awọn iwọn otutu ti oniṣẹ yara ti ṣeto pẹlu ọwọ laarin ohun elo naa. Lati ṣayẹwo iwọn otutu ti ẹyọ itutu agbaiye miiran, o le yan lati inu sisọ silẹ lori oke oju-iwe naa.',
    },
    {
      id: 24,
      title: 'Bawo ni MO ṣe ṣe atẹle gbigbe ti ẹyọ itutu agbaiye kan?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lati ṣakoso ibugbe ti ẹyọ itutu agbaiye kan pato tẹ lori "Diẹ sii" ni igun apa ọtun isalẹ ti ọpa lilọ kiri, yan "Awọn iwọn itutu", lilö kiri si "Aṣeto", ki o yan ẹyọ itutu ti iwulo lati inu silẹ. Nibi o le rii ibugbe lọwọlọwọ (oke) ati ibugbe asọtẹlẹ fun awọn ọjọ 7 to nbọ (isalẹ). Alaye nipa gbigbe ni ọjọ iwaju da lori nọmba awọn ọjọ ti olumulo kọọkan n kede bi awọn ọjọ ti a gbero ni ibi ipamọ ni wiwa-iwọle. Ṣọra pe eyi jẹ iṣiro nikan ati pe o le jẹ pe ko pe.',
    },
    {
      id: 25,
      title: 'Bawo ni MO ṣe le rii iru awọn nkan ti o fipamọ sinu yara kan?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Tẹ aami "Dasibodu" ni isalẹ iboju ki o yan ẹyọ itutu agbaiye ti iwulo lati inu atokọ lati wo atokọ ti gbogbo awọn nkan ti o fipamọ sinu ẹyọ itutu agbaiye.',
    },
    {
      id: 26,
      title:
        'Bawo ni MO ṣe le rii iwifun ti o kọja ati awọn iṣayẹwo-jade ti ẹyọ itutu agbaiye kan?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Lati wo awọn iṣipopada ti o kọja ti ẹyọ itutu agbaiye tẹ lori "Die" ni igun apa ọtun isalẹ ti ọpa lilọ kiri, ki o yan "Itan-akọọlẹ": awọn ayẹwo ti o kọja (awọn aami pẹlu apoti alawọ ewe), awọn iṣayẹwo (awọn aami pẹlu apoti osan), ati awọn iṣẹ ọja (awọn aami pẹlu ọkọ buluu) pẹlu awọn alaye idunadura ti han. Ti idunadura kan pato jẹ iwulo iṣẹ wiwa le ṣe iranlọwọ fun ọ ni wiwa!',
    },
    {
      id: 28,
      title: 'Kini awọn iṣẹ akọkọ ti oniṣẹ le ṣe ninu app naa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Oṣiṣẹ le: forukọsilẹ awọn olumulo itutu agbaiye tuntun, bẹrẹ awọn iṣayẹwo, ṣe atẹle awọn ohun kan ni ibi ipamọ ati gbigbe yara, bẹrẹ awọn iṣayẹwo, ati ṣetọju iwọn otutu ti ẹyọ itutu agbaiye ti o jẹ iduro fun. Oṣiṣẹ naa tun le ṣe iranlọwọ fun awọn olumulo itutu agbaiye ni kikojọ diẹ ninu awọn apoti fun tita ati ṣeto idiyele tita kan.',
    },
    {
      id: 29,
      title: 'Bawo ni MO ṣe le forukọsilẹ awọn olumulo itutu agbaiye tuntun?',
      role: [ERoles.OPERATOR],
      text: 'Lati forukọsilẹ olumulo itutu agbaiye tuntun, ninu Akojọ aṣyn lilö kiri si "Iṣakoso"> "Awọn olumulo Itutu". Tẹ "+" ni igun apa ọtun oke ati yan boya lati ṣafikun olumulo ti o forukọsilẹ tẹlẹ pẹlu koodu kan, tabi ṣafikun awọn alaye olumulo. Olumulo itutu agbaiye ti o ni foonuiyara kan ati pe o ti forukọsilẹ tẹlẹ ni Coldtivate ni koodu alailẹgbẹ kan, eyiti oun / o le rii labẹ "Akojọ aṣyn" -> "Awọn alaye akọọlẹ" -> "Awọn alaye ti ara ẹni" -> koodu Itutu agbaiye Olumulo. Ti olumulo ko ba ni foonuiyara, tabi ko forukọsilẹ sibẹsibẹ, o le ṣafikun olumulo nipa fifi orukọ kun, akọ ati abo ati nọmba tẹlifoonu. Ti olumulo ko ba ni nọmba tirẹ, nọmba eniyan miiran (fun apẹẹrẹ awọn ọrẹ, ibatan) le ṣee lo, ṣugbọn jọwọ ranti pe nọmba foonu kan le ṣee lo ni ẹẹkan. Tẹ "Fipamọ awọn ayipada" lati jẹrisi. Lati pari iforukọsilẹ, o nilo lati kun iwadi kukuru kan nipa bibeere awọn ibeere diẹ si olumulo itutu agbaiye. Iwadi na tun le pari ni aaye nigbamii nipa lilọ kiri si "Iṣakoso" -> "Awọn olumulo Itutu" -> "Iwadii Olumulo Itutu".',
    },
    {
      id: 30,
      title:
        'Olumulo itutu agbaiye ko ni akoko lati dahun awọn ibeere iwadi ni iforukọsilẹ. Kini o yẹ ki n ṣe?',
      role: [ERoles.OPERATOR],
      text: 'O le fo awọn ibeere iwadi nipa titẹ "Pari nigbamii". Ni idi eyi, iwọ yoo ti ọ lati pari iwadi naa ni igba akọkọ ti o ṣẹda ayẹwo kan fun olumulo itutu agbaiye naa. A ṣe iṣeduro lati gba akoko ati dahun awọn ibeere iwadi daradara: ni ọna yii olumulo le ni iriri ti o ni ibamu pẹlu ohun elo Coldtivate!',
    },
    {
      id: 31,
      title:
        'Oniṣẹ ẹrọ kan n beere lọwọ mi fun koodu lati ṣafikun mi si atokọ ti awọn olumulo itutu agbaiye ti ile-iṣẹ naa. Nibo ni MO le wa koodu naa?',
      role: [ERoles.OPERATOR],
      text: 'Lati bẹrẹ iṣayẹwo kan, lilö kiri si Dashboard ki o tẹ bọtini Oluṣakoso Iṣẹ-ṣiṣe ni apa ọtun isalẹ, lẹhinna tẹ bọtini alawọ ewe.',
    },
    {
      id: 32,
      title: 'Emi ko ni akoko lati dahun awọn ibeere iwadi ni iforukọsilẹ. Kini o yẹ ki n ṣe?',
      role: [ERoles.OPERATOR],
      text: 'Awọn ọna meji lo wa lati bẹrẹ ayẹwo, mejeeji bẹrẹ ni oju-iwe Dasibodu. O le tẹ bọtini Oluṣakoso aṣayan iṣẹ-ṣiṣe ni apa ọtun isalẹ, lẹhinna tẹ bọtini pupa. Ni ọna yii, o le yan iru olumulo itutu agbaiye (ati ninu iru ẹrọ itutu agbaiye) ti o fẹ bẹrẹ ayẹwo, ati pe o le ṣayẹwo awọn apoti rẹ lati awọn ins ayẹwo lọpọlọpọ. Ni omiiran, o le tẹ lori "Wo awọn alaye" fun ohun kan ti o rii ninu Dashboard (rii daju pe o wa ni ẹyọ itutu agbaiye to pe), ki o tẹ "Ṣayẹwo". Ni idi eyi, o le ṣayẹwo awọn apoti nikan lati nkan ipamọ yẹn.',
    },
    {
      id: 33,
      title: 'Mo nifẹ lati tọju awọn irugbin mi sinu awọn yara tutu. Bawo ni MO ṣe le rii wọn?',
      role: [ERoles.EMPLOYEE],
      text: 'Lati wa awọn yara tutu nitosi rẹ, lilö kiri si "Die sii" ni igun apa ọtun isalẹ ti ọpa lilọ kiri, yan "Awọn ẹya itutu" ati "Map". Nibi o le wa awọn yara tutu ti o wa nitosi, lẹhinna mu awọn apoti rẹ wa si yara naa. Onišẹ yara tutu le ṣe iranlọwọ fun ọ lati ni oye bi yara naa ṣe n ṣiṣẹ, bawo ni iwọ yoo ṣe gba agbara, ati kini awọn anfani ti lilo ibi ipamọ tutu.',
    },
    {
      id: 34,
      title: 'Bawo ni MO ṣe le bẹrẹ ayẹwo kan?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Lati bẹrẹ iṣayẹwo kan, lilö kiri si Dashboard ki o tẹ bọtini Oluṣakoso Iṣẹ-ṣiṣe ni apa ọtun isalẹ, lẹhinna tẹ bọtini alawọ ewe.',
    },
    {
      id: 35,
      title: 'Bawo ni MO ṣe le bẹrẹ ayẹwo kan?',
      role: [ERoles.OPERATOR],
      text: 'Awọn ọna meji lo wa lati bẹrẹ ayẹwo, mejeeji bẹrẹ ni oju-iwe Dasibodu. O le tẹ bọtini Oluṣakoso aṣayan iṣẹ-ṣiṣe ni apa ọtun isalẹ, lẹhinna tẹ bọtini pupa. Ni ọna yii, o le yan iru olumulo itutu agbaiye (ati ninu iru ẹrọ itutu agbaiye) ti o fẹ bẹrẹ ayẹwo, ati pe o le ṣayẹwo awọn apoti rẹ lati awọn ins ayẹwo lọpọlọpọ. Ni omiiran, o le tẹ lori "Wo awọn alaye" fun ohun kan ti o rii ninu Dashboard (rii daju pe o wa ni ẹyọ itutu agbaiye to pe), ki o tẹ "Ṣayẹwo". Ni idi eyi, o le ṣayẹwo-jade awọn apoti nikan lati nkan ibi ipamọ yẹn.',
    },
    {
      id: 36,
      title: 'Mo ni awọn sensọ iwọn otutu ninu yara tutu. Njẹ wọn le sopọ si Coldtivate?',
      role: [ERoles.AUTH],
      text: 'Ibudo Imọ jẹ oju-iwe ti o le de ọdọ nipasẹ titẹ si Akojọ aṣyn ni apa osi. O ni alaye to wulo nipa awọn iṣe ipamọ to dara julọ fun awọn ọja oriṣiriṣi, pẹlu iwọn otutu to dara julọ ati akoko ibi ipamọ isunmọ labẹ iwọn otutu yii.',
    },
    {
      id: 37,
      title: 'Bawo ni MO ṣe so awọn sensọ ninu yara pẹlu ohun elo naa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ti awọn sensọ iwọn otutu ba wa ninu yara ti o le sopọ si ohun elo Coldtivate, jọwọ ṣe ibasọrọ pẹlu oniduro rẹ. Olumulo nikan ti o ni ipa oṣiṣẹ ti o forukọsilẹ le so awọn sensosi pọ si awọn ẹya itutu agbaiye ti a ṣẹda ni Coldtivate.',
    },
    {
      id: 38,
      title: 'Bawo ni MO ṣe le ṣeto iwọn otutu ti ẹyọ itutu agbaiye?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Akoko lati gbe soke ni nọmba ti a daba ti awọn ọjọ ti o ku fun olumulo itutu agbaiye lati gbe ọja kan. Lẹhinna, ọja naa yoo bẹrẹ lati padanu ọja rẹ. Akoko lati mu dogba si odo tọkasi pe olumulo yẹ ki o wa lati gba nkan naa ni ibi ipamọ lẹsẹkẹsẹ ati gba to awọn ọjọ 2 lati ta si ọja naa. O le rii ni Dasibodu (ọtun oke) ati ni wiwo alaye fun ohun ipamọ kọọkan.',
    },
    {
      id: 39,
      title: 'Bii o ṣe le kan si olumulo itutu agbaiye fun iwadii ọja ipamọ lẹhin-ipamọ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Awọn ẹfọ titun ati awọn eso jẹ ibajẹ, ati bi wọn ṣe padanu alabapade wọn lẹhin ikore jẹ eyiti o da lori iwọn otutu. Akoko lati gbe soke jẹ, nitorina, iṣiro da lori iwọn otutu ti ẹrọ itutu agbaiye ti o baamu, ati lori didara akọkọ ti ọja nigbati o mu wa si ibi itutu agbaiye. Awọn paramita ti a lo ninu iṣiro yii jẹ alailẹgbẹ si ọja kọọkan. O le ni awọn oye diẹ lori bawo ni ibajẹ ṣe yatọ laarin awọn ọja oriṣiriṣi ni Ayika Imọ.',
    },
    {
      id: 40,
      title: 'Kini iwadii ọja lẹhin-ipamọ ati kilode ti MO yẹ ki o kun?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Iwadi ọja naa le wọle si nipa tite lori awọn aami mẹta ti o wa lẹgbẹẹ ayẹwo kọọkan ninu taabu "Die" -> "Itan" ati yiyan "Fikun iwadi ọja". Iwadi naa kuru pupọ o beere fun alaye nipa idiyele tita ọja ti o ti fipamọ sinu yara tẹlẹ, ati nipa iye ti o bajẹ. Alaye yii yoo ṣe itọju bi aṣiri ati lilo nikan nipasẹ ẹgbẹ Coldtivate lati ṣe iṣiro ipa ti lilo ibi ipamọ tutu. Aami pupa kan yoo ṣe idanimọ awọn ayẹwo jade fun eyiti iwadi ọja ko ti pari sibẹsibẹ. O yoo wa ni leti nipa awọn ayẹwo jade ti o nilo akiyesi rẹ ninu awọn iwifunni nronu ati ki o le tẹ lori iwifunni lati ṣii iwadi. O tun le wọle si awọn iwadi ti o nilo lati kun ni "Analytics" taabu, ati ki o si tite lori "Ipa".',
    },
    {
      id: 41,
      title: 'Bawo ni MO ṣe ka alaye ti ohun kan ninu Dasibodu naa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ohun kọọkan ninu Dasibodu n ṣe afihan akojọpọ awọn apoti ti iru irugbin na kanna ti o ti ṣayẹwo-ni papọ. Nọmba awọn ọjọ ti o wa ni oke ni awọn ọjọ ti o ku ti asọtẹlẹ titi di akoko lati gbe soke. Ni isalẹ, o rii iru irugbin na ati ID ayẹwo-iwọle. Nọmba ti o tẹle aami apoti jẹ nọmba awọn apoti ti a ṣayẹwo. Ni atẹle rẹ, o rii idiyele itutu agbaiye, ati nọmba awọn ọjọ ti awọn apoti ti wa ni ipamọ fun. Nọmba ti o tẹle kaadi ti o wa ni apa ọtun n ṣe idanimọ iye awọn apoti ti a ṣe akojọ si bi "fun tita" ni aaye ọjà. Ni isalẹ ti ohun kọọkan, o wo onwer ti awọn apoti ati awọn alaye olubasọrọ.',
    },
    {
      id: 42,
      title: 'Kini akoko lati gbe soke?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ibugbe naa han bi pupa nigbati o ju 80% ti agbara itutu agbaiye lo. Alaye nipa gbigbe ni ọjọ iwaju da lori nọmba awọn ọjọ ti olumulo kọọkan n kede bi awọn ọjọ ti a gbero ni ibi ipamọ ni wiwa-iwọle. Ṣọra pe eyi jẹ iṣiro nikan ati pe o le jẹ pe ko pe. Bii iru bẹẹ, gbigbe yara pupa jẹ ami kan pe yara naa ti kun. O ko nilo lati ṣe aniyan ṣugbọn o le ṣe igbese ni ibamu. Fun apẹẹrẹ, ro kikan si awọn olumulo itutu agbaiye ti ọja wa ni ibi ipamọ ni akoko ti o kere julọ lati gbe soke lati gba wọn ni imọran lati ṣayẹwo laipẹ. O le wo atokọ ti o paṣẹ ti awọn ohun kan ni iyara julọ lati ṣayẹwo labẹ "Dashboard" nigbati o ba paṣẹ nipasẹ akoko lati gbe.',
    },
    {
      id: 43,
      title: 'Bawo ni akoko lati gbe soke iṣiro? Nipa awọn okunfa wo ni o ni ipa?',
      role: [ERoles.OPERATOR],
      text: 'Awọn ẹfọ titun ati awọn eso jẹ ibajẹ, ati bi wọn ṣe padanu alabapade wọn lẹhin ikore jẹ eyiti o da lori iwọn otutu. Akoko lati gbe soke jẹ, nitorina, iṣiro da lori iwọn otutu ti ẹrọ itutu agbaiye ti o baamu, ati lori didara akọkọ ti ọja nigbati o mu wa si ibi itutu agbaiye. Awọn paramita ti a lo ninu iṣiro yii jẹ alailẹgbẹ si ọja kọọkan. O le ni diẹ ninu awọn oye lori bawo ni ibajẹ ṣe yatọ laarin awọn ọja oriṣiriṣi ni Ayika Imọ.',
    },
    {
      id: 44,
      title: 'Akoko lati gbe soke jẹ awọn ọjọ 0 ṣugbọn awọn ọja tun n dara. Kí nìdí?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Awọ naa duro fun awọn ọjọ to ku ṣaaju akoko lati gbe soke. Iwọ yoo rii igi ni pupa nigbati o kere ju ọjọ 2, ni ofeefee nigbati o kere ju ọjọ 7, ati alawọ ewe nigbati o ju ọjọ meje lọ. Awọn iye wọnyi jẹ pato fun nkan ibi ipamọ kọọkan ati pe a tun ṣe iṣiro ni ọpọlọpọ igba fun ọjọ kan da lori iwọn otutu ninu ẹyọ itutu agbaiye. Nigbati ko si awoṣe fun iṣiro wa, awọ ti igi yoo jẹ grẹy.',
    },
    {
      id: 45,
      title: 'Akoko lati gbe soke jẹ diẹ sii ju awọn ọjọ 0 ṣugbọn awọn ọja ti fẹrẹ bajẹ. Kí nìdí?',
      role: [ERoles.OPERATOR],
      text: 'Dasibodu le gba iṣẹju diẹ lati ṣe imudojuiwọn. Paapaa jọwọ rii daju pe o n wa ni ẹyọ itutu agbaiye to pe. Ti o ba n ṣakiyesi ọran naa, jọwọ jabo si app@yourvcca.org.',
    },
    {
      id: 46,
      title: 'Akoko lati gbe soke jẹ diẹ sii ju awọn ọjọ 0 ṣugbọn awọn ọja ti fẹrẹ bajẹ. Kí nìdí?',
      role: [ERoles.OPERATOR],
      text: 'Dasibodu le gba iṣẹju diẹ lati ṣe imudojuiwọn. Paapaa jọwọ rii daju pe awọn ohun ti o ṣayẹwo-jade ni awọn ti o pe, ati pe o n wa ni ẹyọ itutu agbaiye to pe. Ti o ba n ṣakiyesi ọran naa, jọwọ jabo si app@yourvcca.org.',
    },
    {
      id: 47,
      title:
        'Ibugbe yara fun ọkan ninu awọn ọjọ ti nbọ jẹ pupa (kere ju 20%). Kini eleyi da lori? Ṣe o yẹ ki n ṣe aniyan?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'Ibugbe naa han bi pupa nigbati o ju 80% ti agbara itutu agbaiye lo. Alaye nipa gbigbe ni ọjọ iwaju da lori nọmba awọn ọjọ ti olumulo kọọkan n kede bi awọn ọjọ ti a gbero ni ibi ipamọ ni wiwa-iwọle. Ṣọra pe eyi jẹ iṣiro nikan ati pe o le jẹ pe ko pe. Bii iru bẹẹ, gbigbe yara pupa jẹ ami kan pe yara naa ti kun. O ko nilo lati ṣe aniyan ṣugbọn o le ṣe igbese ni ibamu. Fun apẹẹrẹ, ro kikan si awọn olumulo itutu agbaiye ti ọja wa ni ibi ipamọ ni akoko ti o kere julọ lati gbe soke lati gba wọn ni imọran lati ṣayẹwo laipẹ. O le wo atokọ ti o paṣẹ ti awọn ohun kan ni iyara julọ lati ṣayẹwo labẹ "Dashboard" nigbati o ba paṣẹ nipasẹ akoko lati gbe.',
    },
    {
      id: 48,
      title:
        'Olumulo itutu agbaiye n mu ọja wa si yara ti ko si lori atokọ naa. Ṣe Mo tun le ṣayẹwo iyẹn?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'Ifitonileti naa ti wa ni fifiranṣẹ lẹhin ti ko gba data lati ọdọ sensọ fun diẹ ẹ sii ju wakati 12 lọ, ati pe o tumọ si iwọn otutu ti a ṣeto ni "Awọn itutu Itutu"> nronu "Awọn ipo yara" ti wa ni lilo bayi. Ìfilọlẹ naa yoo gbiyanju lati tun sopọ si sensọ ni gbogbo wakati 1, nitorinaa a ni imọran lati duro fun awọn wakati diẹ ti eyi jẹ ọran Asopọmọra. Ti ko ba si data sensọ tuntun fun awọn wakati pupọ tabi awọn ọjọ, iṣoro naa le wa ni ẹgbẹ hardware, fun apẹẹrẹ, sensọ le ti pari ni batiri.',
    },
    {
      id: 49,
      title: 'Ninu Dasibodu, ohun kọọkan ni igi awọ kan. Kini awọ ti igi naa ṣe aṣoju?',
      role: [ERoles.EMPLOYEE],
      text: 'Nigbati ko ba si awọn sensọ ti o sopọ si app, awoṣe lati ṣe iṣiro akoko lati gbe da lori iwọn otutu ti a ṣeto nipasẹ oniṣẹ. Iyẹn tun jẹ idi ti a fi rọ oniṣẹ lati tẹ iwọn otutu ti o ṣeto titun sii ni gbogbo ṣayẹwo tuntun ati ṣayẹwo. Fun awoṣe lati jẹ deede, o ṣe pataki pe iwọn otutu ti wa ni imudojuiwọn. Jọwọ kọ awọn oniṣẹ ẹrọ ni ẹyọ itutu agbaiye rẹ nipa igbesẹ pataki yii.',
    },
    {
      id: 50,
      title:
        'Mo ti pari ayẹwo ni aṣeyọri ṣugbọn ko le rii awọn ohun kan ninu dasibodu naa. Kí nìdí?',
      role: [ERoles.OPERATOR],
      text: 'Agbejade yii jẹ olurannileti fun ọ lati sọ fun ohun elo naa nipa iwọn otutu ti o ṣeto deede ti yara itutu agbaiye ti ko ba si awọn sensọ wa ni aye (tabi ti wọn ko ba ṣiṣẹ daradara). O yẹ ki o ṣayẹwo boya iye itọkasi ni igarun jẹ kanna bi eyi ti o le ka ninu igbimọ iṣakoso ninu yara naa. Ti eyi ko ba jẹ ọran, o yẹ ki o ṣe imudojuiwọn iwọn otutu. Bibẹẹkọ, o le jẹrisi ati tẹsiwaju pẹlu ayẹwo wọle. Nini iwọn otutu ṣeto imudojuiwọn jẹ pataki pupọ fun awoṣe ti o ṣe iṣiro akoko lati gbe soke lati jẹ deede.',
    },
    {
      id: 51,
      title: 'Mo ti pari iṣayẹwo jade ṣugbọn tun le rii awọn ohun kan ninu dasibodu naa. Kí nìdí?',
      role: [ERoles.OPERATOR],
      text: 'Dasibodu le gba iṣẹju diẹ lati ṣe imudojuiwọn. Paapaa jọwọ rii daju pe awọn ohun ti o ṣayẹwo-jade ni awọn ti o pe, ati pe o n wa ni ẹyọ itutu agbaiye to pe. Ti o ba n ṣakiyesi ọran naa, jọwọ jabo si app@yourvcca.org.',
    },
    {
      id: 52,
      title: 'Bawo ni MO ṣe le ṣayẹwo pe sensọ iwọn otutu n ṣiṣẹ daradara?',
      role: [ERoles.OPERATOR],
      text: 'Ẹgbẹ ti n ṣe agbekalẹ ohun elo naa n gba diẹ ninu alaye ipilẹ nipa awọn olumulo itutu agbaiye nigbati wọn kọkọ bẹrẹ lilo yara naa gẹgẹbi data ipilẹ ti yoo ṣe afiwe pẹlu data ti o gba nipasẹ ohun elo naa. Ipinnu nikan ni lati ni ilọsiwaju apẹrẹ app ati lilo yara tutu.',
    },
    {
      id: 53,
      title: 'Mo gba ifitonileti kan pe sensọ ko ṣiṣẹ. Kini o yẹ ki n ṣe?',
      role: [ERoles.OPERATOR],
      text: 'A yoo beere lọwọ rẹ lati kan si olumulo itutu agbaiye ti o ti ṣayẹwo diẹ ninu awọn ọja lati inu yara laipẹ ki o beere nipa ibo ati idiyele wo ni wọn ti ta ohun kan ti o fipamọ sinu yara naa. Alaye yii yoo ṣe iranlọwọ fun ẹgbẹ ti o dagbasoke app lati fọwọsi ati ilọsiwaju deede ti awọn asọtẹlẹ idiyele ọja ti a pese.',
    },
    {
      id: 54,
      title: 'Bawo ni a ṣe le ṣe iṣiro akoko lati gbe soke ti ko ba si awọn sensọ?',
      role: [ERoles.EMPLOYEE],
      text: 'Rii daju lati ṣayẹwo ikẹkọ ati apakan FAQ, bi wọn ṣe ni alaye to wulo nipa ohun elo naa eyiti o le ṣe iranlọwọ lati ṣalaye awọn ibeere rẹ. Ti o ba fẹ lati kan si ẹgbẹ atilẹyin app, jọwọ fi imeeli ranṣẹ si app@yourvcca.org.',
    },
    {
      id: 55,
      title: 'Ni gbogbo igba ti Mo bẹrẹ iṣayẹwo, Mo gba igarun gbigbọn iwọn otutu kan. Kí nìdí?',
      role: [ERoles.OPERATOR],
      text: 'Rii daju lati ṣayẹwo ikẹkọ ati apakan FAQ, bi wọn ṣe ni alaye to wulo nipa ohun elo naa eyiti o le ṣe iranlọwọ lati ṣalaye awọn ibeere rẹ. Ti ibeere rẹ ko ba ni idahun, jọwọ kan si oṣiṣẹ ti o forukọsilẹ ti o n ṣe ijabọ si.',
    },
    {
      id: 56,
      title: 'Ni gbogbo igba ti Mo pari ayẹwo-jade, Mo gba igarun gbigbọn otutu kan. Kí nìdí?',
      role: [ERoles.EMPLOYEE],
      text: 'Jọwọ rii daju pe o ni titun ti ikede ti awọn app sori ẹrọ. Ti iṣoro naa ba wa, jọwọ sọ fun ẹgbẹ atilẹyin app nipa fifi imeeli ranṣẹ si app@yourvcca.org tabi nipa kikun fọọmu esi: https://forms.gle/ceohKHT2QCCE3rFs5.',
    },
    {
      id: 57,
      title:
        'Kini idi ti MO nilo lati beere lọwọ olumulo itutu agbaiye lati kun iwe ibeere ṣaaju ki o to le ṣayẹwo ni apoti akọkọ?',
      role: [ERoles.OPERATOR],
      text: 'Jọwọ rii daju pe o ni titun ti ikede ti awọn app sori ẹrọ. Ti iṣoro naa ba wa, jọwọ kan si oṣiṣẹ ti o forukọsilẹ ti o n ṣe ijabọ si ati/tabi sọ fun ẹgbẹ atilẹyin app nipa fifi imeeli ranṣẹ si app@yourvcca.org tabi nipa kikun fọọmu esi: https://forms.gle/2gKVzZjkJSPqEAan9 .',
    },
    {
      id: 58,
      title: 'Kini idi ti MO nilo lati kun iwe ibeere kan nigbati MO forukọsilẹ lori ohun elo naa?',
      role: [ERoles.EMPLOYEE],
      text: 'Ẹgbẹ atilẹyin ohun elo yoo nifẹ lati gbọ nipa iriri rẹ nipa lilo ohun elo yii ati gba esi rẹ, jọwọ fi imeeli ranṣẹ si app@yourvcca.org tabi fi esi rẹ silẹ nipasẹ fọọmu naa: https://forms.gle/ceohKHT2QCcE3rFs5 .',
    },
    {
      id: 60,
      title:
        'Kini idi ti MO nilo lati beere lọwọ awọn olumulo itutu agbaiye nipa idiyele tita ti nkan ipamọ kọọkan?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ni taabu yii, o le wo awọn asọtẹlẹ idiyele ọja boya ni idite tabi ni ọna kika tabili kan. Oju-iwe Iṣowo Iye laaye fun wiwo oṣu to kẹhin ti data ati asọtẹlẹ ọjọ-ọjọ 14 fun ọja kan pato ati ọja (ni India) tabi asọtẹlẹ oṣooṣu fun ipinlẹ kan (ni Nigeria). Oju-iwe Iye idiyele ngbanilaaye lati wo gbogbo awọn asọtẹlẹ idiyele ọja ti a paṣẹ lati ga julọ si asuwon ti, ati pẹlu iṣeeṣe lati ṣe àlẹmọ nipasẹ ọjọ, ipinlẹ, agbegbe ati ọja (ni India).',
    },
    {
      id: 61,
      title: 'Emi ko loye awọn apakan ti app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Rii daju lati ṣayẹwo ikẹkọ ati apakan FAQ, bi wọn ṣe ni alaye to wulo nipa ohun elo naa eyiti o le ṣe iranlọwọ lati ṣalaye awọn ibeere rẹ. Ti o ba fẹ lati kan si pẹlu ẹgbẹ atilẹyin app, jọwọ fi imeeli ranṣẹ si app@yourvcca.org.',
    },
    {
      id: 62,
      title: 'Emi ko loye awọn apakan ti app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Awoṣe ikẹkọ ẹrọ jẹ ikẹkọ lori data idiyele ọja itan ati awọn data miiran gẹgẹbi iwọn iyipada owo ati idiyele epo, lati ṣe awọn asọtẹlẹ ti awọn idiyele ọja iwaju.',
    },
    {
      id: 66,
      title: 'Emi ko loye awọn apakan ti app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.COOLING_USER],
      text: 'le fo awọn ibeere iwadi nipa titẹ "Pari nigbamii". Iwọ yoo wa iwadi naa gẹgẹbi apakan ti Awọn alaye Account rẹ ati pe o le pari nigbakugba. Sibẹsibẹ, A ṣe iṣeduro lati gba akoko lati dahun awọn ibeere iwadi daradara nigbati o bẹrẹ lilo yara naa: ni ọna yii o le ni iriri ti o ni ibamu pẹlu ohun elo Coldtivate!',
    },
    {
      id: 67,
      title: 'Mo ri kokoro kan ninu app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.COOLING_USER],
      text: 'Jọwọ rii daju pe o ni titun ti ikede ti awọn app sori ẹrọ. Ti iṣoro naa ba wa, jọwọ sọ fun ẹgbẹ atilẹyin app nipa fifi imeeli ranṣẹ si app@yourvcca.org tabi nipa kikun fọọmu esi: https://forms.gle/ceohKHT2QCCE3rFs5.',
    },
    {
      id: 68,
      title: 'Nkankan ko ṣiṣẹ daradara ni app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.OPERATOR],
      text: 'Ti awọn sensọ iwọn otutu ba wa ninu yara ti o le sopọ si ohun elo Coldtivate, jọwọ ṣe ibasọrọ pẹlu oniduro rẹ. Olumulo nikan ti o ni ipa oṣiṣẹ ti o forukọsilẹ le so awọn sensosi pọ si awọn ẹya itutu agbaiye ti a ṣẹda ni Coldtivate.',
    },
    {
      id: 69,
      title: 'Nkankan ko ṣiṣẹ daradara ni app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.COOLING_USER],
      text: 'Jọwọ rii daju pe o ni titun ti ikede ti awọn app sori ẹrọ. Ti iṣoro naa ba wa, jọwọ kan si oniṣẹ ẹrọ ti yara tutu ati / tabi sọ fun ẹgbẹ atilẹyin app nipa fifiranṣẹ imeeli si app@yourvcca.org.',
    },
    {
      id: 70,
      title: 'Mo fẹ lati pese esi nipa iriri mi pẹlu app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.COOLING_USER],
      text: 'Akoko lati gbe soke jẹ iye asọtẹlẹ. Nitorinaa, awọn ọran ti o ṣọwọn le waye, nibiti awọn ọja ti bajẹ nigba ti akoko lati gbe soke tobi ju 0. Bi ibajẹ didara ti awọn eso titun ṣe da lori iwọn otutu, data iwọn otutu ṣe iranlọwọ fun asọtẹlẹ lati jẹ deede. Fun apẹẹrẹ, ọrọ naa le dide nigbati ko si awọn sensọ iwọn otutu ti o sopọ mọ app naa, ati pe oniṣẹ ẹrọ ko ṣe imudojuiwọn iwọn otutu ti yara nigbagbogbo ninu app naa. Jọwọ sọ fun oniṣẹ ẹrọ ti yara naa ti eyi ba ṣẹlẹ.',
    },
    {
      id: 71,
      title: 'Mo fẹ lati pese esi nipa iriri mi pẹlu app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.COOLING_USER],
      text: 'Ẹgbẹ ti n ṣe agbekalẹ ohun elo naa n gba diẹ ninu alaye ipilẹ nipa awọn olumulo itutu agbaiye nigbati wọn kọkọ bẹrẹ lilo yara naa gẹgẹbi data ipilẹ ti yoo ṣe afiwe pẹlu data ti o gba nipasẹ ohun elo naa. Ipinnu nikan ni lati ni ilọsiwaju apẹrẹ app ati lilo yara tutu.',
    },
    {
      id: 73,
      title: 'Mo fẹ lati pese esi nipa iriri mi pẹlu app naa. Tani o yẹ ki n kan si?',
      role: [ERoles.COOLING_USER],
      text: 'Rii daju lati ṣayẹwo ikẹkọ ati apakan FAQ, bi wọn ṣe ni alaye to wulo nipa ohun elo naa eyiti o le ṣe iranlọwọ lati ṣalaye awọn ibeere rẹ. Ti ibeere rẹ ko ba ni idahun, jọwọ kan si oniṣẹ ẹrọ ti yara tutu, tabi kọ si app@yourvcca.org',
    },
    {
      id: 74,
      title: 'Mo wa ni agbegbe nibiti asopọ intanẹẹti kekere wa: Njẹ MO tun le lo app naa?',
      role: [ERoles.COOLING_USER],
      text: 'Jọwọ rii daju pe o ni titun ti ikede ti awọn app sori ẹrọ. Ti iṣoro naa ba wa, jọwọ kan si oniṣẹ ẹrọ ti yara tutu ati/tabi sọ fun ẹgbẹ atilẹyin app nipa fifi imeeli ranṣẹ si app@yourvcca.org.',
    },
    {
      id: 75,
      title: "Awọn idiyele wo ni o han nigbati o ba tẹ aami 'Awọn idiyele Irugbin'?",
      role: [ERoles.EMPLOYEE],
      text: 'Lati pa akọọlẹ rẹ rẹ o le lọ kiri si "Akojọ aṣyn" -> "Awọn alaye akọọlẹ", ki o tẹ Paarẹ. Jọwọ ṣọra, iṣe yii ko le yipada! Ti o ba jẹ Oṣiṣẹ Iforukọsilẹ ti ile-iṣẹ ikẹhin, iṣe yii yoo pa ile-iṣẹ naa rẹ. Ti o ba ti wa ni isunmọtosi ni checkins, o yoo ko ni anfani lati pa àkọọlẹ rẹ titi gbogbo awọn crates ti a ti ṣayẹwo-jade ni awọn app nipa ọkan ninu awọn oniṣẹ rẹ.',
    },
    {
      id: 76,
      title: "Kilode ti diẹ ninu awọn ipinlẹ ati awọn ọja sonu ni apakan 'Awọn idiyele Irugbin'?",
      role: [ERoles.OPERATOR],
      text: 'Lati pa akọọlẹ rẹ rẹ o le lọ kiri si "Akojọ aṣyn" -> "Awọn alaye akọọlẹ", ki o tẹ Paarẹ. Jọwọ ṣọra, iṣe yii ko le yipada! Ti o ba jẹ oniṣẹ ti o kẹhin ti a yàn si ọkan ninu awọn yara ti o wa ni ṣiṣi ayẹwo, iwọ ko le pa akọọlẹ rẹ rẹ titi ti oṣiṣẹ ti o forukọ silẹ yoo fi oniṣẹ ẹrọ miiran si yara naa, tabi gbogbo awọn apoti ti a ti ṣayẹwo-jade ninu ohun elo naa.',
    },
    {
      id: 77,
      title: 'Bawo ni awọn idiyele ọja iwaju ṣe iṣiro?',
      role: [ERoles.COOLING_USER],
      text: 'Lati pa akọọlẹ rẹ rẹ o le lọ kiri si "Akojọ aṣyn" -> "Awọn alaye akọọlẹ", ki o tẹ Paarẹ. Jọwọ ṣọra, iṣe yii ko le yipada! Ti o ba ni awọn ayẹwo-ṣii ni eyikeyi ninu awọn yara, o ko le pa akọọlẹ rẹ rẹ titi gbogbo awọn apoti ti wa ni ṣayẹwo-jade lati awọn yara naa. Jọwọ rii daju pe o gba awọn apoti rẹ ninu yara naa! Ti o ba ro pe awọn apoti isunmọ wa ninu app ti o ti yọkuro tẹlẹ, jọwọ kan si oniṣẹ ẹrọ yara naa lati yanju rẹ.',
    },
    {
      id: 78,
      title: 'Emi yoo fẹ lati pa akọọlẹ mi rẹ. Kini o yẹ ki n ṣe?',
      role: [ERoles.EMPLOYEE],
      text: 'O le paarẹ awọn ẹya itutu agbaiye ati awọn ipo nipa lilọ si "Akojọ aṣyn" -> "Iṣakoso" -> "Awọn itutu Itutu" / "Awọn ipo" ati titẹ Parẹ. Iwọ yoo ni anfani lati ṣe bẹ nikan ti ko ba si awọn ayẹwo-iduro ni isunmọtosi ninu awọn yara naa. Bibẹẹkọ, jọwọ kan si awọn oniṣẹ lati pari awọn ayẹwo ṣaaju ki o to gbiyanju lati pa awọn yara ati awọn ipo rẹ.',
    },
    {
      id: 79,
      title: 'Emi yoo fẹ lati pa akọọlẹ mi rẹ. Kini o yẹ ki n ṣe?',
      role: [ERoles.EMPLOYEE],
      text: 'ko gba ọ laaye lati pa awọn olumulo miiran rẹ lati app naa. Sibẹsibẹ, o le ya awọn oniṣẹ lati awọn yara rẹ nipa lilọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Awọn oniṣẹ". Ti o ba tun fẹ lati yọ olumulo kuro ki wọn ko ni iwọle si ile-iṣẹ rẹ, jọwọ kọ imeeli si app@yourvcca.org ki o ṣalaye idi ti eyi fi nilo.',
    },
    {
      id: 80,
      title: 'Emi yoo fẹ lati pa akọọlẹ mi rẹ. Kini o yẹ ki n ṣe?',
      role: [ERoles.OPERATOR],
      text: 'Lati pa olumulo itutu rẹ kuro ninu atokọ naa, lilö kiri si "Iṣakoso" -> "Awọn olumulo itutu", tẹ orukọ olumulo itutu agbaiye ati lẹhinna bọtini "Paarẹ". Jọwọ ṣakiyesi pe awọn olumulo nikan ti ko si awọn iṣayẹwo isunmọ le jẹ paarẹ! Ti o ba wa ni isunmọtosi awọn ayẹwo, jọwọ kan si olumulo lati gbe awọn ọja. Ṣe akiyesi pe igbese yii ko le yipada! Ti olumulo ba ni foonuiyara kan, iṣẹ ṣiṣe yii yoo yọ ọ / rẹ kuro ninu atokọ rẹ, ṣugbọn olumulo yoo tun ni anfani lati lo Coldtivate. Ti olumulo ko ba ni foonuiyara, isẹ yii npa akọọlẹ / akọọlẹ rẹ kuro ki o si sọ nọmba foonu ti o somọ ọfẹ.',
    },
    {
      id: 81,
      title: 'Bawo ni MO ṣe le paarẹ ẹyọ itutu agbaiye tabi ipo kan?',
      role: [ERoles.EMPLOYEE],
      text: 'Lati ṣayẹwo akoko ikẹhin ti awọn oniṣẹ ati awọn oṣiṣẹ ti o forukọsilẹ ti wọle sinu app, o le lọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Oṣiṣẹ" / "Oṣiṣẹ Iforukọsilẹ". Ọjọ ati akoko ti o rii lẹgbẹẹ orukọ jẹ ọjọ iwọle ati akoko ti o kẹhin.',
    },
    {
      id: 82,
      title: 'Bawo ni MO ṣe le paarẹ oṣiṣẹ miiran ti o forukọsilẹ tabi oniṣẹ ẹrọ lati ile-iṣẹ mi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'ko gba ọ laaye lati pa awọn olumulo miiran rẹ lati app naa. Sibẹsibẹ, o le ya awọn oniṣẹ lati awọn yara rẹ nipa lilọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Awọn oniṣẹ". Ti o ba tun fẹ lati yọ olumulo kuro ki wọn ko ni iwọle si ile-iṣẹ rẹ, jọwọ kọ imeeli si app@yourvcca.org ki o ṣalaye idi ti eyi fi nilo.',
    },
    {
      id: 83,
      title: 'Bawo ni MO ṣe le paarẹ olumulo itutu agbaiye lati atokọ naa?',
      role: [ERoles.COOLING_USER],
      text: 'Nipa tite lori ohun kan ninu dasibodu, o le wo orukọ ati nọmba olubasọrọ ti oniṣẹ ti o ṣe ayẹwo fun ọ. O le da nọmba naa kọ si agekuru agekuru ki o kan si oniṣẹ ẹrọ nipasẹ foonu tabi SMS.',
    },
    {
      id: 84,
      title: 'Nibo ni MO le ṣe atẹle boya awọn oniṣẹ ti lo app laipẹ?',
      role: [ERoles.COOLING_USER],
      text: 'Lati ṣayẹwo akoko ikẹhin ti awọn oniṣẹ ati awọn oṣiṣẹ ti o forukọsilẹ ti wọle sinu app, o le lọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Oṣiṣẹ" / "Oṣiṣẹ Iforukọsilẹ". Ọjọ ati akoko ti o rii lẹgbẹẹ orukọ jẹ ọjọ iwọle ati akoko ti o kẹhin.',
    },
    {
      id: 85,
      title:
        'Nibo ni MO le ṣe atẹle owo-wiwọle ti ipilẹṣẹ nipasẹ yara kọọkan ati awọn iṣiro lilo miiran?',
      role: [ERoles.COOLING_USER],
      text: 'le lọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Onínọmbà Wiwọle", yan awọn itutu agbaiye ati aarin akoko ti iwulo, ati pe iwọ yoo rii lapapọ owo ti n wọle ni nkan ṣe pẹlu ayẹwo jade lati awọn yara wọnyi. O tun le ṣe àlẹmọ nipasẹ olumulo itutu agbaiye, ọna isanwo, ati akoko. Lati wo awọn iṣiro akopọ ti awọn ayẹwo-iwọle rẹ fun yara kan (gẹgẹbi nọmba awọn olumulo, apapọ nọmba awọn apoti, ati bẹbẹ lọ), o le lọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Itupalẹ Lilo". Paapaa nibi o le ṣe àlẹmọ nipasẹ ọjọ ati ẹyọ itutu agbaiye. Ni awọn oju-iwe mejeeji, alaye le ṣe igbasilẹ bi awọn faili Excel. Ninu taabu "Analyis", o le wa diẹ sii dasibodu pẹlu alaye nipa awọn olumulo, owo ti n wọle, ilo, ati ipa. Lakotan, lati ṣe atẹle apapọ nọmba awọn apoti, iwuwo, ati awọn iwọn otutu to dara julọ fun awọn irugbin lọwọlọwọ ninu yara, o le lọ kiri si "Die" -> "Awọn ẹya itutu agbaiye" -> " Alaye Crates".',
    },
    {
      id: 86,
      title:
        'Bawo ni MO ṣe le rii tani ẹni olubasọrọ fun ẹyọ itutu agbaiye nibiti a ti fipamọ awọn ọja mi?',
      role: [ERoles.OPERATOR],
      text: 'Ẹgbẹ atilẹyin ohun elo yoo nifẹ lati gbọ nipa iriri rẹ nipa lilo ohun elo yii ati gba esi rẹ, jọwọ fi imeeli ranṣẹ si app@yourvcca.org tabi fi esi rẹ silẹ nipasẹ fọọmu naa: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 87,
      title: 'Mo ti gba iwifunni kan. Kini o yẹ ki n ṣe?',
      role: [ERoles.COOLING_USER],
      text: 'Ẹgbẹ atilẹyin ohun elo yoo nifẹ lati gbọ nipa iriri rẹ nipa lilo ìṣàfilọlẹ yii ati gba esi rẹ, jọwọ fi imeeli ranṣẹ si app@yourvcca.org.',
    },
    {
      id: 88,
      title: 'Kini o han lori maapu ti awọn ẹya itutu agbaiye?',
      role: [ERoles.COOLING_USER],
      text: 'Lori maapu naa o le wo ipo rẹ (o yoo beere fun igbanilaaye fun Coldtivate lati wọle si ipo rẹ), ipo ti awọn ẹya itutu agbaiye ni ayika rẹ, ati alaye diẹ nipa awọn ẹya (ẹyọkan tabi multicommodity, ile-iṣẹ, idiyele). Nipa lilọ si yara tutu, o le gba alaye diẹ sii lati ọdọ oniṣẹ yara tutu lori iṣẹ ti ẹyọkan ati aye fun ibi ipamọ.',
    },
    {
      id: 89,
      title: 'Bawo ni MO ṣe le yi ede app naa pada?',
      role: [ERoles.AUTH],
      text: 'Lati yi ede app naa pada, o le tẹ lori sisọ silẹ ti o rii ni isalẹ oju-iwe akọọkan, tabi, ni kete ti o ba wọle si profaili rẹ, lọ kiri si "Akojọ aṣyn" -> "Awọn alaye akọọlẹ" -> "Awọn ayanfẹ agbegbe".',
    },
    {
      id: 90,
      title:
        'Iru sensọ otutu mi ni atilẹyin nipasẹ Coldtivate (Ecozen, UbiBot, Figorr, Victron Energy). Bawo ni MO ṣe le ṣeto awọn sensọ?',
      role: [ERoles.EMPLOYEE],
      text: 'Lati le so sensọ kan pọ si ẹyọ itutu agbaiye, o le lọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Awọn ẹya Itutu", yan ẹyọ ti o yẹ ki sensọ ṣeto, lẹhinna yi "Sensor wa". O le tẹle itọnisọna fun iru sensọ atilẹyin kọọkan ati jẹrisi. Ranti lati aago "Fipamọ" ni isalẹ ti oju-iwe fun awọn ayipada lati wa ni fipamọ. O yẹ ki o wo awọn kika iwọn otutu lati awọn sensọ rẹ ni awọn wakati 6 to nbọ labẹ "Die sii" -> "Awọn ẹya itutu agbaiye" -> "Awọn ipo yara".',
    },
    {
      id: 91,
      title: "Kini iyatọ laarin 'Ile-iṣẹ', 'Akopọ', ati wiwo 'Ifiwera' ni taabu Awọn atupale?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Awọn atupale taabu ninu ọpa lilọ pese awọn iṣiro akojọpọ fun gbogbo awọn yara tutu ti ile-iṣẹ. Ni wiwo "Ile-iṣẹ", o rii data kan lori awọn olumulo, lilo, ati ipa fun gbogbo awọn ẹya itutu agbaiye lati igba ti o bẹrẹ lilo Coldtivate. Nipa tite lori "Akopọ", o ti ṣetan lati tunto iru awọn ẹya itutu agbaiye ati akoko akoko ti o nifẹ si. Awọn data ti o han fun awọn olumulo, lilo, ati ipa ti ṣajọpọ kọja awọn ẹya itutu agbaiye ti o yan ni akoko akoko ti o yan. Ti o ba fẹ lati ṣe afiwe kọja awọn ẹya, o le lo taabu "Comparison". Nibi, data ti han ni awọn tabili, nibiti data lati inu ẹyọkan itutu agbaiye kọọkan ni akoko akoko ti o yan ti pin. O le to awọn data ki o si yi awọn itutu sipo ati akoko akoko nigbakugba.',
    },
    {
      id: 92,
      title: 'Bawo ni data ti o han ninu taabu Awọn atupale ṣe iṣiro?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ibi-afẹde ti taabu Awọn atupale ni lati funni ni wiwo okeerẹ ti ohun ti n ṣẹlẹ ni awọn yara tutu. Olumulo ati data iṣamulo jẹ iṣiro lati inu ayẹwo ati ṣayẹwo-jade alaye ti o gbasilẹ ni Coldtivate. O le ni oye iye awọn olumulo ati awọn iṣẹ ṣiṣe, ati kini owo-wiwọle tabi ibugbe apapọ ti yara tutu kọọkan. Awọn data ti apakan ikolu, ni apa keji, da lori awọn iwadi ti awọn olumulo itutu agbaiye ni a beere lati kun nigbati wọn ba forukọsilẹ (ie ṣaaju ki wọn to bẹrẹ lilo ibi ipamọ tutu) ati nigbagbogbo bi wọn ṣe ṣayẹwo jade lati inu yara tutu. Data yii ṣe pataki lati ṣe iṣiro itankalẹ ti ipadanu ikore ati owo-wiwọle awọn olumulo bi wọn ṣe nlo itutu agbaiye. Nikẹhin, idiyele CO2 ṣe afiwe itujade ti o ni nkan ṣe pẹlu itutu awọn irugbin ti a fipamọ sinu yara tutu pẹlu awọn itujade ti a sọ asọtẹlẹ irugbin kanna yoo ti fa nigba ti o fipamọ laisi firiji.',
    },
    {
      id: 93,
      title: 'Bawo ni data ti o han ninu taabu Awọn atupale ṣe iṣiro?',
      role: [ERoles.COOLING_USER],
      text: 'Ibi-afẹde ti taabu Awọn atupale ni lati fun ọ ni wiwo okeerẹ ti ipa ti itutu agbaiye lori awọn irugbin rẹ. Awọn data ti o han labẹ "Crates" jẹ iṣiro lati inu ayẹwo ati ṣayẹwo-jade alaye ti o gbasilẹ ni Coldtivate. O le nitorinaa iye ti o fipamọ iru irugbin na ati akoko ipamọ apapọ. Awọn data ti apakan "Ipact" da lori awọn iwadi ti o beere lọwọ rẹ lati kun nigbati wọn ba forukọsilẹ (ie ṣaaju ki o to bẹrẹ lilo ibi ipamọ tutu) ati nigbagbogbo bi o ṣe ṣayẹwo-jade lati inu yara tutu. Data yii ṣe pataki lati ṣe iṣiro itankalẹ ti ipadanu lẹhin ikore ati owo ti n wọle bi o ṣe nlo itutu agbaiye. Olurannileti lati kun awọn iwadi ni o han lori oke oju-iwe naa, ati pe a gba ọ niyanju lati kun wọn nigbakugba ti o ba ṣeeṣe. Ni apakan mejeeji, o le lo bọtini "Ṣiṣe atunto" ni apa ọtun oke lati yan awọn yara tutu kan pato tabi akoko akoko kan. Ti ko ba yan ohunkohun, o rii gbogbo data ti o wa lati igba ti o bẹrẹ lilo Coldtivate.',
    },
    {
      id: 94,
      title: 'Mo wọle ṣugbọn n ko le rii iṣẹ ṣiṣe ọja naa. Kí nìdí?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ti aaye ọja ba ni atilẹyin ni orilẹ-ede rẹ, iwọ yoo rii aami "Ibi ọja" ni ọpa lilọ kiri isalẹ. Ti o ko ba le rii, o tumọ si pe iṣẹ ṣiṣe ko ni atilẹyin ni orilẹ-ede rẹ. Ni akoko yii, ibi ọja nikan wa fun awọn olumulo ti o da ni Nigeria. Ti o ba jẹ Oṣiṣẹ Iforukọsilẹ ati pe o nifẹ lati ṣe awakọ ọkọ ofurufu ni orilẹ-ede rẹ, jọwọ kan si wa ni app@yourvcca.org.',
    },
    {
      id: 95,
      title: 'Kini ipa ti ile-iṣẹ itutu agbaiye ni ọjà?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ile-iṣẹ itutu agbaiye ati awọn oṣiṣẹ rẹ le pinnu ipele ilowosi wọn ni aaye ọjà. Bi iṣẹ ṣiṣe ṣe gbarale awọn apoti ti a ṣayẹwo ni ohun elo Coldtivate, ibi ọja le ṣiṣẹ nikan ti oniṣẹ yara tutu ba forukọsilẹ nigbagbogbo ati ṣayẹwo awọn iṣẹ ṣiṣe ninu ohun elo naa. Fun ọja ti o ra nipasẹ ibi ọja, ile-iṣẹ itutu agbaiye n gba owo itutu agbaiye gẹgẹbi apakan ti iṣowo oni-nọmba. Nitorinaa o ṣe pataki pe Oṣiṣẹ Iforukọsilẹ ṣeto awọn alaye akọọlẹ banki ile-iṣẹ naa: lati ṣe bẹ, o yẹ ki o lọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Eto Olutaja (Ile-iṣẹ)" -> "Awọn aṣayan isanwo". Ni afikun, awọn ile-iṣẹ itutu agbaiye le pinnu lati ra ọja lati ọdọ awọn agbe (ti nṣe ipa ti olura) ati lẹhinna tun ta awọn irugbin wọnyẹn ni ọjà (ti nṣe ipa ti olutaja). Mejeeji lẹkọ le ṣee ṣe nipasẹ Coldtivate ọjà. Ṣe akiyesi pe awọn oniṣẹ mejeeji ati Awọn oṣiṣẹ ti o forukọsilẹ ni aṣayan lati boya ra fun ara wọn (gẹgẹbi awọn ẹni kọọkan) tabi ni aṣoju ile-iṣẹ ti wọn ṣe aṣoju.',
    },
    {
      id: 96,
      title: 'Kini ipa ti oniṣẹ ẹrọ yara tutu ni ọjà?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Awọn oniṣẹ yara tutu ni ọjà ni awọn ipa akọkọ mẹta. 1) Wọn ṣe iranlọwọ fun awọn olumulo tutu laisi foonuiyara lati ṣeto akọọlẹ banki wọn (ki wọn le gba awọn sisanwo oni-nọmba), ṣe atokọ awọn apoti wọn "fun tita" ati idiyele wọn. 2) Wọn ṣe iduro fun titọju awọn ọja ni yara tutu ti a ṣeto ni atẹle ilana pe gbogbo awọn eso ti o wa ninu apoti jẹ ti olumulo kan: nigbati a ra awọn eso kan ninu apoti kan (ati nitorinaa jẹ ti oniwun miiran), oniṣẹ gba iwifunni lati gbe ọja ti o ra si apoti lọtọ. Ti o ba ti ra gbogbo apoti, ko si igbese ti a beere. 3) Awọn oniṣẹ yara tutu jẹ iduro fun gbogbo awọn iṣẹ ṣiṣe ayẹwo, pẹlu awọn abajade lati ibi ọja: nigbati olura kan (tabi aṣoju ifijiṣẹ) ba de yara tutu lati gbe ọja ti o ra, oniṣẹ yẹ ki o ṣayẹwo-jade apoti naa lati Coldtivate.',
    },
    {
      id: 97,
      title: 'Bawo ni a ṣe gba awọn idiyele itutu agbaiye ni ibi ọja?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Nigbati a ba ra awọn apoti ni ibi ọja, owo itutu agbaiye titi di ọjọ yẹn ni a yọkuro lati idiyele ti olura ti n san ati gbe lọ si ile-iṣẹ itutu agbaiye. Ni ọna yii, ẹniti o ta ọja naa ko ni lati yanju owo itutu agbaiye, bi eyi ti ṣe tẹlẹ ninu iṣowo oni-nọmba. Fun idi eyi, o ṣe pataki pe awọn olutaja ati awọn ile-iṣẹ itutu agbaiye ni akọọlẹ banki kan ti a ṣeto ni Coldtivate. Fun apẹẹrẹ, ti a ba ra apoti kan fun 20 USD, ati pe eniti o ta ọja naa jẹ 3 USD ti awọn idiyele itutu agbaiye, ninu 20 USD ti o san nipasẹ ẹniti o ra, 17 USD yoo gbe lọ si akọọlẹ banki ti eniti o ta, ati pe 3 USD yoo gbe lọ si akọọlẹ banki ti ile-iṣẹ itutu agbaiye. Ti eniti o ra ọja ba wa lati gbe ọja ni ọjọ kanna bi rira, ko si owo itutu agbaiye miiran ti o yẹ (nitori owo ojoojumọ ti san tẹlẹ nipasẹ ẹniti o ta ọja naa). Bibẹẹkọ, ti olura naa ba pinnu lati tọju ọja naa ni ibi ipamọ, idiyele itutu agbaiye boṣewa kan, ati pe idiyele naa yoo ṣe iṣiro da lori nọmba awọn ọjọ ti a fi eso naa sinu yara tutu titi ti olura yoo fi gbe e. Onišẹ yara tutu jẹ iduro fun gbigba awọn idiyele itutu agbaiye wọnyi ni ayẹwo-jade. Ṣe akiyesi pe ni ọran ti ifijiṣẹ, ọgbọn kanna kan.',
    },
    {
      id: 98,
      title: 'Bawo ni MO ṣe le bẹrẹ tita ọja ni ibi ọja?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Fun awọn apoti rẹ lati wa fun tita, o nilo lati ṣe awọn iṣe meji. 1) Ṣeto akọọlẹ banki kan, nibiti owo-wiwọle yoo wa ni idogo. Ti o ba ni foonuiyara kan, o le ṣe nipasẹ lilọ kiri si "Akojọ aṣyn" -> "Awọn alaye akọọlẹ" -> "Awọn aṣayan isanwo". Ti o ko ba ni foonuiyara kan, oniṣẹ le ṣeto awọn akọọlẹ banki lati inu wiwo rẹ ("Iṣakoso" -> "Awọn olumulo Itutu" -> "Awọn alaye isanwo". Jọwọ ṣe akiyesi pe bi gbogbo awọn sisanwo ti ṣe ni oni nọmba ni ibi ọja, o ni lati pese iwe ifowopamọ to wulo ṣaaju ki o to ṣe atokọ ohunkohun "fun tita". ohun kan dasibodu, lilö kiri si "Crate iwuwo ati atokọ ọja", ṣeto iru awọn apoti ti o fẹ lati ṣeto "fun tita" ati idiyele fun kg. Awọn onibara ni ibi ọja yoo ni anfani lati wo awọn apoti wọnyi, ati ra ni iye ti a fihan. Iwọ yoo gba iwifunni nigbakugba ti rira ba ti pari. Ti o ko ba ni foonuiyara, oniṣẹ ẹrọ yara tutu le ṣeto awọn apoti "fun tita" nigbati o ba ṣe ayẹwo, tabi lẹhin, tẹle awọn igbesẹ kanna. Iwọ yoo gba SMS kan ti oniṣẹ ba ṣe imudojuiwọn awọn apoti ti a ṣe akojọ rẹ tabi iye owo naa lẹhin igbasilẹ kan.',
    },
    {
      id: 99,
      title: 'Njẹ awọn ti onra le rii awọn alaye olubasọrọ mi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'O le pinnu funrararẹ boya awọn alabara ti o nifẹ si rira ọja rẹ yẹ ki o ni anfani lati wo awọn alaye olubasọrọ rẹ. Eyi le wulo ni ọran ti idunadura idiyele tabi awọn aṣẹ loorekoore fun awọn ọja ti ko tii fipamọ sinu yara tutu (ati nitorinaa ko han fun olura). O le ṣe imudojuiwọn awọn eto rẹ nigbakugba labẹ "Akojọ" -> "Awọn alaye akọọlẹ" -> "Pinpin awọn olubasọrọ".',
    },
    {
      id: 100,
      title: 'Emi yoo fẹ lati funni ni ẹdinwo si olura kan. Bawo ni MO ṣe le ṣe?',
      role: [ERoles.EMPLOYEE],
      text: 'Labẹ "Akojọ aṣyn" -> "Awọn alaye akọọlẹ" -> "Awọn kuponu ẹdinwo", o le ṣẹda awọn kuponu eyiti o ni koodu ati ẹdinwo ipin kan. Iwọnyi jẹ awọn kuponu ti o wulo fun awọn ọja ti o ta (gẹgẹbi ẹni kọọkan). Lati ṣeto awọn kuponu ti o wulo fun iṣelọpọ ti ile-iṣẹ, o le lọ kiri si "Akojọ aṣyn" -> "Iṣakoso" -> "Awọn kuponu ẹdinwo" labẹ "Eto Olutaja (Ile-iṣẹ)". O le pin koodu kupọọnu pẹlu alabara, ati pe o le ra koodu naa pada ni iboju isanwo. Awọn koodu kupọọnu wa wulo titi ti o fi fagilee wọn. Ti o ba fẹ lati funni ni ẹdinwo si gbogbo awọn olura ti o ni agbara, o le dinku idiyele tita ti o han ni ibi ọja.',
    },
    {
      id: 101,
      title: 'Emi yoo fẹ lati funni ni ẹdinwo si olura kan. Bawo ni MO ṣe le ṣe?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Labẹ "Akojọ aṣyn" -> "Awọn alaye akọọlẹ" -> "Awọn kuponu ẹdinwo", o le ṣẹda awọn kuponu eyiti o ni koodu ati ẹdinwo ipin kan. O le pin koodu kupọọnu pẹlu alabara, ati pe o le ra koodu naa pada ni iboju isanwo. Awọn koodu kupọọnu wa wulo titi ti o fi fagilee wọn. Ti o ba fẹ lati funni ni ẹdinwo si gbogbo awọn olura ti o ni agbara, o le dinku idiyele tita ti o han ni ibi ọja.',
    },
    {
      id: 102,
      title: 'Bawo ni awọn oniṣẹ yara tutu ṣe le ṣe iranlọwọ fun mi lati ṣe iṣowo awọn irugbin mi?',
      role: [ERoles.COOLING_USER],
      text: 'Awọn oniṣẹ yara tutu jẹ aaye olubasọrọ rẹ fun ohunkohun ti o ni ibatan si titoju awọn ọja ni awọn yara tutu, ati pe o tun le ṣe iranlọwọ fun ọ lati ta ọja rẹ paapaa ti o ko ba ni iwọle si foonuiyara kan. Lati wiwo wọn, wọn le ṣeto awọn alaye akọọlẹ banki rẹ, nibiti iwọ yoo gba awọn owo ti n wọle lati tita ọja. Ni ibi-iwọle, wọn le ṣe iranlọwọ fun ọ lati ṣe atokọ awọn apoti "fun tita", eyiti o jẹ ki wọn han ni ibi ọja, ati ṣeto idiyele tita (fun kg kan) fun ọja kọọkan. Ti o ba yi ọkan rẹ pada, o le beere nigbagbogbo lati ṣafikun tabi yọ awọn apoti kuro ni ibi ọja nipasẹ kikojọ tabi piparẹ wọn bi "fun tita". Ni diẹ ninu awọn yara tutu, awọn oniṣẹ tabi awọn alabaṣiṣẹpọ tun jẹ iduro fun rira ọja taara lati ọdọ awọn agbe, ati tita si awọn alatuta. Boya o jẹ agbẹ tabi oluṣowo ti o nifẹ si aṣayan yii, tabi alagbata ti o nifẹ si rira ni olopobobo lati yara tutu, jọwọ kan si ile-iṣẹ itutu agbaiye lati ṣawari aye yii.',
    },
    {
      id: 103,
      title: "Kini aṣayan 'Ra ni aṣoju ile-iṣẹ' ti Mo rii ni aaye ọjà?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Awọn oniṣẹ ati Awọn oṣiṣẹ ti o forukọsilẹ le ta ati ra ọja ni ibi ọja boya fun ara wọn, gẹgẹbi awọn ẹni-kọọkan, tabi ni aṣoju ile-iṣẹ ti wọn ṣe aṣoju. Aṣayan yii ngbanilaaye gbogbo awọn iṣowo lati ṣiṣẹ lati ati si akọọlẹ banki ti ile-iṣẹ, kii ṣe nipasẹ awọn akọọlẹ banki kọọkan. Nigbati oniṣẹ tabi Oṣiṣẹ Iforukọsilẹ rira ọja "fun ile-iṣẹ kan", ile-iṣẹ naa san iye ti o yẹ fun ẹniti o ta ọja naa, o si di oniwun awọn apoti naa. Ti a ba ṣe akojọ awọn apoti wọnyẹn fun tita ni aaye ọja, wọn han bi ohun ini nipasẹ ile-iṣẹ itutu agbaiye, ati pe owo tita naa ni a fi ranṣẹ si akọọlẹ banki ile-iṣẹ naa. Nigbati oniṣẹ tabi oṣiṣẹ ti o forukọsilẹ ba ra ọja fun ara wọn, wọn yoo san iye ti o yẹ fun eniti o ta ọja naa lati awọn alaye akọọlẹ banki ti ara ẹni ti a pese ati di oniwun awọn apoti tikalararẹ. Ti wọn ba wa ni ipamọ ni ẹyọ itutu agbaiye, wọn yoo wa ni atokọ labẹ Oṣiṣẹ tabi Orukọ Awọn oṣiṣẹ ti o forukọsilẹ ati pe ti wọn ba ṣe atokọ fun tita lori aaye ọjà, wọn yoo han bi ohun ini nipasẹ oniṣẹ tabi Oṣiṣẹ Iforukọsilẹ pẹlu.',
    },
    {
      id: 104,
      title: 'Kini awọn idiyele ti o han ni ọjà?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Iye owo tita ọja kọọkan ti o han ni ibi ọja jẹ ṣeto taara nipasẹ ẹniti o ta ọja ati da lori iye kg ti o ra. Lori oke ti iye yẹn, ibi ọja naa pẹlu awọn idiyele meji: ọya Ibi ọja jẹ ọya idunadura 3.5% ti a gba nipasẹ ẹgbẹ Coldtivate lati gbalejo ati ṣetọju iṣẹ ṣiṣe ohun elo. Owo sisan ni owo ti eto isanwo oni-nọmba (PayStack ni Nigeria) n gba agbara lati ṣe ilana iṣowo naa.',
    },
    {
      id: 105,
      title:
        'Mo jẹ oluraja ti o nifẹ si rira ọja lati awọn yara tutu, ṣugbọn Emi ko rii ohunkohun ni ọjà. Kí nìdí?',
      role: [ERoles.COOLING_USER],
      text: 'Ti o ba lọ kiri si taabu Ibi Ọja ṣugbọn ko lagbara lati rii eyikeyi iṣelọpọ, eyi le jẹ nitori awọn asẹ ti o ti lo si wiwa (bii ipo, ibiti idiyele, tabi irugbin anfani), tabi o le jẹ nitori ko si ohun kan wa fun tita ni agbegbe rẹ. Ni ọran ti o ba mọ ti yara tutu ti o wa nitosi, a ṣeduro bibeere oniṣẹ yara tutu boya eyikeyi olumulo itutu agbaiye nifẹ lati ta ọja nipasẹ iṣẹ ṣiṣe ọja ati beere fun awọn nkan yẹn lati ṣe atokọ ni app naa.',
    },
    {
      id: 106,
      title: 'Ṣe o nfun awọn iṣẹ ifijiṣẹ bi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ibi ọja naa ko funni ni awọn iṣẹ ifijiṣẹ ni aaye yii, ṣugbọn ṣe irọrun asopọ pẹlu awọn solusan eekaderi ti o le fi ọja ranṣẹ si awọn ti onra. Gẹgẹbi Oṣiṣẹ Iforukọsilẹ, o ni aṣayan lati ṣafikun awọn olubasọrọ ifijiṣẹ labẹ "Akojọ aṣyn" -> "Iṣakoso" -> "Eto Olutaja (Ile-iṣẹ)" -> "Awọn olubasọrọ Ifijiṣẹ". Wọn ṣe afihan si gbogbo awọn ti onra ti n ra ọja lati awọn yara tutu rẹ ni sisanwo. Ti o ba jẹ oluraja, o gba ọ niyanju lati kan si wọn lati ṣeto ifijiṣẹ rẹ. Jọwọ ṣe akiyesi pe ti a ba mu ọja naa ni ọjọ kanna bi rira, ko si owo itutu agbaiye kan, ṣugbọn ti o ba tọju awọn irugbin ni ibi ipamọ, owo itutu agbaiye ojoojumọ jẹ nitori. Rii daju lati jiroro eyi pẹlu olubasọrọ ifijiṣẹ ti o n ṣe idunadura pẹlu.',
    },
    {
      id: 107,
      title:
        "Mo gba ifitonileti kan ninu ohun elo naa ti o sọ pe 'Ṣejade nilo lati tun pin kaakiri'. Kini ni yen?",
      role: [ERoles.OPERATOR],
      text: 'Nitori ilana ayẹwo ni yara tutu, akoonu ti apoti kan jẹ ti agbẹ kan tabi oniṣowo. Bi, ni ọjà, olura le ra diẹ ninu awọn kg lati inu apoti ti o jẹ ti olutaja, iye ti o ra yẹ ki o gbe lọ si apoti ti o yatọ. Ifitonileti yii sọ fun ọ pe rira kan ti pari, ati nipa tite lori rẹ o le foju inu wo inu apoti wo ni o yẹ ki o mu ọja naa. Titọju awọn apoti ti a ṣeto jẹ pataki lati rii daju pe a ko ṣayẹwo awọn irugbin nipasẹ aṣiṣe, ati pe awọn idiyele itutu agbaiye ni a gba ni deede. A ṣeduro lilo iṣẹ "Crate ID" ni ibi-iṣayẹwo lati taagi si awọn apoti ni Coldtivate pẹlu awọn apoti ti ara ati ni irọrun diẹ sii ni irọrun orin eyiti awọn apoti nilo akiyesi rẹ ti o da lori ifitonileti naa.',
    },
    {
      id: 108,
      title: 'Elo ọja ni MO le ra ni ọja?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Fun ohun kọọkan ti o han ni ibi ọja, o le ra apoti kikun tabi nọmba eyikeyi ti kilo ti o wa ninu apoti naa. Iwọn to kere julọ ti o le ra jẹ 1 kg.',
    },
    {
      id: 109,
      title: 'Mo ti ra ọja diẹ ati pe yoo fẹ lati tun ta. Bawo ni MO ṣe ṣe?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Nigbati o ba ra diẹ ninu awọn ọja lati ọjà, o di oniwun iye ti o ra. Ninu "Dasibodu", iwọ yoo rii titẹsi tuntun ti o tọkasi ohun ti o ti fipamọ sinu yara tutu. Ti o ba fẹ ta fun tita, o le tẹ aami ">" ni apa ọtun ti ohun kan dasibodu, lilö kiri si "Crate iwuwo ati atokọ ọja", ṣeto iru awọn apoti ti o fẹ lati ṣeto "fun tita" ati idiyele fun kg. Awọn onibara ni ibi ọja yoo ni anfani lati wo awọn apoti wọnyi, ati ra ni iye ti a fihan. Jọwọ ṣe akiyesi pe lati ṣeto awọn apoti fun tita, akọọlẹ banki rẹ nilo lati ṣeto. Tẹle awọn ilana lati ṣafikun awọn alaye akọọlẹ banki rẹ, tabi lọ kiri si "Akojọ aṣyn" -> "Awọn alaye akọọlẹ" -> "Awọn aṣayan isanwo".',
    },
    {
      id: 110,
      title: 'Mo jade kuro ni ilana isanwo ọja. Bawo ni MO ṣe le pari rira mi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Nigbati o ba bẹrẹ rira kan nipa tite lori "Sanwo" ninu rira rira, o darí rẹ si olupese isanwo (PayStack ni Nigeria). Ti, fun idi kan, o kọ ilana naa silẹ, aṣẹ rẹ yoo jẹ samisi bi "Isanwo ni isunmọtosi". O le wa aṣẹ rẹ labẹ taabu "Awọn aṣẹ Mi" ni oju-iwe ọja. O le tẹ nkan naa lati pari isanwo naa. O ni awọn iṣẹju 30 lati pari isanwo naa, lẹhin eyiti aṣẹ naa jẹ “Pare” ati pe iye naa jẹ ominira fun awọn olura miiran lati ra.',
    },
    {
      id: 111,
      title: 'Emi ko le ṣayẹwo-jade diẹ ninu awọn irugbin. Kini idi ti eyi n ṣẹlẹ?',
      role: [ERoles.OPERATOR],
      text: 'Ti o ba n gbiyanju lati ṣayẹwo-jade diẹ ninu awọn apoti ti a ṣe akojọ si ni aaye ọjà, ti ko si le ṣayẹwo wọn, eyi ṣee ṣe nitori otitọ pe wọn jẹ apakan ti aṣẹ isanwo isunmọ. Eyi tumọ si pe olura kan ti ṣafikun wọn si rira rira ati bẹrẹ ilana rira kan. Olura naa ni iṣẹju 30 lati pari isanwo naa, lẹhin eyi aṣẹ naa yoo fagile. Lẹhin awọn iṣẹju 30 ti kọja, iwọ yoo ni anfani lati ṣayẹwo-jade apoti naa.',
    },
  ],
  [APP_LOCALES.IGBO]: [
    {
      id: 1,
      title: 'Kedu ihe kpatara m ga-eji jiri ngwa ahụ?',
      role: [ERoles.AUTH],
      text: 'Emebere ngwa a iji kwado ndị na-enye ụlọ oyi na-arụ ọrụ kwa ụbọchị na ụlọ oyi, ndị ọrụ ugbo na-eji ụlọ oyi, na ndị na-azụ ahịa nwere mmasị ịzụrụ ihe ọkụkụ echekwara n"ime ụlọ oyi. Ngwa ahụ nwere ngwa ahịa dijitalụ, nleba anya n"ime ime na ụdị ndụ nchekwa maka crate ọ bụla echekwara, yana ebe ahịa iji jikọta ndị na-azụ ahịa na ndị na-ere ahịa. Ọ gụnyekwara Ebe Ọmụma, nke na-enye ndụmọdụ ndị akọwapụtara maka ngwa ahịa na ọnọdụ nchekwa kacha mma yana ndụ nchekwa.',
    },
    {
      id: 2,
      title: 'Onye nwere ike iji ngwa ahụ?',
      role: [ERoles.AUTH],
      text: 'Enwere ike iji ngwa ahụ site na ụlọ ọrụ nchekwa oyi, ndị ọrụ ugbo na ndị ahịa nwere mmasị iji nchekwa oyi, yana ndị nwere ike ịzụrụ ihe gburugburu ụwa. N"ime ngwa a, enwere ọrụ ndị ọrụ atọ: (i) Onye ọrụ edebanyere a[APP_LOCALES.HAUSA]: akụkụ nke otu njikwa ụlọ oyi. Onye na-ahụ maka ịtọlite na ijikwa ụlọ ahụ, na-ahụ maka ileghara ọrụ ndị na-arụ ọrụ anya n"ala, na-enweghị anụ ahụ na ebe ahụ. Dịka ọmụmaatụ: onye isi ụlọ ọrụ, CFO, wdg. Onye a na-akpakọrịta kpọmkwem na ndị ọrụ ụlọ oyi, na-akọkwara onye ọrụ ụlọ ọrụ debanyere aha. (iii) Ndị ọrụ jụrụ oyi ma ọ bụ ndị na-azụ ahịa: ndị ọrụ ụlọ oyi (nwere ike ịbụ ndị ọrụ ugbo, ndị ahịa, ndị na-ere ahịa, wdg) ma ọ bụ ndị ahịa (otu onye, onye na-ere ahịa, onye na-ere ahịa). Ọrụ a bụ maka onye ọ bụla chọrọ ịdebanye aha na ngwa na-ejikọghị ya na ụlọ ọrụ jụrụ oyi. Ndị ọrụ jụrụ oyi nwere smartphone nwere ike ịbanye na ngwa dị ka ndị ọrụ. Ọ bụrụ na ha enweghị smartphone, ndị na-arụ ọrụ na-arụ ọrụ ndị ọrụ jụrụ oyi n"aha ha.',
    },
    {
      id: 3,
      title: 'Kedu ka m ga-esi debanye aha dị ka onye ọrụ edebanyere aha?',
      role: [ERoles.AUTH],
      text: 'Ọ bụrụ na ị bụ onye ọrụ mbụ sitere na ụlọ ọrụ gị debanyere aha, ị nwere ike pịa bọtịnụ "Debanye aha dị ka ụlọ ọrụ" wee soro usoro ịdebanye aha ụlọ ọrụ gị na onwe gị (gụnyere nkọwa nkeonwe na paswọọdụ). Ozugbo ị debanyere aha nke ọma, ị nwere ike ịbanye dị ka onye ọrụ edebanyere aha na ngwa ma ziga oku SMS na ndị ọrụ ndị ọzọ edebanyere aha ka ha sonyere ụlọ ọrụ gị. Ozugbo emepụtara ụlọ ọrụ ahụ, ndị ọrụ niile debanyere aha kwesịrị ịkpọ SMS. Ma ọ bụghị ya, a gaghị ejikọta ha na otu ụlọ ọrụ.',
    },
    {
      id: 4,
      title: 'Kedu ka m ga-esi debanye aha dị ka onye ọrụ?',
      role: [ERoles.AUTH],
      text: 'Iji debanye aha, onye ọrụ edebanyere aha ga-akpọ gị òkù. Ị ga-enweta SMS nwere njikọ ịgbalite, site na ebe ị nwere ike melite nkọwa nkeonwe na paswọọdụ gị.',
    },
    {
      id: 5,
      title: 'Kedu otu m ga-esi debanye aha dị ka onye ọrụ jụrụ oyi ma ọ bụ onye ahịa?',
      role: [ERoles.AUTH],
      text: 'Ndị ọrụ jụrụ oyi na smartphones na ndị ahịa nwere ike ịdebanye aha na ịpị "Debanye aha dị ka onye ọrụ jụrụ oyi ma ọ bụ ndị ahịa" na ibe mbụ wee nye nkọwa nkeonwe na paswọọdụ ha. Ndị na-arụ ọrụ nwere ike ịgbakwunye ndị ọrụ jụrụ oyi na-enweghị smartphone na ngwa ahụ. Ọrụ a dị mkpa iji malite nbanye maka ndị ọrụ jụrụ oyi. Ndị ọrụ jụrụ oyi kwesịrị ịnye nọmba ekwentị, nke onye ọrụ ga-eji kpọtụrụ ndị ọrụ jụrụ oyi ma ọ bụrụ na ọ dị mkpa. Enweghị paswọọdụ achọrọ na nke a.',
    },
    {
      id: 6,
      title: 'Enweghị m ike ịmecha ndebanye aha dị ka onye ọrụ. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.AUTH],
      text: 'Iji mezue ndebanye aha, biko hụ na afọ ojuju ọnọdụ ndị a: (i) Ị na-eji koodu obodo ziri ezi na-abanye na nọmba ekwentị (dịka +91 maka India); (ii) Ejibeghị akara ekwentị ị nyere iji debanye aha onye ọrụ ọ bụla; (iii) Okwuntughe ị na-abanye na-emezu ọnọdụ niile achọrọ; (iv) Okwuntughe ndị ị na-abanye bụ otu - ị nwere ike pịa akara anya iji kpughee okwuntughe wee lelee na ha nhata.',
    },
    {
      id: 7,
      title: 'Enweghị m ekwentị mana achọrọ m iji ngwa ahụ. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.AUTH],
      text: 'Ọ bụrụ na ị bụ onye ọrụ edebanyere aha, onye na-ahụ maka ọrụ, ma ọ bụ onye ahịa, ịkwesịrị ịnye nọmba ekwentị bara uru iji debanye aha. Achọrọ smartphone iji jiri ngwa ahụ rụọ ọrụ nke ọma. Ọ bụrụ na ị bụ onye ọrụ jụrụ oyi ma enweghị ekwentị, anyị na-adụ gị ọdụ ka ịnye nọmba ekwentị bara uru, ka onye ọrụ nwee ike ịkpọtụrụ gị ma ọ bụrụ na ọ dị mkpa. Ị nwere ike ịnye nọmba ekwentị nke onye òtù ezinụlọ ma ọ bụ enyi ma ọ bụrụ na ị nweghị nke gị. Ọ bụrụ na nke a agaghị ekwe omume, onye na-ahụ maka ọrụ ka nwere ike ịchekwa ngwaahịa ahụ n"ime ụlọ site na ịhọrọ "Onye ọrụ na-enweghị ekwentị" dị ka onye ọrụ jụrụ oyi na nbanye.',
    },
    {
      id: 8,
      title: 'Kedu nkọwa achọrọ maka ịbanye dịka onye ọrụ edebanyere aha?',
      role: [ERoles.AUTH],
      text: 'Ndị ọrụ edebanyere aha nwere ike ịbanye na email ma ọ bụ nọmba ekwentị, yana paswọọdụ ha.',
    },
    {
      id: 9,
      title: 'Kedu nkọwa achọrọ maka ịbanye dịka onye ọrụ?',
      role: [ERoles.AUTH],
      text: 'Ndị ọrụ nwere ike iji nọmba ekwentị ha na paswọọdụ wee banye.',
    },
    {
      id: 10,
      title: 'Kedu nkọwa achọrọ maka ịbanye dị ka onye ọrụ jụrụ oyi ma ọ bụ onye ahịa?',
      role: [ERoles.AUTH],
      text: 'Ndị ọrụ jụrụ oyi nwere smartphone nwere ike iji nọmba ekwentị ha na paswọọdụ wee banye. Ndị ọrụ jụrụ oyi na-enweghị ama achọghị ịbanye: onye na-arụ ọrụ nwere ike ịrụ ọrụ ahụ n"aha ha. Ndị ahịa nwere mmasị ịhụ ebe ahịa nwere ike iji nọmba ekwentị ha na paswọọdụ banye.',
    },
    {
      id: 11,
      title: 'Enwetabeghị m ọkpụkpọ oku ọ bụla na SMS. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.AUTH],
      text: 'Ọ bụrụ na paswọọdụ gị furu efu, ị nwere ike iweghachi akaụntụ gị site na ịpị "Chefuru paswọọdụ" mgbe ị na-abanye, tinye nọmba ekwentị gị, ị ga-enweta SMS nwere njikọ iji tọọ paswọọdụ ọhụrụ.',
    },
    {
      id: 12,
      title: 'Etufuola m paswọọdụ m. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.AUTH],
      text: 'Ọ bụrụ na paswọọdụ gị furu efu, ị nwere ike iweghachi akaụntụ gị site na ịpị "Chefuru paswọọdụ" mgbe ị na-abanye, tinye nọmba ekwentị gị, ị ga-enweta SMS nwere njikọ iji tọọ paswọọdụ ọhụrụ.',
    },
    {
      id: 13,
      title: 'Gịnị bụ Ọmụma Ọmụma?',
      role: [ERoles.EMPLOYEE],
      text: 'Ebe Ọmụma bụ ibe enwere ike iru site na ịpị NchNhr dị n"elu aka ekpe. Ọ nwere ozi bara uru gbasara usoro nchekwa kacha mma maka ngwa ahịa dị iche iche, gụnyere oke okpomọkụ yana oge nchekwa oge n"okpuru okpomọkụ a.',
    },
    {
      id: 14,
      title: 'Kedu otu m ga-esi dezie profaịlụ m?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Site na ịpị "NchNhr" -> "Nkọwa akaụntụ", ị nwere ike ịhụ profaịlụ gị wee dezie "nkọwa nkeonwe" gị (aha mbụ na ikpeazụ, akara ekwentị, email, na okike). N"okpuru "mmasị mpaghara", ị nwere ike ịgbanwe asụsụ ngwa. N"okpuru "Seller settings", ị nwere ike ịtọ nkọwa akaụntụ ụlọ akụ gị, mepụta Kupọns, wee mee ka nkọwa kọntaktị gị bụrụ ọha maka ndị ọrụ ahịa. Ka ịgbanwee nkọwa nke ụlọ ọrụ gị, ọnọdụ, na nkeji jụrụ oyi, gaa na "NchNhr" -> "Management", wee họrọ ihe menu nke ịchọrọ ịgbanwe.',
    },
    {
      id: 15,
      title: 'Kedu otu m ga-esi dezie profaịlụ m?',
      role: [ERoles.EMPLOYEE],
      text: 'Enwere ụzọ atọ iji jikọta onye na-arụ ọrụ na ngalaba jụrụ oyi. Ị nwere ike kenye onye na-arụ ọrụ otu nkeji jụrụ oyi (ma ọ bụ karịa otu) mgbe ị na-ezigara ya akwụkwọ ịkpọ òkù. Ma ọ bụghị ya, ị nwere ike gbanwee nkeji nju oyi jikọtara ya na onye ọrụ nyere site na ịgagharị na "Management" -> "Ndị na-arụ ọrụ", họrọ onye ọrụ, wee pịa "Họrọ ngalaba jụrụ oyi". N"ikpeazụ, mgbe ị na-eke otu nju oyi na "Management" -> "Ngwaọrụ jụrụ oyi", ị nwekwara ike kenye ndị ọrụ na ya. Cheta ichekwa mgbanwe gị tupu ịpụ apụ!',
    },
    {
      id: 16,
      title: 'Kedu otu m ga-esi kenye ndị ọrụ na nkeji jụrụ oyi?',
      role: [ERoles.OPERATOR],
      text: 'Ee, ị nwere ike ịmalite ịlele onye ahụ site na iji onye ọrụ jụrụ oyi aha ya bụ "User enweghị ekwentị". Dị ka ọtụtụ mmadụ nwere ike iji akaụntụ a banye, gbaa mbọ tinye mkpado aha na crates dị n"ime ụlọ ahụ iji mata onye nwe crate ọ bụla.',
    },
    {
      id: 17,
      title:
        "Onye ọrụ jụrụ oyi rutere n'ọnụ ụlọ oyi mana enweghị ekwentị. Enwere m ike ịdebanye aha ya/ya?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ee, ị nwere ike ịmalite ịlele onye ahụ site na iji onye ọrụ jụrụ oyi aha ya bụ "User enweghị ekwentị". Dị ka ọtụtụ ndị mmadụ nwere ike iji akaụntụ a maka nbanye, gbaa mbọ tinye mkpado aha na crates dị n"ime ụlọ ahụ iji mata onye nwe crate ọ bụla.',
    },
    {
      id: 18,
      title: 'Kedu otu m ga-esi debanye aha ụlọ ọrụ m?',
      role: [ERoles.EMPLOYEE],
      text: 'Iji debanye aha ụlọ ọrụ gị, na ihuenyo nnabata họrọ "Debanye aha dị ka ụlọ ọrụ" wee dejupụta ozi achọrọ. Tinye paswọọdụ wee pịa "Debanye aha" na ị dịla njikere ịga!',
    },
    {
      id: 19,
      title: 'Kedu otu m ga-esi debanye aha ebe ọhụrụ maka ụlọ ọrụ m?',
      role: [ERoles.EMPLOYEE],
      text: 'Ọ dị mkpa ka e mepụta ngalaba jụrụ oyi n"otu ebe (na enwere ike ịmepụta ọtụtụ nkeji oyi maka otu ebe). Ka ịgbakwunye ọnọdụ ọhụrụ maka ụlọ ọrụ gị, na menu họrọ "Management" > "Ebe". Pịa na "+" dị n"akụkụ aka nri elu ka ịgbakwunye ebe ọhụrụ. Dejupụta ozi achọrọ. Pịa "gbakwunye" iji kwado.',
    },
    {
      id: 20,
      title: 'Kedu otu m ga-esi debanye aha ngalaba jụrụ oyi maka ụlọ ọrụ m?',
      role: [ERoles.EMPLOYEE],
      text: 'Iji debanye aha ngalaba jụrụ oyi maka ụlọ ọrụ gị, ịkwesịrị ịnwe opekata mpe otu ebe emepụtara. Mgbe ahụ, na menu họrọ "Management"> "Cooling units". Pịa na "+" n"elu akuku aka nri ka ịgbakwunye otu ọhụrụ jụrụ oyi. Dejupụta ozi achọrọ. Pịa "gbakwunye" iji kwado.',
    },
    {
      id: 21,
      title:
        'Kedu otu m ga-esi kpọọ ndị ọrụ ndị ọzọ edebanyere aha na ụlọ ọrụ m ka ha debanye aha maka ngwa ahụ?',
      role: [ERoles.EMPLOYEE],
      text: 'Iji kpọọ ndị ọrụ ndị ọzọ edebanyere aha maka ụlọ ọrụ gị, na menu họrọ "Management"> "Onye ọrụ edebanyere aha". Pịa na "+" nke dị n"elu akuku aka nri iji tinye nọmba ekwentị nke onye ọrụ ịchọrọ ịkpọ. Pịa "kpọọ" iji gosi: onye ọrụ ibe gị ga-enweta SMS nwere njikọ na-eduzi ya ozugbo na ihuenyo ndebanye aha. Na mgbakwunye, ị ga-enwetakwa ozi-e nwere njikọ oku. Biko ziga onye ọrụ nke a ma ọ bụrụ na ọ nataghị ya site na SMS.',
    },
    {
      id: 22,
      title: 'Kedu otu m ga-esi kpọọ ndị na-ahụ maka nchekwa oyi ka ha debanye aha maka ngwa ahụ?',
      role: [ERoles.EMPLOYEE],
      text: 'Ka iziga ndị na-arụ ọrụ òkù maka nkeji jụrụ oyi gị, na menu họrọ "Management"> "Ndị na-arụ ọrụ". Pịa na "+" dị n"akụkụ aka nri elu ka ịgbakwunye nọmba ekwentị onye ọrụ ịchọrọ ịkpọ. Pịa "kpọọ" iji gosi: onye ọrụ ga-enweta ozi nwere njikọ na-eduzi ya ozugbo na ihuenyo ndebanye aha. Na mgbakwunye, ị ga-enwetakwa ozi-e nwere njikọ oku. Biko ziga onye ọrụ nke a ma ọ bụrụ na ọ nataghị ya site na SMS.',
    },
    {
      id: 23,
      title: 'Kedu otu m ga-esi nyochaa okpomọkụ nke otu nju oyi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Iji nyochaa ọnọdụ okpomọkụ nke otu nkeji jụrụ oyi, pịa "More" na akuku aka nri ala nke mmanya igodo, họrọ "Cooling Units", gaa na "Ọnọdụ ime ụlọ", wee họrọ ngalaba jụrụ oyi nke mmasị site na dropdown. N"ime panel a, ị ga-ahụ eserese nwere okpomọkụ ka oge na-aga - ị nwere ike pịa ebe nchekwa data iji hụ uru okpomọkụ na akara oge. Ọ bụrụ na ụlọ ahụ nwere sensọ ejikọrọ na ngwa a, ị ga-enwe ike ịhụ ọnọdụ okpomọkụ nke ọnụ ụlọ n"ezie ebe a. Ma ọ bụghị ya, eserese ahụ ga-egosi ọnọdụ okpomọkụ nke onye na-ahụ maka ime ụlọ ji aka debere n"ime ngwa ahụ. Ka ịlele ọnọdụ okpomọkụ nke nkeji oyi ọzọ, ị nwere ike họrọ ya site na ndọpụta dị n"elu ibe ahụ.',
    },
    {
      id: 24,
      title: "Kedu otu m ga-esi nyochaa ịdị n'ime ụlọ jụrụ oyi?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Iji jikwaa ọnụnọ nke otu nkeji jụrụ oyi pịa "More" na akuku aka nri ala nke mmanya igodo, họrọ "Cooling Units", gaa na "Planner", wee họrọ ngalaba nju oyi nke mmasị site na dropdown. N"ebe a, ị nwere ike ịhụ ebe obibi dị ugbu a (n"elu) na amụma amụma maka ụbọchị 7 na-esote (n"okpuru). Ozi gbasara ọnụnọ n"ọdịnihu dabere na ọnụọgụ ụbọchị onye ọrụ ọ bụla kwupụtara dị ka ụbọchị echere na nchekwa na nbanye. Kpachara anya na nke a bụ naanị atụmatụ na ọ nwere ike bụrụ nke na-ezighi ezi.',
    },
    {
      id: 25,
      title: "Kedu otu m ga-esi hụ ihe echekwara n'ime ụlọ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Pịa akara ngosi "Dashboard" dị n"okpuru ihuenyo wee họrọ akụkụ mmasị jụrụ oyi site na dropdown ka ịhụ ndepụta nke ihe niile echekwara na nkeji oyi.',
    },
    {
      id: 26,
      title: 'Kedu ka m ga-esi hụ nbanye na nlele gara aga nke ngalaba jụrụ oyi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ka ịhụ aga aga mmegharị nke a jụrụ unit pịa "More" na ala nri akuku nke igodo mmanya, na họrọ "History": gara aga check-ins (akara ngosi na green crate), ndenye ọpụpụ (akara ngosi na oroma crate), na ahịa arụmọrụ (akara ngosi na-acha anụnụ anụnụ ụgbọ ibu) na azụmahịa nkọwa na-egosipụta. Ọ bụrụ na azụmahịa akọwapụtara nwere mmasị, ọrụ ọchụchọ ahụ nwere ike inyere gị aka ịchọta ya!',
    },
    {
      id: 28,
      title: 'Gịnị bụ isi ọrụ onye ọrụ nwere ike ime na ngwa?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Onye na-ahụ maka ọrụ nwere ike: debanye aha ndị ọrụ jụrụ oyi ọhụrụ, bido nbanye, nyochaa ihe ndị dị na nchekwa na ọnụ ụlọ, bido nlele, na nyochaa ọnọdụ okpomọkụ nke ngalaba jụrụ oyi ọ na-ahụ maka ya. Onye ọrụ ahụ nwekwara ike inye aka mee ka ndị ọrụ jụrụ oyi n"ịdepụta ụfọdụ crates maka ọrịre na ịtọ ọnụ ahịa ire ere.',
    },
    {
      id: 29,
      title: 'Kedu otu m ga-esi debanye aha ndị ọrụ jụrụ oyi ọhụrụ?',
      role: [ERoles.OPERATOR],
      text: 'Ka ịdebanye aha onye ọrụ jụrụ oyi ọhụrụ, na Menu gaa na "Management"> "Ndị ọrụ jụrụ oyi". Pịa na "+" dị n"akụkụ aka nri elu wee họrọ ma ị ga-agbakwunye onye ọrụ edebanyelarị ya na koodu, ma ọ bụ tinye nkọwa onye ọrụ. Onye ọrụ jụrụ oyi nke nwere smartphone ma debanyelarị aha na Coldtivate nwere koodu pụrụ iche, nke ọ nwere ike ịhụ n"okpuru "NchNhr" -> "Nkọwa akaụntụ" -> "Nkọwa nkeonwe" -> Koodu mbubata onye ọrụ jụrụ oyi. Ọ bụrụ na onye ọrụ enweghị smartphone, ma ọ bụ edebanyeghị aha ya, ịnwere ike ịgbakwunye onye ọrụ site na ịgbakwunye aha, okike na nọmba ekwentị. Ọ bụrụ na onye ọrụ enweghị nọmba nke ya, enwere ike iji nọmba onye ọzọ (dịka ndị enyi, ndị ikwu) mee ihe, mana biko cheta na enwere ike iji otu nọmba ekwentị naanị otu ugboro. Pịa "Chekwa mgbanwe" iji gosi. Iji mezue ndebanye aha, ịkwesịrị imeju nyocha dị nkenke site na ịjụ onye ọrụ jụrụ ajụjụ ole na ole. Enwere ike ịmecha nyocha ahụ n"oge ọzọ site na ịgagharị na "Management" -> "Ndị ọrụ jụrụ oyi" -> "Nyocha onye ọrụ jụrụ oyi".',
    },
    {
      id: 30,
      title:
        'Onye ọrụ jụrụ oyi enweghị oge ịza ajụjụ nyocha na ndebanye aha. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.OPERATOR],
      text: 'Ị nwere ike ịgafe ajụjụ nyocha site na ịpị "Mezue ma emechaa". N"okwu a, a ga-akpali gị ịmecha nyocha ahụ oge mbụ ị na-emepụta nlele maka onye ọrụ ahụ jụrụ oyi. A na-atụ aro ka iwepụta oge wee zaa ajụjụ nyocha nke ọma: n"ụzọ dị otú a onye ọrụ nwere ike nweta ahụmịhe ahaziri ahazi na ngwa Coldtivate!',
    },
    {
      id: 31,
      title:
        'Onye na-ahụ maka ọrụ na-arịọ m koodu iji tinye m na ndepụta ụlọ ọrụ nke ndị ọrụ jụrụ oyi. Ebee ka m nwere ike ịhụ koodu ahụ?',
      role: [ERoles.OPERATOR],
      text: 'Iji malite nbanye, gaa na Dashboard wee pịa bọtịnụ Arụmọrụ dị n"aka nri ala, wee pịa bọtịnụ ndụ ndụ.',
    },
    {
      id: 32,
      title: 'Enweghị m oge iji zaa ajụjụ nyocha na ndebanye aha. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.OPERATOR],
      text: 'Enwere ụzọ abụọ iji malite nlele, ha abụọ na-amalite na ibe Dashboard. Ị nwere ike pịa bọtịnụ Ọrụ Manager na ala aka nri, wee pịa bọtịnụ uhie. N"ụzọ dị otú a, ị nwere ike họrọ nke jụrụ onye ọrụ (na nke jụrụ unit) ị chọrọ na-amalite ego si, na ike lelee ya / ya crates si multiple check ins. N"aka nke ọzọ, ị nwere ike pịa "Lee nkọwa" maka ihe ị na-ahụ na Dashboard (jide n"aka na ị nọ na nkeji nju oyi ziri ezi), wee pịa "Lelee". N"okwu a, naanị ị nwere ike lelee igbe dị na ihe nchekwa ahụ.',
    },
    {
      id: 33,
      title: "Enwere m mmasị ịchekwa ihe ọkụkụ m n'ime ụlọ oyi. Kedu ka m ga-esi chọta ha?",
      role: [ERoles.EMPLOYEE],
      text: 'Ka ịchọta ụlọ oyi dị gị nso, gaa na "More" na akuku aka nri ala nke mmanya nsoroụzọ, họrọ "Cooling units" na "Map". N"ebe a, ị nwere ike ịchọ ụlọ oyi dị nso, wee weta igbe gị n"ime ụlọ ahụ. Onye na-ahụ maka ime ụlọ oyi nwere ike inyere gị aka ịghọta ka ụlọ ahụ si arụ ọrụ, otu a ga-esi kwụọ gị ụgwọ, yana uru dị na iji nchekwa oyi.',
    },
    {
      id: 34,
      title: 'Kedu ka m ga-esi malite ndenye ego?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Iji malite nbanye, gaa na Dashboard wee pịa bọtịnụ Arụmọrụ dị n"aka nri ala, wee pịa bọtịnụ ndụ ndụ.',
    },
    {
      id: 35,
      title: 'Kedu ka m ga-esi malite nlele?',
      role: [ERoles.OPERATOR],
      text: 'Enwere ụzọ abụọ iji malite nlele, ha abụọ na-amalite na ibe Dashboard. Ị nwere ike pịa bọtịnụ Ọrụ Manager na ala aka nri, wee pịa bọtịnụ uhie. N"ụzọ dị otú a, ị nwere ike họrọ nke jụrụ onye ọrụ (na nke jụrụ unit) ị chọrọ na-amalite ego si, na ike lelee ya / ya crates si multiple check ins. N"aka nke ọzọ, ị nwere ike pịa "Lee nkọwa" maka ihe ị na-ahụ na Dashboard (jide n"aka na ị nọ na nkeji nju oyi ziri ezi), wee pịa "Lelee". N"okwu a, ị nwere ike ịlele naanị akpa n"ime ihe nchekwa ahụ.',
    },
    {
      id: 36,
      title: "Enwere m ihe mmetụta okpomọkụ n'ime ụlọ oyi. Enwere ike ijikọ ha na Coldtivate?",
      role: [ERoles.AUTH],
      text: 'Ebe Ọmụma bụ ibe enwere ike iru site na ịpị NchNhr dị n"elu aka ekpe. Ọ nwere ozi bara uru gbasara usoro nchekwa kacha mma maka ngwa ahịa dị iche iche, gụnyere oke okpomọkụ yana oge nchekwa oge n"okpuru okpomọkụ a.',
    },
    {
      id: 37,
      title: "Kedu otu m ga-esi jikọọ sensọ dị n'ime ụlọ na ngwa ahụ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ọ bụrụ na enwere sensọ okpomọkụ n"ime ụlọ nke enwere ike ijikọ na ngwa Coldtivate, biko kpọtụrụ ndị ọrụ gị. Naanị onye ọrụ nwere ọrụ onye ọrụ edebanyere aha nwere ike jikọta sensọ na nkeji jụrụ oyi emebere na Coldtivate.',
    },
    {
      id: 38,
      title: 'Kedu ka m ga-esi tọọ okpomọkụ nke nkeji jụrụ oyi?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Oge ị ga-ebuli bụ ọnụọgụ ụbọchị akwadoro maka onye ọrụ jụrụ oyi iburu ngwa ahịa. Mgbe nke ahụ gasịrị, ngwa ahịa ahụ ga-amalite ịla azụ ahịa ya. Oge iji bulie nha nha efu na-egosi na onye ọrụ kwesịrị ịbịa nakọta ihe ahụ na nchekwa ozugbo wee were ụbọchị 2 ire ya n"ahịa. Enwere ike ịhụ ya na Dashboard (n"elu aka nri) yana na nlele zuru ezu maka ihe nchekwa ọ bụla.',
    },
    {
      id: 39,
      title: 'Kedu otu esi akpọtụrụ onye ọrụ jụrụ oyi maka nyocha ahịa ahịa mgbe-echekwara?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Akwụkwọ nri ọhụrụ na mkpụrụ osisi na-emebi emebi, na otú ha si atụfu ịdị ọhụrụ mgbe owuwe ihe ubi na-adabere na okpomọkụ. Ya mere, a na-agbakọ oge ị ga-ebuli dabere na ọnọdụ okpomọkụ nke ihe nju oyi kwekọrọ, na àgwà mbụ nke ngwaahịa ahụ mgbe a na-ebute ya na nkeji oyi. Ihe ndị a na-eji na mgbako a dị iche na ngwa ahịa ọ bụla. Ị nwere ike nweta nghọta ụfọdụ ka ire ere si dị iche n"ahịa dị iche iche dị na Ọmụma Ọmụma.',
    },
    {
      id: 40,
      title: 'Kedu ihe nyocha ahịa ahịa mgbe-echekwara na gịnị kpatara m ga-eji mejupụta ya?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Enwere ike ịnweta nyocha ahịa site na ịpị akara atọ dị n"akụkụ nlele ọ bụla na taabụ "More" -> "History" na ịhọrọ "Mejupụta nyocha ahịa". Nnyocha ahụ dị mkpụmkpụ ma na-ajụ maka ozi gbasara ọnụahịa ire ere nke ngwaahịa ị chekwaaburu n"ime ụlọ, yana gbasara ole n"ime ya mebiri emebi. A ga-ewere ozi a dị ka nzuzo yana naanị ndị otu Coldtivate ga-eji nyochaa mmetụta nke iji nchekwa oyi. Akara uhie ga-achọpụta nlele nlele nke emechabeghị nyocha ahịa. A ga-echetara gị banyere nlele nlele nke chọrọ nlebara anya gị na panel ngosi ma nwee ike pịa ngosi iji mepee nyocha ahụ. Ịnwekwara ike ịnweta nyocha ndị ịchọrọ iji dejupụta na taabụ "Analytics", wee pịa "Mmetụta".',
    },
    {
      id: 41,
      title: 'Kedu otu m ga-esi agụ ozi nke otu ihe na Dashboard?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ihe ọ bụla dị na Dashboard na-egosiputa otu igbe nke otu ụdị ihe ọkụkụ nke enyochala ọnụ. Ọnụ ọgụgụ nke ụbọchị ndị dị n"elu bụ ụbọchị ndị e buru n"amụma ruo mgbe a ga-ebuli. N"okpuru ebe a, ị na-ahụ ụdị ihe ọkụkụ na NJ nbanye. Nọmba na-esote akara crate bụ ọnụ ọgụgụ nke crates enyochara. Na-esote ya, ị na-ahụ ụgwọ jụrụ oyi, na ọnụ ọgụgụ nke ụbọchị ndị crates nọ na nchekwa maka. Nọmba dị n"akụkụ kaadị dị n"akụkụ aka nri na-achọpụta ọnụ ọgụgụ ole e depụtara dị ka "maka ọrịre" n"ọma ahịa. N"okpuru ihe ọ bụla, ị ga-ahụ onye nwe nke crates na nkọwa kọntaktị.',
    },
    {
      id: 42,
      title: 'Kedu oge ị ga-ebuli?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'na-egosi ebe obibi ahụ dị ka ọbara ọbara mgbe ejiri ihe karịrị 80% nke ikike nju oyi na-arụ ọrụ. Ozi gbasara ọnụnọ n"ọdịnihu dabere na ọnụọgụ ụbọchị onye ọrụ ọ bụla kwupụtara dị ka ụbọchị echere na nchekwa na nbanye. Kpachara anya na nke a bụ naanị atụmatụ na ọ nwere ike bụrụ nke na-ezighi ezi. Dị ka ndị dị otú ahụ, ọnụ ụlọ na-acha uhie uhie bụ nanị ihe ịrịba ama na ime ụlọ ahụ na-ejupụta. Ọ dịghị mkpa ka ị na-echegbu onwe gị mana ị nwere ike ime ihe dị otú ahụ. Dịka ọmụmaatụ, tụlee ịkpọtụrụ ndị ọrụ jụrụ oyi nke ngwaahịa ha na nchekwa nwere oge kacha nta iji bulie iji nye ha ndụmọdụ ka ha lelee anya. Ị nwere ike ịhụ ndepụta ahaziri nke ihe kacha ngwa ngwa ka ịlele n"okpuru "Dashboard" mgbe ị nyere iwu ka ọ bụrụ oge iburu.',
    },
    {
      id: 43,
      title: 'Kedu ka esi agbakọ oge iji bulie? Olee ihe ndị e ji emetụta ya?',
      role: [ERoles.OPERATOR],
      text: 'Akwụkwọ nri ọhụrụ na mkpụrụ osisi na-emebi emebi, na otú ha si atụfu ịdị ọhụrụ mgbe owuwe ihe ubi na-adabere na okpomọkụ. Ya mere, a na-agbakọ oge ị ga-ebuli dabere na ọnọdụ okpomọkụ nke ihe nju oyi kwekọrọ, na àgwà mbụ nke ngwaahịa ahụ mgbe a na-ebute ya na nkeji oyi. Ihe ndị a na-eji na mgbako a dị iche na ngwa ahịa ọ bụla. Ị nwere ike nweta nghọta ụfọdụ ka ire ere si dị iche n"ahịa dị iche iche dị na Ọmụma Ọmụma.',
    },
    {
      id: 44,
      title: 'Oge iji bulie bụ ụbọchị 0 mana ngwaahịa ahụ ka na-adị mma. Gịnị kpatara?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Agba na-anọchi anya ụbọchị fọdụrụ tupu oge ị ga-ebuli. Ị ga-ahụ mmanya na-acha ọbara ọbara mgbe ọ na-erughị ụbọchị 2, na odo mgbe ọ na-erughị ụbọchị 7, na akwụkwọ ndụ akwụkwọ ndụ mgbe ihe karịrị ụbọchị 7. Ụkpụrụ ndị a bụ kpọmkwem maka ihe nchekwa ọ bụla, a na-atụgharịkwa ya ọtụtụ ugboro kwa ụbọchị dabere na ọnọdụ okpomọkụ dị na nkeji oyi. Mgbe enweghị ihe nlereanya maka ngụkọta oge dị, agba nke mmanya ahụ ga-abụ isi awọ.',
    },
    {
      id: 45,
      title:
        'Oge ị ga-ebuli bụ ihe karịrị ụbọchị 0 mana ihe ọkụkụ ahụ fọrọ nke nta ka ọ ghara imebi. Gịnị kpatara?',
      role: [ERoles.OPERATOR],
      text: 'Dashboard nwere ike iwepụta ntakịrị oge imelite. Biko gosikwa na ị na-ele anya na ngalaba jụrụ oyi. Ọ bụrụ na ị na-elele okwu a, biko kọọ ya na app@yourvcca.org.',
    },
    {
      id: 46,
      title:
        'Oge ị ga-ebuli bụ ihe karịrị ụbọchị 0 mana ihe ọkụkụ ahụ fọrọ nke nta ka ọ ghara imebi. Gịnị kpatara?',
      role: [ERoles.OPERATOR],
      text: 'Dashboard nwere ike iwepụta obere oge iji melite. Biko chọpụtakwa na ihe ndị ị nyochara bụ nke ziri ezi, yana na ị na-ele anya n"otu nju oyi ziri ezi. Ọ bụrụ na ị na-elele okwu a, biko kọọ ya na app@yourvcca.org.',
    },
    {
      id: 47,
      title:
        'Ọnụ ụlọ maka otu ụbọchị na-esote bụ ọbara ọbara (ihe na-erughị 20%). Kedu ihe nke a dabere? Ekwesịrị m inwe nchegbu?',
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'na-egosi ebe obibi ahụ dị ka ọbara ọbara mgbe ejiri ihe karịrị 80% nke ikike nju oyi na-arụ ọrụ. Ozi gbasara ọnụnọ n"ọdịnihu dabere na ọnụọgụ ụbọchị onye ọrụ ọ bụla kwupụtara dị ka ụbọchị echere na nchekwa na nbanye. Kpachara anya na nke a bụ naanị atụmatụ na ọ nwere ike bụrụ nke na-ezighi ezi. Dị ka ndị dị otú ahụ, ọnụ ụlọ na-acha uhie uhie bụ nanị ihe ịrịba ama na ime ụlọ ahụ na-ejupụta. Ọ dịghị mkpa ka ị na-echegbu onwe gị mana ị nwere ike ime ihe dị otú ahụ. Dịka ọmụmaatụ, tụlee ịkpọtụrụ ndị ọrụ jụrụ oyi nke ngwaahịa ha na nchekwa nwere oge kacha nta iji bulie iji nye ha ndụmọdụ ka ha lelee anya. Ị nwere ike ịhụ ndepụta ahaziri nke ihe kacha ngwa ngwa ka ịlele n"okpuru "Dashboard" mgbe ị nyere iwu ka ọ bụrụ oge iburu.',
    },
    {
      id: 48,
      title:
        "Onye ọrụ jụrụ oyi na-ebubata n'ime ụlọ ngwaahịa na-adịghị na ndepụta ahụ. Enwere m ike ịlele nke ahụ?",
      role: [ERoles.OPERATOR, ERoles.EMPLOYEE],
      text: 'na-eziga ọkwa ahụ mgbe ịnataghị data sitere na sensọ ihe karịrị awa iri na abụọ, ma ọ pụtara na ọnọdụ okpomọkụ dị na panel "Cooling Units"> "Ọnọdụ ụlọ" na-eji ugbu a. Ngwa ahụ ga-anwa ịmegharị na ihe mmetụta kwa elekere 1 ọ bụla, yabụ anyị na-adụ ọdụ ichere awa ole na ole ma ọ bụrụ na nke a bụ nsogbu njikọta. Ọ bụrụ na enweghị data sensọ ọhụrụ ruo ọtụtụ awa ma ọ bụ ụbọchị, nsogbu ahụ nwere ike ịdị n"akụkụ ngwaike, dịka ọmụmaatụ, ihe mmetụta nwere ike agwụla batrị.',
    },
    {
      id: 49,
      title:
        'Na Dashboard, ihe ọ bụla nwere mmanya nwere agba. Gịnị ka agba nke mmanya na-anọchi anya?',
      role: [ERoles.EMPLOYEE],
      text: 'Mgbe enweghị sensọ ejikọrọ na ngwa ahụ, ụdị ịgbakọ oge ị ga-ebuli dabere na ọnọdụ okpomọkụ nke Onye Ọrụ setịpụrụ. Nke ahụ bụkwa ihe mere a ga-eji kpalie onye ọrụ itinye ọnọdụ okpomọkụ ọhụrụ na nlele ọhụrụ ọ bụla wee lelee ya. Ka ihe nlereanya ahụ bụrụ nke ziri ezi, ọ dị mkpa na okpomọkụ dị ọhụrụ. Biko kụziere ndị na-arụ ọrụ na ngalaba jụrụ oyi gbasara nzọụkwụ a dị mkpa.',
    },
    {
      id: 50,
      title:
        'Emechaala m nlele nke ọma mana enweghị m ike ịhụ ihe ndị dị na dashboard ahụ. Gịnị kpatara?',
      role: [ERoles.OPERATOR],
      text: 'Mgbapụta a bụ ihe ncheta ka ị gwa ngwa ahụ maka ezigbo ọnọdụ okpomọkụ nke ụlọ jụrụ oyi ma ọ bụrụ na ọ nweghị ihe mmetụta dị na ya (ma ọ bụ ọ bụrụ na ha anaghị arụ ọrụ nke ọma). Ị kwesịrị ịlele ma uru egosiri na popup bụ otu ihe ị nwere ike ịgụ na panel njikwa n"ime ụlọ ahụ. Ọ bụrụ na nke a abụghị ikpe, ị kwesịrị imelite okpomọkụ. Ọzọ, ị nwere ike kwado wee gaa n"ihu na ndenye nbanye. Inwe okpomọkụ setịpụrụ emelitere dị ezigbo mkpa maka ihe nlereanya na-agbakọ oge iji bulie ka ọ bụrụ nke ziri ezi.',
    },
    {
      id: 51,
      title:
        'Emechaala m nlele nke ọma mana enwere m ike ịhụ ihe ndị dị na dashboard. Gịnị kpatara?',
      role: [ERoles.OPERATOR],
      text: 'Dashboard nwere ike iwepụta obere oge iji melite. Biko chọpụtakwa na ihe ndị ị nyochara bụ nke ziri ezi, yana na ị na-ele anya n"otu nju oyi ziri ezi. Ọ bụrụ na ị na-elele okwu a, biko kọọ ya na app@yourvcca.org.',
    },
    {
      id: 52,
      title: 'Kedu otu m ga-esi lelee na ihe mmetụta okpomọkụ na-arụ ọrụ nke ọma?',
      role: [ERoles.OPERATOR],
      text: 'Ndị otu na-emepe emepe ngwa ahụ na-anakọta ụfọdụ ozi dị mkpa gbasara ndị ọrụ jụrụ oyi mgbe mbụ ha malitere iji ụlọ ahụ dị ka data ntọala nke a ga-atụnyere data nke ngwa ahụ nwetara. Naanị ebumnuche bụ ịkwalite imewe ngwa yana itinye n"ime ụlọ oyi.',
    },
    {
      id: 53,
      title: 'Enwetara m ọkwa na ihe mmetụta anaghị arụ ọrụ. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.OPERATOR],
      text: 'A ga-agwa gị ka ịkpọtụrụ onye ọrụ jụrụ oyi bụ onye nyochachara ụfọdụ ihe na-emepụta n"ime ụlọ na nso nso a wee jụọ maka ebe na ego ole ha rere ihe ahụ echekwara n"ime ụlọ ahụ. Ozi a ga-enyere ndị otu ahụ aka ịmepụta ngwa ahụ iji kwado ma melite izi ezi nke amụma ọnụahịa ahịa enyere.',
    },
    {
      id: 54,
      title: 'Kedu ka enwere ike isi gbakọọ oge iji bulie ma ọ bụrụ na enweghị sensọ?',
      role: [ERoles.EMPLOYEE],
      text: 'Gbaa mbọ hụ na ịlele nkuzi na ngalaba FAQ, ebe ha nwere ozi bara uru gbasara ngwa nke nwere ike inye aka dokwuo ajụjụ gị. Ọ bụrụ na ịchọrọ ịkpọtụrụ ndị otu nkwado ngwa, biko ziga email na app@yourvcca.org.',
    },
    {
      id: 55,
      title: 'Oge ọ bụla m malitere nbanye, m na-enweta mpụta mmapụta okpomọkụ. Gịnị kpatara?',
      role: [ERoles.OPERATOR],
      text: 'Gbaa mbọ hụ na ịlele nkuzi na ngalaba FAQ, ebe ha nwere ozi bara uru gbasara ngwa nke nwere ike inye aka dokwuo ajụjụ gị. Ọ bụrụ na azaghị ajụjụ gị, biko kpọtụrụ onye ọrụ edebanyere aha ị na-akọrọ.',
    },
    {
      id: 56,
      title: 'Oge ọ bụla m dechara nlele, ana m enweta mpụta mmapụta okpomọkụ. Gịnị kpatara?',
      role: [ERoles.EMPLOYEE],
      text: 'Biko hụ na etinyere ụdị ngwa kachasị ọhụrụ. Ọ bụrụ na nsogbu ahụ dịgidere, biko gwa ndị otu nkwado ngwa site na izipu ozi-e na app@yourvcca.org ma ọ bụ site na dejupụta n"ụdị nzaghac[APP_LOCALES.HINDI]: https://forms.gle/ceohKHT2QCCE3rFs5.',
    },
    {
      id: 57,
      title:
        'Kedu ihe kpatara m ji kwesị ịjụ onye ọrụ jụrụ oyi ka ọ dejupụta akwụkwọ ajụjụ tupu ya / ya enwee ike ịlele na akpa akpa?',
      role: [ERoles.OPERATOR],
      text: 'Biko hụ na etinyere ụdị ngwa kachasị ọhụrụ. Ọ bụrụ na nsogbu ahụ dịgidere, biko kpọtụrụ onye ọrụ edebanyere aha ị na-akọrọ na/ma ọ bụ gwa ndị otu nkwado ngwa site na izipu ozi email na app@yourvcca.org ma ọ bụ site na dejupụta n"ụdị nzaghac[APP_LOCALES.HINDI]: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 58,
      title: 'Kedu ihe kpatara m ga-eji dejupụta akwụkwọ ajụjụ mgbe m debanyere aha na ngwa ahụ?',
      role: [ERoles.EMPLOYEE],
      text: 'Ndị otu nkwado ngwa ga-amasị ịnụ maka ahụmịhe gị na iji ngwa a ma nabata nzaghachi gị, biko ziga email na app@yourvcca.org ma ọ bụ nyefee nzaghachi gị site na ụdị: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 60,
      title:
        'Kedu ihe kpatara m ji kwesị ịjụ ndị ọrụ jụrụ oyi gbasara ọnụahịa ere nke ihe nchekwa ọ bụla?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Na taabụ a, ị nwere ike ịhụ amụma ọnụahịa ahịa ma ọ bụ na nhazi ma ọ bụ n"ụdị tebụl. The Price Trend Peeji na-enye ohere maka ịlele ọnwa ikpeazụ nke data na amụma ụbọchị 14 maka otu ahịa na ngwa ahịa (na India) ma ọ bụ amụma amụma kwa ọnwa kwa steeti (na Nigeria). Ibe ọkwa ọnụahịa na-enye ohere ịlele amụma ọnụahịa ahịa niile enyere iwu site na elu ruo nke kacha ala, yana enwere ike nyochaa site na ụbọchị, steeti, mpaghara na ahịa (na India).',
    },
    {
      id: 61,
      title: 'Aghọtaghị m akụkụ nke ngwa ahụ. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Gbaa mbọ hụ na ịlele nkuzi na ngalaba FAQ, ebe ha nwere ozi bara uru gbasara ngwa nke nwere ike inye aka dokwuo ajụjụ gị. Ọ bụrụ na ịchọrọ ịkpọtụrụ ndị otu nkwado ngwa, biko ziga email na app@yourvcca.org.',
    },
    {
      id: 62,
      title: 'Aghọtaghị m akụkụ nke ngwa ahụ. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'A zụrụ ụdị mmụta igwe na data ọnụahịa ahịa akụkọ ihe mere eme yana data ndị ọzọ dị ka ọnụego mgbanwe ego na ọnụahịa mmanụ ụgbọala, iji mee amụma maka ọnụahịa ahịa n"ọdịnihu.',
    },
    {
      id: 66,
      title: 'Aghọtaghị m akụkụ nke ngwa ahụ. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.COOLING_USER],
      text: 'Ị nwere ike ịgafe ajụjụ nyocha site na ịpị "Mezue ma emechaa". Ị ga-ahụ nyocha ahụ dị ka akụkụ nke nkọwa Akaụntụ gị ma nwee ike mezue ya oge ọ bụla. Otú ọ dị, a na-atụ aro ka iwepụta oge iji zaa ajụjụ nyocha nke ọma mgbe ịmalitere ime ụlọ: n"ụzọ dị otú a, ị nwere ike nweta ahụmịhe ahaziri ahazi na ngwa Coldtivate!',
    },
    {
      id: 67,
      title: 'Ahụrụ m ahụhụ na ngwa ahụ. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.COOLING_USER],
      text: 'Biko hụ na etinyere ụdị ngwa kachasị ọhụrụ. Ọ bụrụ na nsogbu ahụ dịgidere, biko gwa ndị otu nkwado ngwa site na izipu email na app@yourvcca.org ma ọ bụ site na dejupụta n"ụdị nzaghac[APP_LOCALES.HINDI]: https://forms.gle/ceohKHT2QCcE3rFs5.',
    },
    {
      id: 68,
      title: 'Ihe anaghị arụ ọrụ nke ọma na ngwa. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.OPERATOR],
      text: 'Ọ bụrụ na enwere sensọ okpomọkụ n"ime ụlọ nke enwere ike ijikọ na ngwa Coldtivate, biko kpọtụrụ ndị ọrụ gị. Naanị onye ọrụ nwere ọrụ onye ọrụ edebanyere aha nwere ike jikọta sensọ na nkeji jụrụ oyi emebere na Coldtivate.',
    },
    {
      id: 69,
      title: 'Ihe anaghị arụ ọrụ nke ọma na ngwa. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.COOLING_USER],
      text: 'Biko hụ na etinyere ụdị ngwa kachasị ọhụrụ. Ọ bụrụ na nsogbu ahụ dịgidere, biko kpọtụrụ onye na-ahụ maka ụlọ oyi na/ma ọ bụ gwa ndị otu nkwado ngwa site na izipu email na app@yourvcca.org.',
    },
    {
      id: 70,
      title: 'Achọrọ m ịnye nzaghachi gbasara ahụmịhe m na ngwa ahụ. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.COOLING_USER],
      text: 'Oge iji bulie bụ uru amụma. Ya mere, ihe ndị na-adịghị ahụkebe nwere ike ime, ebe ngwaahịa na-emebi emebi mgbe oge ị ga-eburu ibu karịa 0. Ebe ọ bụ na ire ere nke ihe ọhụrụ na-adabere na okpomọkụ, data okpomọkụ na-enyere amụma aka ka ọ bụrụ nke ziri ezi. Dịka ọmụmaatụ, okwu a nwere ike ibilite mgbe enweghị ihe mmetụta okpomọkụ jikọtara na ngwa ahụ, na onye ọrụ anaghị emelite ọnọdụ okpomọkụ nke ụlọ dị na ngwa ahụ mgbe niile. Biko gwa onye na-ahụ maka ụlọ ahụ ka ọ bụrụ nke a emee.',
    },
    {
      id: 71,
      title: 'Achọrọ m ịnye nzaghachi gbasara ahụmịhe m na ngwa ahụ. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.COOLING_USER],
      text: 'Ndị otu na-emepe emepe ngwa ahụ na-anakọta ụfọdụ ozi dị mkpa gbasara ndị ọrụ jụrụ oyi mgbe mbụ ha malitere iji ụlọ ahụ dị ka data ntọala nke a ga-atụnyere data nke ngwa ahụ nwetara. Naanị ebumnuche bụ ịkwalite imewe ngwa yana itinye n"ime ụlọ oyi.',
    },
    {
      id: 73,
      title: 'Achọrọ m ịnye nzaghachi gbasara ahụmịhe m na ngwa ahụ. Onye ka m ga-akpọtụrụ?',
      role: [ERoles.COOLING_USER],
      text: 'Gbaa mbọ hụ na ịlele nkuzi na ngalaba FAQ, ebe ha nwere ozi bara uru gbasara ngwa nke nwere ike inye aka dokwuo anya ajụjụ gị. Ọ bụrụ na azaghị ajụjụ gị, biko kpọtụrụ onye na-ahụ maka ụlọ oyi, ma ọ bụ degara app@yourvcca.org',
    },
    {
      id: 74,
      title: 'Anọ m na mpaghara ebe njikọ ịntanetị dị ala: Enwere m ike iji ngwa ahụ?',
      role: [ERoles.COOLING_USER],
      text: 'Biko hụ na etinyere ụdị ngwa kachasị ọhụrụ. Ọ bụrụ na nsogbu ahụ dịgidere, biko kpọtụrụ onye na-ahụ maka ụlọ oyi na/ma ọ bụ gwa ndị otu nkwado ngwa site na izipu email na app@yourvcca.org.',
    },
    {
      id: 75,
      title: "Kedu ọnụ ahịa egosiri mgbe ị na-akụ akara ngosi 'ọnụahịa ihe ubi'?",
      role: [ERoles.EMPLOYEE],
      text: 'Ka ihichapụ akaụntụ gị ị nwere ike ịnyagharịa na "NchNhr" -> "Account nkọwa", wee pịa Hichapụ. Biko kpachara anya, omume a enweghị ike ịgbanwe! Ọ bụrụ na ị bụ onye ọrụ ụlọ ọrụ debara aha ikpeazụ, ihe a ga-ehichapụ ụlọ ọrụ ahụ. Ọ bụrụ na enwere ndị nbanye na-echere, ịgaghị enwe ike ihichapụ akaụntụ gị ruo mgbe otu onye ọrụ gị enyochala crates niile n"ime ngwa ahụ.',
    },
    {
      id: 76,
      title: "Kedu ihe kpatara na ụfọdụ steeti na ahịa na-efu na ngalaba 'ọnụahịa ihe ubi'?",
      role: [ERoles.OPERATOR],
      text: 'Ka ihichapụ akaụntụ gị ị nwere ike ịnyagharịa na "NchNhr" -> "Account nkọwa", wee pịa Hichapụ. Biko kpachara anya, omume a enweghị ike ịgbanwe! Ọ bụrụ na ị bụ onye ọrụ ikpeazụ ekenyere n"otu ọnụ ụlọ ebe enwere ndenye nbanye, ị nweghị ike ihichapụ akaụntụ gị ruo mgbe onye ọrụ edebanyere aha ga-ekenye onye ọrụ ọzọ n"ime ụlọ ahụ, ma ọ bụ enyochala crates niile na ngwa ahụ.',
    },
    {
      id: 77,
      title: "Kedu ka esi agbakọ ọnụ ahịa ahịa n'ọdịnihu?",
      role: [ERoles.COOLING_USER],
      text: 'Ka ihichapụ akaụntụ gị ị nwere ike ịnyagharịa na "NchNhr" -> "Account nkọwa", wee pịa Hichapụ. Biko kpachara anya, omume a enweghị ike ịgbanwe! Ọ bụrụ na ị nwere ndenye nbanye n"ime ụlọ ọ bụla, ịnweghị ike ihichapụ akaụntụ gị ruo mgbe achọpụtara crates niile n"ime ụlọ ahụ. Biko hụ na ị na-anakọta akpa gị n"ime ụlọ! Ọ bụrụ na ị chere na e nwere krates na-echere na ngwa ị wepụrụlarị, biko kpọtụrụ onye na-ahụ maka ụlọ ahụ ka ọ dozie ya.',
    },
    {
      id: 78,
      title: 'Ọ ga-amasị m ihichapụ akaụntụ m. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.EMPLOYEE],
      text: 'Ị nwere ike ihichapụ nkeji na ọnọdụ jụrụ oyi site na ịga na "NchNhr" -> "Management" -> "Igwe jụrụ oyi" / "Ebe" wee pịa Hichapụ. Ị ga-enwe ike ime ya ma ọ bụrụ na enweghị nbanye na-echere n"ime ụlọ. Ọzọ, biko kpọtụrụ ndị na-arụ ọrụ ka ha mechaa nlele tupu ị nwaa ihichapụ ụlọ na ebe.',
    },
    {
      id: 79,
      title: 'Ọ ga-amasị m ihichapụ akaụntụ m. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.EMPLOYEE],
      text: 'Anaghị ekwe ka ihichapụ ndị ọrụ ndị ọzọ na ngwa ahụ. Agbanyeghị, ị nwere ike ikenye ndị ọrụ n"ime ụlọ gị site na ịgagharị na "NchNhr" -> "Management" -> "Ndị na-arụ ọrụ". Ọ bụrụ na ị ka na-achọ iwepụ onye ọrụ ka ha ghara ịnweta ụlọ ọrụ gị, biko degara email na app@yourvcca.org ma kọwaa ihe kpatara eji chọọ nke a.',
    },
    {
      id: 80,
      title: 'Ọ ga-amasị m ihichapụ akaụntụ m. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.OPERATOR],
      text: 'Ka ihichapụ onye ọrụ jụrụ na listi ahụ, gaa na "Management" -> "Ndị ọrụ jụrụ oyi", pịa aha njirimara jụrụ oyi wee pịa bọtịnụ "Hichapụ". Biko mara na ọ bụ naanị ndị ọrụ na-enweghị ndenye nbanye nwere ike ihichapụ! Ọ bụrụ na enwere ndenye nbanye na-echere, biko kpọtụrụ onye ọrụ ka ọ buru ngwaahịa a. Mara na omume a enweghị ike ịgbanwe! Ọ bụrụ na onye ọrụ nwere smartphone, ọrụ a ga-ewepụ ya na listi gị, mana onye ọrụ ka ga-enwe ike iji Coldtivate. Ọ bụrụ na onye ọrụ enweghị smartphone, ọrụ a na-ehichapụ akaụntụ ya wee hapụ nọmba ekwentị metụtara ya.',
    },
    {
      id: 81,
      title: 'Kedu otu m ga-esi ihichapụ ngalaba jụrụ oyi ma ọ bụ ebe?',
      role: [ERoles.EMPLOYEE],
      text: 'Ka ịlele oge ikpeazụ ndị ọrụ na ndị ọrụ ndị ọzọ edebanyere aha abanyela na ngwa a, ị nwere ike ịnyagharịa na "NchNhr" -> "Management" -> "Onye ọrụ" / "Onye ọrụ edebanyere aha". Ụbọchị na oge ị na-ahụ n"akụkụ aha bụ ụbọchị na oge nbanye ikpeazụ.',
    },
    {
      id: 82,
      title:
        'Kedu otu m ga-esi ihichapụ onye ọrụ ọzọ edebanyere aha ma ọ bụ onye na-ahụ maka ụlọ ọrụ m?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Anaghị ekwe ka ihichapụ ndị ọrụ ndị ọzọ na ngwa ahụ. Agbanyeghị, ị nwere ike ikenye ndị ọrụ n"ime ụlọ gị site na ịgagharị na "NchNhr" -> "Management" -> "Ndị na-arụ ọrụ". Ọ bụrụ na ị ka na-achọ iwepụ onye ọrụ ka ha ghara ịnweta ụlọ ọrụ gị, biko degara email na app@yourvcca.org ma kọwaa ihe kpatara eji chọọ nke a.',
    },
    {
      id: 83,
      title: 'Kedu otu m ga-esi ihichapụ onye ọrụ jụrụ oyi na listi ahụ?',
      role: [ERoles.COOLING_USER],
      text: 'Site na ịpị ihe dị na dashboard, ị nwere ike ịhụ aha na nọmba kọntaktị nke onye ọrụ mere gị nlele. Ị nwere ike idetuo nọmba ahụ na klipbọọdụ wee kpọtụrụ onye ọrụ site na ekwentị ma ọ bụ SMS.',
    },
    {
      id: 84,
      title: 'Ebee ka m nwere ike nyochaa ma ndị ọrụ ejirila ngwa na nso nso a?',
      role: [ERoles.COOLING_USER],
      text: 'Ka ịlele oge ikpeazụ ndị ọrụ na ndị ọrụ ndị ọzọ edebanyere aha abanyela na ngwa a, ị nwere ike ịnyagharịa na "NchNhr" -> "Management" -> "Onye ọrụ" / "Onye ọrụ edebanyere aha". Ụbọchị na oge ị na-ahụ n"akụkụ aha bụ ụbọchị na oge nbanye ikpeazụ.',
    },
    {
      id: 85,
      title:
        'Ebee ka m nwere ike nyochaa ego a na-enweta site na ọnụ ụlọ ọ bụla yana ọnụ ọgụgụ ojiji ndị ọzọ?',
      role: [ERoles.COOLING_USER],
      text: 'Ị nwere ike ịnyagharịa na "NchNhr"-> "Management" -> "Revenue Analysis", họrọ nkeji jụrụ oyi na oge nke mmasị, na ị ga-ahụ mkpokọta ego emetụtara na nlele si na ụlọ ndị a. Ị nwekwara ike nzacha site na onye ọrụ jụrụ oyi, usoro ịkwụ ụgwọ na oge. Ka iji were anya nke uche hụ nchịkọta nchịkọta nke ndenye nbanye gị n"otu ọnụ ụlọ (dị ka ọnụ ọgụgụ ndị ọrụ, ọnụ ọgụgụ nke crates, wdg), ị nwere ike ịnyagharịa na "NchNhr" -> "Management" -> "Usage Analysis". Ọzọkwa ebe a ị nwere ike nzacha site ụbọchị na oyi unit. Na ibe abụọ a, enwere ike ibudata ozi dịka faịlụ Excel. Na taabụ "Analyis", ị nwere ike ịchọta dashboard ọzọ nwere ozi gbasara ndị ọrụ, ego ha nwetara, ojiji na mmetụta. N"ikpeazụ, iji nyochaa ngụkọta ọnụ ọgụgụ nke crates, arọ, na ezigbo okpomọkụ maka ihe ubi ugbu a n"ime ụlọ, ị nwere ike ịnyagharịa na "More" -> "Cooling nkeji" -> "Crates info".',
    },
    {
      id: 86,
      title:
        'Kedu otu m ga-esi chọpụta onye bụ onye na-akpakọrịta maka ngalaba jụrụ oyi ebe a na-echekwa ihe m mepụtara?',
      role: [ERoles.OPERATOR],
      text: 'Ndị otu nkwado ngwa ga-amasị ịnụ maka ahụmịhe gị na iji ngwa a ma nabata nzaghachi gị, biko ziga email na app@yourvcca.org ma ọ bụ nyefee nzaghachi gị site na ụdị: https://forms.gle/2gKVzZjkJSPqEAan9.',
    },
    {
      id: 87,
      title: 'Enwetala m ọkwa. Kedu ihe m kwesịrị ịme?',
      role: [ERoles.COOLING_USER],
      text: 'Ndị otu nkwado ngwa ga-amasị ịnụ maka ahụmịhe gị na iji ngwa a wee nabata nzaghachi gị, biko ziga ozi email na app@yourvcca.org.',
    },
    {
      id: 88,
      title: 'Kedu ihe egosiri na maapụ nkeji oyi?',
      role: [ERoles.COOLING_USER],
      text: 'Na map ị nwere ike iji anya nke uche hụ ọnọdụ gị (a ga-ajụ gị maka ikike maka Coldtivate iji nweta ọnọdụ gị), ọnọdụ nke nkeji oyi gbara gị gburugburu, na ụfọdụ ozi gbasara nkeji (otu ma ọ bụ multicommodity, ụlọ ọrụ, ọnụahịa). Site na ịga n"ime ụlọ oyi, ị nwere ike nweta ozi ndị ọzọ site n"aka onye na-ahụ maka ụlọ oyi na-arụ ọrụ nke unit na ohere maka nchekwa.',
    },
    {
      id: 89,
      title: 'Kedu ka m ga-esi gbanwee asụsụ nke ngwa ahụ?',
      role: [ERoles.AUTH],
      text: 'Ka ịgbanwee asụsụ ngwa, ị nwere ike pịa ndọpụta ị na-ahụ na ala nke homepage, ma ọ bụ, ozugbo ịbanye na profaịlụ gị, gaa na "NchNhr" -> "Nkọwa akaụntụ" -> "mmasị ebe obibi".',
    },
    {
      id: 90,
      title:
        'Ụdị ihe mmetụta okpomọkụ m bụ Coldtivate (Ecozen, UbiBot, Figorr, Victron Energy) kwadoro. Kedu ka m ga-esi melite sensọ?',
      role: [ERoles.EMPLOYEE],
      text: 'Ka ijikọ ihe mmetụta na unit jụrụ oyi, ị nwere ike ịnyagharịa na "NchNhr" -> "Management" -> "Cooling Units", họrọ unit nke a ga-edozi sensọ maka, wee tụgharịa "Sensọ dị". Ị nwere ike soro ntuziaka maka ụdị ihe mmetụta ọ bụla akwadoro wee chọpụta. Cheta na elekere "Chekwa" na ala nke ibe maka mgbanwe ndị a ga-echekwa. Ị ga-ahụ n"ọgụgụ okpomọkụ site na sensọ gị n"ime awa 6 na-esote n"okpuru "Ọzọ" -> "Nkeji oyi" -> "Ọnọdụ ime ụlọ".',
    },
    {
      id: 91,
      title:
        "Kedu ihe dị iche n'etiti 'Company', 'Aggregated', and' Comparison' na taabụ nchịkọta akụkọ?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'The Analytics tab na igodo nsoroụzọ na-enye nchịkọta nchịkọta maka niile ụlọ oyi na-atụ ụlọ. Na nlele "Company", ị na-ahụ data na ndị ọrụ, ojiji, yana mmetụta maka nkeji niile jụrụ oyi kemgbe ịmalitere iji Coldtivate. Site na ịpị "Aggregated", a na-akpali gị ịhazi nkeji jụrụ oyi na oge oge ị nwere mmasị na ya. A na-agbakọta data egosiri maka ndị ọrụ, ojiji na mmetụta n"ofe nkeji oyi ahọpụtara na oge a họọrọ. Ọ bụrụ na-ịchọrọ ịtụnyere n"ofe nkeji, ị nwere ike iji taabụ "Comparison". N"ebe a, a na-egosipụta data ahụ na tebụl, ebe a na-ewepụ data sitere na nkeji ọ bụla jụrụ oyi na oge oge a họọrọ. Ị nwere ike hazie data ma gbanwee nkeji na oge oyi n"oge ọ bụla.',
    },
    {
      id: 92,
      title: 'Kedu otu esi agbakọọ data egosiri na taabụ nchịkọta?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ebumnuche nke taabụ nchịkọta bụ ịnye echiche zuru oke nke ihe na-eme n"ime ụlọ oyi. A na-agbakọ data onye ọrụ na ojiji n"ime ozi nbanye na nbanye na Coldtivate. Ị nwere ike ịghọta otú ọtụtụ ndị ọrụ na arụmọrụ na-eme, na ihe bụ ego ha ga enweta ma ọ bụ nkezi nke ọnụ ụlọ oyi ọ bụla. N"aka nke ọzọ, data nke mpaghara mmetụta, dabere na nyocha nke ndị ọrụ jụrụ oyi na-ajụ ka ha mejupụta mgbe ha debanyere aha (ya bụ tupu ha amalite iji nchekwa oyi) na mgbe niile ka ha na-achọpụta ihe na-emepụta site na ụlọ oyi. Data a dị oke mkpa iji tụọ ngbanwe nke mfu akwụkwọ akụkọ na ego ndị ọrụ na-enweta ka ha na-eji ntụ oyi. N"ikpeazụ, ntule CO2 na-atụnyere mpụta nke jikọtara ya na ime ka ihe ọkụkụ ndị echekwara n"ime ụlọ oyi na-ekpo ọkụ na ihe ndị e buru n"amụma na otu ihe ọkụkụ ahụ gaara eme ma ọ bụrụ na echekwara ya na friji.',
    },
    {
      id: 93,
      title: 'Kedu otu esi agbakọọ data egosiri na taabụ nchịkọta?',
      role: [ERoles.COOLING_USER],
      text: 'Ebumnuche nke taabụ Analytics bụ inye gị nlele zuru oke nke mmetụta dị jụụ na ihe ọkụkụ gị. A na-agbakọ data egosiri n"okpuru "Crates" site na nbanye na ozi nlele edere na Coldtivate. Ị nwere ike otú ahụ ole ị na-echekwara nke akuku na nkezi nchekwa oge. Data nke ngalaba "Mmetụta" dabere na nyocha nke a gwara gị ka ị mejupụta mgbe ị debanyere aha (ya bụ tupu ịmalite iji nchekwa oyi) na mgbe niile ka ị na-elele ihe na-emepụta site na ụlọ oyi. Data a dị oke mkpa iji tụọ ngbanwe nke mfu na ego ha nwetara mgbe ị na-eji oyi. E gosipụtara ihe ncheta iji dejupụta nyocha ndị a n"elu ibe ahụ, anyị na-agbakwa gị ume ka ị dejupụta ha mgbe ọ bụla enwere ike. Na ngalaba abụọ ahụ, ịnwere ike iji bọtịnụ "Configure" dị n"elu aka nri ịhọrọ ọnụ ụlọ oyi ma ọ bụ oge. Ọ bụrụ na ọ nweghị ihe ahọpụtara, ị ga-ahụ data niile dị kemgbe ịmalitere iji Coldtivate.',
    },
    {
      id: 94,
      title: 'Ana m abanye mana enweghị m ike ịhụ ọrụ ahịa ahịa. Gịnị kpatara?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ọ bụrụ na akwadoro ebe a na-ere ahịa na obodo gị, ị ga-ahụ akara ngosi "Ebe Ahịa" n"ime ogwe igodo ala. Ọ bụrụ na ịgaghị ahụ ya, ọ pụtara na anaghị akwado ọrụ a na obodo gị. N"oge a, ahịa dị naanị maka ndị ọrụ dabere na Nigeria. Ọ bụrụ na ị bụ onye ọrụ edebanyere aha ma nwee mmasị ịkwọ ụgbọ elu n"ahịa dị na obodo gị, biko kpọtụrụ anyị na app@yourvcca.org.',
    },
    {
      id: 95,
      title: "Kedu ọrụ nke ụlọ ọrụ jụrụ oyi n'ahịa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ụlọ ọrụ jụrụ oyi na ndị ọrụ ya nwere ike ikpebi ọkwa itinye aka ha n"ahịa. Dị ka ọrụ na-adabere na crates na-enyocha na ngwa Coldtivate, ebe ahịa nwere ike ịrụ ọrụ naanị ma ọ bụrụ na onye na-ahụ maka ụlọ oyi na-edebanye aha na nbanye na nlele ọrụ na ngwa. Maka ngwaahịa a zụtara site n"ọma ahịa, ụlọ ọrụ jụrụ oyi na-anata ego jụrụ oyi dịka akụkụ nke azụmahịa dijitalụ. Ọ dị oke mkpa na onye ọrụ edebanyere aha na-edobe nkọwa akaụntụ ụlọ akụ nke ụlọ ọrụ: ime nke a, ị ga-aga na "NchNhr" -> "Management" -> "Ntọala ndị na-ere ere (Ụlọ ọrụ)" -> "Nhọrọ ịkwụ ụgwọ". Na mgbakwunye, ụlọ ọrụ jụrụ oyi nwere ike ikpebi ịzụta ihe sitere n"aka ndị ọrụ ugbo (na-arụ ọrụ nke onye zụrụ ya) wee regharịa ihe ubi ndị ahụ n"ọma ahịa (na-arụ ọrụ nke onye na-ere ahịa). Enwere ike ịme azụmahịa abụọ ahụ site na ahịa ahịa Coldtivate. Rịba ama na ma ndị ọrụ na ndị ọrụ debanyere aha nwere nhọrọ ịzụtara onwe ha (dị ka ndị mmadụ n"otu n"otu) ma ọ bụ n"aha ụlọ ọrụ ha na-anọchite anya ya.',
    },
    {
      id: 96,
      title: "Kedu ọrụ onye na-arụ ụlọ oyi n'ahịa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ndị na-arụ ụlọ oyi n"ahịa nwere ọrụ atọ bụ isi. 1) Ha na-enyere ndị ọrụ jụrụ oyi na-enweghị smartphone iji guzobe akaụntụ akụ ha (ka ha wee nweta ụgwọ dijitalụ), depụta akpa ha "maka ọrịre" na ọnụahịa ha. 2) Ha na-ahụ maka idobe ihe ndị a na-emepụta n"ime ụlọ oyi na-ahazi na-agbaso ụkpụrụ na ihe niile dị na crate bụ nke otu onye ọrụ: mgbe a na-azụta ihe ụfọdụ na-emepụta na crate (ma si otú ahụ bụrụ nke onye nwe ya dị iche), onye ọrụ na-enweta ọkwa ka ọ bugharịa ihe a zụtara na crate dị iche. Ọ bụrụ na a zụtara igbe zuru ezu, ọ nweghị ihe achọrọ. 3) Ndị na-ahụ maka ime ụlọ oyi na-ahụ maka ọrụ nlele niile, gụnyere ndị sitere n"ọma ahịa: mgbe onye na-azụ ahịa (ma ọ bụ onye nnọchi anya nnyefe) rutere n"ọnụ ụlọ oyi iji buru ihe a zụtara, onye ọrụ kwesịrị ịlele crate si Coldtivate.',
    },
    {
      id: 97,
      title: "Kedu ka esi anakọta ụgwọ jụrụ oyi n'ọma ahịa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Mgbe a na-azụta crates n"ọma ahịa, a na-ewepụ ego jụrụ oyi ruo ụbọchị ahụ n"ọnụ ahịa onye zụrụ ya na-akwụ ma bufee ya na ụlọ ọrụ jụrụ oyi. N"ụzọ dị otú a, onye na-ere ahịa agaghị edozi ego jụrụ oyi, dịka nke a na-emebu na azụmahịa dijitalụ. N"ihi nke a, ọ dị oke mkpa na ma ụlọ ọrụ ndị na-ere ahịa na ndị na-ajụ oyi nwere akaụntụ ụlọ akụ eguzobere na Coldtivate. Dịka ọmụmaatụ, ọ bụrụ na a na-azụta crate maka 20 USD, na onye na-ere ahịa ji 3 USD nke ụgwọ jụrụ oyi, n"ime USD 20 nke onye zụrụ ya kwụrụ, a ga-ebufe 17 USD na akaụntụ ụlọ akụ nke onye na-ere ahịa, na 3 USD ga-ebufe na akaụntụ ụlọ akụ nke ụlọ ọrụ jụrụ oyi. Ọ bụrụ na onye na-azụ ihe na-abịa iburu ihe a na-emepụta n"otu ụbọchị ahụ a zụrụ ya, ọ dịghị ego ọ bụla jụrụ oyi (n"ihi na onye na-ere ya akwụlarị ụgwọ ụbọchị ọ bụla). Otú ọ dị, ọ bụrụ na onye na-azụ ihe ekpebie idobe ihe ndị a na-emepụta na nchekwa, a na-akwụ ụgwọ ego jụrụ oyi, a ga-agbakọkwa ọnụahịa ahụ dabere na ụbọchị ole a na-echekwa ihe a na-emepụta n"ime ụlọ oyi ruo mgbe onye zụrụ ya eburu ya. Onye na-ahụ maka ime ụlọ oyi na-ahụ maka ịnakọta ụgwọ ntụ oyi ndị a na nlele. Rịba ama na ọ bụrụ na nnyefe, otu ezi uche dị.',
    },
    {
      id: 98,
      title: "Kedu otu m ga-esi malite ire ngwaahịa n'ọma ahịa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ka igbe gị dị maka ire ere, ịkwesịrị ịme omume abụọ. 1) Hazie akaụntụ ụlọ akụ, ebe a ga-edobe ego a ga-enweta. Ọ bụrụ na ị nwere smartphone, ị nwere ike ime ya site na ịgagharị na "NchNhr" -> "Nkọwa akaụntụ" -> "Nhọrọ ịkwụ ụgwọ". Ọ bụrụ na ị na-adịghị a smartphone, onye ọrụ nwere ike melite ụlọ akụ akaụntụ si ya / ya interface ("Management" -> "Cooling Users" -> "Payout nkọwa". Biko mara na dị ka ihe niile ugwo na-eme digitally n"ọma ahịa, ị ga-enye a nti akaụntụ akụ tupu ihe ọ bụla e depụtara "maka ire". ihe dashboard, gaa na "Crate arọ na ndepụta ebe a na-ere ahịa", tọọ akpa nke ị ga-achọ ịtọ "maka ọrịre" yana ọnụahịa kwa kilogram. Ndị na-eri ihe n"ọma ahịa ga-enwe ike ịhụ krates ndị a, wee zụta na ego egosiri. Ị ga-enweta ọkwa mgbe ọ bụla ịzụrụ ihe. Ọ bụrụ na ịnweghị smartphone, onye na-ahụ maka ime ụlọ oyi nwere ike ịtọ igbe "maka ọrịre" mgbe ị mere nbanye, ma ọ bụ mgbe emechara, na-agbaso otu usoro ahụ. Ị ga-enweta SMS ma ọ bụrụ na onye na-ahụ maka ọrụ emelite crates gị edepụtara ma ọ bụ ọnụ ahịa gị mgbe nbanye.',
    },
    {
      id: 99,
      title: 'Ndị na-azụ ahịa nwere ike ịhụ nkọwa kọntaktị m?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ị nwere ike ikpebi onwe gị ma ndị ahịa nwere mmasị ịzụrụ ngwaahịa gị ga-enwe ike ịhụ nkọwa kọntaktị gị. Nke a nwere ike ịba uru ma ọ bụrụ na mkparịta ụka ọnụahịa ma ọ bụ iwu ugboro ugboro maka mmepụta nke na-edobebeghị n"ime ụlọ oyi (ma si otú a na-adịghị ahụ maka onye zụrụ ya). Ị nwere ike imelite ntọala gị oge ọ bụla n"okpuru "NchNhr" -> "Nkọwa akaụntụ" -> "Nnwekọrịta kọntaktị".',
    },
    {
      id: 100,
      title: 'Ọ ga-amasị m ịnye onye zụrụ ego mbelata. Kedu ka m ga-esi mee ya?',
      role: [ERoles.EMPLOYEE],
      text: 'N"okpuru "NchNhr" -> "Nkọwa akaụntụ" -> "Kupọns ego", ị nwere ike ịmepụta Kupọns nke nwere koodu na mbelata pasent. Ndị a bụ Kupọns ndị bara uru maka ngwaahịa ị na-ere (dị ka onye ọ bụla). Iji tọọ kupọns ndị bara uru maka ụlọ ọrụ nwere, ị nwere ike ịnyagharịa na "NchNhr" -> "Mangement" -> "Kupọns akwụ ụgwọ" n"okpuru "Seller settings (Company)". Ị nwere ike ịkekọrịta koodu coupon n"aka onye ahịa, ọ nwekwara ike ịgbapụta koodu ahụ na ihuenyo ịkwụ ụgwọ. Koodu ndenye ga-adị irè ruo mgbe ị kagbuo ha. Ọ bụrụ na ị ga-achọ ịnye ndị niile nwere ike ịzụta ego mbelata, ị nwere ike wedata ọnụahịa ire ere n"ahịa.',
    },
    {
      id: 101,
      title: 'Ọ ga-amasị m ịnye onye zụrụ ego mbelata. Kedu ka m ga-esi mee ya?',
      role: [ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'N"okpuru "NchNhr" -> "Nkọwa akaụntụ" -> "Kupọns ego", ị nwere ike ịmepụta Kupọns nke nwere koodu na mbelata pasent. Ị nwere ike ịkekọrịta koodu coupon n"aka onye ahịa, ọ nwekwara ike ịgbapụta koodu ahụ na ihuenyo ịkwụ ụgwọ. Koodu ndenye ga-adị irè ruo mgbe ị kagbuo ha. Ọ bụrụ na ị ga-achọ ịnye ndị niile nwere ike ịzụta ego mbelata, ị nwere ike wedata ọnụahịa ire ere n"ahịa.',
    },
    {
      id: 102,
      title: 'Kedu ka ndị na-ahụ maka ụlọ oyi ga-esi nyere m aka ịzụ ahịa ihe ọkụkụ m?',
      role: [ERoles.COOLING_USER],
      text: 'Ndị na-ahụ maka ime ụlọ oyi bụ ebe kọntaktị gị maka ihe ọ bụla metụtara ịchekwa ngwaahịa n"ime ụlọ oyi, ma nwekwara ike inyere gị aka ịzụ ahịa ihe ọkụkụ gị ọbụlagodi ma ọ bụrụ na ịnweghị ohere ịnweta smartphone. Site na interface ha, ha nwere ike ịtọ nkọwa akaụntụ akụ gị, ebe ị ga-enweta ego sitere na ire ngwaahịa. N"oge nbanye, ha nwere ike inyere gị aka ịdepụta crates "maka ọrịre", nke na-eme ka a na-ahụ ha n"ọma ahịa, ma debe ọnụahịa ire ere (kwa kilogram) maka ngwaahịa ọ bụla. Ọ bụrụ na ị gbanwee obi gị, ị nwere ike ịrịọ mgbe niile ka ịgbakwunye ma ọ bụ wepụ crates n"ahịa site na ịdepụta ma ọ bụ ihichapụ ha dị ka "ire ere". N"ime ụlọ ụfọdụ oyi, ndị na-arụ ọrụ ma ọ bụ ndị ha na ha na-arụkọ ọrụ na-ahụkwa maka ịzụrụ ihe ọkụkụ n"aka ndị ọrụ ugbo, na ire ya ndị na-ere ahịa. Ma ị bụ onye ọrụ ugbo ma ọ bụ onye na-azụ ahịa nwere mmasị na nhọrọ a, ma ọ bụ onye na-ere ahịa nwere mmasị ịzụta nnukwu ego site na ọnụ ụlọ oyi, biko kpọtụrụ ụlọ ọrụ jụrụ oyi iji chọpụta ohere a.',
    },
    {
      id: 103,
      title: "Gịnị bụ nhọrọ 'Zụrụ n'aha ụlọ ọrụ' m na-ahụ n'ọma ahịa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR],
      text: 'Ndị na-arụ ọrụ na ndị ọrụ debanyere aha nwere ike ịre ma zụta ihe n"ahịa maka onwe ha, dịka ndị mmadụ n"otu n"otu, ma ọ bụ n"aha ụlọ ọrụ ha na-anọchite anya ya. Nhọrọ a na-enye ohere ka e mebie azụmahịa niile site na na akaụntụ ụlọ akụ nke ụlọ ọrụ, ọ bụghị site na akaụntụ akụ nke onye ọ bụla. Mgbe onye ọrụ ma ọ bụ onye ọrụ debanyere aha zụrụ ngwaahịa "n"aha ụlọ ọrụ", ụlọ ọrụ ahụ na-akwụ onye na-ere ya ego ruru ya, wee bụrụ onye nwe akpa ahụ. Ọ bụrụ na edepụtara igbe ndị ahụ maka ọrịre n"ọma ahịa, a na-egosi ha dị ka ụlọ ọrụ jụrụ oyi nwere ya, a na-ezigakwa ego ire ere na akaụntụ ụlọ akụ ụlọ ọrụ. Mgbe onye ọrụ ma ọ bụ onye ọrụ debanyere aha zụtara onwe ya ihe, ha ga-akwụ onye na-ere ahịa ego ruru ya site na nkọwa akaụntụ ụlọ akụ nke ha nyere wee bụrụ onye nwe akpa ahụ n"onwe ya. Ọ bụrụ na echekwara ha na ngalaba jụrụ oyi, a ga-edepụta ha n"okpuru aha onye ọrụ ma ọ bụ ndị ọrụ debara aha ma ọ bụrụ na edepụtara ha maka ọrịre n"ọma ahịa, a ga-egosikwa ha dị ka onye ọrụ ma ọ bụ onye ọrụ debanyere aha nwe ya.',
    },
    {
      id: 104,
      title: "Kedu ụgwọ ọrụ egosiri n'ahịa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ọnụ ahịa ire ere nke ihe ọ bụla gosipụtara n"ahịa bụ nke onye na-ere ere setịpụrụ ozugbo ma dabere n"ụdị kilogram azụrụ. N"elu ego ahụ, ebe a na-ere ahịa na-agụnye ụgwọ abụọ: ụgwọ ebe a na-ere ahịa bụ ụgwọ azụmahịa 3.5% nke ndị otu Coldtivate na-anakọta iji kwado ma nọgide na-arụ ọrụ ngwa. Ụgwọ ịkwụ ụgwọ bụ ụgwọ nke usoro ịkwụ ụgwọ dijitalụ (PayStack na Nigeria) na-ana iji hazie azụmahịa ahụ.',
    },
    {
      id: 105,
      title:
        "Abụ m onye na-azụ ihe nwere mmasị ịzụta ihe sitere na ọnụ ụlọ oyi, mana ahụghị m ihe ọ bụla n'ọma ahịa. Gịnị kpatara?",
      role: [ERoles.COOLING_USER],
      text: 'Ọ bụrụ na ị gagharịa na taabụ Marketplace mana ị nweghị ike ịhụ ihe nrụpụta ọ bụla, nke a nwere ike ịbụ n"ihi nzacha ị tinyegoro na nchọta (dị ka ọnọdụ, oke ọnụahịa, ma ọ bụ ihe ubi nke mmasị), ma ọ bụ ọ nwere ike ịbụ n"ihi na ọ nweghị ihe dị maka ire ere n"akụkụ gị. Ọ bụrụ na ịmara maka ọnụ ụlọ oyi dị nso, anyị na-akwado ịjụ onye na-ahụ maka ụlọ oyi ma onye ọrụ jụrụ oyi nwere mmasị ire ngwaahịa site na arụmọrụ ahịa wee rịọ ka edepụta ihe ndị ahụ na ngwa ahụ.',
    },
    {
      id: 106,
      title: 'Ị na-enye ọrụ nnyefe?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Ebe a na-ere ahịa anaghị enye ọrụ nnyefe n"oge a, mana ọ na-eme ka njikọ dị na ngwọta ngwa ngwa nwere ike ibuga ndị na-azụ ahịa ihe. Dịka onye ọrụ edebanyere aha, ị nwere nhọrọ ịgbakwunye kọntaktị nnyefe n"okpuru "NchNhr" -> "Management" -> "Ntọala ndị na-ere ere (Ụlọ ọrụ)" -> "Kntaktsị Nnyefe". A na-egosipụta ha nye ndị niile na-azụ ahịa na-azụta ihe sitere na ọnụ ụlọ oyi gị na ịkwụ ụgwọ. Ọ bụrụ na ị bụ onye na-azụ ihe, a na-agba gị ume ịkpọtụrụ ha ka ha hazie nnyefe gị. Biko mara na ọ bụrụ na a na-eburu ihe ọkụkụ ahụ n"otu ụbọchị ahụ a zụrụ ya, ọ nweghị ụgwọ jụrụ oyi na-emetụta, ma ọ bụrụ na ị na-edebe ihe ọkụkụ ahụ na nchekwa, a ga-akwụ ụgwọ ịkwụ ụgwọ kwa ụbọchị. Gbaa mbọ hụ na gị na kọntaktị nnyefe ị na-akparịta ụka nke a.',
    },
    {
      id: 107,
      title:
        "Enwetara m ọkwa n'ime ngwa ahụ na-ekwu na 'Ekwesịrị ikesagharị mmepụta'. Kedu ihe bụ ihe ahụ?",
      role: [ERoles.OPERATOR],
      text: 'N"ihi usoro nbanye n"ime ụlọ oyi, ọdịnaya nke otu crate bụ nke otu onye ọrụ ugbo ma ọ bụ onye ahịa. Dị ka, n"ọma ahịa, onye na-azụ ihe nwere ike ịzụta ụfọdụ kg si a crate nke onye na-ere ahịa, ego zụrụ kwesịrị ibuga na iche iche crate. Ọkwa a na-agwa gị na azụrụla ihe, na site na ịpị ya, ị nwere ike were anya nke uche hụ nke a ga-esi were were were were. Idobe igbe dị n"usoro dị mkpa iji hụ na anaghị enyocha ihe ọkụkụ n"amaghị ama, yana na anakọtara ụgwọ jụrụ oyi nke ọma. Anyị na-akwado iji ọrụ "Crate ID" na ndebanye aha iji kpado crates na Coldtivate na akpa anụ ahụ yana ngwa ngwa soro nke crates chọrọ nlebara anya gị dabere na ọkwa.',
    },
    {
      id: 108,
      title: "Ego ole ka m nwere ike ịzụta n'ọma ahịa?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Maka ihe ọ bụla egosiri n"ọma ahịa, ị nwere ike ịzụta crate zuru ezu ma ọ bụ ọnụọgụ kilogram ọ bụla dị na crate. Obere ego enwere ike zụta bụ 1 kg.',
    },
    {
      id: 109,
      title: 'Azụtara m ụfọdụ ngwaahịa ma ọ ga-amasị m ire ya ọzọ. Kedu ka m ga-esi mee ya?',
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Mgbe ịzụrụ ụfọdụ ihe n"ahịa, ị ga-abụ onye nwe ego a zụrụ. Na "Dashboard", ị ga-ahụ ntinye ọhụrụ nke na-egosi ihe ị kwakọbara n"ime ụlọ oyi. Ọ bụrụ na ịchọrọ ire ya maka ọrịre, ị nwere ike pịa akara "">" n"akụkụ aka nri nke ihe dashboard ahụ, gaa na "Crate weight and marketlist list", setịpụ crates ị ga-achọ ịtọ "maka ọrịre" yana ọnụahịa kwa kilogram. Ndị na-eri ihe n"ọma ahịa ga-enwe ike ịhụ krates ndị a, wee zụta na ego egosiri. Biko mara na ka ịtọọ igbe maka ọrịre, ekwesịrị ịhazi akaụntụ ụlọ akụ gị. Soro ntuziaka ka ịgbakwunye nkọwa akaụntụ akụ gị, ma ọ bụ gaa na "NchNhr" -> "Nkọwa akaụntụ" -> "Nhọrọ ịkwụ ụgwọ".',
    },
    {
      id: 110,
      title: "Apụrụ m usoro ịkwụ ụgwọ n'ahịa. Kedu ka m ga-esi mechaa nzụta m?",
      role: [ERoles.EMPLOYEE, ERoles.OPERATOR, ERoles.COOLING_USER],
      text: 'Mgbe ịmalitere ịzụrụ ihe site na ịpị "Pay" na Shopping Cart, a na-ebute gị gaa na onye na-eweta ugwo (PayStack na Nigeria). Ọ bụrụ na, n"ihi ihe ọ bụla, ịhapụ usoro a, a ga-akara iwu gị ka "ụgwọ na-echere". Ị nwere ike ịchọta usoro gị n"okpuru taabụ "My Orders" na ibe ahịa. Ị nwere ike pịa ihe ahụ iji mechaa ịkwụ ụgwọ ahụ. Ị nwere nkeji 30 iji mezue ịkwụ ụgwọ ahụ, mgbe nke ahụ gasịrị, a na-atụle usoro ahụ "Akagbuola" ma hapụ ego ahụ maka ndị na-azụ ahịa ndị ọzọ ịzụta ya.',
    },
    {
      id: 111,
      title: 'Enweghị m ike ịlele ụfọdụ ihe ọkụkụ. Gịnị mere ihe a ji eme?',
      role: [ERoles.OPERATOR],
      text: 'Ọ bụrụ na ị na-agbalị ịlele ụfọdụ crates ndị e depụtara n"ọma ahịa, na-enweghị ike ịlele ha, nke a nwere ike ịbụ n"ihi na eziokwu na ha bụ akụkụ nke a na-echere ịkwụ ụgwọ. Nke a pụtara na onye na-azụ ahịa atụkwasịla ha n"ụgbọ ịzụ ahịa wee malite usoro ịzụrụ ihe. Onye na-azụ ahịa nwere nkeji 30 iji mezue ụgwọ ahụ, mgbe nke ahụ gasịrị, a ga-akagbu iwu ahụ. Mgbe nkeji 30 gachara, ị ga-enwe ike ịlele igbe ahụ.',
    },
  ],
};
