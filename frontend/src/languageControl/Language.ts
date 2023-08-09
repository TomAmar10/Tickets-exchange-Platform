export interface LanguageTopNavbar {
  toggleLang: string;
  login: string;
  english: string;
  hebrew: string;
  modeSwitch: {
    seller: string;
    buyer: string;
  };
}

export interface LanguageMainAuth {
  signin: string;
  signup: string;
  copyrights: string;
}

export interface LanguageLoginForm {
  header: string;
  email: string;
  password: string;
  loginBtn: string;
  forgotPassword: string;
  newAccount: string;
}

export interface LanguageRegisterForm {
  header: string;
  quickProcess: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  other: string;
  female: string;
  male: string;
  profilePicture: string;
  imageError: string;
  emailError: string;
  signupBtn: string;
  haveAccount: string;
}

export interface LanguagePlatformsAuth {
  or: string;
  facebook: string;
  google: string;
}

export interface LanguageSendEmail {
  header: string;
  description: string;
  cancelBtn: string;
  searchBtn: string;
  emailSent: string;
  tryAgain: string;
  seconds: string;
}

export interface LanguageVerification {
  header: string;
  description: string;
  verifyBtn: string;
  didntReceive: string;
  sendAgain: string;
}

export interface LanguageNewPassword {
  header: string;
  enterPassword: string;
  confirmPassword: string;
  resetBtn: string;
  successMsg: string;
  tooLongErr: string;
  samePasswordErr: string;
  goToLogin: string;
}

export interface LanguageChooseMode {
  hey: string;
  whatToDo: string;
  sellBtn: string;
  buyBtn: string;
}

export interface LanguageAdminData {
  header: string;
  userList: string;
  eventList: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  rating: string;
  eventName: string;
  date: string;
  category: string;
  location: string;
  status: string;
  approved: string;
  waiting: string;
}

export interface LanguageHomeTopHeader {
  header: string;
  paragraph: string;
  searchPlaceholder: string;
  noEvents: string;
  seeAll: string;
  createEvent: string;
  dates: string;
  searchBtn: string;
}

export interface LanguagePopularEvents {
  header: string;
}

export interface LanguageUpcomingEvents {
  header: string;
  weekDays: string[];
  anyCategory: string;
  noEvents: string;
  viewAll: string;
}

export interface LanguageSideNav {
  admin: string;
  home: string;
  tickets: string;
  offers: string;
  wallet: string;
  notifications: string;
  createEvent: string;
  favorites: string;
  contact: string;
  settings: string;
  language: string;
  logout: string;
}

export interface LanguageEventPreview {
  about: string;
  category: string;
  location: string;
  date: string;
  maxError: string;
  detailsBtn: string;
  buyBtn: string;
  sellBtn: string;
  loginBtn: string;
}

export interface LanguageEventForm {
  header: string;
  eventName: string;
  eventNamePlaceholder: string;
  category: string;
  location: string;
  locationPlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  image: string;
  imagePlaceholder: string;
  eventDate: string;
  createBtn: string;
  approveBtn: string;
}

export interface LanguageStepsDots {
  step: string;
}

export interface LanguageNextPrevButtons {
  next: string;
  prev: string;
}

export interface LanguageTicketsAmount {
  howManySell: string;
  howManyBuy: string;
  maxMsg1: string;
  maxMsg2: string;
}

export interface LanguageSaleCompleted {
  header: string;
  sellerMsg: string;
  buyerMsg: string;
  ticketsBtn: string;
  offersBtn: string;
}

export interface LanguageTicketsDetails {
  header: string;
  types: string[];
  currencies: string[];
  type: string;
  price: string;
  currency: string;
  seat: string;
  row: string;
  area: string;
  areaMsg: string;
}

export interface LanguageTicketUpload {
  header: string;
  done: string;
  dragDrop: string;
  or: string;
  browse: string;
  proof: string;
  proofRequired: string;
}

export interface LanguageSelectArea {
  header: string;
}

export interface LanguageSingleSellerCard {
  rated: string;
  seats: string;
  row: string;
  tickets: string;
}

export interface LanguageSellersSlider {
  header: string;
  SingleSellerCard: LanguageSingleSellerCard;
}

export interface LanguagePlaceBid {
  header: string;
  seat: string;
  row: string;
  area: string;
  total: string;
}

