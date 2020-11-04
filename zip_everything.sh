PUBLISHED_FILE=everything.zip

if [ -f "$PUBLISHED_FILE" ]; then
    echo "Deleting $PUBLISHED_FILE..."
    rm -f $PUBLISHED_FILE
fi

zip -r9 $PUBLISHED_FILE background.js jest.config.js LICENSE popup src \
        distribution \
        node_modules/webextension-polyfill/dist/browser-polyfill.min.js \
        node_modules/jquery/dist/jquery.min.js

echo "Successfully zipped to '$PUBLISHED_FILE'"
