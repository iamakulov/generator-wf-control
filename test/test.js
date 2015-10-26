import { test as helpers, assert } from 'yeoman-generator';
import path from 'path';

describe('default generator', () => {
    describe('control name tests', () => {
        const defaultType = 'generic';

        it('should accept control name as an argument', done => {
            let controlName = 'test-controlName_123';

            helpers.run(path.join(__dirname, '../generators/app'))
                .withArguments([controlName])
                .withOptions({type: defaultType})
                .on('end', () => {
                    assert.file([controlName + '.wfc', controlName + '.less', controlName + '.jsm']);
                    done();
                });
        });

        it('should accept control name in a prompt', done => {
            let controlName = 'test-controlName_123';

            helpers.run(path.join(__dirname, '../generators/app'))
                .withPrompts({controlName})
                .withOptions({type: defaultType})
                .on('end', () => {
                    assert.file([controlName + '.wfc', controlName + '.less', controlName + '.jsm']);
                    done();
                });
        });

        it('should fall back to directory name when nothing is passed', done => {
            let controlName = 'test-controlName_123';
            let directoryName = './test-controlName_123';

            helpers.run(path.join(__dirname, '../generators/app'))
                .inDir(directoryName)
                .withOptions({type: defaultType})
                .on('end', () => {
                    assert.file([controlName + '.wfc', controlName + '.less', controlName + '.jsm']);
                    done();
                });
        });


        it('should fail with an error when an invalid control name is passed as an argument', done => {
            let controlName = 'test-controlName_123.abc';

            helpers.run(path.join(__dirname, '../generators/app'))
                .withArguments([controlName])
                .withOptions({type: defaultType})
                .on('error', () => {
                    assert(true);
                    done();
                })
                .on('end', () => {
                    assert(false);
                    done();
                });
        });

        it('should re-prompt for another control name when an invalid one is passed in a prompt');
    });

    describe('control type tests', () => {
        const defaultName = 'test-controlName_123';

        it('should accept control type as an option', done => {
            let controlType = 'generic';

            helpers.run(path.join(__dirname, '../generators/app'))
                .withArguments([defaultName])
                .withOptions({type: controlType})
                .on('end', () => {
                    assert.file([defaultName + '.wfc', defaultName + '.less', defaultName + '.jsm']);
                    done();
                });
        });

        it('should accept control type in a prompt', done => {
            let controlType = 'generic';

            helpers.run(path.join(__dirname, '../generators/app'))
                .withArguments([defaultName])
                .withPrompts({type: controlType})
                .on('end', () => {
                    assert.file([defaultName + '.wfc', defaultName + '.less', defaultName + '.jsm']);
                    done();
                });
        });

        let controlFiles = {
            'generic': ['.wfc', '.less', '.jsm'],
            'informer': ['.wfec', '.less', '.jsm']
        };

        Object.keys(controlFiles).forEach(controlType => {
            it(`should generate specific files for '${controlType}' control type`, done => {
                helpers.run(path.join(__dirname, '../generators/app'))
                    .withArguments([defaultName])
                    .withOptions({type: controlType})
                    .on('end', () => {
                        assert.file(controlFiles[controlType].map(ext => defaultName + ext));
                        done();
                    });
            });
        });

        it('should fail with an error when an invalid control type is passed as an option');
    });
});
