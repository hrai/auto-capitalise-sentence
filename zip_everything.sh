PUBLISHED_FILE=everything.zip

if [ -f "$PUBLISHED_FILE" ]; then
    echo "Deleting $PUBLISHED_FILE..."
    rm -f $PUBLISHED_FILE
fi

zip -r9 $PUBLISHED_FILE background.js dependencies icons jest.config.js lib LICENSE manifest.json popup src \
        node_modules/webextension-polyfill/dist/browser-polyfill.min.js \
        node_modules/jquery/dist/jquery.min.js

echo "Successfully zipped to '$PUBLISHED_FILE'"
