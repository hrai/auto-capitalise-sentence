PUBLISHED_FILE=publish.zip

if [ -f "$PUBLISHED_FILE" ]; then
    echo "Deleting $PUBLISHED_FILE..."
    rm -f $PUBLISHED_FILE
fi

npm run build

zip -r9 $PUBLISHED_FILE dependencies icons popup background.js LICENSE manifest.json lib/bundle.js

echo "Successfully zipped to '$PUBLISHED_FILE'"
