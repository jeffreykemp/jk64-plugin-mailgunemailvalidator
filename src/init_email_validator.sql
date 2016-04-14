function init_email_validator
  (p_dynamic_action in apex_plugin.t_dynamic_action
  ,p_plugin         in apex_plugin.t_plugin)
  return apex_plugin.t_dynamic_action_render_result is
  l_result      apex_plugin.t_dynamic_action_render_result;
  l_api_key     varchar2(500)  := p_plugin.attribute_01;
  l_show_result varchar(1)     := p_dynamic_action.attribute_01;
  l_msg_invalid varchar2(4000) := p_dynamic_action.attribute_02;
begin
  apex_plugin_util.debug_dynamic_action
    (p_plugin         => p_plugin
    ,p_dynamic_action => p_dynamic_action);
  apex_javascript.add_library
    (p_name                  => 'mailgun_validator'
    ,p_directory             => p_plugin.file_prefix
    ,p_check_to_add_minified => true);
  apex_javascript.add_library
    (p_name                  => 'apexmailgun'
    ,p_directory             => p_plugin.file_prefix
    ,p_check_to_add_minified => true);
  apex_css.add_file
    (p_name                  => 'apexmailgun'
    ,p_directory             => p_plugin.file_prefix);
  l_result.javascript_function := 'mailgun.init';
  l_result.attribute_01        := l_api_key;
  l_result.attribute_02        := p_plugin.file_prefix;
  l_result.attribute_03        := l_show_result;
  l_result.attribute_04        := l_msg_invalid;
  return l_result;
end init_email_validator;