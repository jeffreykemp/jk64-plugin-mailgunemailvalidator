var mailgun = {

quickPick : function (thisId, alternate) {
  return '<a href="javascript:$(\'#' + thisId + '\')'
       + '.val(\'' + alternate + '\')'
	     + '.focusout();">'
	     + alternate + '</a>';
},

get_suggestion_str : function (thisId, is_valid, alternate, msgInvalid) {
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
         + '<span class="mailgunError">' + msgInvalid + '</span>';
  }
},

validation_in_progress : function (e, filePrefix) {
  // awaiting result for validation
  var thisId = $(e.target).attr("id"),
      resId = thisId+"_result";
  apex.debug("apexmailgun: validation_in_progress " + resId);
  $("#"+resId).html("<img class='mailgunLoadingIcon'"
                  + " src='" + filePrefix + "ajax-loader.gif'"
                  + " height='16'/>");
  apex.debug("trigger validationinprogress");
  apex.jQuery("#"+thisId).trigger("validationinprogress");
},

validation_success : function (data, e, msginvalid) {
  // validation succeeded
  var thisId = $(e.target).attr("id"),
      resId = thisId+"_result";
  apex.debug("apexmailgun: validation_success " + resId);
  $("#"+resId).html(
    mailgun.get_suggestion_str(thisId, data['is_valid'], data['did_you_mean'], msginvalid)
  );
  apex.debug("trigger validationsuccess");
  apex.jQuery("#"+thisId).trigger("validationsuccess", {data:data});
},

validation_error : function (error_message, e) {
  // validation failed
  var thisId = $(e.target).attr("id"),
      resId = thisId+"_result";
  apex.debug("apexmailgun: validation_error " + resId);
  $("#"+resId).html('<span class="mailgunErrorIcon fa fa-close"/>'
                  + ' <span class="mailgunError">'
                  + error_message
                  + '</span>');
  apex.debug("trigger validationerror");
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
      vApiKey = daThis.action.attribute01,
      vFilePrefix = daThis.action.attribute02,
      vShowResult = daThis.action.attribute03,
      vMsgInvalid = daThis.action.attribute04;
  apex.debug('apexmailgun: affectedElements:' + vElementsArray.length);
  apex.debug('apexmailgun: vApiKey=' + vApiKey);
  apex.debug('apexmailgun: vFilePrefix=' + vFilePrefix);
  for (var i = 0; i < vElementsArray.length; i++) {
    var vaffectedElement = daThis.affectedElements.eq(i),
        thisId = $(vaffectedElement).attr("id");
    if (vShowResult=="Y") {
      apex.debug("apexmailgun: adding result span " + thisId);
      var resId = thisId+"_result";
      $(vaffectedElement).after("<span class='mailgunResult' id='"+resId+"'></span>");
   		$("#"+thisId).change(function(e){
			  mailgun.on_change(e);
		  });
    }
  apex.debug("apexmailgun: applying mailgun validator " + thisId);
  $(vaffectedElement).mailgun_validator({
    api_key: vApiKey,
    in_progress: function(e) {
      mailgun.validation_in_progress(e, vFilePrefix);
    },
    success: function(data, e) {
      mailgun.validation_success(data, e, vMsgInvalid);
    },
    error: function (error_message, e) {
      mailgun.validation_error(error_message, e);
    }
  });
}
}

}