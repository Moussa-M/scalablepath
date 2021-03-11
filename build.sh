echo '...Installing frontend libraries'
npm install
echo '...Done...'

echo '...Building the frontend'
npm run build
echo '...Done...'

echo '...Format index.html as Jinja template'
python3 format_index_html.py
echo '...Done...'

echo '...Collect static'
python3 manage.py collectstatic --noinput
echo '...Done...'

echo '...Run migrations'
python3 manage.py migrate
echo '...Done...'

echo '...Creating admin user and seeding products for him'
python3 manage.py seed_products
echo '...Done...'

echo '............................'
echo '............................'
echo '............................'
echo ''
echo 'open http://127.0.0.1:8000/ and Login using username : admin and password: password'
echo ''
echo '............................'
echo '............................'
echo '............................'