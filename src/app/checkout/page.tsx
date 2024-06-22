"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { useAuth } from "@/context/auth-context";
import clsx from "clsx";
import React, { useState } from "react";

const orderStyle = clsx("p-2 flex justify-between");

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const { user } = useAuth();

  const handlePaymentMethod = (x: string) => {
    setPaymentMethod(x);
  };

  return (
    <main className="flex flex-col gap-4">
      <Breadcrumbs active="Checkout" />
      <section></section>
      <section className="p-2 md:w-10/12 w-full flex max-md:flex-col max-md:items-center justify-center gap-4 mx-auto">
        <section className="w-full max-md:max-w-md">
          <h3 className="mb-3">Billing Details</h3>
          <form action="#">
            <Input label="First name" placeholder="First name" required />
            <Input label="Last name" placeholder="Last name" required />
            <Input label="Country" placeholder="Country" required />
            <Input label="Town/City" placeholder="Town/City" required />
            <Input label="Address" placeholder="Address" required />
            <Input
              label="Email"
              defaultValue={user?.email ?? ""}
              type="email"
              placeholder="Email"
              required
            />
            <Input
              label="Phone number"
              type="number"
              defaultValue={user?.phoneNumber ?? ""}
              placeholder="Phone number"
              required
            />
            <Input label="Apply coupon" placeholder="Enter coupon code" />

            <textarea
              placeholder="Additional note about your order, e.g special note for delivery."
              className="w-full min-h-40 max-h-60 border-2 rounded-md p-2"
            />
          </form>
        </section>

        <section className="w-full max-md:max-w-md h-fit p-4 border rounded-md divide-y font-light">
          <p className="mb-4 text-2xl">Your Order</p>
          <aside className="divide-y">
            <div className={clsx(orderStyle, "text-base")}>
              <strong>Product</strong>
              <span>Total</span>
            </div>

            <ul className="divide-y p-0.5">
              <OrderTile price={200} title={"Lorem Ipsum text"} quantity={2} />
              <OrderTile price={200} title={"Lorem Ipsum text"} quantity={1} />
              <OrderTile price={200} title={"Lorem Ipsum text"} quantity={4} />
            </ul>

            <div className={orderStyle}>
              <strong className="">Cart subtotal</strong>
              <span>$234</span>
            </div>

            <div className={orderStyle}>
              <b className="text-primary">Order Total</b>
              <big>
                <b>$349.00</b>
              </big>
            </div>
          </aside>
          <section>
            <form action="">
              <div className="space-y-4">
                <div>
                  <PaymentMethod
                    id="bank"
                    value={"bank"}
                    label="Direct Bank Transfer"
                    onChange={(e) => handlePaymentMethod(e.target.value)}
                  />
                  <div
                    className={clsx(
                      "px-4  rounded-b-md transition-all duration-300 ",
                      {
                        "border h-full mt-1": paymentMethod === "bank",
                        " h-0 overflow-hidden": paymentMethod !== "bank",
                      }
                    )}
                  >
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti odio atque dicta cumque et beatae, repellat iusto
                      non
                    </p>
                    <h5>Send order amount to:</h5>
                    <ul>
                      <li>
                        <b>Account name:</b> Bambi Stores
                      </li>
                      <li>
                        <b>Account number:</b> 0123456789
                      </li>
                      <li>
                        <b>Bank</b>: Moniepoint MFB
                      </li>
                    </ul>
                  </div>
                </div>
                <PaymentMethod
                  id="paystack"
                  value={"paystack"}
                  label="Paystack"
                  onChange={(e) => handlePaymentMethod(e.target.value)}
                />
                {/* <PaymentMethod value="bank" title="Direct Bank Transfer" /> */}
              </div>

              <Button className="!mx-auto mt-4 px-4">Proceed to payment</Button>
            </form>
          </section>
        </section>
      </section>
    </main>
  );
}

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

const Input = ({ label, id, required, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 mb-5 last:mb-0">
      {label && (
        <label htmlFor={id} className="text-base font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...rest}
        required={required}
        className="border focus:!border-primary p-2 rounded"
      />
    </div>
  );
};

const OrderTile = ({
  title,
  price,
  quantity,
}: {
  title: string;
  quantity: number;
  price: number;
}) => (
  <li className={orderStyle}>
    <span>
      {title}{" "}
      <b>
        <small>x</small> {quantity}
      </b>
    </span>
    <span>${price} </span>
  </li>
);

const PaymentMethod = ({ label, id, value, ...rest }: InputProps) => {
  return (
    <div className="space-x-2 p-4 first:mt-6 rounded text-base font-medium hover:bg-primary hover:border-primary border transition-colors duration-300">
      <input
        type="radio"
        name="payment"
        defaultChecked={value === "bank"}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
