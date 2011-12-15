![alt text](http://quocity.com/colresizable/githubLogo.png "colResizable jQuery plugin")

# colResizable

colResizable is a jQuery plugin designed to enhance any HTML table element adding column resizing features by dragging column anchors manually. It is tiny in size (colResizable v1.0 is only 2.8kb) and it doesn´t require any other library dependencies such as jQuery-UI or others. It is fully compatible with all major browsers(IE7+, Firefox, Chrome and Opera), and works perfectly with both percentage and pixel-based table layouts. colResizable can be also used as multiple range slider.

#### [official website](http://quocity.com/colresizable/) &nbsp;&nbsp;&nbsp;&nbsp; [demos](http://quocity.com/colresizable/#samples) &nbsp;&nbsp;&nbsp;&nbsp; [documentation](http://quocity.com/colresizable/#attributes) &nbsp;&nbsp;&nbsp;&nbsp; [downloads](http://quocity.com/colresizable/#download) 

## Usage
To use this plugin a script reference must be added to the colResizable.min.js file in the head section of the document once jQuery is loaded. To enhance a table (or collection of tables) point it with a jQuery wrapper and apply the colResizable() method. 

    $(function(){
      $("table").colResizable();
    });

## Attributes


* **liveDrag**: [type: boolean] [default: false] [version: 1.0] 

When set to true the table layout is updated while dragging column anchors. liveDrag enabled is more CPU consuming so it is not recommended for slow computers, specially when dealing with huge or extremely complicated tables.

* **innerGripHtml**: [type: string] [default: empty string] [version: 1.0] 

Its purpose is to allow column anchor customization by defining the HTML to be used in the column grips to provide some visual feedback. It can be used in a wide range of ways to obtain very different outputs, and its flexibility can be increased by combining it with the draggingClass attribute.

* **draggingClass**: [type: string] [default: internal css class] [version: 1.0] 

This attribute is used as the css class assigned to column anchors while being dragged. It can be used for visual feedback purposes.

disable: [type: boolean] [default: false] [version: 1.0] 

When set to true it aims to remove all previously added enhancements such as events and additional DOM elements assigned by this plugin to a single or collection of tables. It is required to disable a previously colResized table prior its removal from the document object tree.

minWidth: [type: number] [default: 15] [version: 1.1] 

This value specifies the minimum width (measured in pixels) that is allowed for the columns.

headerOnly: [type: boolean] [default: false] [version: 1.2] 

This attribute can be used to prevent vertical expansion of the column anchors to fit the table height. If it is set to true, column handler's size will be bounded to the first row's vertical size.

hoverCursor: [type: string] [default: "e-resize"] [version: 1.3] 

This attribute can be used to customize the cursor that will be displayed when the user is positioned on the column anchors.

dragCursor: [type: string] [default: "e-resize"] [version: 1.3] 

Defines the cursor that will be used while the user is resizing a column.

postbackSafe: [type: boolean] [default: false] [version: 1.3] 

This attribute can be used to specify that the manually selected column widths must remain unaltered after a postback or browser refresh. This feature is mainly oriented to those pages created with server-side logic (codebehind), such as PHP or .NET, and it is only compatible with browsers with sessionStorage support (all modern browsers). However, if you are targeting older browsers (such as IE7 and IE8) you can still emulate sessionStorage using sessionStorage.js. It is important to note that some browsers (IE and FF) doesn’t enable the sessionStorage object while running the website directly from the local file system, so if you want to test this feature it is recommended to view the website through a web server or use browsers such as Chrome or Opera which doesn’t have this limitation. Don't worry about compatibility issues, once your site is up on the internet, all browsers will act in exactly the same way.

flush: [type: boolean] [default: false] [version: 1.3] 

Flush is only effective when postbackSafe is enabled. Its purpose is to remove all previously stored data related to the current table layout to get it back to its original layout preventing width restoration after postback.

marginLeft: [type: string / null] [default: null] [version: 1.3] 

If the target table contains an explicit margin-left CSS rule, the same value must be used in this attribute (for example: "auto", "20%", "10px"). The reason why it is needed it is because most browsers (all except of IE) don’t allow direct access to the current CSS rule applied to an element in its original units (such as "%", "em" or "auto" values). If you know any workaround which doesn’t involve iteration through all the styles defined in the site and any other external dependencies, please let me know!

marginRight: [type: string / null] [default: null] [version: 1.3] 

It behaves in exactly the same way than the previous attribute but applied to the right margin.
 * Install Pyechonest
 * **Get an API key** - to use the Echo Nest API you need an Echo Nest API key.  You can get one for free at [developer.echonest.com](http://developer.echonest.com).
 * **Set the API** key - you can do this one of two ways:
  * set an environment variable named ECHO_NEST_API_KEY to your API key
  * Include this snippet of code at the beginning of your python scripts:
    from pyechonest import config
    config.ECHO_NEST_API_KEY="YOUR API KEY"
 * Check out the [docs](http://echonest.github.com/pyechonest/) and examples below.

## Examples
*All examples assume you have already setup your api key!*

Find artists that are similar to 'Bikini Kill':

    from pyechonest import artist
    bk = artist.Artist('bikini kill')
    print "Artists similar to: %s:" % (bk.name,)
    for similar_artist in bk.similar:
        print "\t%s" % (similar_artist.name,)

Search for artist:

    from pyechonest import artist
    weezer_results = artist.search(name='weezer')
    weezer = weezer_results[0]
    weezer_blogs = weezer.blogs
    print 'Blogs about weezer:', [blog.get('url') for blog in weezer_blogs]

Get an artist by name:

    from pyechonest import artist
    a = artist.Artist('lady gaga')
    print a.id

Get an artist by Musicbrainz ID:

    from pyechonest import artist
    a = artist.Artist('musicbrainz:artist:a74b1b7f-71a5-4011-9441-d0b5e4122711')
    print a.name

Get the top hottt artists:

    from pyechonest import artist
    for hottt_artist in artist.top_hottt():
        print hottt_artist.name, hottt_artist.hotttnesss

Search for songs:

    from pyechonest import song
    rkp_results = song.search(artist='radiohead', title='karma police')
    karma_police = rkp_results[0]
    print karma_police.artist_location
    print 'tempo:',karma_police.audio_summary['tempo'],'duration:',karma_police.audio_summary['duration']

Get a song's audio_url and analysis_url:

    from pyechonest import song
    ss_results = song.search(artist='the national', title='slow show', buckets=['id:7digital', 'tracks'], limit=True)
    slow_show = ss_results[0]
    ss_tracks = slow_show.get_tracks('7digital')
    print ss_tracks[0].get('preview_url')

![alt text](http://i.imgur.com/WWLYo.gif "Frustrated cat can't believe this is the 12th time he's clicked on an auto-linked README.md URL")