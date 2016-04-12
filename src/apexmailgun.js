var mailgun = {

validation_in_progress : function () {
  $('#P1_RESULT').html("<img src='#IMAGE_PREFIX#ws/ajax-loader.gif' height='16'/>");
}

validation_success : function (data) {
  $('#P1_RESULT').html(get_suggestion_str(data['is_valid'], data['did_you_mean']));
}

validation_error : function (error_message) {
  $('#P1_RESULT').html(error_message);
}

alternativeSetter : function (alternate) {
  return '<a href="javascript:$(\'#P1_ADDRESS\').val(\''+alternate+'\').focusout();">' + alternate + '</a>';
}

get_suggestion_str : function (is_valid, alternate) {
  if (is_valid) {
    var result = '<span class="fa fa-check" style="color:forestgreen;font-size:22px"/>';
    if (alternate) {
      result += ' (though did you mean '+alternativeSetter(alternate)+'?)</span>';
    }
    return result
  } else if (alternate) {
    return '<span class="fa fa-warning" style="color:orange;font-size:22px"/> <span class="warning">Did you mean '+alternativeSetter(alternate)+'?</span>';
  } else {
    return '<span class="fa fa-close" style="color:red;font-size:22px"/> <span class="warning">Address is invalid.</span>';
  }
}

init : function() {
  var daThis = this;
  var vElementsArray = daThis.affectedElements;
  var vApiKey = daThis.action.attribute01;
  apex.debug('showTooltip: affectedElements:' + vElementsArray);
  apex.debug('showTooltip: Public API Key:' + vApiKey);
  for (var i = 0; i < vElementsArray.length; i++) {
    var vaffectedElement = daThis.affectedElements.eq(i);
    apex.debug("applying mailgun validator " + vaffectedElement);
    $(vaffectedElement).mailgun_validator({
      api_key: vApiKey,
      in_progress: mailgun.validation_in_progress,
      success: mailgun.validation_success,
      error: mailgun.validation_error
    });
  }
}

}