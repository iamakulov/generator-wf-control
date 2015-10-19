import { Base } from 'yeoman-generator';
import path from 'path';

export default class WfControlGenerator extends Base {
    constructor(...args) {
        super(...args);

        this.argument('controlName', {
            desc: 'WF control name',
            type: String,
            required: false
        });
    }

    initializing() {
        // This check should be performed in initializing() method instead of the constructor
        // because this.env.error() call in the constructor can’t be caught with Mocha
        if (!WfControlGenerator._validateControlName(this.controlName)) {
            this.env.error(WfControlGenerator._validationErrorMessage);
        }
    }

    prompting() {
        if (!this.controlName) {
            this._promptControlName();
        }
    }

    configuring() {
        this.jsControlName = this.controlName.replace('-', '_');
    }

    writing() {
        ['wfc', 'less', 'jsm'].forEach(kind => {
            this._writeTemplate(kind, {
                controlName: this.controlName,
                jsControlName: this.jsControlName
            });
        });
    }

    _promptControlName() {
        let done = this.async();

        let currentDirName = path.basename(this.destinationRoot());
        this.prompt({
            message: 'How would you like to name the control?',
            type: 'input',
            name: 'controlName',
            default: currentDirName,
            // `validate` callback should return `true` when everything is OK and error message otherwise
            validate: value => WfControlGenerator._validateControlName(value) ? true : WfControlGenerator._validationErrorMessage
        }, answer => {
            this.controlName = answer.controlName;
            done();
        });
    }

    _writeTemplate(kind, data) {
        var templateConfig = WfControlGenerator._templateConfig[kind];
        let templateFile = templateConfig.file;
        let targetExtension = templateConfig.targetExtension;

        this.fs.copyTpl(
            this.templatePath(templateFile),
            this.destinationPath(this.controlName + targetExtension),
            data
        );
    }

    static _validateControlName(name) {
        return /^[a-z0-9_-]+$/i.test(name);
    }
}

WfControlGenerator._templateConfig = {
    'wfc': {
        file: 'index.wfc',
        targetExtension: '.wfc'
    },
    'less': {
        file: 'index.less',
        targetExtension: '.less'
    },
    'jsm': {
        file: 'index.jsm',
        targetExtension: '.jsm'
    }
};

WfControlGenerator._validationErrorMessage = 'The control name is invalid. It must only contain latin letters, digits, underscore and dash.';