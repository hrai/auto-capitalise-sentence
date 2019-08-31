export function shouldCapitaliseForI(text) {
    const regex = /\s+i(\s+|')$/;
    const matches = regex.test(text);

    return matches;
}

export function shouldCapitalise(text) {
    const multilineRegex = /\s*\n+\s*\w$/;
    let matches = multilineRegex.test(text);

    if (matches) return true;

    const sentenceRegex = /\w+\s*(\.|\?)+\s+\w$/;
    matches = sentenceRegex.test(text);

    if (!matches) {
        return text.length == 1;
    }

    return matches;
}

export function onError(error) {
    console.log(error);
}

export function getText(htmlControl, tagName) {
    if (
        tagName.toUpperCase() === 'INPUT' ||
      tagName.toUpperCase() === 'TEXTAREA'
    ) {
        return htmlControl.value ? htmlControl.value : '';
    }

    return htmlControl.innerHTML ? htmlControl.innerHTML : '';
}

export function setText(htmlControl, tagName, updatedStr, shouldAppendBr) {
    if (
        tagName.toUpperCase() === 'INPUT' ||
      tagName.toUpperCase() === 'TEXTAREA'
    ) {
        htmlControl.value=updatedStr;
        return;
    }

    if (shouldAppendBr) {
        updatedStr += '<br>';
    }

    htmlControl.innerHTML = updatedStr;
    setEndOfContenteditable(htmlControl);
}

export function setEndOfContenteditable(contentEditableElement) {
    let range, selection;
    if (document.createRange) {
        //Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange(); //Create a range (a range is a like the selection but invisible)
        const childNodes=contentEditableElement.childNodes;
        console.log(childNodes.length);
        const childNode=childNodes.length==1?childNodes[0]: childNodes[childNodes.length-2];
        range.setStart(childNode.data, childNode.length);
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection(); //get the selection object (allows you to change selection)
        selection.removeAllRanges(); //remove any selections already made
        selection.addRange(range); //make the range you have just created the visible selection
    } else if (document.selection) {
        //IE 8 and lower
        range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
        range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
        range.select(); //Select the range (make it the visible selection
    }
                    // throw new Error('test');
}

export function capitaliseText(element, shouldCapitalise, shouldCapitaliseForI, getText, setText) {
    if(!element)
        return;

    let tagName = element.tagName;

    if(!isEditableElement(element, tagName)  )
        return;

    let text = getText(element, tagName);

    //support for jira's comment section's p tags
    let lastChar = text.trim().slice(-1);
    if (lastChar.match(/[a-z]/i) && lastChar.toUpperCase() === lastChar) {
        return;
    }

    let shouldAppendBr = false;
    if (text.length >= 4 && text.slice(-4) === '<br>') {
        text = text.slice(0, -4);
        shouldAppendBr = true;
    }

    if (shouldCapitalise(text)) {
        const updatedStr = getCapitalisedContent(text);

        setText(element, tagName, updatedStr, shouldAppendBr);
        return;
    }

    if (text.length >= 2 && shouldCapitaliseForI(text)) {
        const updatedStr = getCapitalisedContentForI(text);

        setText(element, tagName, updatedStr, shouldAppendBr);
        return;
    }
}

export function getCapitalisedContentForI(text) {
    const lastTwoChars = text.slice(-2);
    const updatedStr =
      text.substr(0, text.length - 2) + lastTwoChars.toUpperCase();
    return updatedStr;
}

export function getCapitalisedContent(text) {
    const lastChar = text.slice(-1);
    const updatedStr = text.substr(0, text.length - 1) + lastChar.toUpperCase();
    return updatedStr;
}

export function containsHtmlContent(element) {
    const content = $(element).html();

    const brRegex = /\s*<br>/;
    if (content && brRegex.test(content)) return false;

    const regex = /<\/?\w+>/;
    const hasHtmlTag = regex.test(content);
    return hasHtmlTag;
}

export function isContentEditable(element) {
    return element && element.isContentEditable;
}

export function getFilteredElements(addedNodes, tagName) {
    return $(addedNodes)
        .find(tagName)
        .addBack(tagName); // finds either added alone or as tree
}

export function shouldCapitaliseContent(element) {
    return isContentEditable(element) && !containsHtmlContent(element);
}

export function isEditableElement(element, tagName) {
    return element.isContentEditable ||
                    tagName.toUpperCase() === 'INPUT' ||
                  tagName.toUpperCase() === 'TEXTAREA';
}

