import { Component, HostListener, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItem } from './multiselect.model';
export var DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelectComponent; }),
    multi: true
};
var noop = function () { };
var MultiSelectComponent = (function () {
    function MultiSelectComponent() {
        this._data = [];
        this.selectedItems = [];
        this.isDropdownOpen = false;
        this.filter = new ListItem(this.data);
        this.defaultSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'text',
            enableCheckAll: true,
            selectAllText: 'Select All',
            unselectAllText: 'Unselect All',
            allowSearchFilter: false,
            maxHeight: 197,
            itemsShowLimit: 999999999999,
            searchPlaceholderText: 'Search',
            closeDropDownOnSelection: false
        };
        this.placeholder = 'Select';
        this.disabled = false;
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(MultiSelectComponent.prototype, "settings", {
        set: function (value) {
            if (value) {
                this._settings = Object.assign(this.defaultSettings, value);
            }
            else {
                this._settings = Object.assign(this.defaultSettings);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "data", {
        set: function (value) {
            var _this = this;
            if (!value) {
                this._data = [];
            }
            else {
                var _items = value.filter(function (item) {
                    if (typeof item === 'string' ||
                        (typeof item === 'object' &&
                            item &&
                            item[_this._settings.idField] &&
                            item[_this._settings.textField])) {
                        return item;
                    }
                });
                this._data = _items.map(function (item) {
                    return typeof item === 'string'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField]
                        });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    MultiSelectComponent.prototype.ngOnInit = function () { };
    MultiSelectComponent.prototype.onItemClick = function ($event, item) {
        if (this.disabled) {
            return false;
        }
        var found = this.isSelected(item);
        var limit = this.selectedItems.length < this._settings.limitSelection ? true : false;
        if (!found) {
            if (this._settings.limitSelection) {
                if (limit) {
                    this.addSelected(item);
                }
            }
            else {
                this.addSelected(item);
            }
        }
        else {
            this.removeSelected(item);
        }
        if (this._settings.singleSelection && this._settings.closeDropDownOnSelection) {
            this.closeDropdown();
        }
    };
    MultiSelectComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== undefined && value !== null) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        var firstItem = value[0];
                        this.selectedItems = [
                            typeof firstItem === 'string'
                                ? new ListItem(firstItem)
                                : new ListItem({
                                    id: firstItem[this._settings.idField],
                                    text: firstItem[this._settings.textField]
                                })
                        ];
                    }
                }
                catch (e) {
                    // console.error(e.body.msg);
                }
            }
            else {
                var _data = value.map(function (item) {
                    return typeof item === 'string'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[_this._settings.idField],
                            text: item[_this._settings.textField]
                        });
                });
                if (this._settings.limitSelection) {
                    this.selectedItems = _data.splice(0, this._settings.limitSelection);
                }
                else {
                    this.selectedItems = _data;
                }
            }
        }
    };
    // From ControlValueAccessor interface
    MultiSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    MultiSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    // Set touched on blur
    MultiSelectComponent.prototype.onTouched = function () {
        this.closeDropdown();
        this.onTouchedCallback();
    };
    MultiSelectComponent.prototype.trackByFn = function (index, item) {
        return item.id;
    };
    MultiSelectComponent.prototype.isSelected = function (clickedItem) {
        var found = false;
        this.selectedItems.forEach(function (item) {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    };
    MultiSelectComponent.prototype.isLimitSelectionReached = function () {
        return this._settings.limitSelection === this.selectedItems.length;
    };
    MultiSelectComponent.prototype.isAllItemsSelected = function () {
        return this._data.length === this.selectedItems.length;
    };
    MultiSelectComponent.prototype.itemShowRemaining = function () {
        return this.selectedItems.length - Number(this._settings.itemsShowLimit);
    };
    MultiSelectComponent.prototype.addSelected = function (item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    };
    MultiSelectComponent.prototype.removeSelected = function (itemSel) {
        var _this = this;
        this.selectedItems.forEach(function (item) {
            if (itemSel.id === item.id) {
                _this.selectedItems.splice(_this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    };
    MultiSelectComponent.prototype.emittedValue = function (val) {
        var _this = this;
        var selected = [];
        if (Array.isArray(val)) {
            val.map(function (item) {
                if (item.id === item.text) {
                    selected.push(item.text);
                }
                else {
                    selected.push(_this.objectify(item));
                }
            });
        }
        else {
            if (val) {
                if (val.id === val.text) {
                    return val.text;
                }
                else {
                    return this.objectify(val);
                }
            }
        }
        return selected;
    };
    MultiSelectComponent.prototype.objectify = function (val) {
        var obj = {};
        obj[this._settings.idField] = val.id;
        obj[this._settings.textField] = val.text;
        return obj;
    };
    MultiSelectComponent.prototype.toggleDropdown = function (evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    };
    MultiSelectComponent.prototype.closeDropdown = function () {
        this.isDropdownOpen = false;
    };
    MultiSelectComponent.prototype.toggleSelectAll = function () {
        if (this.disabled) {
            return false;
        }
        if (!this.isAllItemsSelected()) {
            this.selectedItems = this._data.slice();
            this.onSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        else {
            this.selectedItems = [];
            this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
    };
    return MultiSelectComponent;
}());
export { MultiSelectComponent };
MultiSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-multiselect-dropdown',
                template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\"><div [class.disabled]=\"disabled\"><span tabindex=\"-1\" class=\"btn\" (click)=\"toggleDropdown($event)\"><span *ngIf=\"selectedItems.length == 0\">{{placeholder}}</span> <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">{{item.text}} <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a> </span><span style=\"float:right !important;padding-right:4px\"><span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span> <span [ngClass]=\"isDropdownOpen ? 'glyphicon glyphicon-menu-up' : 'glyphicon glyphicon-menu-down'\"></span></span></span></div><div class=\"dropdown-list\" [hidden]=\"!isDropdownOpen\"><ul *ngIf=\"_settings.enableCheckAll && !_settings.limitSelection\"><li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection\" class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\"><input type=\"checkbox\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\"/><div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unselectAllText}}</div></li><li class=\"filter-textbox\" *ngIf=\"_settings.allowSearchFilter\"><input [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\"></li></ul><ul [style.maxHeight]=\"_settings.maxHeight+'px'\"><li *ngFor=\"let item of _data | ng2ListFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\"><input type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\"/><div>{{item.text}}</div></li><li *ngIf=\"_data.length == 0\"><h5>No data available</h5></li></ul></div></div>",
                styles: ["@-webkit-keyframes borderscale{50%{-webkit-box-shadow:0 0 0 2px #337ab7;box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{-webkit-box-shadow:0 0 0 2px #337ab7;box-shadow:0 0 0 2px #337ab7}}.multiselect-dropdown{position:relative;width:100%}.multiselect-dropdown .btn{border-color:#adadad;width:100%;text-align:left;padding-right:5px}.multiselect-dropdown .btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .btn .selected-item a{text-decoration:none}.multiselect-dropdown .btn .selected-item:hover{-webkit-box-shadow:1px 1px #959595;box-shadow:1px 1px #959595}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;-webkit-box-shadow:0 1px 5px #959595;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{-webkit-transition-duration:0s;transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{-webkit-box-sizing:content-box;box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;-webkit-transition:all .4s ease;transition:all .4s ease}.multiselect-item-checkbox input[type=checkbox]+div:after{-webkit-box-sizing:content-box;box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;-webkit-transition:-webkit-transform 200ms ease-out;transition:transform 200ms ease-out;transition:transform 200ms ease-out,-webkit-transform 200ms ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';-webkit-transition:-webkit-transform 200ms ease-out;transition:transform 200ms ease-out;transition:transform 200ms ease-out,-webkit-transform 200ms ease-out}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:borderscale 200ms ease-in;animation:borderscale 200ms ease-in;background:#337ab7}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}"],
                providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
MultiSelectComponent.ctorParameters = function () { return []; };
MultiSelectComponent.propDecorators = {
    'placeholder': [{ type: Input },],
    'disabled': [{ type: Input },],
    'settings': [{ type: Input },],
    'data': [{ type: Input },],
    'onSelect': [{ type: Output, args: ['onSelect',] },],
    'onDeSelect': [{ type: Output, args: ['onDeSelect',] },],
    'onSelectAll': [{ type: Output, args: ['onSelectAll',] },],
    'onDeSelectAll': [{ type: Output, args: ['onDeSelectAll',] },],
    'onTouched': [{ type: HostListener, args: ['blur',] },],
};
//# sourceMappingURL=multiselect.component.js.map