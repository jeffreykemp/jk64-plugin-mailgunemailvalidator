# Mailgun Email Validator ![APEX Plugin](https://cdn.rawgit.com/Dani3lSun/apex-github-badges/b7e95341/badges/apex-plugin-badge.svg)

**A Dynamic Action Plugin for Oracle Application Express**

Better than just checking whether a user-entered email address conforms to a subset of the range of valid email address formats; the Mailgun jQuery plugin goes further and checks the domain MX records to determine whether the email address is likely to be correct; it even suggests a correction where the email address appears to be incorrect.

![](https://raw.githubusercontent.com/jeffreykemp/jk64-plugin-mailgunemailvalidator/master/src/preview.png)

Wrapper for the jQuery plugin [Mailgun Validator](https://github.com/mailgun/validator-demo)

## DEMO ##

[https://apex.oracle.com/pls/apex/f?p=MAILGUN&c=JK64](https://apex.oracle.com/pls/apex/f?p=MAILGUN&c=JK64)

## PRE-REQUISITES ##

* [Oracle Application Express 5.0.2](https://apex.oracle.com)

## INSTALLATION ##

1. Download the **[latest release](https://github.com/jeffreykemp/jk64-plugin-mailgunemailvalidator/releases/latest)**
2. Import plugin **dynamic_action_plugin_com_mailgun_email_validator.sql** to your Apex app
3. [Sign up](https://mailgun.com/signup) for a Mailgun account and insert your public API key
4. On the page with one or more Email Address input items, add a Dynamic Action:
      * **Event** = Page Load
      * **True Action** = Mailgun Email Validator [Plug-In]
      * Set **Affected Elements** (e.g. item name(s), or a jQuery selector)

## LINKS ##

* **[Home Page](http://jeffreykemp.github.io/jk64-plugin-mailgunemailvalidator/)**

* For more info refer to the **[WIKI](https://github.com/jeffreykemp/jk64-plugin-mailgunemailvalidator/wiki)**

* To validate email addresses from your Oracle database server in PL/SQL, try the **[Mailgun PL/SQL API](https://github.com/jeffreykemp/mailgun-plsql-api)**
