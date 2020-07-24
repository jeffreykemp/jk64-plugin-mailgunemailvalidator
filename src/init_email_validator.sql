function init_email_validator
    (p_dynamic_action in apex_plugin.t_dynamic_action
    ,p_plugin         in apex_plugin.t_plugin)
    return apex_plugin.t_dynamic_action_render_result is
    l_result apex_plugin.t_dynamic_action_render_result;
begin
    apex_plugin_util.debug_dynamic_action
        (p_plugin         => p_plugin
        ,p_dynamic_action => p_dynamic_action);
    l_result.javascript_function := 'mailgun.init';
    l_result.attribute_01 := p_plugin.attribute_01; /*API Key*/
    if l_result.attribute_01 is null then
        raise_application_error(-20001, 'Mailgun Public API Key must be supplied');
    end if;
    l_result.attribute_02 := p_plugin.file_prefix;
    l_result.attribute_03 := nvl(p_plugin.attribute_02, '30000'); /*Timeout*/
    l_result.attribute_04 := nvl(p_dynamic_action.attribute_01,'Y'); /*Show result Y/N*/
    l_result.attribute_05 := nvl(p_plugin.attribute_03, 'Email address is invalid.');
    l_result.attribute_06 := nvl(p_plugin.attribute_04, 'Email address cannot have over 512 characters.');
    l_result.attribute_07 := nvl(p_plugin.attribute_05, 'Email address must include @.');
    l_result.attribute_08 := nvl(p_plugin.attribute_06, 'Email address must contain only one @.');
    return l_result;
end init_email_validator;