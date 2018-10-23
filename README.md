# bj-unicom-iptv
Beijing Unicom IPTV playlist

## Usage

Pre-built playlist: https://opengg.github.io/bj-unicom-iptv/iptv.m3u

Build your own: https://opengg.github.io/bj-unicom-iptv/

## Contribute Guide

### How to update the channel list?

The author(me)'s subscription of Unicom internet service has expired. To update the channel list, pull requests are welcome.

Here is how-to:

1. Capture the channel list HTML: see [FAQ#3](https://m.newsmth.net/article/DigiHome/757772?p=1))
1. Save the captured html as a file named *"iptv.txt"*
1. Verify the channels by building your own m3u playlist:

    * Open [online builder](https://opengg.github.io/bj-unicom-iptv/)
    * Click on the "Custom channels HTML" button
    * Paste the content of *"iptv.txt"* into the popup modal, then click "confirm"
    * Download new m3u playlist, and check if it works

1. If everything works, make a pull request:

    * Fork and clone this project
    * PUT *"iptv.txt"* inside `public/`
    * Run `git add . && git commit -m "Update iptv.txt" && git push`
    * Make a pull request on github
