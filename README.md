# jk64-plugin-mailgunemailvalidator
A Dynamic Action Plugin for Oracle Application Express - Mailgun Email Validator

![](https://raw.githubusercontent.com/jeffreykemp/jk64-plugin-mailgunemailvalidator/master/src/preview.png)

Wrapper for the jQuery plugin [Mailgun Validator](https://github.com/mailgun/validator-demo)

# Installation

1. Import plugin **dynamic_action_plugin_com_mailgun_email_validator.sql**
2. [Sign up](https://mailgun.com/signup) for a Mailgun account and insert your public API key
3. On the page with one or more Email Address input items, add a Dynamic Action:
   a. **Event** = Page Load
   b. **True Action** = Mailgun Email Validator [Plug-In]
   c. Set **Affected Elements** (e.g. item name(s), or a jQuery selector)

# Plugin Attributes

* **Mailgun Public API Key** = enter your Mailgun Public API key (Note: this is NOT your private key!)

* **Show Validation Result** = leave default to Yes to have the item show a success/fail result next to the item

* **Message when address is invalid** = message text to show if the email address is invalid

# Plugin Events

* **validationInProgress**
* **validationSuccess**
* **validationError**
