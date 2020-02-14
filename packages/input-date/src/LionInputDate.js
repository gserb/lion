import { LocalizeMixin, formatDate, parseDate } from '@lion/localize';
import { FieldCustomMixin } from '@lion/field';
import { LionInput } from '@lion/input';
import { IsDate, Unparseable } from '@lion/validate';

/**
 * `LionInputDate` has a .modelValue of type Date. It parses, formats and validates based
 * on locale.
 *
 * @customElement lion-input-date
 * @extends {LionInput}
 */
export class LionInputDate extends FieldCustomMixin(LocalizeMixin(LionInput)) {
  static get properties() {
    return {
      modelValue: Date,
    };
  }

  constructor() {
    super();
    this.parser = (value, options) => (value === '' ? undefined : parseDate(value, options));
    this.formatter = formatDate;
    this.defaultValidators.push(new IsDate());
  }

  updated(c) {
    super.updated(c);
    if (c.has('locale')) {
      this._calculateValues();
    }
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.type = 'text';
  }

  // eslint-disable-next-line class-methods-use-this
  serializer(modelValue) {
    if (!(modelValue instanceof Date) || modelValue instanceof Unparseable) {
      return '';
    }
    return modelValue.toISOString().slice(0, 10);
  }

  // eslint-disable-next-line class-methods-use-this
  deserializer(serializedValue) {
    // TODO: use normalize util?
    return new Date(serializedValue);
  }
}