export interface LanguageSecureDepositMsg {
  hey: string;
  notice: string;
  paragraph: string;
  agreeMsg: string;
  nextBtn: string;
}

export interface LanguagePaymentDetails {
  useSaved: string;
  mastercard: string;
  visa: string;
  name: string;
  number: string;
  expiry: string;
  ccv: string;
}

export interface LanguageUserProfile {
  communities: string;
  comingSoon: string;
  tickets: string;
  myTickets: string;
  viewMore: string;
  viewLess: string;
  feedbacks: string;
  rated: string;
  history: string;
  favorites: string;
  searchBtn: string;
  noTickets: string;
  noFeedback: string;
  noHistory: string;
  noFavorites: string;
  findEvent: string;
}

export interface LanguageUserWallet {
  balance: string;
  creditCards: string;
  addCard: string;
  activities: string;
  comingSoon: string;
  viewMore: string;
  coupons: string;
  giftCards: string;
}

export interface LanguageUserTickets {
  ticketsForSale: string;
  purchased: string;
  history: string;
  favorites: string;
  viewMore: string;
  viewLess: string;
  findEvent: string;
  comingSoon: string;
  nothingForSale: string;
  nothingPurchased: string;
  noHistory: string;
  noFavorites: string;
}

export interface LanguageUserOffers {
  history: string;
  offersSent: string;
  offersDeclined: string;
  offersReceived: string;
  comingSoon: string;
  noHistory: string;
  noBids: string;
  viewMore: string;
  viewLess: string;
  findEvent: string;
  SingleHistoryBid: {
    sentOn: string;
    confirmedBy: string;
    declinedBy: string;
    waitingFor: string;
    toResponse: string;
  };
}

export interface LanguageBidStatusModal {
  header: string;
  bidPrice: string;
  seat: string;
  row: string;
  area: string;
  closeBtn: string;
}

export interface LanguageNoBidsToShow {
  noEvents: string;
  nothingReceived: string;
  nothingSent: string;
  lookingForTicket: string;
  lookingToSell: string;
  lookingToBuy: string;
  clickHereBtn: string;
}

export interface LanguageSingleUserEvent {
  click: string;
  tickets: string;
  ticket: string;
  hide: string;
}

export interface LanguageSellerModal {
  TicketsDetails: LanguageTicketsDetails;
  TicketUpload: LanguageTicketUpload;
}
export interface LanguageBuyerModal {
  SelectArea: LanguageSelectArea;
  SellersSlider: LanguageSellersSlider;
  PlaceBid: LanguagePlaceBid;
  SecureDepositMsg: LanguageSecureDepositMsg;
  PaymentDetails: LanguagePaymentDetails;
}

export interface LanguageEventModal {
  EventPreview: LanguageEventPreview;
  EventForm: LanguageEventForm;
  StepsDots: LanguageStepsDots;
  NextPrevButtons: LanguageNextPrevButtons;
  TicketsAmount: LanguageTicketsAmount;
  SaleCompleted: LanguageSaleCompleted;
  SellerModal: LanguageSellerModal;
  BuyerModal: LanguageBuyerModal;
}

export default interface LangModel {
  TopNavbar: LanguageTopNavbar;
  MainAuth: LanguageMainAuth;
  LoginForm: LanguageLoginForm;
  RegisterForm: LanguageRegisterForm;
  PlatformsAuth: LanguagePlatformsAuth;
  SendEmail: LanguageSendEmail;
  Verification: LanguageVerification;
  NewPassword: LanguageNewPassword;
  ChooseMode: LanguageChooseMode;
  AdminData: LanguageAdminData;
  HomeTopHeader: LanguageHomeTopHeader;
  PopularEvents: LanguagePopularEvents;
  UpcomingEvents: LanguageUpcomingEvents;
  SideNav: LanguageSideNav;
  EventModal: LanguageEventModal;
  UserProfile: LanguageUserProfile;
  UserWallet: LanguageUserWallet;
  UserTickets: LanguageUserTickets;
  UserOffers: LanguageUserOffers;
  confirmDeposit: string;
  BidStatusModal: LanguageBidStatusModal;
  SecureDepositMsg: LanguageSecureDepositMsg;
  PaymentDetails: LanguagePaymentDetails;
  NoBidsToShow: LanguageNoBidsToShow;
  SingleUserEvent: LanguageSingleUserEvent;
}
