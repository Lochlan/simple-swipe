# files
SRC := simple-swipe.js
BUILD := $(SRC:.js=.min.js)
DEPS := node_modules

# tools
JSHINT := ./node_modules/.bin/jshint
JSLINT := ./node_modules/.bin/jslint
UGLIFY := ./node_modules/.bin/uglifyjs

# rules
all: deps build

build: $(BUILD)

clean:
	rm -rfv $(DEPS)
	rm -rfv $(BUILD)

deps: $(DEPS)

lint:
	$(JSHINT) $(SRC)

# file rules
%.min.js: %.js
	$(JSHINT) $?
	$(JSLINT) $?
	$(UGLIFY) $? --output $@

node_modules: package.json
	npm install
	touch node_modules
