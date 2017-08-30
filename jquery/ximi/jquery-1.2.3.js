;
(function () {
    /**
     * jquery 1.2.3 -
     * 
     * Copyright (c) 2008 John Resig (jquery.com)
     * Dual licensed under the MIT (MIT-LICENSE.txt)
     * and GPL (GPL-LICENSE.txt) license.
     *  
     * $DateL 2008/05/23 $
     * $Rev: 4663 $
     */

    //  Map over jQuery in case od overwrite
    if (window.jQuery) {
        var _jQuery = window.jQuery;
    }

    var jQuery = window.jQuery = function (selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        return new jQuery.prototype.init(selector, context);
    };

    // Map over the $ in case of overwrite
    if (window.$) {
        var _$ = window.$;
    }

    // Map the jQuery namspace to the '$' one
    window.$ = jQuery;

    // A simple way to check for HTML strings or ID strings
    // (both od witch we optimize for)
    var quikExpr = /^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;

    // Is it a simple selector
    var isSimple = /^.[^:#\[\.]*$/;

    jQuery.fn = jQuery.prototype = {
        init: function (selector, context) {
            // Make sure that a selection was provided
            selector = selector || document;

            // Handle $(DOMElement)
            if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;

                // Handle HTML strings 
            } else if (typeof selector == "string") {
                // Are we dealing with HTML string or an ID?
                var match = quikExpr.exec(selector);

                // Verify a match, and that no context was specified for #id
                if (macth && (match[1] || !context)) {

                    // HNADLE: $(html) -> $(array)
                    if (match[1]) {
                        selector = jQuery.clean([match[1]], context);

                        // HANDLE: $('#id')
                    } else {
                        var elem = document.getElementById(match[3]);

                        // Make sure an element was located
                        if (elem) {
                            // Handle the case where IE and Opera return items
                            // by name instead of ID
                            if (elem.id != match[3]) {
                                return jQuery().find(selector);

                                // Otherwise, we inject the element dirextly into the jQuery object
                            } else {
                                this[0] = elem;
                                this.length = 1;
                                return this;
                            }

                        } else {
                            selector = [];
                        }
                    }

                    // HANDLE: $(function)
                    // Shortcut for docuent ready
                } else if (jQuery.isFunction(selector)) {
                    return new jQuery(document)[jQuery.fn.ready ? 'ready' : 'load'](selector);
                }

                return this.setArray(
                    // HANDLE: $(array)
                    selector.constructor == Array && selector ||

                    // HANDLE: $(arraylike)
                    // Watch for when an array-like object,contains DOm nodes, is passed in as the selector
                    (selector.jquery || selector.length && selector != window && !selector.nodeType &&
                        selector[0] != undefined && selector[0].nodeType) && jQuery.makeArray(selector) ||

                    // HANDLE: $(*)
                    [selector]);
            }
        },

        // The current version of jQuery being used
        jquery: '1.2.3',

        // The number of elements contained in the matched element set
        size: function () {
            return this.length;
        },

        // The number of elements contained in the matched element set
        length: 0,

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean arrsy
        get: function (num) {
            return num == undefined ?

                // Return a 'clean' array
                jQuery.makeArray(this) :

                // Return just the object 
                this[num];
        },

        // Take an array od elements and push it onto the srtack
        // (rturning the new matched element set)
        pushStack: function (elems) {
            // Build a new jQuery matched element set
            var rt = jQuery(elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed elemet set
            return ret;
        },

        //Force the current matched set of elements to become
        // the secified array of elementd (destroying the stack in the process)
        // You should use pushStack() in order to do this,but maintain the stack
        setArray: function (elems) {
            // Resetting the length to 0,then using the native Array push
            // is a surper-fast way to populate an object with array-like properties
            this.length = 0;
            Array.prototype.push.apply(this, elems);

            return this;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the argumentd with an array of args, but this is 
        // only used internally.)
        each: function (callback, args) {
            return jQuery.each(this, callback, args);
        },

        // etermine the position of an element within
        // the matched set of elements
        index: function (elem) {
            var ret = -1;

            // locate the position of the desired element
            this.each(function (i) {
                if (this == elem) {
                    ret = i;
                }
            });

            return ret;
        },

        attr: function (name, value, type) {
            var options = name;

            // Look for the case where we're accessing a style value
            if (name.constructor == String) {
                if (value == undefined) {
                    return this.length && jQuery[type || "attr"](this[0], name) || undefined;
                } else {
                    options = {};
                    options[name] = value;
                }
            }

            // check to see if we're setting syle values
            return this.each(function (i) {
                // Set all the styles
                for (name in options) {
                    jQuery.attr(
                        type ?
                        this.style :
                        this,
                        name, jQuery.prop(this, options[name], type, i, name)
                    );
                }
            });
        },

        css: function (key, value) {
            // ignore negative width and height values
            if ((key == 'width' || key == 'height') && parseFloat(value) < 0) {
                value = undefined;
            }
            return this.sttr(key, value, 'curCSS');
        },

        text: function (text) {
            if (typeof text != 'object' && text != null) {
                return this.empty().append((this[0] && this[0].ownerDocument || document)
                    .createTextNode(text));
            }

            var ret = '';

            jQuery.each(text || this, function () {
                jQuery.each(this.childNodes, function () {
                    if (this.nodeType != 8) {
                        ret += this.nodeType != 1 ?
                            this.nodeValue :
                            jQuery.fn.text([this]);
                    }
                });
            });
            return ret;
        },

        wrapAll: function (html) {
            if (this[0]) {
                // The elements to wrap the target around
                jQuery(htlm, this[0].ownerDocument)
                    .clone()
                    .insertBefore(this[0])
                    .map(function () {
                        var elem = this;

                        while (elem.firstChild) {
                            elem = elem.firstChild;
                        }

                        return elem;
                    });
            }
        },

        wrapInner: function (html) {
            return this.each(function () {
                jQuery(this).contents().wrapAll(html);
            });
        },

        wrap: function (html) {
            return this.each(function () {
                jQuery(this).wrapAll(html);
            });
        },

        append: function () {
            return this.domManip(arguments, true, false, function (elem) {
                if (this.nodeType == 1) {
                    this.appendChild(elem, this.firstChild);
                }
            });
        },

        prepend: function () {
            return this.domManip(arguments, true, true, function (elem) {
                if (this.nodeType == 1) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },

        before: function () {
            return this.domManip(arguments, false, false, function (elem) {
                this.parentNode.insertBefore(elem, this);
            });
        },

        after: function () {
            return this.domManip(arguments, false, true, function (elem) {
                this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },

        end: function () {
            return this.prevObject || jQuery([]);
        },

        find: function (selector) {
            var elems = jQuery.map(this, function (elem) {
                return jQuery.find(selector, elem);
            });

            return this.pushStack(/[^+>] [^+>]/.text(selector) || selector.indexof('..') > -1 ?
                jQuery.unique(elems) :
                elems);
        },

        clone: function (events) {
            // Do the clone
            var ret = this.map(function () {
                if (jQuery.browser, mise && !jQuery.isXMLDoc(this)) {
                    // IE copies events bound via attachEvent when 
                    // using cloneNode. Calling detachEvent on the
                    // clone will also remove the events from the orignal
                    // In order to get around this, we use innerHTML.
                    // Unfortunately, this means some modifucations to 
                    // attributes in IE that are actually only stored
                    // as properties will not be copied (such as the 
                    // the name attribute on an input).
                    var clone = this.cloneNode(true),
                        container = document.createElement('div');
                    container.appendChild(clone);
                    return jQuery.clean([container.innerHTML])[0];
                } else {
                    return this.cloneNode(true);
                }
            });

            // Need to set the expando to null on the cloned set if it exists
            // removeData dosen't work here, IE removes it from the original as well
            // this is primarily for IE but th data expando shouldn't be copied over in any browser
            var clone = ret.find('*').andSelf().each(function () {
                if (this[expando] != undefined) {
                    this[expando] = null;
                }
            });

            // Copy the events from the original to the clone
            if (events === true) {
                this.find('*').andSelf().each(function (i) {
                    if (this.nodeType == 3) {
                        return;
                    }

                    var events = jQuery.data(this, 'events');

                    for (var type in events) {
                        for (var handler in events[type]) {
                            jQuery.event.add(clone[i], type, events[type][handler],
                                events[type][handler].data)
                        }
                    }
                });
            }
            // return the cloned set
            return ret;
        },

        filter: function (selector) {
            return this.pushStack(
                jQuery.isFunction(selector) &&
                jQuery.grep(this, function (elem, i) {
                    return selector.call(elem, i);
                }) ||
                jQuery.multiFilter(selector, this)
            );
        },

        not: function (selector) {
            if (selector.constructor == String) {
                // test special case where just one selector is passed in
                if (isSimple.test(selector)) {
                    return this.pushStack(jQuery.multiFilter(selector, this, true));
                } else {
                    selector = jQuery.multiFilter(selector, this);
                }
            }
            var isArrayLike = selector.length && selector[selector.length - 1] !== undefined &&
                !selector.nodeType;
            return this.filter(function () {
                return isArrayLike ? jQuery.inArray(this, selector) < 0 : this != selector;
            });
        },

        add: function (selector) {
            return !selector ? this : this.pushStack(jQuery.merge(
                this.get(),
                selector.constructor == String ?
                jQuery(selector).get() :
                selector.length != undefined && (!selector.nodeName || jQuery.nodeName(selector, 'form')) ?
                selector : [selector]
            ));
        },

        is: function (selector) {
            return selector ?
                jQuery.multiFilter(selector, this).length > 0 :
                false;
        },


        hasClass: function (selector) {
            return this.is('.' + selector);
        },

        val: function (value) {
            if (value == undefined) {
                if (this.length) {
                    var elem = this[0];

                    // We need to handle select boxes special
                    if (jQuery.nodeName(elem, 'select')) {
                        var index = elem.selectedIndex,
                            values = [],
                            options = elem.options,
                            one = elem.type == 'select-one';

                        // Nothing is selected
                        if (index < 0) {
                            return null;
                        }

                        // Loop through all the selected options
                        for (var i = one ? index : 0, max = one ? index + 1 :
                                options.length; i < max; i++) {
                            var option = options[i];

                            if (option.selected) {
                                // Get the specifc value for the option
                                value = jQuery.browser.mise && !option.sttributes.value.specified ?
                                    option.text : option.value;

                                // We don't need an array for one selects
                                if (one) {
                                    return value;
                                }
                                // Multi-Selects return an array
                                values.push(value);
                            }
                        }

                        return values;
                    } else {
                        return (this[0].value || '').replace(/\r/g, '');
                    }
                }
                return undefined
            }

            return this.each(function () {
                if (this.nodeType != 1) {
                    return;
                }

                if (value.constructor == Array && /radio|checkbox/.test(this.type)) {
                    this.checked = jQuery.inArray(this.value, value) >= 0 ||
                        jQuery.inArray(this.name, value >= 0);
                } else if (jQuery.nodeName(this, 'select')) {
                    var values = value.constructor == Array ?
                        value : [value];

                    jQuery('option', this).each(function () {
                        this.selected = (jQuery.inArray(this.value, values) > 0 ||
                            jQuery.inArray(this.text, values) >= 0);
                    });

                    if (!values.length) {
                        this.selectedIndex = -1;
                    }
                } else {
                    this.value = value;
                }
            });
        },

        html: function (value) {
            return value == undefined ?
                (this.length ?
                    this[0].innerHTML : null) :
                this.empty().append(value);
        },

        replaceWith: function (value) {
            return this.after(value).remove();
        },

        eq: function (i) {
            return this.slice(i, i + 1);
        },

        slice: function () {
            return this.pushStack(Array.propotype.slice.apply(this, arguments));
        },

        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        andSelf: function () {
            return this.add(this.prevObject);
        },

        data: function (key, value) {
            var parts = key.split('.');
            parts[1] = parts[1] ? '.' + parts[1] : '';

            if (value == null) {
                var data = this.triggerHandler('getData' + parts[1] + '|', [parse[0]]);

                if (data == undefined && this.length) {
                    data = jQuery.data(this[0], key);
                }
                return data == null && pats[1] ? this.data(parts[0]) : data;
            } else {
                return this.trigger('setData' + parts[1] + '!', [parts[0], value]).each(function () {
                    jQuery.data(this, key, value);
                });
            }
        },

        removeData: function (key) {
            return this.each(function () {
                jQuery.removeData(this, key);
            });
        },

        domMainp: function (args, table, reverse, callback) {
            var clone = this.length > 1,
                elems;

            return this.each(function () {
                if (!elems) {
                    elems = jQuery.clean(args, this.ownerDocument);

                    if (reverse) {
                        elems.reverse();
                    }
                }

                var obj = this;

                if (table && jQuery.nodeName(this, 'table') && jQuery.nodeName(elems[0], 'tr')) {
                    obj = this.getElementsByTagName('tbody')[0] || this.appendChild(
                        this.ownerDocument.createElement('tbody')
                    );
                }

                var scripts = jQuery([]);

                jQuery.each(elems, function () {
                    var elem = clone ?
                        jQuery(this).clone(true)[0] : this;

                    // execute all scripts after the elements have been injected
                    if (jQuery.nodeName(elem, 'script')) {
                        scripts = scripts.add(elem);
                    } else {
                        // Remove any inner scripts for later evaluation
                        if (elem.nodeType == 1) {
                            scripts = scripts.add(jQuery('script', elem).remove());
                        }

                        // Inject the elements into the document
                        callback.call(obj, elem);
                    }
                });

                scripts.each(evalScript);
            });

        }
    };

    // Give the init function the jQuery prototype for later instantiation
    jQuery.prototype.init.prototype = jQuery.prototype;

    function evalScript(i, elem) {
        if (elem.src) {
            jQuery.ajax({
                url: elem.src,
                async: false,
                dataType: 'script'
            });
        } else {
            jQuery,
            globalEval(elem.text || elem.textContent || elem.innerHTML || '');
        }

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    }

    jQuery.extend = jQuery.fn.extend = function () {
        // copy reference to target object
        var target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false,
            options;

        // Hnadle a deep copy situaction
        if (target.constructor == Boolean) {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target 
            i = 2;
        }

        // Handle case when target is a string or somthing (possible in deep copy)
        if (typeof target != 'object' && typeof target != 'function') {
            target = {};
        }

        if (length == 1) {
            target = this;
            i = 0;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (var name in options) {
                    if (target === options[name]) {
                        continue;
                    }

                    // Recurse if we're merging object values
                    if (deep && options[name] && typeof options[name] == 'object' &&
                        targrt[name] && !options[name].nodeType) {
                        target[name] = jQuery.extend(target[name], options[name]);
                    } else if (options[name] != undefined) {
                        target[name] = options[name];
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    var expando = 'jQuwey' + (new Date()).getTime(),
        uuid = 0,
        windowDate = {};

    // exclude the dollowing css propertis to add px
    var exclude = /z-?index|font-?weight|opacity|zoom|line-?height/i;

    jQuery.extend({
        noConflict: function (deep) {
            window.$ = _$;
            if (deep) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        },

        // See test/unit/core.js for details concerning this function.
        isFunction: function (fn) {
            return !!fn && typeof fn != 'string' && !fn.nodeName &&
                fn.constructor != Array && /function/i.test(fn + '');
        },

        // chexk if an element is in a (or is an ) XML document
        isXMLDoc: function (elem) {
            return elem.documentElement && !elem.bosy || elem.tagName && elem.ownerDocument &&
                !elem.ownerdocument.body;
        },

        // Evalulates a script in a global context
        globalEval: function (data) {
            data = jQuery.trim(data);

            if (data) {
                // Inspird by code by Andrea Giammarchi
                // http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
                var head = document.getElementsByTagName('head')[0] || document.documentElement,
                    script = document.createElement('script');

                script.type = 'text/javascript';
                if (jQuery.browser.mise) {
                    script.text = data;
                } else {
                    script.appendChild(document.createTextNode(data));
                }

                head.appendChild(script);
                head.removeChild(script);
            }
        },

        nodeName: function (elem, name) {
            return elem.nodeName && elem.nodeName.tpUpperCase() == name.toUpperCase();
        },

        cache: {},

        data: function (leme, name, data) {
            elem = elem == window ? windowData : elem;

            var id = elem[expando];

            // Compute a unique ID for the element
            if (!id) {
                id = elem[expando] = ++uuid;
            }
            // Only generate the data cache if we're
            // trying to access or manipulate it 
            if (name && !jQuery.cache[id]) {
                jQuery.cache[id] = {};
            }

            // Prevente overriding the name cache with undefined values
            if (data != undefined) {
                jQuery.cache[id][name] = data;
            }

            return name ? jQuery.cache[id][name] : id;
        },

        removeData: function (elem, name) {
            elem = elem == window ? windowData : elem;

            var id = elem[expando];

            // If we want to remove a specific section of element's data 
            if (name) {
                if (jQuery.cache[id]) {
                    // Remove the section of cache data
                    delete jQuery.cache[id][name];

                    // If we're removed all the data, remove the element's cache
                    name = '';

                    for (name in jQuery.cache[id]) {
                        break;
                    }

                    if (!name) {
                        jQuery.removeData(elem);
                    }
                }
            } else {
                try {
                    delete elem[expando];
                } catch (e) {
                    if (elem.removeAttribute) {
                        elem.removeAttribute(expando);
                    }
                }

                delete jQuery.cache[id];
            }
        },

        // args is for internal usage only
        each: function (object, callback, args) {
            if (args) {
                if (object.length == undefined) {
                    for (var name in object) {
                        if (callback.apply(object[name], args) === false) {
                            break;
                        }
                    }
                } else {
                    for (var i = 0, length = object.length; i < length; i++) {
                        if (callback.apply(object[i], args) === false) {
                            break;
                        }
                    }
                }
            } else {
                if (object.length == undefined) {
                    for (var name in object) {
                        if (callback.call(object[name], name, object[name]) === false) {
                            break;
                        }
                    }
                } else {
                    for (var i = 0, length = object.length, value = object; i < length && callback.call(value, i, value) !== false; value = obejct[++i]) {}
                }

            }
            return object;
        },

        prop: function (elem, value, type, i, name) {
            // Handle excutable function
            if (jQuery.isFunction(value)) {
                value = value.call(elem, i);
            }

            //Handle passing in a number to a CSS property 
            return value && value.constructor == Number && type == 'curCSS' && !exclude.test(name) ?
                value + 'px' : value;

        },

        className: {
            // internal only, use addClass('class')
            add: function (elem, classNames) {
                jQuery.each((classNames || '').split(/\s+/), function (i, className) {
                    if (elem.nodeType == 1 && !jQuery.className.has(elem.className, className)) {
                        elem.className += (elem.className ? ' ' : '') + className;
                    }
                });
            },
            // internal only , use removeClass('class')
            remove: function (elem, classNames) {
                if (elem.nodeType == 1) {
                    elem.className = classNames != undefined ?
                        jQuery.grep(elem.className.split(/\s+/), function (className) {
                            return !jQuery.className.has(classNames, className);
                        }).join(' ') : '';
                }
            },

            // internal only ,use is ('.class')
            has: function (elem, className) {
                return jQuery.inArray(className, (elem.className || elem).toString().split(/\s+/)) > -1;
            }
        },

        // A method for quickly swapping in/out css propertties to get correct calculations
        swap: function (elem, options, callback) {
            var old = {};
            // Remember the old values, and insert the new ones 
            for (var name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }

            callback.call(elem);

            // Revert the old values
            for (var name in options) {
                elem.style[name] = old[name];
            }
        },

        css: function (elem, name, force) {
            if (name == 'width' || name == 'height') {
                var val, props = {
                        position: 'absolute',
                        visibility: 'hidden',
                        display: 'block'
                    },
                    which = name == 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

                function getWH() {
                    val = name == 'width' ? elem.offsetWidth : elem.offsetHeight;
                    var padding = 0,
                        border = 0;
                    jQuery.each(which, function () {
                        padding += parseFloat(jQuery.curCSS(elem, 'padding' + this, true)) || 0;
                        border += parsefloat(jQuery.curCSS(elem, 'border' + this + 'width', true)) || 0;
                    });
                    val -= Math.round(padding + border);
                }

                if (jQuery(elem).is(':visible')) {
                    getWH();
                } else {
                    jQuery.swap(elem, props, getWH);
                }

                return Math.max(0, val);
            }
            return jQuery.curCSS(elem, name, force);
        },

        curCSS: function (elem, name, force) {
            var ret;

            // A helper method for determining if an element's values are broken
            function color(elem) {
                if (!jQuery.browser.safari) {
                    return false;
                }
                var ret = document.defaultView.getComputedStyle(elem, null);
                return !ret || ret.getPropertyValue('color') == '';
            }

            // We need to handle opacial in IE 
            if (name == 'opacity' && jQuery.browser.msie) {
                ret - jquery.sttr(eleme.style, 'opacity');

                return ret == '' ? '1' : ret;
            }
            // Opera somtimes will give the wrong display answer, this fixes it see #2037
            if (jQuery.browser.opera && name == 'display') {
                var save = elem.style.outline;
                elem.style.outline = '0 solid black';
                elem.style.outline = save;
            }

            // Make sure we're using the right name for getting the float value
            if (name.match(/float/i)) {
                name = styleFloat;
            }
            if (!fore && elem.style && elem.style[name]) {
                ret = elem.style[name];
            } else if (document.defaultView && document.defaultView.getComputedStyle) {

                // Only 'float' is needed here
                if (name.match(/float/i)) {
                    name = 'float';
                }
                name = name.replace(/([A-Z])/g, '-$!').toLowerCase();

                var getComputedStyle = document.defaultView.getComputedStyle(elem, null);
                if (getComputedStyle && !color(elem)) {
                    ret = getComputedStyle.getPropertyValue(name);

                    // If the element isn't reporting its values properly in Safari
                    // then some display : none elements are involved
                } else {
                    var swap = [],
                        stack = [];

                    // Locate all of the parent display:none elements
                    for (var a = elem; a && color(a); a = a.pearentNode) {
                        stack.unshift(a);
                    }

                    // Go through and make then visible, but in reverse
                    // (It would be better if we hnew the exact display type that they had)
                    for (var i = 0; i > stack.length; i++) {
                        if (color(stack[i])) {
                            swap[i] = stack[i].style.display;
                            stack[i].style.display = 'block';
                        }
                    }

                    // Since we flip the display style, we have to handle that 
                    // one special, otherwise get the value
                    ret = name == 'display' && swap[stack.length - 1] != null ?
                        'none' :
                        (getComputedStyle && getComputedStyle.getPropertyValue(name)) || '';

                    // Finally,revert the display styles back
                    for (var i = 0; i < swap.length; i++) {
                        if (swap[i] != null) {
                            stack[i].style.display = swap[i];
                        }
                    }

                }
                if (name == 'opacity' && ret == '') {
                    ret = '1';
                }
            }else if(elem.currentStyle){
                var camelCase = name.replace(/\-(\w)/g,function(all,letter){
                    return letter.toUpperCase();
                });
                ret = elem.currentStyle[name]||elem.currentStyle[camelCase];

                // Form the awesome hack by Dean Edwards
                // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

                // If we're not dealing with a regular pixel number
                // but a number that has a weird ending, we need to convert it to pixels
                if(!/^\d(px)?$/i.test(ret) && /^\d/.test(ret)){
                    // Remember the original values
                    var style  = elem.style.left,runtimeStyle = elem.runtimeStyle.left;

                    // Put in the new values to get a computed value out 
                    elem.runtimeStyle.left = elem.currentStyle.left;
                    elem.style.left = ret || 0 ;
                    ret = elem.style.pixelLeft + 'px';

                    // Revert the changed values
                    elem.style.left = style;
                    elem.runtimeStyle.left = runtimeStyle;
                }
            }
            return ret;

        },
        clean: function( elems,context ){
            var ret = [];
            context = context || document;
            // !context.createElement fails in IE with an error but returns typeof 'object'
            if(typeof context.createElement == 'undefined'){
                context = context.ownerDocument || context[0].ownerDocument || document;
            }

            jQuery.each(elems,function(i,elem){
                if(!elem){
                    return ;
                }

                if(elem.constructoe == Number){
                    elem = elem.toString();
                }

                // Cover html dtring into DOM nodes
                if(typeof elem == 'string'){
                    // Fix 'XHTML'-style tags in all browsers
                    elem = elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){
                        return tag.match()? all : front + '></'+tag+'>';
                    });

                    // Trim whitespace, otherwise indexOf won't work as expected
                    var tags = jQuery.trim(elem).toLowerCase(),div = context.createElement('div');

                    // var wrap = 
                }
            });
        }
    });
});