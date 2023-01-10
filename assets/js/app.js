function App() {
  const SMALL_SCREEN_WIDTH = 680;
  const INTRO_PARALLAX_SPEED = 3;
  let smallScreenNavToggle;
  let siteNavWrapper;
  let siteNavBackgroundWrapper;
  let siteNavDimmer;
  let siteBody;
  let siteNavLinks;
  let contactForm;
  let contactFormSubmitButton;
  let isSmallScreenNavOpen = false;
  let isSmallScreen = false;
  let introBackground;
  let introParallaxRequest;

  const init = () => {
    siteBody = document.querySelector('body');
    prepareMainNav();
    prepareContactForm();
    prepareIntro();
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onWindowScroll);
  };

  prepareMainNav = () => {
    smallScreenNavToggle = document.querySelector(
      '.js-small-screen-nav-toggle'
    );
    siteNavWrapper = document.querySelector('.js-site-nav-wrapper');
    siteNavDimmer = document.querySelector('.js-site-nav-dimmer');
    siteNavLinks = document.querySelectorAll('.js-site-nav-link');
    siteNavBackgroundWrapper = document.querySelector(
      '.js-site-nav-background-wrapper'
    );
    // Listen for UI interaction
    smallScreenNavToggle.addEventListener('click', onSmallScreenNavTogglePress);
    siteNavLinks.forEach((siteNavLink) =>
      siteNavLink.addEventListener('click', onSiteNavLinkPress)
    );
    siteNavBackgroundWrapper.addEventListener(
      'transitionend',
      onSiteNavBackgroundTransitionEnd
    );
    siteNavDimmer.addEventListener('click', onSmallScreenNavTogglePress);
  };

  prepareContactForm = () => {
    contactForm = document.querySelector('.js-contact-form');
    contactFormSubmitButton = document.querySelector('.js-contact-form-button');
    contactFormSubmitButton.addEventListener(
      'click',
      onContactFormSubmitAttempt
    );
  };

  prepareIntro = () => {
    introBackground = document.querySelector('.js-intro-background');
  };

  const toggleSmallScreenNav = () => {
    isSmallScreenNavOpen = !isSmallScreenNavOpen;
    siteNavWrapper.classList.toggle('site-nav--drawer-open');
    if (isSmallScreenNavOpen && isSmallScreen) {
      siteBody.classList.add('body-locked');
      siteNavWrapper.classList.remove('site-nav--drawer-closed');
    } else if (!isSmallScreenNavOpen) {
      siteBody.classList.remove('body-locked');
    }
  };

  const checkForSmallScreen = () => {
    if (window.innerWidth >= SMALL_SCREEN_WIDTH && isSmallScreen) {
      isSmallScreen = false;
      siteNavWrapper.classList.add('site-nav--drawer-closed');
      if (isSmallScreenNavOpen) {
        toggleSmallScreenNav();
      }
    } else if (window.innerWidth < SMALL_SCREEN_WIDTH && !isSmallScreen) {
      isSmallScreen = true;
    }
  };

  const parallaxIntro = (speed) => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= introBackground.offsetHeight) {
      const newTranslateY = (currentScroll / speed).toFixed(2);
      introBackground.style.transform = `translateY(${newTranslateY}px)`;
    }
  };

  const onSmallScreenNavTogglePress = () => {
    toggleSmallScreenNav();
  };

  const onSiteNavLinkPress = () => {
    if (isSmallScreen) toggleSmallScreenNav();
  };

  const onSiteNavBackgroundTransitionEnd = () => {
    if (!isSmallScreenNavOpen)
      siteNavWrapper.classList.add('site-nav--drawer-closed');
  };

  const onContactFormSubmitAttempt = () => {
    contactForm.classList.add('form-submitted');
  };

  const onWindowScroll = () => {
    if (introParallaxRequest) cancelAnimationFrame(introParallaxRequest);
    introParallaxRequest = requestAnimationFrame(() =>
      parallaxIntro(INTRO_PARALLAX_SPEED)
    );
  };

  const onWindowResize = () => {
    checkForSmallScreen();
    onWindowScroll();
  };

  init();
}

const app = new App();
