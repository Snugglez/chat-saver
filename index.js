module.exports = function reee(d) {
    d.dispatch.addDefinition('C_SAVE_CLIENT_CHAT_OPTION_SETTING', 0, __dirname + '//res//C_SAVE_CLIENT_CHAT_OPTION_SETTING.def', true)
    d.dispatch.addDefinition('S_REPLY_CLIENT_CHAT_OPTION_SETTING', 0, __dirname + '//res//S_REPLY_CLIENT_CHAT_OPTION_SETTING.def', true)

    let chatOptions = []

    d.hook('C_REQUEST_CLIENT_CHAT_OPTION_SETTING', 'event', () => {
        if (!d.settings.chatOptions.tabs) return
        d.send('S_REPLY_CLIENT_CHAT_OPTION_SETTING', 0, d.settings.chatOptions)
        return false
    })

    d.hook('C_SAVE_CLIENT_CHAT_OPTION_SETTING', 0, (e) => {
        chatOptions = { tabs: e.tabs, channels: e.channels }
        if (d.settings.chatOptions.tabs) {
            d.settings.chatOptions = { tabs: e.tabs, channels: e.channels }
            return false
        }
    })

    d.hook('S_REPLY_CLIENT_CHAT_OPTION_SETTING', 'event', () => {
        if (d.settings.chatOptions.tabs) return false
    })

    d.command.add('chat', () => {
        d.settings.chatOptions = chatOptions
        d.command.message('chat saved')
    })

    //I raw logged these for a week and never saw this shit trigger, so im just gonna block it to be safe 
    for (let set of [
        'S_LOAD_CHAT_SETTING',
        'C_SAVE_CHAT_SETTING',
        'S_SAVE_CLIENT_CHAT_OPTION_SETTING'
    ]) d.hook(set, 'event', () => { return false })
}

