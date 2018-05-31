<div id="welcome-page-container" class="flex flexCenter">
  <div id="welcome-container" class="welcome-container padding">
    <h1 class="welcome-title">Welcome!</h1>

    <div class="text-container">
      <p class="disclaimer">
        Hi! This page will hopefully help you get to campus a bit easier.
        Your name and school is stored in a cookie on your computer for convenience.
        We then search TimeEdit for your schedule.<br />
        This website uses cookies. By continuing to use the site, you are agreeing to our use of cookies.<br /><br />
        Choose your school to continue:
      </p>
    </div>
    <div class="img-container flexRowNo img-toggle">
      <img class="" src="<?php echo get_theme_file_uri('img/westerdals.png'); ?>" alt="westerdals-logo" onclick="setSchool('westerdals');">
      <img class="" src="<?php echo get_theme_file_uri('img/kristiania.png'); ?>" alt="kristiania-logo" onclick="setSchool('kristiania');">
    </div>

    <input type="text" name="fullName" placeholder="Full Name" id="nameInput">

    <div class="button-container" id="continue-button-container">
      <button class="button-double" id="approve-disclaimer" name="setcookie" value="true" onclick="postSchool(); initialLogin();">Save settings & continue</button>
      <button class="button-double btn-no-highlight" onclick="continueNoTE();">Continue without timeEdit</button>
    </div>

  </div><!-- welcome-container END -->
</div>
