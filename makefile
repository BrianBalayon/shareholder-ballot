# OS identification from: https://stackoverflow.com/questions/714100/os-detecting-makefile
OS := $(shell uname -s)

ifeq ($(OS), Darwin)
  CUNIT_PATH_PREFIX = /usr/local/Cellar/cunit/2.1-3/
  CUNIT_DIRECTORY = cunit
endif
ifeq ($(OS), Linux)
  CUNIT_PATH_PREFIX = /util/CUnit/
  CUNIT_DIRECTORY = CUnit/
endif

# end of OS identification


precommit:
	find . -name sh-ballot.zip -print0 | xargs -0 rm -rf "{}"
	git add -A
	find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch

gittree:
	git log --all --decorate --oneline --graph

presubmit:
	find . -name sh-ballot.zip -print0 | xargs -0 rm -rf "{}"
	find ballot-app -type d -name "contracts" -print0 | xargs -0 rm -rf "{}"
	find ballot-app -type d -name "node_modules" -print0 | xargs -0 rm -rf "{}"
	find ballot-contract -type d -name "build" -print0 | xargs -0 rm -rf "{}"
	zip -r sh-ballot.zip .
