# Mailgun Email Validator
**A Dynamic Action Plugin for Oracle Application Express**

Better than just checking whether a user-entered email address conforms to a subset of the range of valid email address formats; the Mailgun jQuery plugin goes further and checks the domain MX records to determine whether the email address is likely to be correct; it even suggests a correction where the email address appears to be incorrect.

![](https://raw.githubusercontent.com/jeffreykemp/jk64-plugin-mailgunemailvalidator/master/src/preview.png)

Wrapper for the jQuery plugin [Mailgun Validator](https://github.com/mailgun/validator-demo)

## DEMO ##

[https://apex.oracle.com/pls/apex/f?p=MAILGUN&c=JK64](https://apex.oracle.com/pls/apex/f?p=MAILGUN&c=JK64)

## PRE-REQUISITES ##

* Oracle Application Express 5.0.2

## INSTALLATION ##

1. Import plugin **dynamic_action_plugin_com_mailgun_email_validator.sql**
2. [Sign up](https://mailgun.com/signup) for a Mailgun account and insert your public API key
3. On the page with one or more Email Address input items, add a Dynamic Action:
      * **Event** = Page Load
      * **True Action** = Mailgun Email Validator [Plug-In]
      * Set **Affected Elements** (e.g. item name(s), or a jQuery selector)

For more info refer to the [WIKI](https://github.com/jeffreykemp/jk64-plugin-mailgunemailvalidator/wiki)
