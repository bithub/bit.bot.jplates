from zope.interface import implements
from zope.component import getUtility

from bit.core.interfaces import IPlugin
from bit.bot.common.interfaces import IResourceRegistry
from bit.bot.base.plugin import BotPlugin


class BotJPlates(BotPlugin):
    implements(IPlugin)
    name = 'bit.bot.jplates'
    _http = {'root': 'resources'}
    def load_JS(self):
        js = getUtility(IResourceRegistry,'js')
        js.add('jquery.tmpl.min.js',{'rel':'link'})
        js.add('jplates/jquery.jplates.js',{'rel':'link'})

