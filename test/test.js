import { test as helpers, assert } from 'yeoman-generator';
import path from 'path';

describe('default generator', function () {
    describe('when passing a custom control name as an argument', function () {
        const controlName = 'test-controlName';
        const jsControlName = 'test_controlName';

        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withArguments([controlName])
                .on('end', done);
        });

        it('should create three files named after control', function () {
            assertFilesCreated(controlName);
        });

        it('should include original control name into .less file', function () {
            assertLessContainsControlName(controlName);
        });

        it('should include js-adapted control name into .wfc and .jsm file', function () {
            assertWfcJsmContainAdaptedControlName(controlName, jsControlName);
        });
    });

    describe('when passing a custom control name in a prompt', function () {
        const controlName = 'test-controlName';
        const jsControlName = 'test_controlName';

        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({ controlName })
                .on('end', done);
        });

        it('should create three files named after control', function () {
            assertFilesCreated(controlName);
        });

        it('should include original control name into .less file', function () {
            assertLessContainsControlName(controlName);
        });

        it('should include js-adapted control name into .wfc and .jsm file', function () {
            assertWfcJsmContainAdaptedControlName(controlName, jsControlName);
        });
    });

    describe('when falling back to default control name', function () {
        const directoryName = './test-fallbackControlName';
        const controlName = 'test-fallbackControlName';
        const jsControlName = 'test_fallbackControlName';

        before(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .inDir(directoryName)
                .on('end', done);
        });

        it('should create three files named after the control’s directory', function () {
            assertFilesCreated(controlName);
        });

        it('should include original control name into .less file', function () {
            assertLessContainsControlName(controlName);
        });

        it('should include js-adapted control name into .wfc and .jsm file', function () {
            assertWfcJsmContainAdaptedControlName(controlName, jsControlName);
        });
    });
});




function assertFilesCreated(controlName) {
    assert.file([controlName + '.wfc', controlName + '.less', controlName + '.jsm']);
}

function assertLessContainsControlName(controlName) {
    assert.fileContent(controlName + '.less', controlName);
}

function assertWfcJsmContainAdaptedControlName(controlName, jsControlName) {
    assert.fileContent(controlName + '.wfc', jsControlName);
    assert.fileContent(controlName + '.jsm', jsControlName);
}