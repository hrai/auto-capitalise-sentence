PUBLISHED_FILE=publish.zip
zip -r9 $PUBLISHED_FILE dependencies icons popup background.js content.js LICENSE manifest.json

echo "Successfully zipped to '$PUBLISHED_FILE'"
