# By using the symbol ':user', we get Factory Girl to simulate the User model
Factory.define :user do |user|
  user.name                     "Thomas Michiels"
  user.email                    "thomas@voorbeeld.be"
  user.password                 "foobar"
  user.password_confirmation    "foobar"
end
