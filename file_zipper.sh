PUBLISHED_FILE=publish.zip

if [ -f "$PUBLISHED_FILE" ]; then
    echo "Deleting $PUBLISHED_FILE..."
    rm -f $PUBLISHED_FILE
fi

zip -r9 $PUBLISHED_FILE dependencies icons popup background.js content.js LICENSE manifest.json lib/bundle.js

echo "Successfully zipped to '$PUBLISHED_FILE'"
