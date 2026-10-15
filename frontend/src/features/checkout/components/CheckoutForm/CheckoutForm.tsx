import type {
  ChangeEvent,
} from "react";

import {
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./CheckoutForm.css";

import type {
  CheckoutFormData,
} from "../../types/checkout.types";


interface CheckoutFormProps {
  formData: CheckoutFormData;

  onChange: (
    data: CheckoutFormData
  ) => void;
}


const CheckoutForm = ({
  formData,
  onChange,
}: CheckoutFormProps) => {

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const {
      name,
      value,
    } = event.target;

    onChange({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className="checkout-form">

      <section className="checkout-section">

        <div className="section-title">

          <FaUser />

          <h2>
            Customer Information
          </h2>

        </div>


        <div className="form-grid">

          <div className="form-group">

            <label htmlFor="fullName">
              Full Name *
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Muhammad Huzaifa"
              autoComplete="name"
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="phone">
              Phone Number *
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+92 300 1234567"
              autoComplete="tel"
              required
            />

          </div>


          <div className="form-group full-width">

            <label htmlFor="email">
              Email Address *
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              autoComplete="email"
              required
            />

          </div>

        </div>

      </section>


      <section className="checkout-section">

        <div className="section-title">

          <FaMapMarkerAlt />

          <h2>
            Shipping Address
          </h2>

        </div>


        <div className="form-grid">

          <div className="form-group">

            <label htmlFor="country">
              Country *
            </label>

            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Country
              </option>

              <option value="Pakistan">
                Pakistan
              </option>

              <option value="India">
                India
              </option>

              <option value="United States">
                United States
              </option>

              <option value="United Kingdom">
                United Kingdom
              </option>

            </select>

          </div>


          <div className="form-group">

            <label htmlFor="state">
              Province / State *
            </label>

            <input
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              autoComplete="address-level1"
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="city">
              City *
            </label>

            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              autoComplete="address-level2"
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="postalCode">
              Postal Code *
            </label>

            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              autoComplete="postal-code"
              required
            />

          </div>


          <div className="form-group full-width">

            <label htmlFor="address">
              Street Address *
            </label>

            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
              required
            />

          </div>


          <div className="form-group full-width">

            <label htmlFor="apartment">
              Apartment / Suite
            </label>

            <input
              id="apartment"
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              autoComplete="address-line2"
            />

          </div>


          <div className="form-group full-width">

            <label htmlFor="notes">
              Order Notes
            </label>

            <textarea
              id="notes"
              rows={5}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special delivery instructions..."
            />

          </div>

        </div>

      </section>

    </div>
  );
};


export default CheckoutForm;