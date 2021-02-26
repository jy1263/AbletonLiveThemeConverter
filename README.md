# AbletonLiveThemeConverter
Usage:                      AbletonThemeConverter.exe {Input Theme from Old Version} {Input Theme from New Version} {Output File Name}

Example:                    AbletonThemeConverter.exe 00Light.ask 00Lightnew.ask newtheme.ask <br>
Example with Directories:   AbletonThemeConverter.exe ./themes/00Light.ask ./themes/00Lightnew.ask ./themes/newtheme.ask

Note:                       Please make sure that the filenames have '.ask' on the end

More Notes: If you do not enter a valid path for the {Input Theme from New Version} argument, missing parts of your converted theme will be automatically filled in by parts of the Ableton Live 11 00Light theme.
Example: AbletonThemeConverter.exe 00Light.ask TypeInAnyInvalidFileNameHere newtheme.ask <br>
Example with Directories: AbletonThemeConverter.exe ./themes/00Light.ask hsdajshdajshdjashd ./themes/newtheme.ask
