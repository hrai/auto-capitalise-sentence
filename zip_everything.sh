PUBLISHED_FILE=everything.zip

if [ -f "$PUBLISHED_FILE" ]; then
    echo "Deleting $PUBLISHED_FILE..."
    rm -f $PUBLISHED_FILE
fi

zip -r9 $PUBLISHED_FILE background.js dependencies icons jest.config.js lib LICENSE manifest.json popup src

echo "Successfully zipped to '$PUBLISHED_FILE'"
