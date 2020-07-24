var mailgun = {

quickPick : function (thisId, alternate) {
  return '<a href="javascript:$(\'#' + thisId + '\')'
       + '.val(\'' + alternate + '\')'
	     + '.focusout();">'
	     + alternate + '</a>';
},

get_suggestion_str : function (thisId, is_valid, alternate, vMsgInvalid) {
  if (is_valid) {
    var result = '<span class="mailgunSuccessIcon fa fa-check"/>';
    if (alternate) {
      result += ' <span class="mailgunSuggestion">'
              + '(though did you mean ' + mailgun.quickPick(thisId,alternate) + '?)'
              + '</span>';
    }
    return result
  } else if (alternate) {
    return '<span class="mailgunQuestionIcon fa fa-warning"/>'
         + ' <span class="mailgunSuggestion">'
         + 'Did you mean ' + mailgun.quickPick(thisId,alternate) + '?'
         + '</span>';
  } else {
    return '<span class="mailgunErrorIcon fa fa-close"/>'
         + '<span class="mailgunError">' + vMsgInvalid + '</span>';
  }
},

validation_in_progress : function (e, vFilePrefix, vShowResult) {
  // awaiting result for validation
  var thisId = $(e.target).attr("id"),
      resId = thisId+"_result";
  apex.debug("apexmailgun: validation_in_progress " + resId);
  if (vShowResult) {
    $("#"+resId).html("<img class='mailgunLoadingIcon'"
                    + " src='" + vFilePrefix + "ajax-loader.gif'"
                    + " height='16'/>");
  }
  apex.jQuery("#"+thisId).trigger("validationinprogress");
},

validation_completed : function (data, e, vMsgInvalid, vShowResult) {
  // successfully validated the email address, got a result
  var thisId = $(e.target).attr("id"),
      resId = thisId+"_result";
  apex.debug("apexmailgun: validation_completed " + resId);
  if (vShowResult) {
    $("#"+resId).html(
      mailgun.get_suggestion_str(thisId, data['is_valid'], data['did_you_mean'], vMsgInvalid)
    );
  }
  apex.jQuery("#"+thisId).trigger("validationcompleted", data);
},

validation_error : function (error_message, e, vShowResult) {
  // unable to verify the email address due to an error
  var thisId = $(e.target).attr("id"),
      resId = thisId+"_result";
  apex.debug("apexmailgun: validation_error " + resId);
  if (vShowResult) {
    $("#"+resId).html('<span class="mailgunErrorIcon fa fa-close"/>'
                    + ' <span class="mailgunError">'
                    + error_message
                    + '</span>');
  }
  apex.jQuery("#"+thisId).trigger("validationerror", {errorMessage:error_message});
},

on_change : function (e) {
  var thisId = $(e.target).attr("id"),
      resId = thisId+"_result";
  apex.debug("apexmailgun: on_change " + resId + '="'+$("#"+thisId).val()+'"');
  if ($("#"+thisId).val()=="") {
    // clear any old error messages
    apex.debug("clearing result");
    $("#"+resId).html("");
  }
},

init : function() {
  var daThis = this,
      vElementsArray = daThis.affectedElements,
      vApiKey        = daThis.action.attribute01,
      vFilePrefix    = daThis.action.attribute02,
      vTimeout       = parseInt(daThis.action.attribute03),
      vShowResult    = daThis.action.attribute04=="Y",
      vMsgInvalid    = daThis.action.attribute05,
      vMsgTooLong    = daThis.action.attribute06,
      vMsgAmpReqd    = daThis.action.attribute07,
      vMsgAmpOneOnly = daThis.action.attribute08;
  apex.debug('apexmailgun: affectedElements:' + vElementsArray.length);
  apex.debug('apexmailgun: vApiKey=' + vApiKey);
  apex.debug('apexmailgun: vTimeout=' + vTimeout);
  apex.debug('apexmailgun: vFilePrefix=' + vFilePrefix);
  for (var i = 0; i < vElementsArray.length; i++) {
    var vaffectedElement = daThis.affectedElements.eq(i),
        thisId = $(vaffectedElement).attr("id");
    if (vShowResult) {
      apex.debug("apexmailgun: adding result span " + thisId);
      var resId = thisId+"_result";
      $(vaffectedElement).parent().after("<span class='mailgunResult' id='"+resId+"'></span>");
   		$("#"+thisId).change(function(e){
			  mailgun.on_change(e);
		  });
    }
  apex.debug("apexmailgun: applying mailgun validator " + thisId);
  $(vaffectedElement).mailgun_validator({
    api_key: vApiKey,
    timeout: vTimeout,
    msg_too_long: vMsgTooLong,
    msg_ampersand_reqd: vMsgAmpReqd,
    msg_ampersand_one_only: vMsgAmpOneOnly,
    in_progress: function(e) {
      mailgun.validation_in_progress(e, vFilePrefix, vShowResult);
    },
    success: function(data, e) {
      mailgun.validation_completed(data, e, vMsgInvalid, vShowResult);
    },
    error: function (error_message, e) {
      mailgun.validation_error(error_message, e, vShowResult);
    }
  });
}
}

}