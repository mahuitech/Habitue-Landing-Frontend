import test from "node:test";
import assert from "node:assert/strict";
import { validateRegistration, registrationRequest } from "../src/features/membership/validation.ts";

const valid = { name: "María", contact: "maria@example.com", birthdayDay: "", birthdayMonth: "", acceptedTerms: true, acceptedMarketing: false };

test("marketing is optional and an omitted birthday stays null", () => {
  assert.deepEqual(validateRegistration(valid), {});
  const request = registrationRequest(valid, { termsVersion: "v1", marketingVersion: "v2" });
  assert.equal(request.birthday, null);
  assert.deepEqual(request.consents[1], { purpose: "MARKETING", textVersion: "v2", accepted: false });
});
test("terms are required independently from marketing", () => {
  assert.ok(validateRegistration({ ...valid, acceptedTerms: false, acceptedMarketing: true }).acceptedTerms);
});
test("rejects impossible and incomplete birthdays, supports leap day without a year", () => {
  for (const [day, month] of [["31", "4"], ["30", "2"], ["1", ""], ["", "6"], ["1", "13"]]) {
    assert.ok(validateRegistration({ ...valid, birthdayDay: day, birthdayMonth: month }).birthday);
  }
  assert.deepEqual(validateRegistration({ ...valid, birthdayDay: "29", birthdayMonth: "2" }), {});
});
test("rejects invalid contacts and normalizes phone formatting without inventing a country code", () => {
  for (const contact of ["", "maria@", "a@b", "123", "+34abc12345678", "1234567890123456"]) assert.ok(validateRegistration({ ...valid, contact }).contact);
  const request = registrationRequest({ ...valid, contact: "+34 612 345 678" }, { termsVersion: "v1", marketingVersion: "v1" });
  assert.deepEqual(request.contact, { type: "PHONE", value: "+34612345678" });
});
test("does not serialize an invalid registration", () => {
  assert.throws(() => registrationRequest({ ...valid, acceptedTerms: false }, { termsVersion: "v1", marketingVersion: "v1" }));
});
